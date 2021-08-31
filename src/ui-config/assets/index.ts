import {
  assetsList as assetsListFromKit,
  Asset,
  assetsOrder as assetsOrderFromKit,
  STABLE_ASSETS as stableAssetsFromKit,
} from '@aave/aave-ui-kit';

export const assetsList: Asset[] = assetsListFromKit;

export const assetsOrder: string[] = assetsOrderFromKit;
export const stableAssets: string[] = stableAssetsFromKit;
