import React, { useContext, PropsWithChildren } from 'react';
import {
  AaveGovernanceV2Interface,
  Network,
  TxBuilderConfig,
  TxBuilderV2,
} from '@aave/protocol-js';
import GovernanceDelegationToken from '@aave/protocol-js/dist/tx-builder/interfaces/v2/GovernanceDelegationToken';

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
import { ChainId, ChainIdToNetwork } from '@aave/contract-helpers';

export interface ProtocolContextDataType {
  governanceConfig: GovernanceConfig;
  governanceNetworkConfig: NetworkConfig;
  governanceService: AaveGovernanceV2Interface;
  powerDelegation: GovernanceDelegationToken;
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
  const network = ChainIdToNetwork[governanceConfig.chainId] as Network;

  const config: TxBuilderConfig = {
    governance: {
      [network]: {
        AAVE_GOVERNANCE_V2: governanceConfig.addresses.AAVE_GOVERNANCE_V2,
        AAVE_GOVERNANCE_V2_EXECUTOR_SHORT:
          governanceConfig.addresses.AAVE_GOVERNANCE_V2_EXECUTOR_SHORT,
        AAVE_GOVERNANCE_V2_EXECUTOR_LONG:
          governanceConfig.addresses.AAVE_GOVERNANCE_V2_EXECUTOR_LONG,
        AAVE_GOVERNANCE_V2_HELPER: governanceConfig.addresses.AAVE_GOVERNANCE_V2_HELPER,
      },
    },
  };

  const txBuilder = new TxBuilderV2(
    network,
    getProvider(governanceConfig.chainId),
    undefined,
    config
  );
  const governanceService = txBuilder.aaveGovernanceV2Service;
  const powerDelegation = txBuilder.governanceDelegationTokenService;

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
