import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import {
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
  BigNumber,
  InterestRate,
} from '@aave/protocol-js';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import Row from '../../../../components/basic/Row';
import NoDataPanel from '../../../../components/NoDataPanel';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import HealthFactor from '../../../../components/HealthFactor';
import NotHaveEnoughFundsToRepayHelpModal from '../../../../components/HelpModal/NotHaveEnoughFundsToRepayHelpModal';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import { getAssetInfo, isAssetStable } from '../../../../helpers/config/assets-config';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

function RepayConfirmation({
  currencySymbol,
  amount,
  user,
  poolReserve,
  userReserve,
  walletBalance,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { marketRefPriceInUsd, networkConfig } = useStaticPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const [isTxExecuted, setIsTxExecuted] = useState(false);
  const assetDetails = getAssetInfo(poolReserve.symbol);
  const query = queryString.parse(location.search);
  const debtType = query.debtType ? (query.debtType as InterestRate) : InterestRate.Variable;

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }
  if (!amount || !userReserve) {
    return null;
  }
  const maxAmountToRepay = valueToBigNumber(
    debtType === InterestRate.Stable ? userReserve.stableBorrows : userReserve.variableBorrows
  );

  const safeAmountToRepayAll = valueToBigNumber(maxAmountToRepay).multipliedBy('1.0025');

  let amountToRepay = amount.toString();
  let amountToRepayUI = amount;
  if (amountToRepay === '-1') {
    amountToRepayUI = BigNumber.min(walletBalance, safeAmountToRepayAll);
    if (
      userReserve.reserve.symbol.toUpperCase() === networkConfig.baseAsset ||
      walletBalance.eq(amountToRepayUI)
    ) {
      amountToRepay = BigNumber.min(walletBalance, safeAmountToRepayAll).toString();
    }
  }

  const displayAmountToRepay = BigNumber.min(amountToRepayUI, maxAmountToRepay);
  const displayAmountToRepayInUsd = displayAmountToRepay
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd);

  const amountAfterRepay = maxAmountToRepay.minus(amountToRepayUI).toString();
  const displayAmountAfterRepay = BigNumber.min(amountAfterRepay, maxAmountToRepay);
  const displayAmountAfterRepayInUsd = displayAmountAfterRepay
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd);

  const healthFactorAfterRepay = calculateHealthFactorFromBalancesBigUnits(
    user.totalCollateralUSD,
    valueToBigNumber(user.totalBorrowsUSD).minus(displayAmountToRepayInUsd.toNumber()),
    user.currentLiquidationThreshold
  );

  const handleGetTransactions = async () =>
    await lendingPool.repay({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amountToRepay.toString(),
      interestRateMode: debtType,
    });

  const handleMainTxExecuted = () => setIsTxExecuted(true);

  const blockingError =
    walletBalance.eq('0') || walletBalance.lt(amount)
      ? intl.formatMessage(messages.error, {
          userReserveSymbol: assetDetails.formattedSymbol || assetDetails.symbol,
        })
      : '';

  const warningMessage =
    amount.eq('-1') &&
    amountToRepayUI.gte(maxAmountToRepay) &&
    !amountToRepayUI.gte(safeAmountToRepayAll)
      ? intl.formatMessage(messages.warningMessage)
      : '';

  const isNotHaveEnoughFunds = amount.toString() === '-1' && walletBalance.lt(maxAmountToRepay);

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
    >
      <Row title={intl.formatMessage(messages.rowTitle)} withMargin={true}>
        <Value
          symbol={currencySymbol}
          value={displayAmountToRepay.toString()}
          tokenIcon={true}
          subValue={displayAmountToRepayInUsd.toString()}
          subSymbol="USD"
          maximumValueDecimals={isAssetStable(currencySymbol) ? 4 : 12}
          maximumSubValueDecimals={4}
          updateCondition={isTxExecuted}
          tooltipId={poolReserve.underlyingAsset}
        />
      </Row>

      <Row
        title={intl.formatMessage(messages.secondRowTitle)}
        subTitle={
          isNotHaveEnoughFunds && (
            <NotHaveEnoughFundsToRepayHelpModal
              text={intl.formatMessage(messages.secondRowTitleSubTitle)}
            />
          )
        }
        withMargin={true}
      >
        <Value
          symbol={currencySymbol}
          value={Number(displayAmountAfterRepay) > 0 ? Number(displayAmountAfterRepay) : 0}
          subValue={
            Number(displayAmountAfterRepayInUsd) > 0 ? Number(displayAmountAfterRepayInUsd) : 0
          }
          subSymbol="USD"
          maximumSubValueDecimals={4}
          tokenIcon={true}
          maximumValueDecimals={isNotHaveEnoughFunds ? 14 : isAssetStable(currencySymbol) ? 4 : 12}
          updateCondition={isTxExecuted}
          tooltipId={poolReserve.id}
          withSmallDecimals={isNotHaveEnoughFunds}
          isSmallValueCenterEllipsis={isNotHaveEnoughFunds}
        />
      </Row>

      <HealthFactor
        title={intl.formatMessage(messages.currentHealthFactor)}
        value={user.healthFactor}
        updateCondition={isTxExecuted}
        titleColor="dark"
      />

      <HealthFactor
        value={healthFactorAfterRepay.toString()}
        title={intl.formatMessage(messages.nextHealthFactor)}
        withoutModal={true}
        updateCondition={isTxExecuted}
        titleColor="dark"
      />
    </PoolTxConfirmationView>
  );
}

export default routeParamValidationHOC({
  withAmount: true,
  withWalletBalance: true,
  withUserReserve: true,
  allowLimitAmount: true,
})(RepayConfirmation);
