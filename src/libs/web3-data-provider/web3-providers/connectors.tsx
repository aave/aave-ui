import { ChainId, Network } from '@aave/protocol-js';
import { ethers, Wallet, providers } from 'ethers';
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
import { JsonRpcProvider, Web3Provider, Provider } from '@ethersproject/providers';
import Web3 from 'web3';
import invariant from 'tiny-invariant';

import { MewConnectConnector } from '@myetherwallet/mewconnect-connector';

import {
  AUTHEREUM_API_KEY,
  getFortmaticKeyByNetwork,
  getSupportedNetworksIds,
  PORTIS_DAPP_ID,
} from '../../../config';
import { mapNameToChainID } from '../web3-helpers';
import { getNetworkConfig } from '../../../helpers/markets/markets-data';

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
  | 'portis'
  | 'test';

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

function raiseUnsupportedNetworkError(network: Network, connectorName: AvailableWeb3Connectors) {
  throw new Error(`${network} is not supported by ${connectorName}`);
}

interface ConnectorUpdate<T = number | string> {
  provider?: any;
  chainId?: T;
  account?: null | string;
}
export class NetworkConnector extends AbstractConnector {
  private currentChainId: number;
  private web3: Web3;

  constructor(web3: Web3, currentChainId: number) {
    super({ supportedChainIds: [currentChainId] });
    this.currentChainId = currentChainId;
    this.web3 = web3;
  }

  public async activate(): Promise<ConnectorUpdate> {
    return {
      provider: this.web3.eth.currentProvider,
      chainId: this.currentChainId,
      account: this.web3.eth.defaultAccount,
    };
  }

  public async getProvider(): Promise<Provider> {
    return this.web3.eth.currentProvider as any;
  }

  public async getChainId(): Promise<number> {
    return this.currentChainId;
  }

  public async getAccount(): Promise<string | null> {
    return this.web3.eth.defaultAccount; // this.dress;
  }

  public deactivate() {
    return;
  }
}

const getTestProvider = () => {
  const privateKey = localStorage.getItem('testPrivatekey') as string;
  const testRPC = localStorage.getItem('testRPC') as string;
  const testChainID = Number(localStorage.getItem('testChainID') as string);
  const address = localStorage.getItem('selectedAccount') as string;
  const web3 = new Web3(new Web3.providers.HttpProvider(testRPC));
  const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = address;
  web3.defaultAccount = address;
  (window as any).web3 = web3;
  return new NetworkConnector(web3, testChainID);
};

export function getWeb3Connector(
  connectorName: AvailableWeb3Connectors,
  currentNetwork: Network,
  supportedNetworks: Network[],
  connectorConfig: ConnectorOptionalConfig
): AbstractConnector {
  const networkConfig = getNetworkConfig(currentNetwork);
  const networkId = mapNameToChainID(currentNetwork);

  switch (connectorName) {
    case 'test':
      return getTestProvider();
    case 'browser':
      return new InjectedConnector({ supportedChainIds: getSupportedNetworksIds() });
    case 'ledger':
      return new LedgerConnector({
        chainId: networkId,
        url: networkConfig.privateJsonRPCUrl || networkConfig.publicJsonRPCUrl,
        pollingInterval: POLLING_INTERVAL,
        baseDerivationPath: connectorConfig.ledgerBaseDerivationPath,
        accountsOffset: connectorConfig.accountsOffset,
        accountsLength: connectorConfig.accountsLength,
      });
    case 'wallet-link':
      return new WalletLinkConnector({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
        url: networkConfig.privateJsonRPCUrl || networkConfig.publicJsonRPCUrl,
      });
    case 'wallet-connect':
      return new WalletConnectConnector({
        rpc: supportedNetworks.reduce((acc, network) => {
          const config = getNetworkConfig(network);
          acc[mapNameToChainID(network)] = config.privateJsonRPCUrl || config.publicJsonRPCUrl;
          return acc;
        }, {} as { [networkId: number]: string }),
        bridge: 'https://aave.bridge.walletconnect.org',
        qrcode: true,
        pollingInterval: POLLING_INTERVAL,
        preferredNetworkId: networkId,
      });
    case 'fortmatic':
      return new FortmaticConnector({
        chainId: networkId,
        apiKey: getFortmaticKeyByNetwork(currentNetwork),
      });
    case 'mew-wallet':
      return new MewConnectConnector({
        url:
          networkConfig.privateJsonRPCWSUrl ||
          networkConfig.privateJsonRPCUrl ||
          networkConfig.publicJsonRPCWSUrl ||
          networkConfig.publicJsonRPCUrl,
        windowClosedError: true,
      });
    case 'authereum': {
      if (currentNetwork !== Network.mainnet) {
        raiseUnsupportedNetworkError(currentNetwork, connectorName);
      }
      return new AuthereumConnector({
        chainId: networkId,
        config: {
          networkName: currentNetwork,
          rpcUri: networkConfig.privateJsonRPCUrl || networkConfig.publicJsonRPCUrl,
          apiKey: AUTHEREUM_API_KEY,
        },
      });
    }
    case 'torus':
      return new TorusConnector({
        chainId: networkId,
        initOptions: {
          network: {
            host: currentNetwork === Network.polygon ? 'matic' : currentNetwork,
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
        networks: [networkId],
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
