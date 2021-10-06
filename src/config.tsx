import { Network } from '@aave/protocol-js';

import { mapNameToChainID } from './libs/web3-data-provider';
import { CustomMarket, marketsData } from './ui-config';

export type Pool = {
  address: string;
};

export function getParamOrFail(name: string, network?: string): string {
  const param = process.env[`${name.toUpperCase()}${network ? `_${network.toUpperCase()}` : ''}`];
  if (!param) {
    throw new Error(`${name} is not specified for a ${network}, please contact support`);
  }
  return param;
}

export function getDefaultNetworkName() {
  return process.env.REACT_APP_DEFAULT_ETHEREUM_NETWORK as Network;
}

export function getSupportedNetworks(): Network[] {
  const supportedNetworks = getParamOrFail('REACT_APP_SUPPORTED_ETHEREUM_NETWORKS').split(
    ','
  ) as Network[];

  if (localStorage.getItem('fork_enabled') === 'true') {
    supportedNetworks.push(Network.fork);
  }
  if (localStorage.getItem('polygon_fork_enabled') === 'true') {
    supportedNetworks.push(Network.polygon_fork);
  }
  if (localStorage.getItem('avalanche_fork_enabled') === 'true') {
    supportedNetworks.push(Network.avalanche_fork);
  }
  return supportedNetworks;
}

export function getSupportedNetworksIds(): number[] {
  return getSupportedNetworks().map((name) => mapNameToChainID(name));
}

/**
 * selectable markets (markets in a available network + forks when enabled)
 */
export const availableMarkets = Object.keys(marketsData).filter((key) =>
  getSupportedNetworks().includes(marketsData[key as keyof typeof CustomMarket].network)
) as CustomMarket[];

export const IPFS_MODE = process.env.REACT_APP_IPFS_MODE === 'true';
export const ENABLE_CACHING_BACKEND = process.env.REACT_APP_ENABLE_CACHING_BACKEND === 'true';
export const RATES_HISTORY_ENDPOINT = process.env.REACT_APP_RATES_HISTORY_ENDPOINT;

// fiat on rump services setup
export const ONRAMP_API_KEY = process.env.REACT_APP_ONRAMP_API_KEY;
export const TRANSAK_API_KEY = process.env.REACT_APP_TRANSAK_API_KEY;
export const ENABLE_NASH = process.env.REACT_APP_ENABLE_NASH === 'true';

// walets config
export const AUTHEREUM_API_KEY = process.env.REACT_APP_AUTHEREUM_API_KEY;
export const PORTIS_DAPP_ID = process.env.REACT_APP_PORTIS_DAPP_ID;

export function getFortmaticKeyByNetwork(network: Network): string {
  if (network === Network.mainnet) {
    return process.env.REACT_APP_FORTMATIC_KEY_MAINNET || '';
  } else {
    return process.env.REACT_APP_FORTMATIC_KEY_TESTNET || '';
  }
}

// TESTING AND DEBUG
// Mainnet Fork
export const FORK_RPC_URL = localStorage.getItem('forkRPCUrl') || 'http://127.0.0.1:8545';
export const FORK_WS_RPC_URL = localStorage.getItem('forkWsRPCUrl') || 'ws://127.0.0.1:8545';
// Polygon Fork
export const POLYGON_FORK_RPC_URL =
  localStorage.getItem('polygonForkRPCUrl') || 'http://127.0.0.1:8545';
export const POLYGON_FORK_WS_RPC_URL =
  localStorage.getItem('polygonForkWsRPCUrl') || 'ws://127.0.0.1:8545';
// Avalanche Fork
export const AVALANCHE_FORK_RPC_URL =
  localStorage.getItem('avalancheForkRPCUrl') || 'http://127.0.0.1:8545';
export const AVALANCHE_FORK_WS_RPC_URL =
  localStorage.getItem('avalancheForkWsRPCUrl') || 'ws://127.0.0.1:8545';
