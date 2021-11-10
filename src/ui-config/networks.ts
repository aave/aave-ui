import { API_ETH_MOCK_ADDRESS, Network } from '@aave/protocol-js';
import {
  ENABLE_CACHING_BACKEND,
  FORK_RPC_URL,
  FORK_WS_RPC_URL,
  POLYGON_FORK_RPC_URL,
  POLYGON_FORK_WS_RPC_URL,
  AVALANCHE_FORK_RPC_URL,
  AVALANCHE_FORK_WS_RPC_URL,
} from '../config';
import { BaseNetworkConfig } from '../helpers/markets/markets-data';
import polygonBridgeLogo from './branding/images/polygonLogo.svg';
import avalancheBridgeLogo from './branding/images/avalancheLogo.svg';

const mainnet_config: BaseNetworkConfig = {
  publicJsonRPCUrl: ['https://cloudflare-eth.com', 'https://eth-mainnet.alchemyapi.io/v2/demo'],
  publicJsonRPCWSUrl: 'wss://eth-mainnet.alchemyapi.io/v2/demo',
  addresses: {
    walletBalanceProvider: '0x8E8dAd5409E0263a51C0aB5055dA66Be28cFF922',
    uiPoolDataProvider: '0x47e300dDd1d25447482E2F7e5a5a967EA2DA8634',
    uiIncentiveDataProvider: '0xd9F1e5F70B14b8Fd577Df84be7D75afB8a3A0186',
    chainlinkFeedRegistry: '0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf',
  },
  cachingServerUrl: 'https://cache-api-mainnet.aave.com/graphql',
  cachingWSServerUrl: 'wss://cache-api-mainnet.aave.com/graphql',
  protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
  baseUniswapAdapter: '0xc3efa200a60883a96ffe3d5b492b121d6e9a1f3f',
  baseAsset: 'ETH',
  baseAssetWrappedAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  // incentives hardcoded information
  rewardTokenSymbol: 'stkAAVE',
  rewardTokenAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  rewardTokenDecimals: 18,
  incentivePrecision: 18,
  explorerLink: 'https://etherscan.com',
  rpcOnly: !ENABLE_CACHING_BACKEND,
} as const;

const polygon_config: BaseNetworkConfig = {
  publicJsonRPCUrl: ['https://polygon-rpc.com'],
  publicJsonRPCWSUrl: 'wss://polygon-rpc.com',
  addresses: {
    walletBalanceProvider: '0x34aa032bC416Cf2CdC45c0C8f065b1F19463D43e',
    uiPoolDataProvider: '0x538C84EA84F655f2e04eBfAD4948abA9495A2Fc3',
    uiIncentiveDataProvider: '0xC5093EDAC52f4DD68b42433eA8754B26eAbb1A48',
  },
  cachingServerUrl: 'https://cache-api-polygon.aave.com/graphql',
  cachingWSServerUrl: 'wss://cache-api-polygon.aave.com/graphql',
  protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic',
  baseAsset: 'MATIC',
  baseAssetWrappedAddress: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  // incentives hardcoded information
  rewardTokenSymbol: 'WMATIC',
  rewardTokenAddress: API_ETH_MOCK_ADDRESS,
  rewardTokenDecimals: 18,
  incentivePrecision: 18,
  explorerLink: 'https://polygonscan.com',
  rpcOnly: !ENABLE_CACHING_BACKEND,
  bridge: {
    brandColor: '130, 71, 229',
    name: 'Polygon PoS Bridge',
    url: 'https://wallet.matic.network/bridge/',
    logo: polygonBridgeLogo,
  },
} as const;

const avalanche_config: BaseNetworkConfig = {
  publicJsonRPCUrl: ['https://api.avax.network/ext/bc/C/rpc'],
  publicJsonRPCWSUrl: 'wss://api.avax.network/ext/bc/C/rpc',
  addresses: {
    walletBalanceProvider: '0x73e4898a1Bfa9f710B6A6AB516403A6299e01fc6',
    uiPoolDataProvider: '0xf51F46EfE8eFA7BB6AA8cDfb1d2eFb8eb27d12c5',
    uiIncentiveDataProvider: '0x16Dea0fCBca21E848714B2e96f26ddF6BCe505C9',
  },
  protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-avalanche',
  cachingServerUrl: 'https://cache-api-avalanche.aave.com/graphql',
  cachingWSServerUrl: 'wss://cache-api-avalanche.aave.com/graphql',
  baseUniswapAdapter: '0x0',
  baseAsset: 'AVAX',
  baseAssetWrappedAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  // incentives hardcoded information
  rewardTokenSymbol: 'WAVAX',
  rewardTokenAddress: API_ETH_MOCK_ADDRESS,
  rewardTokenDecimals: 18,
  incentivePrecision: 18,
  explorerLink: 'https://cchain.explorer.avax.network',
  rpcOnly: !ENABLE_CACHING_BACKEND,
  usdMarket: true,
  bridge: {
    brandColor: '232, 65, 66',
    name: 'Avalanche Bridge',
    url: 'https://bridge.avax.network/',
    logo: avalancheBridgeLogo,
  },
};

