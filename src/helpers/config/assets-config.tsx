import React from 'react';
import {
  getAssetInfoFactory,
  TokenIcon as DefaultTokenIcon,
  TokenIconProps,
} from '@aave/aave-ui-kit';

import { assetsList, stableAssets } from '../../ui-config/assets';

export const getAssetInfo = getAssetInfoFactory(assetsList);

export const getAssetColor = (assetSymbol: string) => {
  const asset = getAssetInfo(assetSymbol);
  const assetColor = asset.color;

  return assetColor || '#2ebac6';
};

export const isAssetStable = (assetSymbol: string) => {
  const assetInfo = getAssetInfo(assetSymbol);
  return stableAssets.includes(assetInfo.symbol.toLocaleUpperCase());
};

export const TokenIcon = (props: Omit<TokenIconProps, 'getAssetInfo'>) => (
  <DefaultTokenIcon {...props} getAssetInfo={getAssetInfo} />
);
