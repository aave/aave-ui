const Page = require('./page');
const elemUtil = require('../util/elementUtil')

const locators = {
  amountInput: "//div[contains(@class, 'AmountFieldWithSelect')]//div[contains(@class, 'AmountFieldWithSelect__field-inner')]//input",
  continueBtn: "//button[@type='submit']",
  swapToSelectBtn: "//*[contains(@class,'AssetSelect__reverse')]//button[contains(@class, 'AssetSelect__button')]",
  optionBoxSwapTo: "//*[contains(@class,'AssetSelect__reverse')]//*[@class='AssetSelect__option']",

  swapFromBlock:  "//*[contains(@class,'AmountFieldWithSelect')][1]//*[contains(@class,'DropdownWrapper__left')]",
  swapFromSelectBtn: "//*[contains(@class,'AmountFieldWithSelect')][1]//*[contains(@class,'DropdownWrapper__left')]//button",
  swapToBlock: "//*[contains(@class,'AmountFieldWithSelect')][2]//*[contains(@class,'DropdownWrapper__left')]",
  optionBoxSwapFrom: "//*[contains(@class,'AmountFieldWithSelect')][1]//*[@class='AssetSelect__option']"
};


class SwapPage extends Page {
  get amountInput () { return $(locators.amountInput) }
  get continueBtn () { return $(locators.continueBtn) }
  get swapToSelectBtn () {return $(locators.swapToSelectBtn)}
  get optionBoxSwapTo () {return $(locators.optionBoxSwapTo)}

  get swapFromBlock () {return $(locators.swapFromBlock)}
  get swapToBlock () {return $(locators.swapToBlock)}
  get swapFromSelectBtn () {return $(locators.swapFromSelectBtn)}

  open() {
    return super.open("/asset-swap");
  }

  swapToOption (asset) {return this.optionBoxSwapTo.$(locators.optionBoxSwapTo + "//*[text()='"+asset+"']")}
  swapFromOption (asset) {return this.optionBoxSwapTo.$(locators.optionBoxSwapFrom + "//*[text()='"+asset+"']")}

  doChooseSwapToOption(asset){
    elemUtil.doClick(this.swapToSelectBtn)
    elemUtil.doClick(this.swapToOption(asset))
  }

  doChooseSwapFromOption(asset){
    elemUtil.doClick(this.swapFromSelectBtn)
    elemUtil.doClick(this.swapFromOption(asset))
  }

  doSwapForRepay(amount, asset=null){
    elemUtil.doSetValue(this.amountInput, amount)
    if(asset != null){
      this.doChooseSwapToOption(asset)
    }
    elemUtil.doClickWithRedirect(this.continueBtn)
  }

  doSwap(fromAsset, toAsset, amount){
    let _swapFromBlockText = elemUtil.doGetText(this.swapFromBlock)
    if(_swapFromBlockText == "Asset"){
      this.doChooseSwapFromOption(fromAsset)
    }
    this.doSetNumberInput(this.amountInput, amount)
    this.doChooseSwapToOption(toAsset)
    elemUtil.doClickWithRedirect(this.continueBtn)
  }
}

module.exports = new SwapPage();
