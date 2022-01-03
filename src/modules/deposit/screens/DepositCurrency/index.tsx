import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { PERMISSION } from '@aave/contract-helpers';

import DepositAmount from '../DepositAmount';
import DepositConfirmation from '../DepositConfirmation';

import { CURRENCY_ROUTE_PARAMS } from '../../../../helpers/router-types';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';

export default function DepositCurrency() {
  return (
    <PermissionWarning requiredPermission={PERMISSION.DEPOSITOR}>
      <Routes>
        <Route path={`/deposit/${CURRENCY_ROUTE_PARAMS}`} element={<DepositAmount />} />
        <Route
          path={`/deposit/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          element={<DepositConfirmation />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </PermissionWarning>
  );
}
