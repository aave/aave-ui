import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { PERMISSION } from '@aave/contract-helpers';

import BorrowAmount from '../BorrowAmount';
import BorrowConfirmation from '../BorrowConfirmation';

import { CURRENCY_ROUTE_PARAMS } from '../../../../helpers/router-types';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';

export default function BorrowCurrency() {
  return (
    <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
      <Routes>
        <Route path={`/borrow/${CURRENCY_ROUTE_PARAMS}`} element={<BorrowAmount />} />
        <Route
          path={`/borrow/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          element={<BorrowConfirmation />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </PermissionWarning>
  );
}
