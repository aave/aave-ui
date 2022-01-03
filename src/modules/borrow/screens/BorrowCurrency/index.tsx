import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { PERMISSION } from '@aave/contract-helpers';

import BorrowAmount from '../BorrowAmount';
import BorrowConfirmation from '../BorrowConfirmation';

import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';

export default function BorrowCurrency() {
  return (
    <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
      <Routes>
        <Route path="/" element={<BorrowAmount />} />
        <Route path={`confirmation`} element={<BorrowConfirmation />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </PermissionWarning>
  );
}
