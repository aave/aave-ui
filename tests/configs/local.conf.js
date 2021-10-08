const STREAMS =  parseInt(process.env.STREAMS, 10) || 1

exports.config = {
  runner: 'local',
  specs: [
    './e2e/specs/**/*.test.js',
  ],
  exclude: [
  ],
  maxInstances: STREAMS,
  capabilities: [{
    maxInstances: STREAMS,
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
    timeout: 90000,
  },
  beforeTest: function () {
    const chai = require('chai')
    global.assert = chai.assert
    global.should = chai.should
    global.expect = chai.expect
  },
}
