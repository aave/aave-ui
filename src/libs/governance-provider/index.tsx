import React, { useContext, PropsWithChildren } from 'react';

import useGetProposals from './hooks/use-get-proposals';
import useGetProposalsRPC from './hooks/use-get-proposals-rpc';
import { GovernanceConfig } from '../../ui-config';
import { MarketDataType, NetworkConfig } from '../../helpers/config/types';
import {
  CustomMarket,
  getNetworkConfig,
  getProvider,
  marketsData,
} from '../../helpers/config/markets-and-network-config';

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
  governanceMarketConfig: MarketDataType;
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
  //const governanceMarketConfig: MarketDataType = marketsData[CustomMarket.proto_mainnet]; since mainnet is currently disabled
  const governanceMarketConfig: MarketDataType = {
    chainId: ChainId.mainnet,
    logo: '',
    activeLogo: '',
    aTokenPrefix: 'A',
    enabledFeatures: {
      governance: true,
      staking: true,
      liquiditySwap: true,
      collateralRepay: true,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'.toLowerCase(),
      LENDING_POOL: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
      WETH_GATEWAY: '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04',
      REPAY_WITH_COLLATERAL_ADAPTER: '0x498c5431eb517101582988fbb36431ddaac8f4b1',
      SWAP_COLLATERAL_ADAPTER: '0x135896DE8421be2ec868E0b811006171D9df802A',
      WALLET_BALANCE_PROVIDER: '0x8E8dAd5409E0263a51C0aB5055dA66Be28cFF922',
      UI_POOL_DATA_PROVIDER: '0x47e300dDd1d25447482E2F7e5a5a967EA2DA8634',
      UI_INCENTIVE_DATA_PROVIDER: '0xd9F1e5F70B14b8Fd577Df84be7D75afB8a3A0186',
    },
  };
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
        governanceMarketConfig,
      }}
    >
      {children}
    </GovernanceProviderContext.Provider>
  );
}

export const useGovernanceDataContext = () => useContext(GovernanceProviderContext);
