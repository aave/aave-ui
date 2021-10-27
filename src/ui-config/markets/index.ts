import { Network } from '@aave/protocol-js';
import { MarketDataType } from '../../helpers/markets/markets-data';

import * as logos from './images';

export enum CustomMarket {
  centrifuge_kovan = 'centrifuge_kovan',
}

export interface ExtendedMarketDataType extends MarketDataType {
  DAIAddress: string;
}

export const marketsData: { [key in keyof typeof CustomMarket]: ExtendedMarketDataType } = {
  [CustomMarket.centrifuge_kovan]: {
    network: Network.kovan,
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
    DAIAddress: '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x9dC91dcCAD39072a05CB59EB1F3542BE1B94F3f8'.toLowerCase(),
      LENDING_POOL: '0xD50Ff9Ef234B79e2ade15C987Dd4f5758f95BC3A',
      PERMISSION_MANAGER: '0xC0cd90dD7ab4e468E8fe103d2FbCc48e67eA5cBe',
    },
  },
} as const;
