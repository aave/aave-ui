import React, { useState } from 'react';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../libs/pool-data-provider';
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

function SwapUsageAsCollateralModeConfirmation({
  currencySymbol,
  poolReserve,
  user,
  userReserve,
  location,
}: ValidationWrapperComponentProps) {
  const { lendingPool } = useTxBuilderContext();
  const { WrappedBaseNetworkAssetAddress, networkConfig } = useStaticPoolDataContext();
  const [isTxExecuted, setIsTxExecuted] = useState(false);
  const { lg, md } = useThemeContext();
  const intl = useIntl();
  const query = queryString.parse(location.search);

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
      user: user.id,
      reserve:
        poolReserve.symbol === networkConfig.baseAsset
          ? WrappedBaseNetworkAssetAddress
          : poolReserve.underlyingAsset,
      usageAsCollateral: query.asCollateral === 'true',
    });
  const usageAsCollateralModeAfterSwitch = !userReserve.usageAsCollateralEnabledOnUser;
  const currenttotalCollateralMarketReferenceCurrency = valueToBigNumber(
    user.totalCollateralMarketReferenceCurrency
  );

  const totalCollateralAfterSwitchETH = currenttotalCollateralMarketReferenceCurrency[
    usageAsCollateralModeAfterSwitch ? 'plus' : 'minus'
  ](userReserve.underlyingBalanceMarketReferenceCurrency);

  const healthFactorAfterSwitch = calculateHealthFactorFromBalancesBigUnits(
    totalCollateralAfterSwitchETH,
    user.totalBorrowsMarketReferenceCurrency,
    user.currentLiquidationThreshold
  );

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
      ? intl.formatMessage(messages.firstCaption, {
          currencySymbol: asset.formattedName,
        })
      : intl.formatMessage(messages.secondCaption, {
          currencySymbol: asset.formattedName,
        });

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
