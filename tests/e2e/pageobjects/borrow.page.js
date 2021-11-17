const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')

const locators = {
  table: "//div[contains(@class, 'BasicTable__content-inner')]",
  noCollateralMessage: "//div[contains(@class, 'jsx-2524701549 jsx-857932068 Caption__description')]",
  turnColOffError: "//span[contains(@class, 'jsx-1211318934 jsx-3764512250')]"
};


class BorrowPage extends Page {
  get assetTable () { return $(locators.table) }
  get noColMsg () {return $(locators.noCollateralMessage)}
  get collOffErr () {return $(locators.turnColOffError)}

  open() {
    return super.open("/borrow");
  }

  doCheckBorrowErrorMessage(){
    let _locator = this.noColMsg
    let _actualMessage = elemUtil.doGetText(_locator)
    expect(_actualMessage).to.be.equal("Deposit more collateral or repay part of your borrowings to increase your health factor and be able to borrow.")
  }

  doCheckCollateralErrorMessage(){
    let _locator = this.collOffErr
    let _actualMessage = elemUtil.doGetText(_locator)
    expect(_actualMessage).to.be.equal("You can't switch usage as collateral mode for this currency, because it will cause collateral call")
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
