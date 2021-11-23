import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { valueToBigNumber, BigNumber, InterestRate, API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';

import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import Row from '../../../../components/basic/Row';
import NoDataPanel from '../../../../components/NoDataPanel';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import HealthFactor from '../../../../components/HealthFactor';
import ValuePercent from '../../../../components/basic/ValuePercent';
import { calculateHFAfterRepay } from '../../helpers';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import { ChainId } from '@aave/contract-helpers';

interface QueryParams {
  fromAsset?: string;
  toAsset?: string;
  fromAmount?: string;
  toAmount?: string;
  fromAmountInUSD?: string;
  maxSlippage?: string;
  isReverse?: string;
  repayAll?: string;
  debtType?: string;
  useEthPath?: string;
  totalFees?: string;
}

function RepayWithCollateralConfirmation({
  currencySymbol,
  poolReserve,
  user,
  userReserve: toAssetUserData,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { marketRefPriceInUsd, WrappedBaseNetworkAssetAddress } = useStaticPoolDataContext();
  const { reserves } = useDynamicPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const [isTxExecuted, setIsTxExecuted] = useState(false);

  const query = queryString.parse(location.search) as QueryParams;

  const fromAsset = query.fromAsset;
  const toAsset = query.toAsset;
  const fromAssetData = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === fromAsset?.toLowerCase()
  );
  const toAssetData = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === toAsset?.toLowerCase()
  );
  const fromAmountQuery = valueToBigNumber(query.fromAmount || 0);
  const toAmountQuery = valueToBigNumber(query.toAmount || 0);

  const repayAllDebt = query.repayAll === 'true';
  const fromAmountUsdQuery = valueToBigNumber(query.fromAmountInUSD || 0);

  const maxSlippage = valueToBigNumber(query.maxSlippage || 0);

  const debtType = query.debtType ? (query.debtType as InterestRate) : InterestRate.Variable;
  const totalFees = valueToBigNumber(query.totalFees || 0);

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const fromAssetUserData = user.userReservesData.find(
    (res) => res.reserve.underlyingAsset.toLowerCase() === fromAsset?.toLowerCase()
  );

  if (
    !toAmountQuery ||
    !toAssetUserData ||
    !fromAssetUserData ||
    !fromAsset ||
    !toAsset ||
    !fromAssetData
  ) {
    return null;
  }

  const maxDebtToRepay = valueToBigNumber(
    debtType === InterestRate.Stable
      ? toAssetUserData.stableBorrows
      : toAssetUserData.variableBorrows
  );

  const maxDebtToRepayWithCurrentCollateral = valueToBigNumber(
    toAmountQuery.multipliedBy(fromAssetUserData.underlyingBalance).dividedBy(fromAmountQuery)
  ).toString();

  const debtToRepay = repayAllDebt
    ? BigNumber.min(maxDebtToRepayWithCurrentCollateral, maxDebtToRepay.toString())
    : toAmountQuery; // TODO: UPDATE THIS

  const displayAmountToRepay = BigNumber.min(debtToRepay, maxDebtToRepay);
  const displayAmountToRepayInUsd = displayAmountToRepay
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd);

  const amountAfterRepay = maxDebtToRepay.minus(debtToRepay).toString();
  const displayAmountAfterRepay = BigNumber.min(amountAfterRepay, maxDebtToRepay);
  const displayAmountAfterRepayInUsd = displayAmountAfterRepay
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd);

  const { hfAfterSwap, hfInitialEffectOfFromAmount } = calculateHFAfterRepay(
    fromAmountQuery,
    fromAssetData,
    fromAssetUserData,
    debtToRepay,
    toAssetData,
    toAssetUserData,
    user
  );

  const fixedAsset = (asset: string) =>
    asset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
      ? WrappedBaseNetworkAssetAddress
      : asset.toLowerCase();

  const handleGetTransactions = async () =>
    await lendingPool.repayWithCollateral({
      user: user.id,
      fromAsset: fixedAsset(fromAsset),
      repayAllDebt,
      assetToRepay: fixedAsset(toAsset),
      fromAToken: fromAssetData.aTokenAddress,
      rateMode: debtType,
      repayAmount: toAmountQuery.toString(),
      repayWithAmount: fromAmountQuery.toString(),
      flash: valueToBigNumber(user.healthFactor).minus(hfInitialEffectOfFromAmount).lte('1.01'),
      useEthPath: query.useEthPath === 'true',
    });

  const handleMainTxExecuted = () => setIsTxExecuted(true);

  const blockingError = valueToBigNumber(fromAssetUserData?.underlyingBalance || 0).lt(
    fromAmountQuery
  )
    ? intl.formatMessage(messages.error, {
        userReserveSymbol: fromAssetData?.symbol,
      })
    : '';

  const warningMessage =
    repayAllDebt &&
    debtToRepay.gte(maxDebtToRepay) &&
    !valueToBigNumber(maxDebtToRepayWithCurrentCollateral).lt(maxDebtToRepay.multipliedBy(1.0025))
      ? intl.formatMessage(messages.warningMessage)
      : '';

  return (
    <PoolTxConfirmationView
      mainTxName={intl.formatMessage(defaultMessages.repay)}
      caption={intl.formatMessage(messages.caption)}
      boxTitle={intl.formatMessage(defaultMessages.repay)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      approveDescription={intl.formatMessage(messages.approveDescription)}
      getTransactionsData={handleGetTransactions}
      onMainTxExecuted={handleMainTxExecuted}
      blockingError={blockingError}
      goToAfterSuccess="/dashboard/borrowings"
      warningMessage={warningMessage}
      dangerousMessage={intl.formatMessage(messages.dangerousMessage)}
      allowedChainIds={[ChainId.mainnet, ChainId.kovan]}
    >
      <Row title={intl.formatMessage(messages.rowTitle)} withMargin={true}>
        <Value
          symbol={fromAssetData?.symbol}
          value={fromAmountQuery.toString()}
          tokenIcon={true}
          subValue={fromAmountUsdQuery.toString()}
          subSymbol="USD"
          maximumValueDecimals={isAssetStable(fromAssetData?.symbol || '') ? 4 : 12}
          maximumSubValueDecimals={4}
          updateCondition={isTxExecuted}
          tooltipId={fromAssetData?.symbol}
        />
      </Row>

      <Row
        title={intl.formatMessage(messages.rowTitle)}
        subTitle={intl.formatMessage(messages.inBorrowCurrency)}
        withMargin={true}
      >
        <Value
          symbol={currencySymbol}
          value={displayAmountToRepay.toString()}
          tokenIcon={true}
          subValue={displayAmountToRepayInUsd.toString()}
          subSymbol="USD"
          maximumValueDecimals={isAssetStable(currencySymbol) ? 4 : 12}
          maximumSubValueDecimals={4}
          updateCondition={isTxExecuted}
          tooltipId={currencySymbol}
        />
      </Row>

      <Row title={intl.formatMessage(messages.secondRowTitle)} withMargin={true}>
        <Value
          symbol={currencySymbol}
          value={Number(displayAmountAfterRepay) > 0 ? Number(displayAmountAfterRepay) : 0}
          subValue={
            Number(displayAmountAfterRepayInUsd) > 0 ? Number(displayAmountAfterRepayInUsd) : 0
          }
          subSymbol="USD"
          maximumSubValueDecimals={4}
          tokenIcon={true}
          maximumValueDecimals={18}
          updateCondition={isTxExecuted}
          tooltipId={poolReserve.id}
        />
      </Row>

      <HealthFactor
        title={intl.formatMessage(messages.currentHealthFactor)}
        value={user.healthFactor}
        updateCondition={isTxExecuted}
        titleColor="dark"
      />

      <HealthFactor
        value={hfAfterSwap.toString()}
        title={intl.formatMessage(messages.nextHealthFactor)}
        withoutModal={true}
        updateCondition={isTxExecuted}
        titleColor="dark"
      />

      <Row title={intl.formatMessage(messages.maximumSlippage)} withMargin={true}>
        <ValuePercent value={maxSlippage.toNumber() / 100} />
      </Row>
      <Row title={intl.formatMessage(messages.fees)}>
        <ValuePercent value={totalFees.toNumber() / 100} />
      </Row>
    </PoolTxConfirmationView>
  );
}

export default routeParamValidationHOC({
  withUserReserve: true,
  allowLimitAmount: true,
})(RepayWithCollateralConfirmation);
