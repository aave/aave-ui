require("dotenv").config();
const axios = require("axios");
const {ethers} = require("ethers");
const ERC20_ABI = require("../fixtures/erc20_abi.json")


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

  async getERC20Token(walletAddress, tokenAddress){
    let _url = this.get_rpc_url();
    let provider = ethers.getDefaultProvider(_url);
    const TOP_HOLDER_ADDRESS = await this.getTopHolder(tokenAddress);
    const topHolderSigner = await provider.getSigner(TOP_HOLDER_ADDRESS)
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, topHolderSigner);
// Transfer 1000 AAVE
    await token.transfer(walletAddress, ethers.utils.parseEther('1000'))
  }

  async getTopHolder(token){
    const res = (await axios.get(
      `https://ethplorer.io/service/service.php?data=${token}&page=tab%3Dtab-holders%26pageSize%3D10%26holders%3D1`
    )).data.holders[0].address;
    return res;
  };

  async deleteFork() {
    await this._tenderly.delete(
      `account/${this._tenderlyAccount}/project/${this._tenderlyProject}/fork/${this.fork_id}`
    );
  }
}
