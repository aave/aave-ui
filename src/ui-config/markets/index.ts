import { ChainId } from '@aave/contract-helpers';
import { MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  rwa_kovan = 'rwa_kovan',
}

export interface ExtendedMarketDataType extends MarketDataType {
  USDCAddress: string;
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
    USDCAddress: '0x3a0C55a866ff1a7B8F1d1D2Dd492fFB58287c599',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xFD15172c2946db0f7C9b0a3dC542F3c0D7CAD9bD'.toLowerCase(),
      LENDING_POOL: '0x09Bc07dBf985f95492df272b90E4866296eDECE3',
      PERMISSION_MANAGER: '0x484ED30cBf66aAc35363Ca07FdD6eC9A2693B123',
    },
  },
} as const;
