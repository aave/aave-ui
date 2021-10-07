import { Network } from '@aave/protocol-js';
import { MarketDataType } from '../../helpers/markets/markets-data';
import * as logos from './images';

export enum CustomMarket {
  centrifuge_kovan = 'centrifuge_kovan',
}

export const marketsData: { [key in keyof typeof CustomMarket]: MarketDataType } = {
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
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xA9251111878BFA6b4cA83e6059e8C661d87b6ec2'.toLowerCase(),
      LENDING_POOL: '0xFa23272D6cD7Eb8413De7740D6b5017Ff93FD45e',
    },
  },
} as const;
