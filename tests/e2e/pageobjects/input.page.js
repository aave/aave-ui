const Page = require('./page');
const elemUtil = require('../util/elementUtil')

const locators = {
  assetInput: "//input[@type='number']",
  assetInputMaxBtn: "//button[text()='MAX']",
  continueBtn: '//*[@type="submit"]',
  APROption:{
    stable:"//*[text()='Stable APY']/../..",
    variable:"//*[text()='Variable APY']/../.."
  },
  errors:{
    walletConnection: '//*[text()="Please connect a wallet"]'
  },
  availableAmountBox: "//div[contains(@class, 'AmountField')]//p[contains(@class, 'Value__value')]"
};


class MainPage extends Page {
  get assetInput () { return $(locators.assetInput) }
  get assetInputMaxBtn () { return $(locators.assetInputMaxBtn) }
  get continueBtn () { return $(locators.continueBtn) }
  get APROption_stableBtn () { return $(locators.APROption.stable) }
  get APROption_variableBtn () { return $(locators.APROption.variable) }
  get error_walletConnection () { return $(locators.errors.walletConnection) }
  get availableAmountBox () {return $(locators.availableAmountBox)}


  doSubmitAmount(amount, max=false){
    browser.waitUntil(
      () => {
        let _value = parseFloat(elemUtil.doGetText(this.availableAmountBox))
        if(_value == 0 || _value < 0.00001 || isNaN(_value)){
          return false
        }else{
          return true
        }
      },
      {
        timeout: 10000,
        timeoutMsg: 'Available value is 0 or less then 0.000001'
      }
    )
    elemUtil.doSetValue(this.assetInput, amount)
    elemUtil.doClick(this.continueBtn)
  }

  doChooseStableAPR(){
    elemUtil.doClick(this.APROption_stableBtn)
    elemUtil.doClickWithRedirect(this.continueBtn)
  }

  doChooseVariableAPR(){
    elemUtil.doClick(this.APROption_variableBtn)
    elemUtil.doClickWithRedirect(this.continueBtn)
  }
}

module.exports = new MainPage();
