import React, { useState } from 'react';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { valueToBigNumber, InterestRate } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../libs/tx-provider';
import SwapConfirmationWrapper from '../../../components/wrappers/SwapConfirmationWrapper';
import Row from '../../../components/basic/Row';
import NoDataPanel from '../../../components/NoDataPanel';
import PoolTxConfirmationView from '../../../components/PoolTxConfirmationView';
import ValuePercent from '../../../components/basic/ValuePercent';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../components/RouteParamsValidationWrapper';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';

import messages from './messages';

function SwapBorrowRateModeConfirmation({
  currencySymbol,
  userReserve,
  poolReserve,
  user,
  location,
}: ValidationWrapperComponentProps) {
  const { lendingPool } = useTxBuilderContext();
  const { WrappedBaseNetworkAssetAddress, networkConfig } = useStaticPoolDataContext();
  const [isTxExecuted, setIsTxExecuted] = useState(false);
  const { lg, md } = useThemeContext();
  const intl = useIntl();
  const query = queryString.parse(location.search);
  const currentRateMode = query.borrowRateMode as InterestRate;

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

  const rateModeAfterSwitch =
    InterestRate.Variable === currentRateMode ? InterestRate.Stable : InterestRate.Variable;

  const currentApy =
    currentRateMode === InterestRate.Stable
      ? poolReserve.stableBorrowAPY
      : poolReserve.variableBorrowAPY;
  const apyAfterSwitch =
    currentRateMode === InterestRate.Stable
      ? poolReserve.variableBorrowAPY
      : poolReserve.stableBorrowAPY;
  const currentBorrows = valueToBigNumber(
    currentRateMode === InterestRate.Stable
      ? userReserve.stableBorrows
      : userReserve.variableBorrows
  );

  const handleGetTransactions = async () =>
    await lendingPool.swapBorrowRateMode({
      user: user.id,
      reserve:
        poolReserve.symbol === networkConfig.baseAsset
          ? WrappedBaseNetworkAssetAddress
          : poolReserve.underlyingAsset,
      interestRateMode: currentRateMode,
    });

  let blockingError = '';
  if (currentBorrows.eq(0)) {
    blockingError = intl.formatMessage(messages.errorNotBorrowYetUsingThisCurrency);
  }
  if (
    currentRateMode === InterestRate.Variable &&
    userReserve.usageAsCollateralEnabledOnUser &&
    poolReserve.usageAsCollateralEnabled &&
    valueToBigNumber(userReserve.totalBorrows).lt(userReserve.underlyingBalance)
  ) {
    blockingError = intl.formatMessage(messages.errorYouCantBorrowStableNow);
  }

  if (InterestRate.Variable === currentRateMode && !poolReserve.stableBorrowRateEnabled) {
    blockingError = intl.formatMessage(messages.errorStableInterestTypeIsDisabled);
  }

  const handleMainTxExecuted = () => setIsTxExecuted(true);

  const tokenIconSize = lg && !md ? 20 : 25;

  return (
    <SwapConfirmationWrapper
      pageTitle={intl.formatMessage(messages.pageTitle, {
        currencySymbol: asset.formattedName,
      })}
    >
      <PoolTxConfirmationView
        mainTxName={intl.formatMessage(messages.txName)}
        caption={intl.formatMessage(messages.caption, { rateModeAfterSwitch })}
        boxTitle={intl.formatMessage(messages.boxTitle)}
        boxDescription={intl.formatMessage(messages.boxDescription, { rateModeAfterSwitch })}
        getTransactionsData={handleGetTransactions}
        onMainTxExecuted={handleMainTxExecuted}
        blockingError={blockingError}
        goToAfterSuccess="/dashboard/borrowings"
        buttonTitle={intl.formatMessage(messages.buttonTitle)}
      >
        <Row title={intl.formatMessage(messages.currency)} withMargin={true}>
          <TokenIcon
            tokenSymbol={currencySymbol}
            height={tokenIconSize}
            width={tokenIconSize}
            tokenFullName={asset.formattedName}
          />
        </Row>

        <Row
          title={intl.formatMessage(messages.currentBorrowRateTitle, {
            borrowRateMode: currentRateMode.toLowerCase(),
          })}
          withMargin={true}
        >
          <ValuePercent value={Number(currentApy)} updateCondition={isTxExecuted} color="dark" />
        </Row>

        <Row
          title={intl.formatMessage(messages.nextBorrowRateMode, {
            borrowRateMode: rateModeAfterSwitch.toLowerCase(),
          })}
        >
          <ValuePercent
            value={Number(apyAfterSwitch)}
            updateCondition={isTxExecuted}
            color="dark"
          />
        </Row>
      </PoolTxConfirmationView>
    </SwapConfirmationWrapper>
  );
}

export default routeParamValidationHOC({
  withUserReserve: true,
})(SwapBorrowRateModeConfirmation);
