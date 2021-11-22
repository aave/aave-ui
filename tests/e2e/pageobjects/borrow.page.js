const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')

const locators = {
  table: "//div[contains(@class, 'BasicTable__content-inner')]",
  noCollateralMessage: "//div[contains(@class, 'jsx-2524701549 jsx-857932068 Caption__description')]",
};


class BorrowPage extends Page {
  get assetTable () { return $(locators.table) }
  get noColMsg () {return $(locators.noCollateralMessage)}

  open() {
    return super.open("/borrow");
  }

  doCheckBorrowErrorMessage(){
    let _locator = this.noColMsg
    let _actualMessage = elemUtil.doGetText(_locator)
    expect(_actualMessage).to.be.equal("Deposit more collateral or repay part of your borrowings to increase your health factor and be able to borrow.")
  }

  doTryBorrowAsset(assetName) {
    MainPage.doWaitLoaderComplete()
    let _assetRow = this.assetTable.$(".//*[text()='"+assetName+"']/../../../..")
    elemUtil.doClickWithRedirect(_assetRow)
  }

  openAssetBorrowPage(assetName){
    MainPage.doWaitLoaderComplete()
    browser.waitUntil(
      () => {
        let _assetValue = this.assetTable.$(".//*[text()='"+assetName+"']/../../../..")
          .$(".//*[contains(@class, 'Value__value')]")
        let _value = elemUtil.doGetText(_assetValue)
        if(_value === "-"){
          return false
        }else{
          return true
        }
      },
      {
        timeout: 20000,
        timeoutMsg: 'expected url to be different'
      }
    )
    let _assetRow = this.assetTable.$(".//*[text()='"+assetName+"']/../../../..")
    elemUtil.doClickWithRedirect(_assetRow)
  }
}

module.exports = new BorrowPage();
