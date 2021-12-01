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
import { useProtocolDataContext } from '../protocol-data-provider';
import { IPFS_ENDPOINT } from './helper';

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
  const { chainId, networkConfig } = useProtocolDataContext();
  const governanceNetworkConfig = getNetworkConfig(governanceConfig.chainId);
  const { preferredConnectionMode } = useConnectionStatusContext();
  const wsMainnetError = useMainnetCachedServerWsGraphCheck();
  const isRPCMandatory =
    governanceNetworkConfig.rpcOnly ||
    (wsMainnetError.wsErrorCount >= WS_ATTEMPTS_LIMIT &&
      governanceConfig.chainId === ChainId.mainnet);
  const isGovernanceFork =
    networkConfig.isFork && networkConfig.underlyingChainId === governanceConfig.chainId;
  const isRPCActive =
    preferredConnectionMode === ConnectionMode.rpc || isRPCMandatory || isGovernanceFork;

  const rpcProvider = isGovernanceFork
    ? getProvider(chainId)
    : getProvider(governanceConfig.chainId);

  const governanceService = new AaveGovernanceService(rpcProvider, {
    GOVERNANCE_ADDRESS: governanceConfig.addresses.AAVE_GOVERNANCE_V2,
    GOVERNANCE_HELPER_ADDRESS: governanceConfig.addresses.AAVE_GOVERNANCE_V2_HELPER,
    ipfsGateway: IPFS_ENDPOINT,
  });
  const powerDelegation = new GovernancePowerDelegationTokenService(rpcProvider);

  const {
    proposals: propGraph,
    loading: loadingGraph,
    error,
  } = useGetProposals({
    skip: !!isRPCActive,
    chainId: isGovernanceFork ? chainId : governanceConfig.chainId,
    averageNetworkBlockTime: governanceConfig.averageNetworkBlockTime,
  });

  const skipRPC = !(isRPCActive || !!error);

  const { proposals: propRPC, loading: loadingRPC } = useGetProposalsRPC({
    skip: skipRPC,
    chainId: isGovernanceFork ? chainId : governanceConfig.chainId,
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
    if (proposal.id === 48) {
      proposal.aip = 48;
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
