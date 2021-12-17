import { TenderlyFork } from '../tools/tenderly';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { CustomizedBridge } from '../tools/bridge';

const markets = require('../../fixtures/markets.json');
const forkNetworks = require('../../fixtures/fork-networks.json');
const URL = Cypress.env('URL');
const DEFAULT_TEST_WALLET = {
  privateKey: '54c6ae44611f38e662093c9a3f4b26c3bf13f5b8adb02da1a76f321bd18efe92',
  address: '0x56FB278a7191bdf7C5d493765Fec03E6EAdF72f1',
};

let configEnvWithTenderly = ({ network, wallet, market }) => {
  const tenderly = new TenderlyFork({ forkNetworkID: network.networkID });
  let rpc,
    provider,
    signer;

  before('Setup for and prover:', async () => {
    await tenderly.init();
    await tenderly.add_balance(wallet.address, 10000);
    rpc = tenderly.get_rpc_url();
    provider = new JsonRpcProvider(rpc, network.forkChainID);
    signer = new Wallet(wallet.privateKey, provider);
  });
  before('Open main page', () => {
    cy.visit(URL, {
      onBeforeLoad(win) {
        win.ethereum = new CustomizedBridge(signer, provider);
        win.localStorage.setItem('fork_enabled', 'true');
        win.localStorage.setItem('forkNetworkId', network.forkChainID);
        win.localStorage.setItem('forkRPCUrl', rpc);
        // win.localStorage.setItem('forkBaseChainId', network.chainID)
        win.localStorage.setItem('currentProvider', 'browser');
        win.localStorage.setItem('selectedAccount', wallet.address.toLowerCase());
        win.localStorage.setItem('selectedMarket', market);
      },
    });
  });
  after(async () => {
    // await tenderly.deleteFork()
  });
};

module.exports.configEnvWithTenderlyMainnetFork = ({
                                                     market = markets.proto_fork,
                                                     wallet = DEFAULT_TEST_WALLET,
                                                     network = forkNetworks.ethereum,
                                                   }) => {
  configEnvWithTenderly({ network, wallet, market });
};
