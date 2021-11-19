import { Network } from '@aave/protocol-js';
import { MarketDataType } from '../../helpers/markets/markets-data';

import * as logos from './images';

export enum CustomMarket {
  rwa_kovan = 'rwa_kovan',
}

export interface ExtendedMarketDataType extends MarketDataType {
  DAIAddress: string;
}

export const marketsData: { [key in keyof typeof CustomMarket]: ExtendedMarketDataType } = {
  [CustomMarket.rwa_kovan]: {
    network: Network.kovan,
    logo: logos.rwaLogo,
    activeLogo: logos.rwaLogoActive,
    aTokenPrefix: 'A',
    enabledFeatures: {
      faucet: false,
      governance: false,
      staking: false,
      collateralRepay: false,
      incentives: true,
      permissions: true,
    },
    DAIAddress: '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xBE1c2487FBb4b56e7716B9e047f4c7dbd0Ab2722'.toLowerCase(),
      LENDING_POOL: '0xF3480d5a0Bf0bc05B606b3781487A84f8EF4d6Ff',
      PERMISSION_MANAGER: '0xcf75f0e91561F06b08476e8754a83DBF0379D4a6',
    },
  },
} as const;
