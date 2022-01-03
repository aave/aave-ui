import { Eip1193Bridge } from '@ethersproject/experimental/lib/eip1193-bridge';
import { JsonRpcProvider } from '@ethersproject/providers';

export class CustomizedBridge extends Eip1193Bridge {
  chainId = 3030;

  async sendAsync(...args: any[]) {
    console.debug('sendAsync called', ...args);
    return this.send(...args);
  }

  async send(...args: any[]) {
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
    if (method === 'eth_sendTransaction') {
      if (!this.signer) {
        throw new Error('eth_sendTransaction requires an account');
      }

      const req = JsonRpcProvider.hexlifyTransaction(
        // @ts-ignore
        params[0],
        { from: true, gas: true }
      );
      const tx = await this.signer.sendTransaction(req);
      return tx.hash;
    }
    try {
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
