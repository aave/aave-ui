import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useIntl } from 'react-intl';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../components/RouteParamsValidationWrapper';
import ScreenWrapper from '../../components/wrappers/ScreenWrapper';
import WithdrawScreenWrapper from './components/WithdrawScreenWrapper';
import NoDataPanel from '../../components/NoDataPanel';

import WithdrawAmount from './screens/WithdrawAmount';
import WithdrawConfirmation from './screens/WithdrawConfirmation';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';
import { getAssetInfo } from '../../helpers/config/assets-config';

import messages from './messages';

function Withdraw({ currencySymbol, userReserve, user }: ValidationWrapperComponentProps) {
  const intl = useIntl();
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

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle, {
        currencySymbol: asset.formattedName,
      })}
    >
      <WithdrawScreenWrapper
        title={intl.formatMessage(messages.pageTitle, {
          currencySymbol: asset.formattedName,
        })}
        balanceInProtocol={userReserve.underlyingBalance}
        balanceInProtocolInUSD={userReserve.underlyingBalanceUSD}
        currencySymbol={currencySymbol}
        healthFactor={user.healthFactor}
        loanToValue={user.currentLoanToValue}
      >
        <Switch>
          <Route
            exact={true}
            path={`/withdraw/${CURRENCY_ROUTE_PARAMS}`}
            component={WithdrawAmount}
          />
          <Route
            path={`/withdraw/${CURRENCY_ROUTE_PARAMS}/confirmation`}
            component={WithdrawConfirmation}
          />
        </Switch>
      </WithdrawScreenWrapper>
    </ScreenWrapper>
  );
}

export default routeParamValidationHOC({
  withUserReserve: true,
})(Withdraw);
