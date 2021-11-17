const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')

const locators = {
  table: "//div[contains(@class, 'BasicTable__content-inner')]",
};


class DepositPage extends Page {
  get assetTable () { return $(locators.table) }


  open() {
    return super.open("/deposit");
  }

  openAssetDepositPage(assetName){
    browser.waitUntil(
      () => {
        let _assetValue = this.assetTable.$(".//*[text()='"+assetName+"']/../../../..//*[contains(@class, 'Value__value')]")
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

module.exports = new DepositPage();
