import { ChainId } from '@aave/contract-helpers';
import { MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  rwa_kovan = 'rwa_kovan',
}

export interface ExtendedMarketDataType extends MarketDataType {
  DAIAddress: string;
}

export const marketsData: { [key in keyof typeof CustomMarket]: ExtendedMarketDataType } = {
  [CustomMarket.rwa_kovan]: {
    chainId: ChainId.kovan,
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
      LENDING_POOL_ADDRESS_PROVIDER: '0x422d4A6722b5cC1e5eA435A23AeF2047396a1be4'.toLowerCase(),
      LENDING_POOL: '0x557846f3aefCA9F5Cdf63AbE1B015A5f4397C0c6',
      PERMISSION_MANAGER: '0x4C00bE89bf16FaC19A458c296e7891Bf54B3b7a7',
    },
  },
} as const;
