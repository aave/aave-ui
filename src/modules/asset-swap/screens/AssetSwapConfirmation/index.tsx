import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import queryString from 'query-string';

import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import Row from '../../../../components/basic/Row';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import HealthFactor from '../../../../components/HealthFactor';
import ValuePercent from '../../../../components/basic/ValuePercent';
import Preloader from '../../../../components/basic/Preloader';
import { getSwapCallData, useSwap } from '../../../../libs/use-asset-swap/useSwap';
import { calculateHFAfterSwap } from '../../helpers';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import { ChainId } from '@aave/contract-helpers';

interface QueryParams {
  fromAsset?: string;
  toAsset?: string;
  fromAmount?: string;
  toAmount?: string;
  fromAmountInUSD?: string;
  toAmountInUSD?: string;
  maxSlippage?: string;
  isReverse?: string;
  swapAll?: string;
  useEthPath?: string;
  totalFees?: string;
}
// TODO:
// TODO: -1 - max
// TODO: error on slippage
export default function AssetSwapConfirmation() {
  const intl = useIntl();
  const location = useLocation();
  const { WrappedBaseNetworkAssetAddress, networkConfig, chainId } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const query = queryString.parse(location.search) as QueryParams;

  const fromAsset = query.fromAsset;
  const toAsset = query.toAsset;

  const fromAmountQuery = valueToBigNumber(query.fromAmount || 0);
  const toAmountQuery = valueToBigNumber(query.toAmount || 0);

  const fromAmountUsdQuery = valueToBigNumber(query.fromAmountInUSD || 0);
  const toAmountUsdQuery = valueToBigNumber(query.toAmountInUSD || 0);

  const maxSlippage = valueToBigNumber(query.maxSlippage || 0);
  const totalFees = valueToBigNumber(query.totalFees || 0);
  const swapAll = query.swapAll === 'true';

  // paraswap has no api specifically for the fork you're running on, so we need to select the correct chainId
  const underlyingChainId = (
    networkConfig.isFork ? networkConfig.underlyingChainId : chainId
  ) as number;

  const {
    error,
    outputAmount: calcToAmountString,
    inputAmount,
    priceRoute,
    reserveIn,
    reserveOut,
  } = useSwap({
    userId: user?.id,
    swapIn: {
      address: fromAsset as string,
      amount: fromAmountQuery.toString(),
    },
    swapOut: {
      address: toAsset as string,
      amount: '0',
    },
    variant: 'exactIn',
    max: swapAll,
    chainId: underlyingChainId,
  });

  const calcToAmount = valueToBigNumber(calcToAmountString);

  const fromUserReserve = user?.userReservesData.find(
    (res) => res.reserve.underlyingAsset.toLowerCase() === fromAsset?.toLowerCase()
  );
  const toUserReserve = user?.userReservesData.find(
    (res) => res.reserve.underlyingAsset.toLowerCase() === toAsset?.toLowerCase()
  );

  const fromPoolReserve = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === fromAsset?.toLowerCase()
  );
  const toPoolReserve = reserves.find(
    (res) =>
      res.underlyingAsset.toLowerCase() === toAsset?.toLowerCase() && !res.isFrozen && res.isActive
  );

  if (
    !user ||
    !fromAsset ||
    !toAsset ||
    !fromAmountQuery.gt(0) ||
    !toAmountQuery.gt(0) ||
    !maxSlippage.gte(0) ||
    !fromPoolReserve ||
    !toPoolReserve
  ) {
    return null;
  }

  const { hfEffectOfFromAmount, hfAfterSwap } = calculateHFAfterSwap(
    fromAmountQuery,
    fromPoolReserve,
    fromUserReserve,
    toAmountQuery,
    toPoolReserve,
    toUserReserve,
    user,
    maxSlippage
  );

  if (calcToAmount.eq(0)) {
    return <Preloader withText={true} />;
  }
  let blockingError = '';

  const handleGetTransactions = async () => {
    if (!priceRoute || error) {
      throw new Error('no paraswap route found');
    }
    const { swapCallData, augustus } = await getSwapCallData({
      srcToken: reserveIn.address,
      srcDecimals: reserveIn.decimals,
      destToken: reserveOut.address,
      destDecimals: reserveOut.decimals,
      user: user?.id,
      route: priceRoute,
      chainId: underlyingChainId,
    });
    return lendingPool.swapCollateral({
      fromAsset:
        fromPoolReserve.symbol === networkConfig.baseAsset
          ? WrappedBaseNetworkAssetAddress
          : fromAsset,
      toAsset:
        toPoolReserve.symbol === networkConfig.baseAsset ? WrappedBaseNetworkAssetAddress : toAsset,
      swapAll,
      fromAToken: fromPoolReserve.aTokenAddress,
      fromAmount: inputAmount.toString(),
      minToAmount: toAmountQuery.toString(),
      user: user.id,
      flash:
        user.healthFactor !== '-1' &&
        valueToBigNumber(user.healthFactor).minus(hfEffectOfFromAmount).lt(1.01),
      augustus,
      swapCallData,
    });
  };

  const currentSlippage = calcToAmount.lt(toAmountQuery)
    ? toAmountQuery.minus(calcToAmount).div(toAmountQuery)
    : valueToBigNumber('0');

  if (currentSlippage.gt(maxSlippage)) {
    blockingError = `Current slippage (${currentSlippage
      .multipliedBy(100)
      .toFixed(2)}%) are bigger then selected ${maxSlippage.toFixed(2).toString()}% `;
  }

  if (fromAmountQuery.gt(fromUserReserve?.underlyingBalance || '0')) {
    blockingError = intl.formatMessage(messages.balanceNotEnough);
  }

  if (hfAfterSwap.lt('1') && user.totalBorrowsUSD !== '0') {
    blockingError = intl.formatMessage(messages.healthDropBellow);
  }

  const aTokenData = getAtokenInfo({
    address: toPoolReserve.aTokenAddress,
    symbol: toPoolReserve.symbol,
    decimals: toPoolReserve.decimals,
    withFormattedSymbol: false,
  });

  return (
    <PoolTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(defaultMessages.swap)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      approveDescription={intl.formatMessage(messages.approveDescription)}
      mainTxName={intl.formatMessage(defaultMessages.swap)}
      blockingError={error || blockingError}
      allowedChainIds={[ChainId.mainnet, ChainId.polygon]}
      aTokenData={aTokenData}
      warningMessage={intl.formatMessage(messages.warningMessage)}
    >
      <Row title={intl.formatMessage(messages.fromTitle)} withMargin={true}>
        <Value
          value={fromAmountQuery.toNumber()}
          subValue={fromAmountUsdQuery.toString()}
          symbol={fromPoolReserve.symbol}
          subSymbol="USD"
          tokenIcon={true}
          tooltipId={fromPoolReserve.symbol}
        />
      </Row>
      <Row title={intl.formatMessage(messages.toTitle)} withMargin={true}>
        <Value
          value={toAmountQuery.toNumber()}
          subValue={toAmountUsdQuery.toString()}
          symbol={toPoolReserve.symbol}
          subSymbol="USD"
          tokenIcon={true}
          tooltipId={toPoolReserve.symbol}
        />
      </Row>

      {+user.healthFactor > 0 && (
        <>
          <HealthFactor
            title={intl.formatMessage(messages.currentHealthFactor)}
            value={user.healthFactor}
          />
          <HealthFactor
            title={intl.formatMessage(messages.newHealthFactor)}
            value={hfAfterSwap.toString()}
            withoutModal={true}
          />
        </>
      )}

      <Row title={intl.formatMessage(messages.maximumSlippage)} withMargin={true}>
        <ValuePercent value={maxSlippage.toNumber() / 100} />
      </Row>
      <Row title={intl.formatMessage(messages.fees)}>
        <ValuePercent value={totalFees.toNumber() / 100} />
      </Row>
    </PoolTxConfirmationView>
  );
}
