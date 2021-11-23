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
      LENDING_POOL_ADDRESS_PROVIDER: '0xd477a1313e026E0442Fee0d338B6bCe6f9D7760e'.toLowerCase(),
      LENDING_POOL: '0x1c92d512FB78a1D96321b77207028D43D6975596',
      PERMISSION_MANAGER: '0x9E9B02766958C6ba470fBD97f986fff5bc08aa18',
    },
  },
} as const;
