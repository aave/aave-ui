import { TokenMetadataType } from '@aave/protocol-js';
import { getAssetInfo } from '@aave/aave-ui-kit';
import { tEthereumAddress } from '@aave/protocol-js/dist/tx-builder/types';

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
