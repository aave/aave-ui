require("dotenv").config();
const axios = require("axios");

module.exports = class TenderlyFork {

  constructor({forkNetworkID, chainID, tenderlyKey, tenderlyAccount, tenderlyProject}) {
    this._forkNetworkID = forkNetworkID || "1"
    this._chainID = chainID || "3030"
    this._tenderlyKey = tenderlyKey
    this._tenderlyAccount = tenderlyAccount
    this._tenderlyProject = tenderlyProject
    if (!this._tenderlyKey) throw new Error("Tenderly key not set!");
    if (!this._tenderlyAccount) throw new Error("Tenderly account not set!");
    if (!this._tenderlyProject ) throw new Error("Tenderly project not set!");
  }

  async init() {
    this._tenderly = axios.create({
      baseURL: "https://api.tenderly.co/api/v1/",
      headers: {
        "X-Access-Key": this._tenderlyKey,
      },
    });
    const response = await this._tenderly.post(
      `account/${this._tenderlyAccount}/project/${this._tenderlyProject}/fork`,
      { network_id: this._forkNetworkID, chain_config: { chain_id: Number(this._chainID) } }
    );
    this.fork_id = response.data.simulation_fork.id;
  }

  get_rpc_url() {
    if (!this.fork_id) throw new Error("Fork not initialized!");
    return `https://rpc.tenderly.co/fork/${this.fork_id}`;
  }

   async add_balance(address, amount) {
    if (!this.fork_id) throw new Error("Fork not initialized!");
    this._tenderly.post(
        `account/${this._tenderlyAccount}/project/${this._tenderlyProject}/fork/${this.fork_id}/balance`,
        { accounts: [address], amount: amount }
    );
  }

  async deleteFork() {
    await this._tenderly.delete(
      `account/${this._tenderlyAccount}/project/${this._tenderlyProject}/fork/${this.fork_id}`
    );
  }
}
