const Page = require('./page');
const elemUtil = require('../util/elementUtil')

const locators = {
  amountInput: "//div[contains(@class, 'AmountFieldWithSelect')]//div[contains(@class, 'AmountFieldWithSelect__field-inner')]//input",
  continueBtn: "//button[@type='submit']",
  swapToSelectBtn: "//*[contains(@class,'AssetSelect__reverse')]//button[contains(@class, 'AssetSelect__button')]",
  optionBoxSwapTo: "//*[contains(@class,'AssetSelect__reverse')]//*[@class='AssetSelect__option']"
};


class SwapPage extends Page {
  get amountInput () { return $(locators.amountInput) }
  get continueBtn () { return $(locators.continueBtn) }
  get swapToSelectBtn () {return $(locators.swapToSelectBtn)}
  get optionBoxSwapTo () {return $(locators.optionBoxSwapTo)}

  swapToOption (asset) {return this.optionBoxSwapTo.$(locators.optionBoxSwapTo + "//*[text()='"+asset+"']")}

  doSwapForRepay(amount, asset=null){
    elemUtil.doSetValue(this.amountInput, amount)
    if(asset != null){
      this.doChooseSwapToOption(asset)
    }
    elemUtil.doClickWithRedirect(this.continueBtn)
  }

  doChooseSwapToOption(asset){
    elemUtil.doClick(this.swapToSelectBtn)
    elemUtil.doClick(this.swapToOption(asset))
  }
}

module.exports = new SwapPage();
