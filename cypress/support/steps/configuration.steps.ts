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
  account = DEFAULT_TEST_ACCOUNT,
}: {
  chainId: number;
  market: string;
  tokens?: { address: string }[];
  account?: { address: string; privateKey: string };
}) => {
  const tenderly = new TenderlyFork({ forkNetworkID: chainId });
  before(async () => {
    await tenderly.init();
    await tenderly.add_balance(account.address, 10000);
    if (tokens) {
      await Promise.all(
        tokens.map((token) => tenderly.getERC20Token(account.address, token.address))
      );
    }
  });
  before('Open main page', () => {
    const rpc = tenderly.get_rpc_url();
    const provider = new JsonRpcProvider(rpc, 3030);
    const signer = new Wallet(account.privateKey, provider);
    cy.visit(URL, {
      onBeforeLoad(win: any) {
        win.ethereum = new CustomizedBridge(signer, provider);
        win.localStorage.setItem('forkEnabled', 'true');
        // forks are always expected to run on chainId 3030
        win.localStorage.setItem('forkNetworkId', '3030');
        win.localStorage.setItem('forkBaseChainId', chainId);
        win.localStorage.setItem('forkRPCUrl', rpc);
        win.localStorage.setItem('currentProvider', 'browser');
        win.localStorage.setItem('selectedAccount', account.address.toLowerCase());
        win.localStorage.setItem('selectedMarket', market);
      },
    });
  });
  after(async () => {
    // if (!PERSIST_FORK_AFTER_RUN) await tenderly.deleteFork();
  });
};

export const configEnvWithTenderlyMainnetFork = ({
  market = `fork_proto_mainnet`,
  tokens,
}: {
  market?: string;
  tokens?: any[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.mainnet, market, tokens });
};

export const configEnvWithTenderlyPolygonFork = ({
  market = `fork_proto_matic`,
  tokens,
}: {
  market?: string;
  tokens?: any[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.polygon, market, tokens });
};

export const configEnvWithTenderlyAvalancheFork = ({
  market = `fork_proto_avalanche`,
  tokens,
}: {
  market?: string;
  tokens?: any[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.avalanche, market, tokens });
};

export const configEnvWithTenderlyArbitrumRinkebyFork = ({
  market = `fork_proto_arbitrum_rinkeby`,
  tokens,
  account,
}: {
  market?: string;
  tokens?: any[];
  account?: { address: string; privateKey: string };
}) => {
  configEnvWithTenderly({ chainId: ChainId.arbitrum_rinkeby, market, tokens, account });
};
