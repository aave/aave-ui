import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import BorrowCurrency from './screens/BorrowCurrency';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';

export default function Borrow() {
  return (
    <Routes>
      <Route path={`${CURRENCY_ROUTE_PARAMS}/*`} element={<BorrowCurrency />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
