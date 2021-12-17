import React from 'react';
import { useIntl } from 'react-intl';
import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { getReferralCode } from '../../../../libs/referral-handler';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import NoDataPanel from '../../../../components/NoDataPanel';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import HealthFactor from '../../../../components/HealthFactor';
import DepositCurrencyWrapper from '../../components/DepositCurrencyWrapper';
import { getAssetInfo } from '../../../../helpers/config/assets-config';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

function DepositConfirmation({
  currencySymbol,
  poolReserve,
  amount,
  user,
  userReserve,
  walletBalance,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const aTokenData = getAtokenInfo({
    address: poolReserve.aTokenAddress,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
  });
  const assetDetails = getAssetInfo(poolReserve.symbol);

  if (!amount) {
    return null;
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

  let blockingError = '';
  if (walletBalance.lt(amount)) {
    blockingError = intl.formatMessage(messages.errorWalletBalanceNotEnough, {
      poolReserveSymbol: assetDetails.formattedSymbol || assetDetails.symbol,
    });
  }

  const amountIntEth = amount.multipliedBy(poolReserve.priceInMarketReferenceCurrency);
  const amountInUsd = amountIntEth.multipliedBy(marketRefPriceInUsd);
  const totalCollateralMarketReferenceCurrencyAfter = valueToBigNumber(
    user.totalCollateralMarketReferenceCurrency
  ).plus(amountIntEth);

  const liquidationThresholdAfter = valueToBigNumber(user.totalCollateralMarketReferenceCurrency)
    .multipliedBy(user.currentLiquidationThreshold)
    .plus(amountIntEth.multipliedBy(poolReserve.reserveLiquidationThreshold))
    .dividedBy(totalCollateralMarketReferenceCurrencyAfter);

  const healthFactorAfterDeposit = calculateHealthFactorFromBalancesBigUnits(
    totalCollateralMarketReferenceCurrencyAfter,
    valueToBigNumber(user.totalBorrowsMarketReferenceCurrency),
    liquidationThresholdAfter
  );

  const handleGetTransactions = async () => {
    return lendingPool.deposit({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amount.toString(),
      referralCode: getReferralCode(),
    });
  };

  const notShowHealthFactor =
    user.totalBorrowsMarketReferenceCurrency !== '0' && poolReserve.usageAsCollateralEnabled;

  const usageAsCollateralEnabledOnDeposit =
    poolReserve.usageAsCollateralEnabled &&
    (!userReserve?.underlyingBalance ||
      userReserve.underlyingBalance === '0' ||
      userReserve.usageAsCollateralEnabledOnUser);

  return (
    <DepositCurrencyWrapper
      currencySymbol={currencySymbol}
      walletBalance={walletBalance}
      poolReserve={poolReserve}
      user={user}
      userReserve={userReserve}
    >
      <PoolTxConfirmationView
        mainTxName={intl.formatMessage(defaultMessages.deposit)}
        caption={intl.formatMessage(messages.caption)}
        boxTitle={intl.formatMessage(defaultMessages.deposit)}
        boxDescription={intl.formatMessage(messages.boxDescription)}
        approveDescription={intl.formatMessage(messages.approveDescription)}
        getTransactionsData={handleGetTransactions}
        blockingError={blockingError}
        aTokenData={aTokenData}
      >
        <Row title={intl.formatMessage(messages.valueRowTitle)} withMargin={notShowHealthFactor}>
          <Value
            symbol={currencySymbol}
            value={amount.toString()}
            tokenIcon={true}
            subValue={amountInUsd.toString()}
            subSymbol="USD"
            tooltipId={currencySymbol}
          />
        </Row>

        <Row title={intl.formatMessage(messages.collateral)} withMargin={notShowHealthFactor}>
          <strong
            style={{
              color: usageAsCollateralEnabledOnDeposit
                ? currentTheme.green.hex
                : currentTheme.red.hex,
            }}
            className="Collateral__text"
          >
            {usageAsCollateralEnabledOnDeposit
              ? intl.formatMessage(messages.yes)
              : intl.formatMessage(messages.no)}
          </strong>
        </Row>

        {notShowHealthFactor && (
          <HealthFactor
            title={intl.formatMessage(messages.newHealthFactor)}
            withoutModal={true}
            value={healthFactorAfterDeposit.toString()}
          />
        )}
      </PoolTxConfirmationView>
    </DepositCurrencyWrapper>
  );
}

export default routeParamValidationHOC({
  withAmount: true,
  withWalletBalance: true,
})(DepositConfirmation);
