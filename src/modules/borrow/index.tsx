import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BorrowMain from './screens/BorrowMain';
import BorrowCurrency from './screens/BorrowCurrency';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';
import { PERMISSION, RequiredPermissionsWrapper } from '../../libs/use-permissions/usePermissions';

export default function Borrow() {
  return (
    <RequiredPermissionsWrapper requiredPermission={PERMISSION.BORROWER}>
      <Switch>
        <Route exact={true} path="/borrow" component={BorrowMain} />
        <Route path={`/borrow/${CURRENCY_ROUTE_PARAMS}`} component={BorrowCurrency} />

        <Redirect to="/borrow" />
      </Switch>
    </RequiredPermissionsWrapper>
  );
}
