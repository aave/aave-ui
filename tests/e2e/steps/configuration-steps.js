const MM = require('../../metamask/mm.control')
const MainPage = require('../pageobjects/main.page')
const TenderlyFork = require('../helpers/tenderly')
const Page = require('../pageobjects/page')
const config = require('../../config')
const constants= require('../fixtures/consts.json')
const {TENDERLY_ACCOUNT, TENDERLY_KEY, TENDERLY_PROJECT } = process.env;

const TENDERLY_SETUP = {
  tenderlyAccount: TENDERLY_ACCOUNT,
  tenderlyKey: TENDERLY_KEY,
  tenderlyProject: TENDERLY_PROJECT
}

const TENDERLY_SETUP_OPTIONS_ETH_MAINNET = {
  forkNetworkID: "1",
  chainID: "3030",
  networkName: "tenderly_mainnet",
  currencySymbol: "ETH"
}

const TENDERLY_SETUP_OPTIONS_POLYGON_MAINNET = {
  forkNetworkID: "137",
  chainID: "1338",
  networkName: "tenderly_polygon",
  currencySymbol: "MAITC"
}

const TENDERLY_SETUP_OPTIONS_AVALANCHE_MAINNET = {
  forkNetworkID: "43114",
  chainID: "3030",
  networkName: "tenderly_avalanche",
  currencySymbol: "AVAX"
}

const DEFAULT_TEST_ACCOUNT = {
  privateKey: "54c6ae44611f38e662093c9a3f4b26c3bf13f5b8adb02da1a76f321bd18efe92",
  address: "0x56FB278a7191bdf7C5d493765Fec03E6EAdF72f1"
}

const MM_POLYGON = {
  networkName: "Polygon",
  rpcUrl: "https://rpc-mainnet.maticvigil.com",
  chainID: "137",
  currencySymbol: "MATIC"
}

let configMMWithCustomNetwork = ({mmNetworkTitle, networkName, rpcUrl, chainID, currencySymbol = "ETH"}, privateKey = DEFAULT_TEST_ACCOUNT.privateKey) =>{
  MM.doMainSetup()
  MM.doSetupCustomNetwork({
    networkName,
    rpcUrl,
    chainID,
    currencySymbol
  })
  MM.doImportAccount(privateKey)
  MM.doCloseMetamaskTab()
}

let configMMWithDefaultNetwork = (mmNetwork, privateKey) => {
  MM.doMainSetup()
  switch(mmNetwork) {
    case constants.networks.Kovan:
      MM.doSwitchNetwork(constants.networks.Kovan)
      break;
    default:
      break;
  }
  MM.doImportAccount(privateKey)
  MM.doCloseMetamaskTab()
}

let configAave=(market, forkNetworkID = null , forkRPCUrl = null)=>{
  const page = new Page();
  MainPage.doSwitchToAave()
  page.doSetupLocalStorage('fork_enabled', 'true') // this row should be in "if", but now we have internal loader if don't use it as defoult
  page.doSetupLocalStorage('polygon_fork_enabled', 'true')
  page.doSetupLocalStorage('avalanche_fork_enabled', 'true')
  if(forkNetworkID != null && forkRPCUrl != null){
    switch(market) {
      case constants.markets.aaveV2Fork:
        page.doSetupLocalStorage('forkNetworkId', forkNetworkID)
        page.doSetupLocalStorage('forkRPCUrl', forkRPCUrl)
        break;
      case constants.markets.ammFork:
        page.doSetupLocalStorage('forkNetworkId', forkNetworkID)
        page.doSetupLocalStorage('forkRPCUrl', forkRPCUrl)
        break;
      case constants.markets.polygonFork:
        page.doSetupLocalStorage('polygonForkNetworkId', forkNetworkID)
        page.doSetupLocalStorage('polygonForkRPCUrl', forkRPCUrl)
        break;
      case constants.markets.avalancheFork:
        page.doSetupLocalStorage('avalancheForkNetworkId', forkNetworkID)
        page.doSetupLocalStorage('avalancheForkRPCUrl', forkRPCUrl)
        break;
    }
  }
  MainPage.doSwitchMarket(market)
  MainPage.doConnectWithMM()
  MM.doSwitchToMetamaskNotificationWindow()
  MM.doConnect()
  MainPage.doSwitchToAave()
  MainPage.doAcceptCookie()
}


let configEnvWithTenderly = ({setupOptions, market, account}) =>{
  const _networkOptions = {
    ...setupOptions,
    ...TENDERLY_SETUP
  }
  const tenderlyFork = new TenderlyFork({
    ..._networkOptions
  })
  before( 'setup tenderly',async () => {
    await tenderlyFork.init()
    await tenderlyFork.add_balance(account.address, 10000)
  })
  before( ()=>{
    console.log("ENV: " + config.URL)
    MainPage.open();
    let _forkRPCUrl = tenderlyFork.get_rpc_url()
    console.log("_forkRPCUrl " + _forkRPCUrl )
    configMMWithCustomNetwork({
          ..._networkOptions,
          rpcUrl: _forkRPCUrl
        },
        account.privateKey
    )
    configAave(market, _networkOptions.chainID, _forkRPCUrl)
    console.log("main setup successfully done")
  })
  after(async ()=>{
    await tenderlyFork.deleteFork()
  })
}

module.exports.configTestWithTenderlyMainnetFork = ({
  market = constants.markets.aaveV2Fork,
  account = DEFAULT_TEST_ACCOUNT
}) => {
  console.log("mainnet " + DEFAULT_TEST_ACCOUNT.address)
  configEnvWithTenderly({
    setupOptions: TENDERLY_SETUP_OPTIONS_ETH_MAINNET,
    market: market,
    account: account
  })
}

module.exports.configTestWithTenderlyPolygonFork = (account = DEFAULT_TEST_ACCOUNT) => {
  configEnvWithTenderly({
    setupOptions: TENDERLY_SETUP_OPTIONS_POLYGON_MAINNET,
    market: constants.markets.polygonFork,
    account: account
  })
}

module.exports.configTestWithTenderlyAvalancheFork = (account = DEFAULT_TEST_ACCOUNT) => {
  console.log("avalanche " + DEFAULT_TEST_ACCOUNT.address)
  configEnvWithTenderly({
    setupOptions: TENDERLY_SETUP_OPTIONS_AVALANCHE_MAINNET,
    market: constants.markets.avalancheFork,
    account: account
  })
}