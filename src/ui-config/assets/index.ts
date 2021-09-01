import { Asset, STABLE_ASSETS as stableAssetsFromKit } from '@aave/aave-ui-kit';

export const assetsList: Asset[] = [
  {
    name: 'DAI',
    symbol: 'DAI',
    color: '#f7b14a',
    icon: 'https://storage.googleapis.com/tinlake/aave/dai.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/aave/adai.svg',
  },
  {
    name: 'New Silver 2 DROP',
    symbol: 'NS2DRP',
    color: '#f7b14a',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/new-silver-2/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/new-silver-2/drop.svg',
  },
  {
    name: 'ConsolFreight 4 DROP',
    symbol: 'CF4DRP',
    color: '#f7b14a',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/consolfreight-4/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/consolfreight-4/drop.svg',
  },
  {
    name: 'Fortunafi 1 DROP',
    symbol: 'FF1DRP',
    color: '#f7b14a',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/fortunafi-1/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/fortunafi-1/drop.svg',
  },
];

export const assetsOrder: string[] = [];
export const stableAssets: string[] = stableAssetsFromKit;
