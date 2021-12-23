import { TenderlyFork, DEFAULT_TEST_ACCOUNT } from '../tools/tenderly';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { CustomizedBridge } from '../tools/bridge';
import forkNetworks from '../../fixtures/fork-networks.json';

const URL = Cypress.env('URL');

const configEnvWithTenderly = ({
  network,
  market,
}: {
  network: { networkID: number; forkChainID: number; chainID: number };
  market: string;
}) => {
  const tenderly = new TenderlyFork({ forkNetworkID: network.networkID });
  before(async () => {
    await tenderly.init();
    await tenderly.add_balance(DEFAULT_TEST_ACCOUNT.address, 10000);
  });
  before('Open main page', () => {
    const rpc = tenderly.get_rpc_url();
    const provider = new JsonRpcProvider(rpc, network.forkChainID);
    const signer = new Wallet(DEFAULT_TEST_ACCOUNT.privateKey, provider);
    cy.visit(URL, {
      onBeforeLoad(win: any) {
        win.ethereum = new CustomizedBridge(signer, provider);
        win.localStorage.setItem('forkEnabled', 'true');
        // forks are always expected to run on chainId 3030
        win.localStorage.setItem('forkNetworkId', '3030');
        win.localStorage.setItem('forkBaseChainId', network.chainID);
        win.localStorage.setItem('forkRPCUrl', rpc);
        win.localStorage.setItem('currentProvider', 'browser');
        win.localStorage.setItem('selectedAccount', DEFAULT_TEST_ACCOUNT.address.toLowerCase());
        win.localStorage.setItem('selectedMarket', market);
      },
    });
  });
  after(async () => {
    await tenderly.deleteFork();
  });
};

export const configEnvWithTenderlyMainnetFork = ({
  market = `fork_proto_mainnet`,
  network = forkNetworks.ethereum,
}: {
  market?: string;
  network?: { networkID: number; forkChainID: number; chainID: number };
}) => {
  configEnvWithTenderly({ network, market });
};
