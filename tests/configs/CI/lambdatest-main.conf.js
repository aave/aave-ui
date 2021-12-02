require('dotenv').config();
const build = process.env.BUILD || 'Empty build'
const LAMBDATEST_ACCOUNT = process.env.LAMBDATEST_ACCOUNT
const LAMBDATEST_KEY = process.env.LAMBDATEST_KEY

const SPEC_LIST = {
  aaveMarket: {
    baseAsset: './e2e/specs/mainMarket/assets/eth.test.js',
    stableAssets: [
      './e2e/specs/mainMarket/assets/usdc.test.js',
      './e2e/specs/mainMarket/assets/dai.test.js',
      './e2e/specs/mainMarket/assets/usdt.test.js',
      './e2e/specs/mainMarket/assets/tusd.test.js',
      './e2e/specs/mainMarket/assets/ren.test.js',
      './e2e/specs/mainMarket/assets/mana.test.js',
      './e2e/specs/mainMarket/assets/mkr.test.js',
    ],
    variableAssets: [
      './e2e/specs/mainMarket/assets/bat.test.js',
    ],
    reward: './e2e/specs/mainMarket/reward.test.js',
    stake: './e2e/specs/mainMarket/stake.test.js',
    swap: './e2e/specs/mainMarket/swap.test.js'
  },
  polygonMarket: {
    baseAsset: './e2e/specs/polygonMarket/assets/matic.polygon.test.js',
    otherAssets: [
      './e2e/specs/polygonMarket/assets/dai.polygon.test.js',
      './e2e/specs/polygonMarket/assets/usdc.polygon.test.js',
      './e2e/specs/polygonMarket/assets/usdt.polygon.test.js',
      './e2e/specs/polygonMarket/assets/wbtc.polygon.test.js',
      './e2e/specs/polygonMarket/assets/weth.polygon.test.js',
    ],
    reward: './e2e/specs/polygonMarket/reward.polygon.test.js',
    swap: './e2e/specs/polygonMarket/swap.polygon.test.js'
  },
  ammMarket: {
    assets: [
      './e2e/specs/ammMarket/assets/eth.test.js',
      './e2e/specs/ammMarket/assets/usdc.test.js',
      './e2e/specs/ammMarket/assets/dai.test.js',
      './e2e/specs/ammMarket/assets/usdt.test.js',
    ]
  },
  avalancheMarket: {
    baseAsset: './e2e/specs/avalancheMarket/assets/avax.avalanche.test.js',
    assets: [
      './e2e/specs/avalancheMarket/assets/dai.avalanche.test.js',
      './e2e/specs/avalancheMarket/assets/usdc.avalanche.test.js',
      './e2e/specs/avalancheMarket/assets/usdt.avalanche.test.js',
      './e2e/specs/avalancheMarket/assets/weth.avalanche.test.js',
      './e2e/specs/avalancheMarket/assets/wbtc.avalanche.test.js',
    ],
    reward:'./e2e/specs/avalancheMarket/reward.avalanche.test.js',
    swap: './e2e/specs/avalancheMarket/swap.avalanche.test.js'
  }
}


let executionList = () => {
  let random = (maxValue) =>{
    return Math.floor(Math.random() * maxValue)
  }
  let _specs = []
  _specs.push(SPEC_LIST.aaveMarket.baseAsset)
  _specs.push(SPEC_LIST.aaveMarket.stableAssets[random(SPEC_LIST.aaveMarket.stableAssets.length)])
  _specs.push(SPEC_LIST.aaveMarket.variableAssets[random(SPEC_LIST.aaveMarket.variableAssets.length)])
  _specs.push(SPEC_LIST.aaveMarket.reward)
  _specs.push(SPEC_LIST.aaveMarket.swap)
  _specs.push(SPEC_LIST.aaveMarket.stake)
  _specs.push(SPEC_LIST.polygonMarket.baseAsset)
  _specs.push(SPEC_LIST.polygonMarket.otherAssets[random(SPEC_LIST.polygonMarket.otherAssets.length)])
  _specs.push(SPEC_LIST.polygonMarket.reward)
  _specs.push(SPEC_LIST.polygonMarket.swap)
  _specs.push(SPEC_LIST.ammMarket.assets[random(SPEC_LIST.ammMarket.assets.length)])
  _specs.push(SPEC_LIST.avalancheMarket.baseAsset)
  _specs.push(SPEC_LIST.avalancheMarket.assets[random(SPEC_LIST.avalancheMarket.assets.length)])
  _specs.push(SPEC_LIST.avalancheMarket.reward)
  _specs.push(SPEC_LIST.avalancheMarket.swap)
  return _specs
}

exports.config = {
  updateJob: false,
  user: LAMBDATEST_ACCOUNT,
  key: LAMBDATEST_KEY,
  specs: executionList(),
  exclude: [],
  maxInstances: 5,
  specFileRetries: 2,
  capabilities: [{
    alwaysMatch: {
      browserName: "Chrome",
      build: build,
      platform: "Windows 10",
      version: "88.0",
      resolution: "1680x1050",
      console: true,
      'lambda:loadExtension': ["https://automation-prod-user-files.s3.amazonaws.com/extensions/orgId-466615/metamaskChrome.zip"],
        'goog:chromeOptions': {
          'args': [
            '--window-size=1680x1050',
          ],
        },
      }
  }],
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  baseUrl: '',
  waitforTimeout: 600000,
  connectionRetryTimeout: 300000,
  connectionRetryCount: 5,
  path: '/wd/hub',
  hostname: 'hub.lambdatest.com',
  port: 80,

  beforeSession: function (config, capabilities, specs) {
    capabilities.alwaysMatch.name=specs[0].split(/(\\|\/)/g).pop() || undefined
  },

  beforeTest: function () {
    const chai = require('chai')
    global.assert = chai.assert
    global.should = chai.should
    global.expect = chai.expect
  },
  after: function (result, capabilities, specs) {
    driver.execute("lambda-status=".concat(result==0?"passed":"failed"),undefined);
  },
  reporters: ['spec'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 500000
  }
}
