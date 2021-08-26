import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import BorrowAmount from '../BorrowAmount';
import BorrowConfirmation from '../BorrowConfirmation';

import { CURRENCY_ROUTE_PARAMS } from '../../../../helpers/router-types';

export default function BorrowCurrency() {
  return (
    <Switch>
      <Route exact={true} component={BorrowAmount} path={`/borrow/${CURRENCY_ROUTE_PARAMS}`} />

      <Route
        exact={true}
        path={`/borrow/${CURRENCY_ROUTE_PARAMS}/confirmation`}
        component={BorrowConfirmation}
      />

      <Redirect to="/borrow" />
    </Switch>
  );
}
