import { API_ETH_MOCK_ADDRESS, Network } from '@aave/protocol-js';
import {
  ENABLE_CACHING_BACKEND,
  FORK_RPC_URL,
  FORK_WS_RPC_URL,
  POLYGON_FORK_RPC_URL,
  POLYGON_FORK_WS_RPC_URL,
} from '../config';
import { BaseNetworkConfig } from '../helpers/markets/markets-data';
import polygonBridgeLogo from './branding/images/polygonLogo.svg';
import avalancheBridgeLogo from './branding/images/avalancheLogo.svg';

const mainnet_config: BaseNetworkConfig = {
  publicJsonRPCUrl: 'https://eth-mainnet.alchemyapi.io/v2/demo',
  publicJsonRPCWSUrl: 'wss://eth-mainnet.alchemyapi.io/v2/demo',
  walletBalanceProvider: '0x8E8dAd5409E0263a51C0aB5055dA66Be28cFF922',
  batchV2PoolDataProviderAddress: '0xf49670C78794b6a604f3B49393d8eE951713339F',
  cachingServerUrl: 'https://cache-api-mainnet.aave.com/graphql',
  cachingWSServerUrl: 'wss://cache-api-mainnet.aave.com/graphql',
  protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
  baseUniswapAdapter: '0xc3efa200a60883a96ffe3d5b492b121d6e9a1f3f',
  baseAsset: 'ETH',
  // incentives hardcoded information
  rewardTokenSymbol: 'stkAAVE',
  rewardTokenAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  rewardTokenDecimals: 18,
  incentivePrecision: 18,
  explorerLink: 'https://etherscan.com',
  rpcOnly: !ENABLE_CACHING_BACKEND,
  addresses: {
    INCENTIVES_CONTROLLER: '0xd784927Ff2f95ba542BfC824c8a8a98F3495f6b5',
    INCENTIVES_CONTROLLER_REWARD_TOKEN: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
  },
} as const;

const polygon_config: BaseNetworkConfig = {
  publicJsonRPCUrl: 'https://polygon-rpc.com',
  publicJsonRPCWSUrl: 'wss://polygon-rpc.com',
  walletBalanceProvider: '0x34aa032bC416Cf2CdC45c0C8f065b1F19463D43e',
  batchV2PoolDataProviderAddress: '0x3b4108475a8092967225564C05a1E74e9F7A45D6',
  cachingServerUrl: 'https://cache-api-polygon.aave.com/graphql',
  cachingWSServerUrl: 'wss://cache-api-polygon.aave.com/graphql',
  protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic',
  baseAsset: 'MATIC',
  // incentives hardcoded information
  rewardTokenSymbol: 'WMATIC',
  rewardTokenAddress: API_ETH_MOCK_ADDRESS,
  rewardTokenDecimals: 18,
  incentivePrecision: 18,
  explorerLink: 'https://polygonscan.com',
  rpcOnly: !ENABLE_CACHING_BACKEND,
  addresses: {
    INCENTIVES_CONTROLLER: '0x357d51124f59836ded84c8a1730d72b749d8bc23',
    INCENTIVES_CONTROLLER_REWARD_TOKEN: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  },
  bridge: {
    brandColor: '#8247E5',
    name: 'Polygon PoS Bridge',
    url: 'https://wallet.matic.network/bridge/',
    logo: polygonBridgeLogo,
  },
} as const;

export const networkConfigs: { [key: string]: BaseNetworkConfig } = {
  [Network.kovan]: {
    publicJsonRPCUrl: 'https://kovan.poa.network ',
    walletBalanceProvider: '0x07DC923859b68e9399d787bf52c4Aa9eBe3490aF',
    batchV2PoolDataProviderAddress: '0x04110Dc40B04b99B94840E53B2a33bE45E45A8Ed',
    protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan',
    baseUniswapAdapter: '0xf86Be05f535EC2d217E4c6116B3fa147ee5C05A1',
    baseAsset: 'ETH',
    // incentives hardcoded information
    rewardTokenSymbol: 'stkAAVE',
    rewardTokenAddress: '0xb597cd8d3217ea6477232f9217fa70837ff667af',
    rewardTokenDecimals: 18,
    incentivePrecision: 18,
    explorerLink: 'https://kovan.etherscan.com',
    rpcOnly: true,
  },
  [Network.mainnet]: {
    ...mainnet_config,
  },
  [Network.polygon]: {
    ...polygon_config,
  },
  [Network.mumbai]: {
    publicJsonRPCUrl: 'https://rpc-mumbai.matic.today',
    publicJsonRPCWSUrl: 'wss://rpc-mumbai.matic.today',
    walletBalanceProvider: '0xEe7c0172c200e12AFEa3C34837052ec52F3f367A',
    batchV2PoolDataProviderAddress: '0x589390E0AaEB95be573A87Ca828989d8e3e77C04',
    protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-polygon-mumbai',
    baseAsset: 'MATIC',
    // incentives hardcoded information
    rewardTokenSymbol: 'WMATIC',
    rewardTokenAddress: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    rewardTokenDecimals: 18,
    incentivePrecision: 18,
    explorerLink: 'https://explorer-mumbai.maticvigil.com',
    rpcOnly: true,
    addresses: {
      INCENTIVES_CONTROLLER: '0xd41aE58e803Edf4304334acCE4DC4Ec34a63C644',
      INCENTIVES_CONTROLLER_REWARD_TOKEN: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    },
  },
  [Network.fuji]: {
    publicJsonRPCUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    publicJsonRPCWSUrl: 'wss://api.avax-test.network/ext/bc/C/rpc',
    walletBalanceProvider: '0x3f5A507B33260a3869878B31FB90F04F451d28e3',
    batchV2PoolDataProviderAddress: '0x41b6b18DfF735dbaEda5F5FB5393F57E420D5CB8',
    protocolDataUrl: '', // TODO: fill when subgraph deployed
    baseUniswapAdapter: '0x0',
    baseAsset: 'AVAX',
    // incentives hardcoded information
    rewardTokenSymbol: 'WAVAX',
    rewardTokenAddress: API_ETH_MOCK_ADDRESS,
    rewardTokenDecimals: 18,
    incentivePrecision: 18,
    explorerLink: 'https://cchain.explorer.avax-test.network',
    rpcOnly: true,
    usdMarket: true,
    addresses: {
      INCENTIVES_CONTROLLER: '0xa1EF206fb9a8D8186157FC817fCddcC47727ED55',
      INCENTIVES_CONTROLLER_REWARD_TOKEN: '0xd00ae08403b9bbb9124bb305c09058e32c39a48c',
    },
    bridge: {
      brandColor: '#E84142',
      name: 'Avalanche Bridge',
      url: 'https://bridge.avax.network/',
      logo: avalancheBridgeLogo,
    },
  },
  [Network.fork]: {
    ...mainnet_config,
    privateJsonRPCUrl: FORK_RPC_URL,
    privateJsonRPCWSUrl: FORK_WS_RPC_URL,
    rpcOnly: true,
  },
  [Network.polygon_fork]: {
    ...polygon_config,
    privateJsonRPCUrl: POLYGON_FORK_RPC_URL,
    privateJsonRPCWSUrl: POLYGON_FORK_WS_RPC_URL,
    rpcOnly: true,
  },
} as const;
