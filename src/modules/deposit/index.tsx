import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DepositCurrency from './screens/DepositCurrency';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';

export default function Deposit() {
  return (
    <Routes>
      <Route path={`${CURRENCY_ROUTE_PARAMS}/*`} element={<DepositCurrency />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
