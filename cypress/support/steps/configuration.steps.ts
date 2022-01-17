import { TenderlyFork, DEFAULT_TEST_ACCOUNT } from '../tools/tenderly';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { CustomizedBridge } from '../tools/bridge';
import { ChainId } from '@aave/contract-helpers';

const URL = Cypress.env('URL');
const PERSIST_FORK_AFTER_RUN = Cypress.env('PERSIST_FORK_AFTER_RUN');

export const configEnvWithTenderly = ({
  chainId,
  market,
  tokens,
  wallet,
}: {
  chainId: number;
  market: string;
  tokens?: { address: string }[];
  wallet: {address: string, privateKey: string}
}) => {
  const tenderly = new TenderlyFork({ forkNetworkID: chainId });
  before(async () => {
    await tenderly.init();
    await tenderly.add_balance(DEFAULT_TEST_ACCOUNT.address, 10000);
    if (tokens) {
      await Promise.all(
        tokens.map((token) => tenderly.getERC20Token(DEFAULT_TEST_ACCOUNT.address, token.address))
      );
    }
  });
  before('Open main page', () => {
    const rpc = tenderly.get_rpc_url();
    const provider = new JsonRpcProvider(rpc, 3030);
    const signer = new Wallet(DEFAULT_TEST_ACCOUNT.privateKey, provider);
    cy.visit(URL, {
      onBeforeLoad(win: any) {
        win.ethereum = new CustomizedBridge(signer, provider);
        win.localStorage.setItem('forkEnabled', 'true');
        // forks are always expected to run on chainId 3030
        win.localStorage.setItem('forkNetworkId', '3030');
        win.localStorage.setItem('forkBaseChainId', chainId);
        win.localStorage.setItem('forkRPCUrl', rpc);
        win.localStorage.setItem('currentProvider', 'browser');
        win.localStorage.setItem('selectedAccount', DEFAULT_TEST_ACCOUNT.address.toLowerCase());
        win.localStorage.setItem('selectedMarket', market);
      },
    });
  });
  after(async () => {
    // if (!PERSIST_FORK_AFTER_RUN) await tenderly.deleteFork();
  });
};

export const configEnvWithNetworks = ({
  chainID,
  rpc,
  market,
  wallet
}:{
  chainID: number;
  rpc: string;
  market: string;
  wallet: { address: string, privateKey: string}
}) => {
  before('Open main page', () => {
    const provider = new JsonRpcProvider(rpc, chainID);
    const signer = new Wallet(wallet.privateKey, provider);
    cy.visit(URL, {
      onBeforeLoad(win: any) {
        win.ethereum = new CustomizedBridge(signer, provider, chainID);
        win.localStorage.setItem('preferredChainId', chainID.toString());
        win.localStorage.setItem('currentProvider', 'browser');
        win.localStorage.setItem('selectedAccount', wallet.address.toLowerCase());
        win.localStorage.setItem('selectedMarket', market);
      },
    });
  });
  after(async () => {
    // if (!PERSIST_FORK_AFTER_RUN) await tenderly.deleteFork();
  });
}

export const configEnvWithTenderlyMainnetFork = ({
  market = `fork_proto_mainnet`,
  tokens,
  wallet = DEFAULT_TEST_ACCOUNT,
}: {
  market?: string;
  tokens?: any[];
  wallet?: { address: string; privateKey: string };
}) => {
  configEnvWithTenderly({ chainId: ChainId.mainnet, market, tokens, wallet });
};

export const configEnvWithTenderlyPolygonFork = ({
  market = `fork_proto_matic`,
  tokens,
  wallet = DEFAULT_TEST_ACCOUNT,
}: {
  market?: string;
  tokens?: any[];
  wallet?: { address: string; privateKey: string };
}) => {
  configEnvWithTenderly({ chainId: ChainId.polygon, market, tokens, wallet });
};

export const configEnvWithTenderlyAvalancheFork = ({
  market = `fork_proto_avalanche`,
  tokens,
  wallet = DEFAULT_TEST_ACCOUNT,
}: {
  market?: string;
  tokens?: any[];
  wallet?: { address: string, privateKey: string};
}) => {
  configEnvWithTenderly({ chainId: ChainId.avalanche, market, tokens, wallet });
};

export const configEnvWithArbitrumRinkeby = ({
  market = `proto_arbitrum_rinkeby`,
  rpc = `https://rinkeby.arbitrum.io/rpc`,
  chainID = 421611,
  wallet = DEFAULT_TEST_ACCOUNT,
}:{
  market?: string;
  rpc?: string;
  chainID?: number;
  wallet?: { address: string, privateKey: string};
}) => {
  configEnvWithNetworks({ chainID, rpc, market, wallet})
}
