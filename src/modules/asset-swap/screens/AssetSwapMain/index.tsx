import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { valueToBigNumber } from '@aave/protocol-js';
import queryString from 'query-string';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import NoDataPanel from '../../../../components/NoDataPanel';
import MarketNotSupported from '../../../../components/MarketNotSupported';
import SwapForm from '../../../../components/forms/SwapForm';
import AmountFieldWithSelect from '../../../../components/fields/AmountFieldWithSelect';
import Link from '../../../../components/basic/Link';
import SwapDetailsWrapper, {
  DEFAULT_MAX_SLIPPAGE,
} from '../../../../components/wrappers/SwapDetailsWrapper';
import AssetSwapContentWrapper from '../../components/AssetSwapContentWrapper';
import AssetSwapNoDeposits from '../../components/AssetSwapNoDeposits';
import { calculateHFAfterSwap } from '../../helpers';
import { useSwap } from '../../../../libs/use-asset-swap/useSwap';
import { isFeatureEnabled } from '../../../../helpers/markets/markets-data';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

const applySlippage = (amount: string, slippagePercent: number | string) => {
  return valueToBigNumber(amount || '0').multipliedBy(1 - +slippagePercent / 100);
};

export default function AssetSwapMain() {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const { currentTheme } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { currentMarketData, chainId } = useProtocolDataContext();
  const [fromAmount, setAmountFrom] = useState<string>('');
  const [fromAsset, setAssetFrom] = useState('');
  const fromAssetData = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === fromAsset.toLowerCase()
  );
  const [toAsset, setAssetTo] = useState('');
  const toAssetData = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === toAsset.toLowerCase()
  );
  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const {
    loading,
    error,
    outputAmount: toAmount,
    outputAmountUSD: toAmountInUSD,
    inputAmountUSD: fromAmountInUSD,
  } = useSwap({
    userId: user?.id,
    swapIn: {
      address: fromAsset,
      amount: fromAmount,
    },
    swapOut: {
      address: toAsset,
      amount: '0',
    },
    variant: 'exactIn',
    max: isMaxSelected,
    chainId,
  });

  const [maxSlippage, setMaxSlippage] = useState(DEFAULT_MAX_SLIPPAGE);

  if (!isFeatureEnabled.liquiditySwap(currentMarketData)) {
    return <MarketNotSupported />;
  }

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const availableDeposits = user.reservesData.filter(
    (res) =>
      res.underlyingBalance !== '0' &&
      res.reserve.underlyingAsset.toLowerCase() !== toAsset.toLowerCase()
  );
  const availableDepositsSymbols = availableDeposits.map((res) => ({
    label: res.reserve.symbol,
    value: res.reserve.underlyingAsset,
    decimals: res.reserve.decimals,
  }));

  const availableDestinations = reserves.filter(
    (res) =>
      res.isActive && !res.isFrozen && res.underlyingAsset.toLowerCase() !== fromAsset.toLowerCase()
  );
  const availableDestinationsSymbols = availableDestinations.map((res) => ({
    label: res.symbol,
    value: res.underlyingAsset,
    decimals: res.decimals,
  }));

  const fromAPY = availableDeposits.find(
    (res) => res.reserve.underlyingAsset.toLowerCase() === fromAsset.toLowerCase()
  )?.reserve.liquidityRate;
  const toAPY = availableDestinations.find(
    (res) => res.underlyingAsset.toLowerCase() === toAsset.toLowerCase()
  )?.liquidityRate;

  const fromAssetUserData = user.reservesData.find(
    (res) => res.reserve.underlyingAsset === fromAsset
  );
  const toAssetUserData = user.reservesData.find((res) => res.reserve.underlyingAsset === toAsset);

  const availableFromAmount = fromAssetUserData?.underlyingBalance || '0';
  // const availableToAmount = toAssetUserData?.underlyingBalance || '0';

  const usdValueSlippage = +fromAmountInUSD
    ? valueToBigNumber(fromAmountInUSD)
        .minus(toAmountInUSD)
        .div(fromAmountInUSD)
        .multipliedBy(-100)
        .toFixed(2)
    : '0';

  const toAmountWithSlippage = applySlippage(toAmount, maxSlippage);
  const toAmountInUSDWithSlippage = applySlippage(toAmountInUSD, maxSlippage);

  const { hfAfterSwap, hfEffectOfFromAmount } = calculateHFAfterSwap(
    fromAmount,
    fromAssetData,
    fromAssetUserData,
    toAmountWithSlippage.toString(10),
    toAssetData,
    toAssetUserData,
    user,
    maxSlippage
  );

  const fromAmountNotEnoughError = valueToBigNumber(fromAssetUserData?.underlyingBalance || 0).lt(
    fromAmount
  )
    ? intl.formatMessage(messages.notEnoughBalance)
    : undefined;

  const isSubmitButtonDisabled =
    (hfAfterSwap.lte(1) && user.totalBorrowsUSD !== '0') ||
    !+fromAmount ||
    !+toAmount ||
    !!error ||
    !!fromAmountNotEnoughError;

  const flashloanFees =
    user.healthFactor !== '-1' &&
    valueToBigNumber(user.healthFactor).minus(hfEffectOfFromAmount).lte(1.01)
      ? 0.0009
      : undefined;

  const totalFees = valueToBigNumber(flashloanFees || '0')
    .multipliedBy(100)
    .toString();

  const handleSubmit = () => {
    if (
      !valueToBigNumber(fromAmount).isNaN() &&
      fromAmount !== '0' &&
      !valueToBigNumber(toAmount).isNaN() &&
      toAmount !== '0'
    ) {
      const query = queryString.stringify({
        fromAsset,
        toAsset,
        fromAmount,
        toAmount: toAmount,
        toAmountInUSD: toAmountInUSD,
        maxSlippage,
        fromAmountInUSD,
        toAmountAfterSlippage: toAmountWithSlippage.toString(10),
        toAmountInUSDAfterSlippage: toAmountInUSDWithSlippage.toString(10),
        swapAll: isMaxSelected,
        totalFees,
      });

      history.push(`${history.location.pathname}/confirmation?${query}`);
    }
  };

  const queryFromAsset = queryString.parse(location.search).asset?.toString() || undefined;

  return (
    <AssetSwapContentWrapper
      rightPanel={
        availableDeposits.length >= 1 && (
          <SwapDetailsWrapper
            title={intl.formatMessage(messages.rightPanelTitle)}
            priceImpact={(+usdValueSlippage).toString()} // TODO: need take a look
            withMinimumReceived={true}
            minimumReceivedValue={toAmountWithSlippage.toString(10)} // TODO: need take a look
            minimumReceivedValueInUSD={toAmountInUSDWithSlippage.toString(10)} // TODO: need take a look
            minimumReceivedSymbol={toAssetData?.symbol} // TODO: need take a look
            withAPY={true}
            fromAPY={fromAPY}
            toAPY={toAPY}
            healthFactor={user.healthFactor}
            hfAfterSwap={hfAfterSwap.toString()}
            maxSlippage={maxSlippage}
            setMaxSlippage={setMaxSlippage}
            withFees={true}
            flashloanFees={flashloanFees}
          />
        )
      }
    >
      {availableDeposits.length >= 1 ? (
        <SwapForm
          onSubmit={handleSubmit}
          isSubmitButtonDisabled={isSubmitButtonDisabled}
          caption={intl.formatMessage(defaultMessages.swap)}
          description={intl.formatMessage(messages.description, {
            deposited: (
              <span style={{ color: `${currentTheme.primary.hex}` }}>
                {intl.formatMessage(messages.deposited)}
              </span>
            ),
            faq: (
              <Link
                to="https://docs.aave.com/faq/" // TODO: need change link
                absolute={true}
                inNewWindow={true}
                title={intl.formatMessage(messages.faq)}
                color="secondary"
              />
            ),
          })}
          error={error || fromAmountNotEnoughError}
          buttonTitle={intl.formatMessage(messages.continue)}
          fromField={
            <AmountFieldWithSelect
              asset={fromAsset}
              setAsset={setAssetFrom}
              options={availableDepositsSymbols}
              selectTitle={intl.formatMessage(messages.fromTitle)}
              amount={fromAmount}
              onChangeAmount={setAmountFrom}
              setMaxSelected={setIsMaxSelected}
              maxAmount={availableFromAmount}
              amountInUsd={fromAmountInUSD}
              amountTitle={intl.formatMessage(messages.available)}
              disabled={!fromAsset}
              loading={loading && !error}
              error={fromAmountNotEnoughError}
              maxDecimals={fromAssetData?.decimals}
              queryAsset={queryFromAsset}
            />
          }
          toField={
            <AmountFieldWithSelect
              asset={toAsset}
              setAsset={setAssetTo}
              options={availableDestinationsSymbols}
              selectTitle={intl.formatMessage(messages.toTitle)}
              amount={toAmount}
              onChangeAmount={() => {}}
              amountInUsd={toAmountInUSD}
              percentDifference={(+usdValueSlippage).toString()}
              disabled={true}
              loading={loading}
              maxDecimals={toAssetData?.decimals}
            />
          }
        />
      ) : (
        <AssetSwapNoDeposits numberOfDepositedAssets={availableDeposits.length} />
      )}
    </AssetSwapContentWrapper>
  );
}
