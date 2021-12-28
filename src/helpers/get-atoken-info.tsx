import { TokenMetadataType, tEthereumAddress } from '@aave/contract-helpers';
import { assetsList } from '../ui-config/assets';
import { getAssetInfo } from './config/assets-config';

interface ATokenInfoParams {
  address: tEthereumAddress;
  symbol: string;
  decimals: number;
  prefix?: string;
  withFormattedSymbol?: boolean;
}

export type ATokenInfo = TokenMetadataType & {
  formattedSymbol?: string;
  icon?: string;
};

export function getAtokenInfo({
  address,
  symbol,
  decimals,
  prefix,
  withFormattedSymbol,
}: ATokenInfoParams): ATokenInfo {
  const asset = getAssetInfo(symbol);
  const formattedSymbol = prefix
    ? `${prefix}${asset.symbol}`
    : withFormattedSymbol
    ? asset.symbol
    : undefined;

  return {
    name: asset.name,
    address: address.toLowerCase(),
    symbol: asset.symbol,
    icon: formattedSymbol ? asset.icon : asset.aIcon || asset.icon,
    decimals: decimals,
    formattedSymbol,
  };
}

export function isAtoken(aTokenPrefix: string, symbol: string) {
  const aTokenPrefixLength = aTokenPrefix.length;
  const aTokenPrefixFromSymbol = symbol.substr(0, aTokenPrefixLength);

  if (aTokenPrefixFromSymbol.toUpperCase() === aTokenPrefix.toUpperCase()) {
    const normalSymbol = symbol.substr(aTokenPrefixLength, symbol.length);
    if (symbol.length !== normalSymbol.length) {
      if (assetsList.some((asset) => asset.symbol === normalSymbol)) {
        return {
          symbol: normalSymbol,
          isAtoken: true,
        };
      }
    }
  }
  return {
    symbol,
    isAtoken: false,
  };
}
