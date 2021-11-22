const Page = require('./page');
const elemUtil = require('../util/elementUtil');
const config = require('../../config');
const constants = require('../fixtures/consts.json');

const locators = {
  preloadLoader: "//div[contains(@class, 'Preloader__dots')]",
  connectBtn:
    "//div[contains(@class, 'Menu__buttons-inner')]//div[contains(@class, 'ConnectButton__inner')]",
  extensionConnectBtn: '//*[text()="Browser Wallet"]',
  marketSelectBtn:
    "//div[contains(@class, 'Menu__buttons-inner')]//div[contains(@class, 'MarketSwitcher__button-content')]",
  marketsBtnsList: {
    aaveV2ForkBtn:
      "//div[contains(@class, 'Menu__buttons-inner')]//img[@alt='fork_proto_mainnet']/../..",
    polygonBtn: "//div[contains(@class, 'Menu__buttons-inner')]//img[@alt='proto_matic']/../..",
    polygonForkBtn:
      "//div[contains(@class, 'Menu__buttons-inner')]//img[@alt='fork_proto_matic']/../..",
    ammForkBtn: "//div[contains(@class, 'Menu__buttons-inner')]//img[@alt='fork_amm_mainnet']/../..",
    aaveV2KovanBtn: "//div[contains(@class, 'Menu__buttons-inner')]//img[@alt='proto_kovan']/../..",
    avalancheForkBtn:
      "//div[contains(@class, 'Menu__buttons-inner')]//img[@alt='fork_proto_avalanche']/../..",
  },
};

class MainPage extends Page {
  get loader() {
    return $(locators.preloadLoader);
  }
  get connectBtn() {
    return $(locators.connectBtn);
  }
  get extensionConnectBtn() {
    return $(locators.extensionConnectBtn);
  }
  get marketSelectBtn() {
    return $(locators.marketSelectBtn);
  }
  get aaveV2ForkBtnBurger() {
    return $(locators.marketsBtnsList.aaveV2ForkBtn);
  }
  get polygonBtnBurger() {
    return $(locators.marketsBtnsList.polygonBtn);
  }
  get polygonForkBtnBurger() {
    return $(locators.marketsBtnsList.polygonForkBtn);
  }
  get ammForkBtnBurger() {
    return $(locators.marketsBtnsList.ammForkBtn);
  }
  get aaveV2KovanBtnBurger() {
    return $(locators.marketsBtnsList.aaveV2KovanBtn);
  }
  get avalancheForkBtnBurger() {
    return $(locators.marketsBtnsList.avalancheForkBtn);
  }

  open(path) {
    return super.open(path);
  }

  doSwitchToAave() {
    browser.switchWindow(config.URL);
  }

  doConnectWithMM() {
    elemUtil.doClick(this.connectBtn);
    elemUtil.doClick(this.extensionConnectBtn);
  }

  doWaitLoaderComplete(timeout = 50000) {
    browser.waitUntil(() => $$(locators.preloadLoader).length == 0, {
      timeout: timeout,
      timeoutMsg: 'loader not compited',
    });
  }

  doWaitLoader(timeout = 30000) {
    elemUtil.doIsDisplayed(this.loader);
    this.doWaitLoaderComplete();
  }

  doSwitchMarket(marketName) {
    elemUtil.doClick(this.marketSelectBtn);
    browser.pause(1000);
    switch (marketName) {
      case constants.markets.aaveV2Fork:
        elemUtil.doClick(this.aaveV2ForkBtnBurger);
        break;
      case constants.markets.polygon:
        elemUtil.doClick(this.polygonBtnBurger);
        break;
      case constants.markets.polygonFork:
        elemUtil.doClick(this.polygonForkBtnBurger);
        break;
      case constants.markets.ammFork:
        elemUtil.doClick(this.ammForkBtnBurger);
        break;
      case constants.markets.aaveV2Kovan:
        elemUtil.doClick(this.aaveV2KovanBtnBurger);
        break;
      case constants.markets.avalancheFork:
        elemUtil.doClick(this.avalancheForkBtnBurger);
        break;
    }
    browser.pause(2000);
    // need to add recheck of switching
  }
}

module.exports = new MainPage();
