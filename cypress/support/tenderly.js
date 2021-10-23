const axios = require('axios');

export const DEFAULT_TEST_ACCOUNT = {
  privateKey: '0x54c6ae44611f38e662093c9a3f4b26c3bf13f5b8adb02da1a76f321bd18efe92',
  address: '0x56FB278a7191bdf7C5d493765Fec03E6EAdF72f1',
};

const TENDERLY_KEY = Cypress.env('TENDERLY_KEY');
const TENDERLY_ACCOUNT = Cypress.env('TENDERLY_ACCOUNT');
const TENDERLY_PROJECT = Cypress.env('TENDERLY_PROJECT');

const tenderly = axios.create({
  baseURL: 'https://api.tenderly.co/api/v1/',
  headers: {
    'X-Access-Key': TENDERLY_KEY,
  },
});

export class TenderlyFork {
  constructor({ forkNetworkID }) {
    this._forkNetworkID = forkNetworkID.toString();
    this._chainID = 3030;
  }

  async init() {
    const response = await tenderly.post(
      `account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT}/fork`,
      {
        network_id: this._forkNetworkID,
        chain_config: { chain_id: this._chainID },
      }
    );
    this.fork_id = response.data.simulation_fork.id;
  }

  get_rpc_url() {
    if (!this.fork_id) throw new Error('Fork not initialized!');
    return `https://rpc.tenderly.co/fork/${this.fork_id}`;
  }

  async add_balance(address, amount) {
    if (!this.fork_id) throw new Error('Fork not initialized!');
    tenderly.post(
      `account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT}/fork/${this.fork_id}/balance`,
      { accounts: [address], amount: amount }
    );
  }

  async deleteFork() {
    await tenderly.delete(
      `account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT}/fork/${this.fork_id}`
    );
  }
}
