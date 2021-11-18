import React from 'react';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';

import BasicForm from '../../../../components/forms/BasicForm';
import NoDataPanel from '../../../../components/NoDataPanel';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';

import { useTxBuilderContext } from '../../../../libs/tx-provider';
import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';
import { PERMISSION } from '@aave/contract-helpers';

function WithdrawAmount({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  history,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();
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

  let maxUserAmountToWithdraw = BigNumber.min(
    userReserve.underlyingBalance,
    poolReserve.availableLiquidity
  ).toString(10);

  if (
    userReserve.usageAsCollateralEnabledOnUser &&
    poolReserve.usageAsCollateralEnabled &&
    user.totalBorrowsMarketReferenceCurrency !== '0'
  ) {
    // if we have any borrowings we should check how much we can withdraw without liquidation
    // with 0.5% gap to avoid reverting of tx
    let totalCollateralToWithdrawInETH = valueToBigNumber('0');
    const excessHF = valueToBigNumber(user.healthFactor).minus('1');
    if (excessHF.gt('0')) {
      totalCollateralToWithdrawInETH = excessHF
        .multipliedBy(user.totalBorrowsMarketReferenceCurrency)
        // because of the rounding issue on the contracts side this value still can be incorrect
        .div(Number(poolReserve.reserveLiquidationThreshold) + 0.01)
        .multipliedBy('0.99');
    }
    maxUserAmountToWithdraw = BigNumber.min(
      maxUserAmountToWithdraw,
      totalCollateralToWithdrawInETH.dividedBy(poolReserve.priceInMarketReferenceCurrency)
    ).toString();
  }
  maxUserAmountToWithdraw = BigNumber.max(maxUserAmountToWithdraw, 0).toString();

  const handleWithdrawSubmit = (amount: string, max?: boolean) => {
    const query = queryString.stringify({
      amount: max ? '-1' : amount,
    });
    history.push(`${history.location.pathname}/confirmation?${query}`);
  };

  const handleTransactionData = (userId: string) => async () => {
    return await lendingPool.withdraw({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: '-1',
      aTokenAddress: poolReserve.aTokenAddress,
    });
  };

  return (
    <PermissionWarning requiredPermission={PERMISSION.DEPOSITOR}>
      <BasicForm
        title={intl.formatMessage(defaultMessages.withdraw)}
        description={intl.formatMessage(messages.formDescription)}
        maxAmount={maxUserAmountToWithdraw}
        currencySymbol={currencySymbol}
        onSubmit={handleWithdrawSubmit}
        amountFieldTitle={intl.formatMessage(messages.amountTitle)}
        absoluteMaximum={true}
        maxDecimals={poolReserve.decimals}
        getTransactionData={handleTransactionData}
      />
    </PermissionWarning>
  );
}

export default routeParamValidationHOC({
  withUserReserve: true,
})(WithdrawAmount);
