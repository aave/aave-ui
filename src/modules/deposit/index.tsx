import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DepositMain from './screens/DepositMain';
import DepositCurrency from './screens/DepositCurrency';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';
import { RequiredPermissionsWrapper, PERMISSION } from '../../libs/use-permissions/usePermissions';

export default function Deposit() {
  return (
    <RequiredPermissionsWrapper requiredPermission={PERMISSION.DEPOSITOR}>
      <Switch>
        <Route exact={true} path="/deposit" component={DepositMain} />
        <Route path={`/deposit/${CURRENCY_ROUTE_PARAMS}`} component={DepositCurrency} />

        <Redirect to="/deposit" />
      </Switch>
    </RequiredPermissionsWrapper>
  );
}
