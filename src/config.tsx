import { ChainIdToNetwork } from '@aave/contract-helpers';
import { Network } from '@aave/protocol-js';

import { networkConfigs } from './ui-config/networks';
import { CustomMarket, marketsData as _marketsData } from './ui-config';

export type Pool = {
  address: string;
};

const ENABLE_TESTNET = process.env.REACT_APP_ENABLE_TESTNET === 'true';

const marketsData = _marketsData;

export function getParamOrFail(name: string): string {
  const param = process.env[name.toUpperCase()];
  if (!param) {
    throw new Error(`${name} is not specified please check your config`);
  }
  return param;
}

export function getDefaultNetworkName() {
  return ChainIdToNetwork[marketsData[availableMarkets[0]].chainId] as Network;
}

export function getSupportedNetworks(): Network[] {
  const supportedNetworks = getSupportedNetworkIds().map((id) => ChainIdToNetwork[id]) as Network[];

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

export const IPFS_MODE = process.env.REACT_APP_IPFS_MODE === 'true';
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
