/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// injects a web3 provider into the local window state

import { DEFAULT_TEST_ACCOUNT, TenderlyFork } from './tenderly';
import { Eip1193Bridge } from '@ethersproject/experimental/lib/eip1193-bridge';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { providers } from 'ethers';

class CustomizedBridge extends Eip1193Bridge {
  chainId = 3030;

  async sendAsync(...args) {
    console.debug('sendAsync called', ...args);
    return this.send(...args);
  }
  async send(...args) {
    console.debug('send called', ...args);
    const isCallbackForm = typeof args[0] === 'object' && typeof args[1] === 'function';
    let callback;
    let method;
    let params;
    console.log(args);
    if (isCallbackForm) {
      callback = args[1];
      method = args[0].method;
      params = args[0].params;
    } else {
      method = args[0];
      params = args[1];
    }
    if (method === 'eth_requestAccounts' || method === 'eth_accounts') {
      if (isCallbackForm) {
        callback({ result: [await this.signer.getAddress()] });
      } else {
        return Promise.resolve([await this.signer.getAddress()]);
      }
    }
    if (method === 'eth_chainId') {
      if (isCallbackForm) {
        callback(null, { result: this.chainId });
      } else {
        return Promise.resolve(this.chainId);
      }
    }
    if (method === 'eth_call') {
      const req = providers.JsonRpcProvider.hexlifyTransaction(
        // @ts-ignore
        params[0],
        { from: true }
      );
      return await this.provider.call(req, params[1]);
    }
    if (method === 'eth_sendTransaction') {
      if (!this.signer) {
        throw new Error('eth_sendTransaction requires an account');
      }

      const req = providers.JsonRpcProvider.hexlifyTransaction(
        // @ts-ignore
        params[0],
        { from: true, gas: true }
      );
      const tx = await this.signer.sendTransaction(req);
      return tx.hash;
    }
    try {
      if (params?.[0]) {
        const { gas, ...rest } = params[0];
        params[0] = { ...rest, gasLimit: gas };
      }
      console.log('sendTxn', method, params);
      const result = await super.send(method, params);
      console.debug('result received', method, params, result);
      if (isCallbackForm) {
        callback(null, { result });
      } else {
        return result;
      }
    } catch (error) {
      if (isCallbackForm) {
        callback(error, null);
      } else {
        throw error;
      }
    }
  }
}

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {
    onBeforeLoad: async function (win) {
      const tenderly = new TenderlyFork({ forkNetworkID: 1 });
      await tenderly.init();
      await tenderly.add_balance(DEFAULT_TEST_ACCOUNT.address, 10000);
      const rpc = tenderly.get_rpc_url();
      const provider = new JsonRpcProvider(rpc, 3030);
      const signer = new Wallet(DEFAULT_TEST_ACCOUNT.privateKey, provider);

      win.ethereum = new CustomizedBridge(signer, signer.provider);

      win.localStorage.setItem('fork_enabled', 'true');
      win.localStorage.setItem('forkNetworkId', '3030');
      win.localStorage.setItem('forkRPCUrl', rpc);
      // win.localStorage.setItem('polygon_fork_enabled', 'true');
      // win.localStorage.setItem('avalanche_fork_enabled', 'true');
      // win.localStorage.setItem('currentProvider', 'browser');
      // win.localStorage.setItem('selectedAccount', DEFAULT_TEST_ACCOUNT.address);
      win.localStorage.setItem('selectedMarket', 'proto_fork');
    },
    ...options,
  });
});
