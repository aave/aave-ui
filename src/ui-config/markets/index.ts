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
      LENDING_POOL_ADDRESS_PROVIDER: '0x2871c9Ac3FeBE04Ea66Bd231D8979A9AAA13CB52'.toLowerCase(),
      LENDING_POOL: '0x4DB84ef1130F62d466cd643582c79CD7d9B45397',
      PERMISSION_MANAGER: '0xcf50B1c4be6e28d5D83D2AB4Df1b06e878631364',
    },
  },
} as const;
