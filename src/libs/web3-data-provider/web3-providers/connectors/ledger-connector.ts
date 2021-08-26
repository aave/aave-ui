import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3ProviderEngine from 'web3-provider-engine';
import { RPCSubprovider } from '@0x/subproviders/lib/src/subproviders/rpc_subprovider'; // https://github.com/0xProject/0x-monorepo/issues/1400
import createLedgerSubprovider from '../subproviders/ledger-subprovider';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import webUsbTransport from '@ledgerhq/hw-transport-webusb';
import type Transport from '@ledgerhq/hw-transport';

interface LedgerConnectorArguments {
  chainId: number;
  url: string;
  pollingInterval?: number;
  requestTimeoutMs?: number;
  baseDerivationPath?: string;
  accountsOffset?: number;
  accountsLength: number;
}

const getTransport = async (): Promise<Transport> => {
  if (await webUsbTransport.isSupported()) {
    return await webUsbTransport.create();
  }
  return await TransportU2F.create();
};

export class LedgerConnector extends AbstractConnector {
  private readonly chainId: number;
  private readonly url: string;
  private readonly pollingInterval?: number;
  private readonly requestTimeoutMs?: number;
  private readonly baseDerivationPath?: string;
  private readonly accountsOffset?: number;
  private readonly accountsLength: number;

  private provider: any;

  constructor({
    chainId,
    url,
    pollingInterval,
    requestTimeoutMs,
    baseDerivationPath,
    accountsOffset = 0,
    accountsLength = 1,
  }: LedgerConnectorArguments) {
    super({ supportedChainIds: [chainId] });

    this.chainId = chainId;
    this.url = url;
    this.requestTimeoutMs = requestTimeoutMs;
    this.baseDerivationPath = baseDerivationPath;
    this.pollingInterval = pollingInterval;
    this.accountsOffset = accountsOffset;
    this.accountsLength = accountsLength;
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.provider) {
      const engine = new Web3ProviderEngine({ pollingInterval: this.pollingInterval });
      const ledgerProvider = await createLedgerSubprovider(getTransport, {
        networkId: this.chainId,
        paths: this.baseDerivationPath ? [this.baseDerivationPath] : undefined,
        accountsLength: this.accountsLength,
        accountsOffset: this.accountsOffset,
      });
      engine.addProvider(ledgerProvider);
      engine.addProvider(new RPCSubprovider(this.url, this.requestTimeoutMs));
      this.provider = engine;
      this.provider.start();
    }
    const account = await this.getAccount();
    return { provider: this.provider, chainId: this.chainId, account };
  }

  public async getProvider(): Promise<Web3ProviderEngine> {
    return this.provider;
  }

  public async getChainId(): Promise<number> {
    return this.chainId;
  }

  public async getAccount(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.provider._providers[0].getAccounts(function (error: any, result: string[]) {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      });
    });
  }

  public deactivate() {
    if (this.provider) {
      this.provider.stop();
    }
  }
}
