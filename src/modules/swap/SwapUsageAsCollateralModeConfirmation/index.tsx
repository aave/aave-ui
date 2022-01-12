import React, { useState } from 'react';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useTxBuilderContext } from '../../../libs/tx-provider';
import SwapConfirmationWrapper from '../../../components/wrappers/SwapConfirmationWrapper';
import PoolTxConfirmationView from '../../../components/PoolTxConfirmationView';
import Row from '../../../components/basic/Row';
import NoDataPanel from '../../../components/NoDataPanel';
import HealthFactor from '../../../components/HealthFactor';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../components/RouteParamsValidationWrapper';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';

import messages from './messages';
import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/math-utils';
import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useLocation } from 'react-router';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';

function SwapUsageAsCollateralModeConfirmation({
  currencySymbol: _currencySymbol,
  poolReserve,
  user,
  userReserve,
}: ValidationWrapperComponentProps) {
  const { lendingPool } = useTxBuilderContext();
  const { networkConfig } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const [isTxExecuted, setIsTxExecuted] = useState(false);
  const { lg, md } = useThemeContext();
  const intl = useIntl();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const currencySymbol =
    _currencySymbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
      ? networkConfig.baseAssetSymbol
      : _currencySymbol;

  const asset = getAssetInfo(currencySymbol);

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  if (!userReserve) {
    return null;
  }

  const handleGetTransactions = async () =>
    await lendingPool.setUsageAsCollateral({
      user: currentAccount,
      reserve: poolReserve.underlyingAsset,
      usageAsCollateral: query.asCollateral === 'true',
    });
  const usageAsCollateralModeAfterSwitch = !userReserve.usageAsCollateralEnabledOnUser;
  const currenttotalCollateralMarketReferenceCurrency = valueToBigNumber(
    user.totalCollateralMarketReferenceCurrency
  );

  const totalCollateralAfterSwitchETH = currenttotalCollateralMarketReferenceCurrency[
    usageAsCollateralModeAfterSwitch ? 'plus' : 'minus'
  ](userReserve.underlyingBalanceMarketReferenceCurrency);

  const healthFactorAfterSwitch = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency: totalCollateralAfterSwitchETH,
    borrowBalanceMarketReferenceCurrency: user.totalBorrowsMarketReferenceCurrency,
    currentLiquidationThreshold: user.currentLiquidationThreshold,
  });

  let blockingError = '';
  if (valueToBigNumber(userReserve.underlyingBalance).eq(0)) {
    blockingError = intl.formatMessage(messages.errorDoNotHaveDepositsInThisCurrency);
  }
  if (
    (!userReserve.usageAsCollateralEnabledOnUser && !poolReserve.usageAsCollateralEnabled) ||
    !poolReserve.usageAsCollateralEnabled
  ) {
    blockingError = intl.formatMessage(messages.errorCanNotUseThisCurrencyAsCollateral);
  }

  if (
    userReserve.usageAsCollateralEnabledOnUser &&
    user.totalBorrowsMarketReferenceCurrency !== '0' &&
    healthFactorAfterSwitch.lte('1')
  ) {
    blockingError = intl.formatMessage(messages.errorCanNotSwitchUsageAsCollateralMode);
  }
  const pageTitle =
    query.asCollateral === 'true' ? messages.pageTitleFirst : messages.pageTitleSecond;
  const caption =
    query.asCollateral === 'true'
      ? intl.formatMessage(
          poolReserve.isIsolated ? messages.firstCaptionIsolated : messages.firstCaption,
          {
            currencySymbol: asset.formattedName,
          }
        )
      : intl.formatMessage(
          poolReserve.isIsolated ? messages.secondCaptionIsolated : messages.secondCaption,
          {
            currencySymbol: asset.formattedName,
          }
        );

  const handleMainTxExecuted = () => setIsTxExecuted(true);

  const tokenIconSize = lg && !md ? 20 : 25;

  return (
    <SwapConfirmationWrapper
      pageTitle={intl.formatMessage(pageTitle, {
        currencySymbol: asset.formattedName,
      })}
    >
      <PoolTxConfirmationView
        mainTxName={intl.formatMessage(messages.txName)}
        caption={caption}
        boxTitle={intl.formatMessage(messages.boxTitle)}
        boxDescription={intl.formatMessage(
          query.asCollateral === 'true'
            ? messages.boxDescriptionUse
            : messages.boxDescriptionNotUse,
          { currencySymbol: asset.formattedName }
        )}
        getTransactionsData={handleGetTransactions}
        onMainTxExecuted={handleMainTxExecuted}
        blockingError={blockingError}
        buttonTitle={intl.formatMessage(messages.buttonTitle)}
        isolationWarning={poolReserve.isIsolated && query.asCollateral === 'true'}
      >
        <Row
          title={intl.formatMessage(messages.rowTitle)}
          withMargin={Number(user.healthFactor) > 0}
        >
          <TokenIcon
            tokenSymbol={currencySymbol}
            height={tokenIconSize}
            width={tokenIconSize}
            tokenFullName={asset.formattedName}
          />
        </Row>

        {Number(user.healthFactor) > 0 && (
          <HealthFactor
            title={intl.formatMessage(messages.currentHealthFactor)}
            value={user.healthFactor}
            updateCondition={isTxExecuted}
          />
        )}

        {Number(healthFactorAfterSwitch) > 0 && (
          <HealthFactor
            title={intl.formatMessage(messages.nextHealthFactor)}
            value={healthFactorAfterSwitch.toString()}
            updateCondition={isTxExecuted}
            withoutModal={true}
          />
        )}
      </PoolTxConfirmationView>
    </SwapConfirmationWrapper>
  );
}

export default routeParamValidationHOC({
  withUserReserve: true,
})(SwapUsageAsCollateralModeConfirmation);
