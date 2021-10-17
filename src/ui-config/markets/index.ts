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
      LENDING_POOL_ADDRESS_PROVIDER: '0xA9251111878BFA6b4cA83e6059e8C661d87b6ec2'.toLowerCase(),
      LENDING_POOL: '0xFa23272D6cD7Eb8413De7740D6b5017Ff93FD45e',
      PERMISSION_MANAGER: '0xB0C101D95cddB5Bd306C62cc95666a5C0C5e43bf',
    },
  },
} as const;
