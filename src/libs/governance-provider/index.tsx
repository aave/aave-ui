import React, { useContext, PropsWithChildren } from 'react';
import { AaveGovernanceV2Interface, TxBuilderConfig, TxBuilderV2 } from '@aave/protocol-js';
import GovernanceDelegationToken from '@aave/protocol-js/dist/tx-builder/interfaces/v2/GovernanceDelegationToken';

import useGetProposals from './hooks/use-get-proposals';
import useGetProposalsRPC from './hooks/use-get-proposals-rpc';
import { GovernanceConfig } from '../../ui-config';
import { getNetworkConfig, getProvider, NetworkConfig } from '../../helpers/markets/markets-data';

import { ProposalItem } from './types';
import Preloader from '../../components/basic/Preloader';

export interface ProtocolContextDataType {
  governanceConfig: GovernanceConfig;
  governanceNetworkConfig: NetworkConfig;
  governanceService: AaveGovernanceV2Interface;
  powerDelegation: GovernanceDelegationToken;
  proposals: ProposalItem[];
}

const GovernanceProviderContext = React.createContext({} as ProtocolContextDataType);

const RPC_ONLY_MODE = false;

export function GovernanceDataProvider({
  children,
  governanceConfig,
}: PropsWithChildren<{ governanceConfig: GovernanceConfig }>) {
  const governanceNetworkConfig = getNetworkConfig(governanceConfig.network);
  const config: TxBuilderConfig = {
    governance: {
      [governanceConfig.network]: {
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
    governanceConfig.network,
    getProvider(governanceConfig.network),
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
    skip: RPC_ONLY_MODE,
    network: governanceConfig.network,
    averageNetworkBlockTime: governanceConfig.averageNetworkBlockTime,
  });

  const skipRPC = !(RPC_ONLY_MODE || !!error);

  const { proposals: propRPC, loading: loadingRPC } = useGetProposalsRPC({
    skip: skipRPC,
    network: governanceConfig.network,
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
