import { ChainId, ChainIdToNetwork } from '@aave/contract-helpers';
import { Network } from '@aave/protocol-js';

import { networkConfigs as _networkConfigs } from '../../ui-config/networks';
import { CustomMarket, marketsData as _marketsData } from '../../ui-config/markets/index';
import {
  ExplorerLinkBuilderConfig,
  ExplorerLinkBuilderProps,
  MarketDataType,
  NetworkConfig,
  BaseNetworkConfig,
} from './types';
import { ethers } from 'ethers';

export type Pool = {
  address: string;
};

const ENABLE_TESTNET = process.env.REACT_APP_ENABLE_TESTNET === 'true';

// determines if forks should be shown
const FORK_ENABLED = localStorage.getItem('forkEnabled') === 'true';
// specifies which network was forked
const FORK_BASE_CHAIN_ID = Number(localStorage.getItem('forkBaseChainId') || 1);
// specifies on which chainId the fork is running
const FORK_CHAIN_ID = Number(localStorage.getItem('forkChainId') || 1337);

export const networkConfigs = Object.keys(_networkConfigs).reduce((acc, value) => {
  // TODO: add fork network
  acc[value] = _networkConfigs[value];
  // if (FORK_ENABLED) {
  //   acc[`fork_${value}`] = {};
  // }
  return acc;
}, {} as { [key: string]: BaseNetworkConfig });

export const marketsData = Object.keys(_marketsData).reduce((acc, value) => {
  acc[value] = _marketsData[value as keyof typeof CustomMarket];
  if (
    FORK_ENABLED &&
    _marketsData[value as keyof typeof CustomMarket].chainId === FORK_BASE_CHAIN_ID
  ) {
    acc[`fork_${value}`] = {
      ..._marketsData[value as keyof typeof CustomMarket],
      chainId: FORK_CHAIN_ID,
    };
  }
  return acc;
}, {} as { [key: string]: MarketDataType });

export function getDefaultNetworkName() {
  return ChainIdToNetwork[marketsData[availableMarkets[0]].chainId] as Network;
}

export function getSupportedNetworks(): Network[] {
  const supportedNetworks = getSupportedNetworkIds().map((id) => ChainIdToNetwork[id]) as Network[];
  return supportedNetworks;
}

export function getSupportedNetworkIds(): number[] {
  return Array.from(
    Object.keys(marketsData).reduce((acc, value) => {
      if (
        ENABLE_TESTNET ||
        !networkConfigs[ChainIdToNetwork[marketsData[value as keyof typeof CustomMarket].chainId]]
          .isTestnet
      )
        acc.add(marketsData[value as keyof typeof CustomMarket].chainId);
      return acc;
    }, new Set<number>())
  );
}

/**
 * selectable markets (markets in a available network + forks when enabled)
 */
export const availableMarkets = Object.keys(marketsData).filter((key) =>
  getSupportedNetworkIds().includes(marketsData[key as keyof typeof CustomMarket].chainId)
) as CustomMarket[];

const linkBuilder =
  ({ baseUrl, addressPrefix = 'address', txPrefix = 'tx' }: ExplorerLinkBuilderConfig) =>
  ({ tx, address }: ExplorerLinkBuilderProps): string => {
    if (tx) {
      return `${baseUrl}/${txPrefix}/${tx}`;
    }
    if (address) {
      return `${baseUrl}/${addressPrefix}/${address}`;
    }
    return baseUrl;
  };

export function getNetworkConfig(chainId: ChainId): NetworkConfig {
  const network = ChainIdToNetwork[chainId] as Network;
  const config = networkConfigs[network];
  if (!config) throw new Error(`${network}, ${chainId} network was not configured`);
  return { ...config, explorerLinkBuilder: linkBuilder({ baseUrl: config.explorerLink }) };
}

export const isFeatureEnabled = {
  faucet: (data: MarketDataType) => data.enabledFeatures?.faucet,
  governance: (data: MarketDataType) => data.enabledFeatures?.governance,
  staking: (data: MarketDataType) => data.enabledFeatures?.staking,
  liquiditySwap: (data: MarketDataType) => data.enabledFeatures?.liquiditySwap,
  collateralRepay: (data: MarketDataType) => data.enabledFeatures?.collateralRepay,
  permissions: (data: MarketDataType) => data.enabledFeatures?.permissions,
};

const providers: { [network: string]: ethers.providers.Provider } = {};

export const getProvider = (chainId: ChainId): ethers.providers.Provider => {
  if (!providers[chainId]) {
    const config = getNetworkConfig(chainId);
    const jsonRPCUrl = config.privateJsonRPCUrl || config.publicJsonRPCUrl;
    if (!jsonRPCUrl) {
      throw new Error(`${chainId} has no jsonRPCUrl configured`);
    }
    providers[chainId] = new ethers.providers.StaticJsonRpcProvider(jsonRPCUrl);
  }
  return providers[chainId];
};

// reexport
export { CustomMarket };
