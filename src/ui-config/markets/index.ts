import { ChainId } from '@aave/contract-helpers';
import { MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  rwa_mainnet = 'rwa_mainnet',
  rwa_kovan = 'rwa_kovan',
}

export interface ExtendedMarketDataType extends MarketDataType {
  USDCAddress: string;
}

export const marketsData: { [key in keyof typeof CustomMarket]: ExtendedMarketDataType } = {
  [CustomMarket.rwa_mainnet]: {
    chainId: ChainId.mainnet,
    logo: logos.rwaLogo,
    activeLogo: logos.rwaLogoActive,
    aTokenPrefix: 'A',
    enabledFeatures: {
      faucet: false,
      governance: false,
      staking: false,
      collateralRepay: false,
      incentives: false,
      permissions: true,
    },
    USDCAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xB953a066377176092879a151C07798B3946EEa4b'.toLowerCase(),
      LENDING_POOL: '0xA1a8c33C9a9a9DE231b13a2271a7C09c11C849F1',
      PERMISSION_MANAGER: '0xB4A760B14ebb26AE6f9Ce16A601D936dC575caaf',
    },
  },
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
