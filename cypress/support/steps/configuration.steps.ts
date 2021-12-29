import { TenderlyFork, DEFAULT_TEST_ACCOUNT } from '../tools/tenderly';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { CustomizedBridge } from '../tools/bridge';
import forkNetworks from '../../fixtures/fork-networks.json';
import { AsyncTool } from '../tools/async.tool';

const URL = Cypress.env('URL');
const PERSIST_FORK_AFTER_RUN = Cypress.env('PERSIST_FORK_AFTER_RUN');

const configEnvWithTenderly = ({
  network,
  market,
  tokens,
  account,
}: {
  network: { networkID: number; forkChainID: number; chainID: number };
  market: string;
  tokens?: string[];
  account: { privateKey: string; address: string };
}) => {
  const tenderly = new TenderlyFork({ forkNetworkID: network.networkID });
  before(async () => {
    await tenderly.init();
    await tenderly.add_balance(account.address, 10000);
    if (tokens) {
      const asyncTool = new AsyncTool();
      await asyncTool.asyncForEach(
        tokens,
        async (token: { address: string; shortName: string; fullName: string }) => {
          await tenderly.getERC20Token(account.address, token.address);
        }
      );
    }
  });
  before('Open main page', () => {
    const rpc = tenderly.get_rpc_url();
    const provider = new JsonRpcProvider(rpc, network.forkChainID);
    const signer = new Wallet(account.privateKey, provider);
    cy.visit(URL, {
      onBeforeLoad(win: any) {
        win.ethereum = new CustomizedBridge(signer, provider);
        win.localStorage.setItem('forkEnabled', 'true');
        // forks are always expected to run on chainId 3030
        win.localStorage.setItem('forkNetworkId', '3030');
        win.localStorage.setItem('forkBaseChainId', network.chainID);
        win.localStorage.setItem('forkRPCUrl', rpc);
        win.localStorage.setItem('currentProvider', 'browser');
        win.localStorage.setItem('selectedAccount', account.address.toLowerCase());
        win.localStorage.setItem('selectedMarket', market);
      },
    });
  });
  after(async () => {
    if (!PERSIST_FORK_AFTER_RUN) await tenderly.deleteFork();
  });
};

export const configEnvWithTenderlyMainnetFork = ({
  market = `fork_proto_mainnet`,
  network = forkNetworks.ethereum,
  tokens,
  account = DEFAULT_TEST_ACCOUNT,
}: {
  market?: string;
  network?: { networkID: number; forkChainID: number; chainID: number };
  tokens?: any[];
  account?: { privateKey: string; address: string };
}) => {
  configEnvWithTenderly({ network, market, tokens, account });
};

export const configEnvWithTenderlyPolygonFork = ({
  market = `fork_proto_matic`,
  network = forkNetworks.polygon,
  tokens,
  account = DEFAULT_TEST_ACCOUNT,
}: {
  market?: string;
  network?: { networkID: number; forkChainID: number; chainID: number };
  tokens?: any[];
  account?: { privateKey: string; address: string };
}) => {
  configEnvWithTenderly({ network, market, tokens, account });
};

export const configEnvWithTenderlyAvalancheFork = ({
  market = `fork_proto_avalanche`,
  network = forkNetworks.avalanche,
  tokens,
  account = DEFAULT_TEST_ACCOUNT,
}: {
  market?: string;
  network?: { networkID: number; forkChainID: number; chainID: number };
  tokens?: any[];
  account?: { privateKey: string; address: string };
}) => {
  configEnvWithTenderly({ network, market, tokens, account });
};
