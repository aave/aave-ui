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
    name: 'USD Coin',
    symbol: 'USDC',
    color: '#2775CA',
    icon: 'https://storage.googleapis.com/tinlake/aave/usdc.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/aave/ausdc.svg',
  },
  {
    name: 'New Silver Series 2 DROP',
    symbol: 'NS2DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/new-silver-2/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/new-silver-2/drop.svg',
  },
  {
    name: 'New Silver Series 2 DROP',
    symbol: 'KR2DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/new-silver-2/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/new-silver-2/drop.svg',
  },
  {
    name: 'Fortunafi Series 1 DROP',
    symbol: 'FF1DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/fortunafi-1/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/fortunafi-1/drop.svg',
  },
  {
    name: 'ConsolFreight Series 4 DROP',
    symbol: 'CF4DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/consolfreight-4/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/consolfreight-4/drop.svg',
  },
  {
    name: '1754 Factory (Bling Series 1) DROP',
    symbol: 'BL1DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/bling-series-1/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/bling-series-1/drop.svg',
  },
  {
    name: '1754 Factory (Bling Series 1) DROP',
    symbol: 'KTestDROP1',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/bling-series-1/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/bling-series-1/drop.svg',
  },
  {
    name: 'Harbor Trade Credit Series 2 DROP',
    symbol: 'HT2DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/harbor/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/harbor/drop.svg',
  },
  {
    name: 'Branch Series 3 (1754 Factory) DROP',
    symbol: 'BR3DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/branch-3/drop.png',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/branch-3/drop.png',
  },
  {
    name: 'Branch Series 3 (1754 Factory) DROP',
    symbol: 'AEADRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/branch-3/drop.png',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/branch-3/drop.png',
  },
  {
    name: 'databased.FINANCE 1 DROP',
    symbol: 'DF1DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/databased-finance/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/databased-finance/drop.svg',
  },
  {
    name: 'Cauris Global Fintech Fund 1 DROP',
    symbol: 'CGFF1DRP',
    color: '#0828BE',
    icon: 'https://storage.googleapis.com/tinlake/pool-media/cauris-1/drop.svg',
    aIcon: 'https://storage.googleapis.com/tinlake/pool-media/cauris-1/drop.svg',
  },
  {
    name: 'wCFG',
    symbol: 'wCFG',
    color: '#f7b14a',
    icon: 'https://tinlake.centrifuge.io/static/cfg-white.svg',
    aIcon: 'https://tinlake.centrifuge.io/static/cfg-white.svg',
  },
];

export const assetsOrder: string[] = [];
export const stableAssets: string[] = stableAssetsFromKit;
