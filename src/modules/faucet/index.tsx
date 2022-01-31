import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import FaucetMain from './screens/FaucetMain';
import FaucetConfirmation from './screens/FaucetConfirmation';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';

export default function Faucet() {
  return (
    <Routes>
      <Route path="/" key="FaucetMain" element={<FaucetMain />} />
      <Route
        path={`${CURRENCY_ROUTE_PARAMS}`}
        key="FaucetConfirmation"
        element={<FaucetConfirmation />}
      />
      <Route path="*" element={<Navigate to="/faucet" replace />} />
    </Routes>
  );
}
