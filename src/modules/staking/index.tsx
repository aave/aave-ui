import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { StakeDataProvider } from '../../libs/pool-data-provider/hooks/use-stake-data-context';

import StakingWrapper from './components/StakingWrapper';
import StakingMain from './screens/StakingMain';

import StakingClaimConfirmation from './screens/StakingClaimConfirmation';
import ActivateCooldownConfirmation from './screens/ActivateCooldownConfirmation';
import StakeWithApprovalConfirmation from './screens/StakeWithApprovalConfirmation';

import UnstakeAmount from './screens/UnstakeAmount';
import UnstakeConfirmation from './screens/UnstakeConfirmation';

import StakeAmount from './screens/StakeAmount';
import StakeDisclaimer from './screens/StakeDisclaimer';
import { stakeConfig } from '../../ui-config';
import ErrorPage from '../../components/ErrorPage';

export const faqLink = 'https://docs.aave.com/faq/migration-and-staking';

export default function Staking() {
  if (!stakeConfig) {
    return <ErrorPage title="Stake was not configured" />;
  }
  return (
    <StakeDataProvider stakeConfig={stakeConfig}>
      <StakingWrapper>
        <Routes>
          <Route path="/" element={<StakingMain />} />
          <Route path=":currencySymbol" element={<StakeAmount />} />
          <Route path=":currencySymbol/disclaimer" element={<StakeDisclaimer />} />
          <Route path=":currencySymbol/confirmation" element={<StakeWithApprovalConfirmation />} />
          <Route path=":currencySymbol/claim/confirmation" element={<StakingClaimConfirmation />} />
          <Route
            path=":currencySymbol/activate-cooldown/confirmation"
            element={<ActivateCooldownConfirmation />}
          />

          <Route path=":currencySymbol/unstake" element={<UnstakeAmount />} />
          <Route path=":currencySymbol/unstake/confirmation" element={<UnstakeConfirmation />} />
        </Routes>
      </StakingWrapper>
    </StakeDataProvider>
  );
}
