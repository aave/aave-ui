import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
import {
  IFrameEthereumProvider,
  MinimalEventSourceInterface,
  MinimalEventTargetInterface,
} from '@ledgerhq/iframe-provider';
const __DEV__ = true;

export class UserRejectedRequestError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'The user rejected the request.';
  }
}

interface LedgerIFrameConnectorArguments {
  supportedChainIds: number[];
  targetOrigin?: string;
  timeoutMilliseconds?: number;
  eventSource?: MinimalEventSourceInterface;
  eventTarget?: MinimalEventTargetInterface;
}

export class LedgerIFrameConnector extends AbstractConnector {
  private readonly targetOrigin?: string;
  private readonly timeoutMilliseconds?: number;
  private readonly eventSource?: MinimalEventSourceInterface;
  private readonly eventTarget?: MinimalEventTargetInterface;

  public ledgerIFrameProvider?: IFrameEthereumProvider;

  constructor({
    supportedChainIds,
    targetOrigin,
    timeoutMilliseconds,
    eventSource,
    eventTarget,
  }: LedgerIFrameConnectorArguments) {
    super({ supportedChainIds });

    this.targetOrigin = targetOrigin;
    this.timeoutMilliseconds = timeoutMilliseconds;
    this.eventSource = eventSource;
    this.eventTarget = eventTarget;

    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  private handleChainChanged(chainId: number | string): void {
    if (__DEV__) {
      console.log("Handling 'chainChanged' event with payload", chainId);
    }
    this.emitUpdate({ chainId });
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (__DEV__) {
      console.log("Handling 'accountsChanged' event with payload", accounts);
    }
    this.emitUpdate({ account: accounts[0] });
  }

  private handleDisconnect(): void {
    if (__DEV__) {
      console.log("Handling 'disconnect' event");
    }
    this.emitDeactivate();
    // we have to do this because of a @walletconnect/web3-provider bug
    if (this.ledgerIFrameProvider) {
      // this.ledgerIFrameProvider.removeListener('chainChanged', this.handleChainChanged);
      // this.ledgerIFrameProvider.removeListener('accountsChanged', this.handleAccountsChanged);
      this.ledgerIFrameProvider = undefined;
    }

    // this.emitDeactivate();
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.ledgerIFrameProvider) {
      //TODO: add this improvement
      // const WalletConnectProvider = await import('@walletconnect/web3-provider').then(
      //   (m) => m?.default ?? m
      // );
      this.ledgerIFrameProvider = new IFrameEthereumProvider({
        targetOrigin: this.targetOrigin,
        timeoutMilliseconds: this.timeoutMilliseconds,
        eventSource: this.eventSource,
        eventTarget: this.eventTarget,
      });
    }

    const account = await this.ledgerIFrameProvider
      .enable()
      .then((accounts: string[]): string => accounts[0])
      .catch((error: Error) => {
        // TODO ideally this would be a better check
        //TODO: check the message   !!!!!!!!!!!!!!!
        console.log('error.message', error);
        if (error.message === 'User denied modal') {
          throw new UserRejectedRequestError();
        }

        throw error;
      });

    this.ledgerIFrameProvider.on('close', this.handleDisconnect);
    this.ledgerIFrameProvider.on('chainChanged', this.handleChainChanged);
    this.ledgerIFrameProvider.on('accountsChanged', this.handleAccountsChanged);

    return { provider: this.ledgerIFrameProvider, account };
  }

  public async getProvider(): Promise<IFrameEthereumProvider | undefined> {
    return this.ledgerIFrameProvider;
  }

  public async getChainId(): Promise<number | string> {
    if (this.ledgerIFrameProvider) return this.ledgerIFrameProvider.send('eth_chainId');
    throw new Error('ledgerIFrameProvider was not defined');
  }

  public async getAccount(): Promise<null | string> {
    if (this.ledgerIFrameProvider)
      return this.ledgerIFrameProvider
        .send('eth_accounts')
        .then((accounts: string[]): string => accounts[0]);
    throw new Error('ledgerIFrameProvider was not defined');
  }

  public deactivate() {
    if (this.ledgerIFrameProvider) {
      this.ledgerIFrameProvider.removeListener('close', this.handleDisconnect);
      this.ledgerIFrameProvider.removeListener('chainChanged', this.handleChainChanged);
      this.ledgerIFrameProvider.removeListener('accountsChanged', this.handleAccountsChanged);
    }
  }

  static async isLedgerIFrame() {
    const tempProvider = new IFrameEthereumProvider();
    const ledgerIFrame = await Promise.race([
      tempProvider.enable(),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);
    return !!ledgerIFrame;
  }
}
