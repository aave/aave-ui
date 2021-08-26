import { tEthereumAddress } from '@aave/protocol-js/dist/tx-builder/types';

export function addERC20Token(
  address: tEthereumAddress,
  symbol: string,
  decimals: number,
  image?: string
): Promise<boolean> | boolean {
  const injectedProvider = (window as any).ethereum;
  if (injectedProvider) {
    if (address !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
      return injectedProvider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        },
      });
    }
    return false;
  } else {
    console.info("Can't add token. No injected provider found");
    return false;
  }
}