export const networkConfigs: { [key: string]: BaseNetworkConfig } = {
  [Network.kovan]: {
    publicJsonRPCUrl: ['https://kovan.poa.network'],
    addresses: {
      walletBalanceProvider: '0x07DC923859b68e9399d787bf52c4Aa9eBe3490aF',
      uiPoolDataProvider: '0x6062ad399E47BF75AEa0b3c5BE7077c1E8664Dcb',
      uiIncentiveDataProvider: '0x9842E5B7b7C6cEDfB1952a388e050582Ff95645b',
      chainlinkFeedRegistry: '0xAa7F6f7f507457a1EE157fE97F6c7DB2BEec5cD0',
    },
    protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan',
    baseUniswapAdapter: '0xf86Be05f535EC2d217E4c6116B3fa147ee5C05A1',
    baseAsset: 'ETH',
    baseAssetWrappedAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    // incentives hardcoded information
    rewardTokenSymbol: 'stkAAVE',
    rewardTokenAddress: '0xb597cd8d3217ea6477232f9217fa70837ff667af',
    rewardTokenDecimals: 18,
    incentivePrecision: 18,
    explorerLink: 'https://kovan.etherscan.com',
    rpcOnly: true,
    isTestnet: true,
  },
  [Network.mainnet]: {
    ...mainnet_config,
  },
  [Network.polygon]: {
    ...polygon_config,
  },
  [Network.mumbai]: {
    publicJsonRPCUrl: ['https://rpc-mumbai.maticvigil.com'],
    publicJsonRPCWSUrl: 'wss://rpc-mumbai.maticvigil.com',
    addresses: {
      walletBalanceProvider: '0xEe7c0172c200e12AFEa3C34837052ec52F3f367A',
      uiPoolDataProvider: '0xafcE41554C19FfC87293Fb30C33c17614f61e7eD',
      uiIncentiveDataProvider: '0x04110Dc40B04b99B94840E53B2a33bE45E45A8Ed',
    },
    protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-polygon-mumbai',
    baseAsset: 'MATIC',
    baseAssetWrappedAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    // incentives hardcoded information
    rewardTokenSymbol: 'WMATIC',
    rewardTokenAddress: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    rewardTokenDecimals: 18,
    incentivePrecision: 18,
    explorerLink: 'https://explorer-mumbai.maticvigil.com',
    rpcOnly: true,
    isTestnet: true,
  },
  [Network.fuji]: {
    publicJsonRPCUrl: ['https://api.avax-test.network/ext/bc/C/rpc'],
    publicJsonRPCWSUrl: 'wss://api.avax-test.network/ext/bc/C/rpc',
    addresses: {
      walletBalanceProvider: '0x3f5A507B33260a3869878B31FB90F04F451d28e3',
      uiPoolDataProvider: '0xDb49B99073C2AE890708227Dc83B1781bF01512D',
      uiIncentiveDataProvider: '0x2c911e6FaD423C00205eda22BBAc3e7F82c38007',
    },
    protocolDataUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-fuji',
    baseUniswapAdapter: '0x0',
    baseAsset: 'AVAX',
    baseAssetWrappedAddress: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    // incentives hardcoded information
    rewardTokenSymbol: 'WAVAX',
    rewardTokenAddress: API_ETH_MOCK_ADDRESS,
    rewardTokenDecimals: 18,
    incentivePrecision: 18,
    explorerLink: 'https://cchain.explorer.avax-test.network',
    rpcOnly: true,
    usdMarket: true,
    isTestnet: true,
    bridge: {
      brandColor: '232, 65, 66',
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
  [Network.avalanche]: {
    ...avalanche_config,
  },
  [Network.avalanche_fork]: {
    ...avalanche_config,
    privateJsonRPCUrl: AVALANCHE_FORK_RPC_URL,
    privateJsonRPCWSUrl: AVALANCHE_FORK_WS_RPC_URL,
    rpcOnly: true,
  },
} as const;
