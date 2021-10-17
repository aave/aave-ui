const Page = require('./page');
const elemUtil = require('../util/elementUtil')
const constants = require('../fixtures/consts.json')

const locators = {
  collateralRepayBtn: '//*[text()="With your current collateral"]',
  walletRepayBtn: '//*[text()="From your wallet balance"]'
};


class RepayPage extends Page {
  get collateralRepayBtn () { return $(locators.collateralRepayBtn) }
  get walletRepayBtn () { return $(locators.walletRepayBtn) }

  doCollateralOption(){
    elemUtil.doClick(this.collateralRepayBtn)
  }

  doWalletOption(){
    elemUtil.doClick(this.walletRepayBtn)
  }

  doChooseRepayOption(option){
    switch(option) {
      case constants.repayType.collateral:
        this.doCollateralOption()
        break;
      case constants.repayType.wallet:
        this.doWalletOption()
        break;
      case constants.repayType.default:
        break;
      default:
        this.doWalletOption()
        break;
    }
  }
}

module.exports = new RepayPage();
