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
      LENDING_POOL_ADDRESS_PROVIDER: '0x056f9fe87288Ecd1b2f5daa0f90612e1AE30bC33'.toLowerCase(),
      LENDING_POOL: '0x0A647896183716adB358c3daece672421114E746',
      PERMISSION_MANAGER: '0xed7e2d35f8bE038B48F5d34AE28d8F4FF45fbF1A',
    },
  },
} as const;
