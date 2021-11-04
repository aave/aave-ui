import React, { useState } from 'react';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import {
  calculateHealthFactorFromBalancesBigUnits,
  InterestRate,
  valueToBigNumber,
} from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { getReferralCode } from '../../../../libs/referral-handler';
import Row from '../../../../components/basic/Row';
import NoDataPanel from '../../../../components/NoDataPanel';
import ErrorPage from '../../../../components/ErrorPage';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import ValuePercent from '../../../../components/basic/ValuePercent';
import HealthFactor from '../../../../components/HealthFactor';
import BorrowCurrencyWrapper from '../../components/BorrowCurrencyWrapper';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';

function BorrowConfirmation({
  currencySymbol,
  user,
  amount,
  poolReserve,
  userReserve,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const { currentTheme } = useThemeContext();
  let blockingError = '';

  const aTokenData = getAtokenInfo({
    address: poolReserve.underlyingAsset,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
    withFormattedSymbol: true,
  });

  // lock values to not update them after tx was executed
  const [isTxExecuted, setIsTxExecuted] = useState(false);

  const query = queryString.parse(location.search);
  const interestRateMode =
    typeof query.rateMode === 'string'
      ? InterestRate[query.rateMode as InterestRate]
      : InterestRate.Variable;

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const currentStableBorrowRate =
    userReserve && userReserve.stableBorrows !== '0' && poolReserve.stableBorrowAPY;
  const newBorrowRate =
    interestRateMode === InterestRate.Variable
      ? poolReserve.variableBorrowAPY
      : poolReserve.stableBorrowAPY;

  if (!interestRateMode || !amount) {
    return (
      <ErrorPage
        description={intl.formatMessage(messages.errorPageDescription)}
        buttonType="back"
      />
    );
  }

  let userAvailableAmountToBorrow = valueToBigNumber(
    user.availableBorrowsMarketReferenceCurrency
  ).div(poolReserve.priceInMarketReferenceCurrency);

  if (
    userAvailableAmountToBorrow.gt(0) &&
    user?.totalBorrowsMarketReferenceCurrency !== '0' &&
    userAvailableAmountToBorrow.lt(
      valueToBigNumber(poolReserve.availableLiquidity).multipliedBy('1.01')
    )
  ) {
    userAvailableAmountToBorrow = userAvailableAmountToBorrow.multipliedBy('0.995');
  }

  if (interestRateMode === InterestRate.Stable && !poolReserve.stableBorrowRateEnabled) {
    blockingError = intl.formatMessage(messages.errorStableRateNotEnabled);
  }
  if (amount.gt(poolReserve.availableLiquidity)) {
    blockingError = intl.formatMessage(messages.errorNotEnoughLiquidity, {
      currencySymbol,
    });
  }
  if (userAvailableAmountToBorrow.lt(amount)) {
    blockingError = intl.formatMessage(messages.errorNotEnoughCollateral);
  }
  if (!poolReserve.borrowingEnabled) {
    blockingError = intl.formatMessage(messages.errorBorrowingNotAvailable);
  }

  const amountToBorrowInUsd = amount
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd);

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits(
    user.totalCollateralUSD,
    valueToBigNumber(user.totalBorrowsUSD).plus(amountToBorrowInUsd),
    user.currentLiquidationThreshold
  );

  const handleGetTransactions = async () => {
    const referralCode = getReferralCode() || undefined;
    return await lendingPool.borrow({
      interestRateMode,
      referralCode,
      user: user.id,
      amount: amount.toString(),
      reserve: poolReserve.underlyingAsset,
      debtTokenAddress:
        interestRateMode === InterestRate.Variable
          ? poolReserve.variableDebtTokenAddress
          : poolReserve.stableDebtTokenAddress,
    });
  };

  const handleMainTxExecuted = () => setIsTxExecuted(true);

  return (
    <BorrowCurrencyWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      user={user}
      userReserve={userReserve}
    >
      <PoolTxConfirmationView
        mainTxName={intl.formatMessage(defaultMessages.borrow)}
        caption={intl.formatMessage(messages.caption)}
        boxTitle={intl.formatMessage(defaultMessages.borrow)}
        boxDescription={intl.formatMessage(messages.boxDescription)}
        approveDescription={intl.formatMessage(messages.approveDescription)}
        getTransactionsData={handleGetTransactions}
        onMainTxExecuted={handleMainTxExecuted}
        blockingError={blockingError}
        goToAfterSuccess="/dashboard/borrowings"
        className="BorrowConfirmation"
        aTokenData={aTokenData}
      >
        <Row title={intl.formatMessage(messages.valueRowTitle)} withMargin={true}>
          <Value
            symbol={currencySymbol}
            value={amount.toString()}
            tokenIcon={true}
            subValue={amountToBorrowInUsd.toString()}
            subSymbol="USD"
            tooltipId={currencySymbol}
          />
        </Row>

        {currentStableBorrowRate && (
          <Row
            title={intl.formatMessage(messages.currentBorrowRateTitle, {
              borrowRateMode: intl.formatMessage(messages.stable).toLowerCase(),
            })}
            withMargin={true}
          >
            <ValuePercent
              value={currentStableBorrowRate}
              color="dark"
              updateCondition={isTxExecuted}
            />
          </Row>
        )}

        <Row title={intl.formatMessage(messages.APYRowTitle)} withMargin={true}>
          <ValuePercent value={newBorrowRate} color="dark" updateCondition={isTxExecuted} />
        </Row>

        <Row title={intl.formatMessage(messages.rateTypeRowTitle)} withMargin={true}>
          <strong className="BorrowRateMode">
            {interestRateMode === InterestRate.Variable
              ? intl.formatMessage(messages.variable)
              : intl.formatMessage(messages.stable)}
          </strong>
        </Row>

        <HealthFactor
          value={newHealthFactor.toString()}
          title={intl.formatMessage(messages.healthFactorRowTitle)}
          updateCondition={isTxExecuted}
          withoutModal={true}
        />

        <style jsx={true} global={true}>{`
          .BorrowRateMode {
            color: ${currentTheme.textDarkBlue.hex};
          }
        `}</style>
      </PoolTxConfirmationView>
    </BorrowCurrencyWrapper>
  );
}

export default routeParamValidationHOC({
  withAmount: true,
})(BorrowConfirmation);
