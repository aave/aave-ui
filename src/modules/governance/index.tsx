import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
        <Switch>
          <Route exact={true} path="/governance" component={Proposals} />
          <Route path="/governance/:proposalId-:proposalHash" component={Proposal} />
          <Route exact={true} path="/governance/delegation" component={Delegation} />
          <Route
            exact={true}
            path="/governance/delegation/confirmation"
            component={DelegationConfirmation}
          />
        </Switch>
      </AaveTokensBalanceProvider>
    </GovernanceDataProvider>
  );
}
