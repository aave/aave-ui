import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';
import { Pool } from '@aave/contract-helpers';
import { USD_DECIMALS } from '@aave/math-utils';

import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
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
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import IsolationModeBadge from '../../../../components/isolationMode/IsolationModeBadge';
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
  const { currentMarketData } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();

  const [depositWithPermitEnabled, setDepositWithPermitEnable] = useState(currentMarketData.v3);

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
  const amountInUsd = amountIntEth.multipliedBy(marketRefPriceInUsd).shiftedBy(-USD_DECIMALS);
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

  // Get approve and supply transactions without using permit flow
  const handleGetTransactions = async () => {
    if (currentMarketData.v3) {
      // TO-DO: No need for this cast once a single Pool type is used in use-tx-builder-context
      const newPool: Pool = lendingPool as Pool;
      return await newPool.supply({
        user: user.id,
        reserve: poolReserve.underlyingAsset,
        amount: amount.toString(),
      });
    } else {
      return await lendingPool.deposit({
        user: user.id,
        reserve: poolReserve.underlyingAsset,
        amount: amount.toString(),
      });
    }
  };

  // Generate signature request payload
  const handleGetPermitSignatureRequest = async () => {
    // TO-DO: No need for this cast once a single Pool type is ued in use-tx-builder-context
    const newPool: Pool = lendingPool as Pool;
    return await newPool.signERC20Approval({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amount.toString(),
    });
  };

  // Generate supply transaction with signed permit
  const handleGetPermitSupply = async (signature: string) => {
    // TO-DO: No need for this cast once a single Pool type is ued in use-tx-builder-context
    const newPool: Pool = lendingPool as Pool;
    return await newPool.supplyWithPermit({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amount.toString(),
      signature,
    });
  };

  const notShowHealthFactor =
    user.totalBorrowsMarketReferenceCurrency !== '0' && poolReserve.usageAsCollateralEnabled;

  // if the reserve is isolated the deposit will only be collateral enabled when there's no other deposit with collateral enabled
  const isIsolated = poolReserve.isIsolated;
  const hasDifferentCollateral = user.userReservesData.find(
    (reserve) => reserve.usageAsCollateralEnabledOnUser && reserve.reserve.id !== poolReserve.id
  );

  // TODO: show dialog or sth, that isolation mode is entered

  const usageAsCollateralEnabledOnDeposit =
    poolReserve.usageAsCollateralEnabled &&
    (!userReserve?.underlyingBalance ||
      userReserve.underlyingBalance === '0' ||
      userReserve.usageAsCollateralEnabledOnUser) &&
    (!isIsolated || (isIsolated && !hasDifferentCollateral));

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
        approveDescription={
          depositWithPermitEnabled
            ? intl.formatMessage(messages.permitDescription)
            : intl.formatMessage(messages.approveDescription)
        }
        getTransactionsData={handleGetTransactions}
        getPermitSignatureRequest={handleGetPermitSignatureRequest}
        getPermitEnabledTransactionData={handleGetPermitSupply}
        permitEnabled={depositWithPermitEnabled}
        togglePermit={setDepositWithPermitEnable}
        blockingError={blockingError}
        aTokenData={aTokenData}
      >
        <Row title={intl.formatMessage(messages.valueRowTitle)} withMargin={true}>
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
          {!user.isInIsolationMode ? (
            <>
              {!poolReserve.isIsolated ? (
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
              ) : (
                <IsolationModeBadge isIsolated={poolReserve.isIsolated} />
              )}
            </>
          ) : (
            <IsolationModeBadge isIsolated={poolReserve.isIsolated} />
          )}
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
