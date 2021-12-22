import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DepositCurrency from './screens/DepositCurrency';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';

export default function Deposit() {
  return (
    <Switch>
      <Route path={`/deposit/${CURRENCY_ROUTE_PARAMS}`} component={DepositCurrency} />

      <Redirect to="/dashboard" />
    </Switch>
  );
}
