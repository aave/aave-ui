import React, { useContext, PropsWithChildren } from 'react';

import useGetProposals from './hooks/use-get-proposals';
import useGetProposalsRPC from './hooks/use-get-proposals-rpc';
import { GovernanceConfig } from '../../ui-config';
import { NetworkConfig } from '../../helpers/config/types';
import { getNetworkConfig, getProvider } from '../../helpers/config/markets-and-network-config';

import { ProposalItem } from './types';
import Preloader from '../../components/basic/Preloader';
import {
  ConnectionMode,
  useConnectionStatusContext,
  WS_ATTEMPTS_LIMIT,
} from '../connection-status-provider';
import { useMainnetCachedServerWsGraphCheck } from '../pool-data-provider/hooks/use-graph-check';
import {
  ChainId,
  AaveGovernanceService,
  GovernancePowerDelegationTokenService,
} from '@aave/contract-helpers';

export interface ProtocolContextDataType {
  governanceConfig: GovernanceConfig;
  governanceNetworkConfig: NetworkConfig;
  governanceService: AaveGovernanceService;
  powerDelegation: GovernancePowerDelegationTokenService;
  proposals: ProposalItem[];
}

const GovernanceProviderContext = React.createContext({} as ProtocolContextDataType);

export function GovernanceDataProvider({
  children,
  governanceConfig,
}: PropsWithChildren<{ governanceConfig: GovernanceConfig }>) {
  const governanceNetworkConfig = getNetworkConfig(governanceConfig.chainId);
  const RPC_ONLY_MODE = governanceNetworkConfig.rpcOnly;
  const { preferredConnectionMode } = useConnectionStatusContext();
  const wsMainnetError = useMainnetCachedServerWsGraphCheck();
  const isRPCMandatory =
    RPC_ONLY_MODE ||
    (wsMainnetError.wsErrorCount >= WS_ATTEMPTS_LIMIT &&
      governanceConfig.chainId === ChainId.mainnet);
  const isRPCActive = preferredConnectionMode === ConnectionMode.rpc || isRPCMandatory;

  const governanceService = new AaveGovernanceService(getProvider(governanceConfig.chainId), {
    GOVERNANCE_ADDRESS: governanceConfig.addresses.AAVE_GOVERNANCE_V2,
    GOVERNANCE_HELPER_ADDRESS: governanceConfig.addresses.AAVE_GOVERNANCE_V2_HELPER,
  });
  const powerDelegation = new GovernancePowerDelegationTokenService(
    getProvider(governanceConfig.chainId)
  );

  const {
    proposals: propGraph,
    loading: loadingGraph,
    error,
  } = useGetProposals({
    skip: isRPCActive,
    chainId: governanceConfig.chainId,
    averageNetworkBlockTime: governanceConfig.averageNetworkBlockTime,
  });

  const skipRPC = !(isRPCActive || !!error);

  const { proposals: propRPC, loading: loadingRPC } = useGetProposalsRPC({
    skip: skipRPC,
    chainId: governanceConfig.chainId,
    governanceService,
    averageNetworkBlockTime: governanceConfig.averageNetworkBlockTime,
  });

  const loading = skipRPC ? loadingGraph : loadingRPC;

  if (loading) {
    return <Preloader withText={true} />;
  }

  const proposals = skipRPC ? propGraph : propRPC;
  proposals.forEach((proposal) => {
    if (proposal.id === 25) {
      proposal.title = 'Dynamic Risk Parameters';
    }
  });

  return (
    <GovernanceProviderContext.Provider
      value={{
        proposals,
        governanceService,
        powerDelegation,
        governanceConfig,
        governanceNetworkConfig,
      }}
    >
      {children}
    </GovernanceProviderContext.Provider>
  );
}

export const useGovernanceDataContext = () => useContext(GovernanceProviderContext);
