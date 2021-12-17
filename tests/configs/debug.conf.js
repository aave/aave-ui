const spawn = require('child_process').spawn
const fsExtra = require('fs-extra')
const runHH = false;

const replaceFreshCache=()=>{
  let cashDir = __dirname + "/hardhat-node/cache"
  let freshCashDir = __dirname + "/hardhat-node/fresh-cache"
  try{
    fsExtra.emptyDirSync(cashDir)
    fsExtra.copySync(freshCashDir, cashDir)
    console.log('Cache was updated successfully')
  }catch(err){
    console.log(`Cache wasn't updated, error: `+ err)
  }
}

const runHardHat=()=>{
  spawn('cd hardhat-node/; npx hardhat --max-memory 8000 node --hostname localhost --port 8545',
    {shell:true})
  setTimeout(() => {
  }, 7000);
}

const stopHardHat=()=>{
  spawn('kill -9 $(lsof -t -i:8545)', {shell:true})
}

exports.config = {
  runner: 'local',
  specs: [
    './e2e/specs/**/*.test.js',
  ],
  exclude: [
    // './e2e/specs/mainMarket/assets/eth.test.js',
    './e2e/specs/mainMarket/assets/usdc.test.js',
    './e2e/specs/mainMarket/assets/dai.test.js',
    './e2e/specs/mainMarket/assets/bat.test.js',
    './e2e/specs/mainMarket/assets/usdt.test.js',
    './e2e/specs/mainMarket/assets/tusd.test.js',
    './e2e/specs/mainMarket/assets/mkr.test.js',
    './e2e/specs/mainMarket/assets/ren.test.js',
    './e2e/specs/mainMarket/assets/mana.test.js',
    './e2e/specs/mainMarket/reward.test.js',
    './e2e/specs/mainMarket/swap.test.js',
    './e2e/specs/mainMarket/stake.test.js',

    './e2e/specs/polygonMarket/assets/matic.polygon.test.js',
    './e2e/specs/polygonMarket/assets/dai.polygon.test.js',
    './e2e/specs/polygonMarket/assets/usdc.polygon.test.js',
    './e2e/specs/polygonMarket/assets/usdt.polygon.test.js',
    './e2e/specs/polygonMarket/assets/weth.polygon.test.js',
    './e2e/specs/polygonMarket/assets/wbtc.polygon.test.js',
    './e2e/specs/polygonMarket/reward.polygon.test.js',
    './e2e/specs/polygonMarket/swap.polygon.test.js',

    './e2e/specs/ammMarket/assets/eth.test.js',
    './e2e/specs/ammMarket/assets/usdc.test.js',
    './e2e/specs/ammMarket/assets/dai.test.js',
    './e2e/specs/ammMarket/assets/usdt.test.js',

    './e2e/specs/avalancheMarket/assets/avax.avalanche.test.js',
    './e2e/specs/avalancheMarket/assets/dai.avalanche.test.js',
    './e2e/specs/avalancheMarket/assets/usdc.avalanche.test.js',
    './e2e/specs/avalancheMarket/assets/usdt.avalanche.test.js',
    './e2e/specs/avalancheMarket/assets/weth.avalanche.test.js',
    './e2e/specs/avalancheMarket/assets/wbtc.avalanche.test.js',
    './e2e/specs/avalancheMarket/reward.avalanche.test.js',
    './e2e/specs/avalancheMarket/swap.avalanche.test.js',

    './e2e/specs/mainMarket/stake.kovan.test.js',
  ],
  maxInstances: 1,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--window-size=1920,1080',
        '--load-extension=./metamask/metamaskChrome',
      ],
    },
    acceptInsecureCerts: true
  }],
  logLevel: 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 9000000,
  },
  onPrepare: function () {
    if(runHH){
      replaceFreshCache()
      runHardHat()
    }
  },
  onComplete: function () {
    if(runHH) {
      stopHardHat()
    }
  },
  beforeTest: function () {
    const chai = require('chai')
    global.assert = chai.assert
    global.should = chai.should
    global.expect = chai.expect
  },
}
