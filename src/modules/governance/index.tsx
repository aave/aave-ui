import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { GovernanceDataProvider } from '../../libs/governance-provider';

import Proposals from './screens/Proposals';
import Proposal from './screens/Proposal';
import Delegation from './screens/Delegation';
import DelegationConfirmation from './screens/DelegationConfirmation';
import { AaveTokensBalanceProvider } from '../../libs/aave-tokens-balance-provider/AaveTokensBalanceProvider';
import { governanceConfig } from '../../ui-config';
import ErrorPage from '../../components/ErrorPage';

export default function Governance() {
  if (!governanceConfig) {
    return <ErrorPage title="Governance not configured" />;
  }
  return (
    <GovernanceDataProvider governanceConfig={governanceConfig}>
      <AaveTokensBalanceProvider>
        <Routes>
          <Route path="/" element={<Proposals />} />
          <Route path=":proposalId/:proposalHash/*" element={<Proposal />} />
          <Route path="delegation" element={<Delegation />} />
          <Route path="delegation/confirmation" element={<DelegationConfirmation />} />
        </Routes>
      </AaveTokensBalanceProvider>
    </GovernanceDataProvider>
  );
}
