import { Network } from '@aave/protocol-js';


// walets config
export const AUTHEREUM_API_KEY = process.env.REACT_APP_AUTHEREUM_API_KEY;
export const PORTIS_DAPP_ID = process.env.REACT_APP_PORTIS_DAPP_ID;

export function getFortmaticKeyByNetwork(network: Network): string {
  if (network === Network.mainnet) {
    return process.env.REACT_APP_FORTMATIC_KEY_MAINNET || '';
  } else {
    return process.env.REACT_APP_FORTMATIC_KEY_TESTNET || '';
  }
}
