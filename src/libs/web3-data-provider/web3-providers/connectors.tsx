import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from './connectors/ledger-connector';
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletConnectConnector } from './connectors/wallet-connect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { AuthereumConnector } from '@web3-react/authereum-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
// import { PortisConnector } from '@web3-react/portis-connector';
import { PortisConnector } from './connectors/portis-connector';

import { MewConnectConnector } from '@myetherwallet/mewconnect-connector';

import {
  AUTHEREUM_API_KEY,
  getFortmaticKeyByChainId,
  PORTIS_DAPP_ID,
} from '../../../helpers/config/wallet-config';
import {
  getSupportedChainIds,
  getNetworkConfig,
} from '../../../helpers/config/markets-and-network-config';
import { ChainId } from '@aave/contract-helpers';

export type AvailableWeb3Connectors =
  | 'browser'
  | 'ledger'
  | 'fortmatic'
  | 'wallet-connect'
  | 'wallet-link'
  | 'mew-wallet'
  | 'authereum'
  | 'torus'
  | 'gnosis-safe'
  | 'portis';

export enum LedgerDerivationPath {
  'Legacy' = "44'/60'/0'/x",
  'LedgerLive' = "44'/60'/x'/0/0",
}

export interface ConnectorOptionalConfig {
  ledgerBaseDerivationPath: LedgerDerivationPath;
  accountsOffset: number;
  accountsLength: number;
}

const POLLING_INTERVAL = 12000;
const APP_NAME = 'Aave';
const APP_LOGO_URL = 'https://aave.com/favicon.ico';

function raiseUnsupportedNetworkError(chainId: ChainId, connectorName: AvailableWeb3Connectors) {
  throw new Error(`ChainId "${chainId}" is not supported by ${connectorName}`);
}

export function getWeb3Connector(
  connectorName: AvailableWeb3Connectors,
  chainId: ChainId,
  supportedChainIds: ChainId[],
  connectorConfig: ConnectorOptionalConfig
): AbstractConnector {
  const networkConfig = getNetworkConfig(chainId);

  switch (connectorName) {
    case 'browser':
      return new InjectedConnector({ supportedChainIds: getSupportedChainIds() });
    case 'ledger':
      return new LedgerConnector({
        chainId,
        url: networkConfig.privateJsonRPCUrl || networkConfig.publicJsonRPCUrl[0],
        pollingInterval: POLLING_INTERVAL,
        baseDerivationPath: connectorConfig.ledgerBaseDerivationPath,
        accountsOffset: connectorConfig.accountsOffset,
        accountsLength: connectorConfig.accountsLength,
      });
    case 'wallet-link':
      return new WalletLinkConnector({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
        url: networkConfig.privateJsonRPCUrl || networkConfig.publicJsonRPCUrl[0],
      });
    case 'wallet-connect':
      return new WalletConnectConnector({
        rpc: supportedChainIds.reduce((acc, network) => {
          const config = getNetworkConfig(network);
          acc[network] = config.privateJsonRPCUrl || config.publicJsonRPCUrl[0];
          return acc;
        }, {} as { [networkId: number]: string }),
        bridge: 'https://aave.bridge.walletconnect.org',
        qrcode: true,
        pollingInterval: POLLING_INTERVAL,
        preferredNetworkId: chainId,
      });
    case 'fortmatic':
      return new FortmaticConnector({
        chainId,
        apiKey: getFortmaticKeyByChainId(chainId),
      });
    case 'mew-wallet':
      return new MewConnectConnector({
        url:
          networkConfig.privateJsonRPCWSUrl ||
          networkConfig.privateJsonRPCUrl ||
          networkConfig.publicJsonRPCWSUrl ||
          networkConfig.publicJsonRPCUrl[0],
        windowClosedError: true,
      });
    case 'authereum': {
      if (chainId !== ChainId.mainnet) {
        raiseUnsupportedNetworkError(chainId, connectorName);
      }
      return new AuthereumConnector({
        chainId,
        config: {
          networkName: chainId,
          rpcUri: networkConfig.privateJsonRPCUrl || networkConfig.publicJsonRPCUrl[0],
          apiKey: AUTHEREUM_API_KEY,
        },
      });
    }
    case 'torus':
      return new TorusConnector({
        chainId,
        initOptions: {
          network: {
            host: chainId === ChainId.polygon ? 'matic' : chainId,
          },
          showTorusButton: false,
          enableLogging: false,
          enabledVerifiers: false,
        },
      });
    case 'portis': {
      if (!PORTIS_DAPP_ID) throw new Error('Portis DAPP id not specified');
      return new PortisConnector({
        dAppId: PORTIS_DAPP_ID,
        networks: [chainId],
      });
    }
    case 'gnosis-safe': {
      return new SafeAppConnector();
    }
    default: {
      throw new Error(`unsupported connector name: ${connectorName}`);
    }
  }
}
export function disconnectWeb3Connector(): void {
  const currentProvider = localStorage.getItem('currentProvider') as
    | AvailableWeb3Connectors
    | undefined;
  switch (currentProvider) {
    case 'wallet-connect': {
      localStorage.removeItem('walletconnect');
      break;
    }
    case 'wallet-link': {
      localStorage.removeItem('__WalletLink__:https://www.walletlink.org:SessionId');
      localStorage.removeItem('__WalletLink__:https://www.walletlink.org:Addresses');
      break;
    }
    case 'ledger': {
      localStorage.removeItem('ledgerPath');
      localStorage.removeItem('selectedAccount');
      break;
    }
    case 'torus': {
      localStorage.removeItem('loglevel');
      localStorage.removeItem('loglevel:torus-embed');
      break;
    }
  }
  localStorage.removeItem('currentProvider');
}
