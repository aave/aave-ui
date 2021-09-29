import { Network } from '@aave/protocol-js';
import { ethers } from 'ethers';

import { networkConfigs } from '../../ui-config';

type ExplorerLinkBuilderProps = {
  tx?: string;
  address?: string;
};

type ExplorerLinkBuilderConfig = { baseUrl: string; addressPrefix?: string; txPrefix?: string };

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

export type NetworkConfig = {
  privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
  privateJsonRPCWSUrl?: string;
  publicJsonRPCUrl: string; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
  publicJsonRPCWSUrl?: string;
  walletBalanceProvider: string;
  /**
   * UiPoolDataProvider currently requires a non-master version
   * https://github.com/aave/protocol-v2/blob/feat/split-ui-dataprovider-logic/contracts/misc/UiPoolDataProvider.sol
   * If you deploy a market with the non default oracle or incentive controller you have to redeploy the UiPoolDataProvider as well as currently the addresses are static.
   * In the upcoming version this will no longer be needed.
   */
  uiPoolDataProvider: string;
  protocolDataUrl: string;
  cachingServerUrl?: string;
  cachingWSServerUrl?: string;
  baseUniswapAdapter?: string;
  baseAsset: string;
  rewardTokenSymbol: string;
  rewardTokenAddress: string;
  rewardTokenDecimals: number;
  incentivePrecision: number;
  usdMarket?: boolean;
  // function returning a link to etherscan et al
  explorerLink: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  rpcOnly: boolean;
  addresses?: {
    INCENTIVES_CONTROLLER: string;
    INCENTIVES_CONTROLLER_REWARD_TOKEN: string;
  };
  bridge?: {
    brandColor: string;
    name: string;
    url: string;
    logo: string;
  };
};

export type MarketDataType = {
  // the network the market operates on
  network: Network;
  // market logo in the topbar
  logo: string;
  // logo for the active market in dropdown
  activeLogo?: string;
  // additional logo on the right hand side
  subLogo?: string;
  // aToken prefix string, which will be cut of in the ui
  aTokenPrefix: string;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
  };
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    FLASH_LIQUIDATION_ADAPTER?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
  };
};

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>;

export function getNetworkConfig(network: Network): NetworkConfig {
  const config = networkConfigs[network];
  if (!config) throw new Error(`${network} network was not configured`);
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

export const getProvider = (network: Network): ethers.providers.Provider => {
  if (!providers[network]) {
    const config = getNetworkConfig(network);
    const jsonRPCUrl = config.privateJsonRPCUrl || config.publicJsonRPCUrl;
    if (!jsonRPCUrl) {
      throw new Error(`${network} has no jsonRPCUrl configured`);
    }
    providers[network] = new ethers.providers.StaticJsonRpcProvider(jsonRPCUrl);
  }
  return providers[network];
};
