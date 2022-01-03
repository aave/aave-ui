import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { PERMISSION } from '@aave/contract-helpers';

import DepositAmount from '../DepositAmount';
import DepositConfirmation from '../DepositConfirmation';

import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';

export default function DepositCurrency() {
  return (
    <PermissionWarning requiredPermission={PERMISSION.DEPOSITOR}>
      <Routes>
        <Route path={`/`} element={<DepositAmount />} />
        <Route path={`confirmation`} element={<DepositConfirmation />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </PermissionWarning>
  );
}
