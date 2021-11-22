const Page = require('./page');
const elemUtil = require('../util/elementUtil')
const constants = require('../fixtures/consts.json')
const ConfirmationPage = require('../pageobjects/confirmation.page')
const InputPage = require('../pageobjects/input.page')

const locators = {
  mainScreen:{
    stakeAAVEBtn: "//a[@href='#/staking/aave']",
    stakeBPTBtn: "//a[@href='#/staking/bpt']",
  },
  stakeAmountInput: "//input[@placeholder='Amount']",
  iUnderstandBtn: "//*[text()='I understand']/../..",
  coolDownBtn: "//*[text()='Activate Cooldown']",
  stakedAmountBox: "//*[text()='Activate Cooldown']/../../../..//p[@data-tip='true']",
  coolDownTimer: "//div[contains(@class, 'StakingWrapper__info-timerInner')]",
  unstakeBtn: "//*[text()='Unstake now']/../..",
  claimRewardBtn: "//*[text()='Claim']/../..",
  coolDownTimer: "//span[@class='Timer StakingWrapper__timer']",
  coolDownPopup:{
    checkbox: "//*[text()='I understand how the cooldown (']",
    agreeBtn: "//div[@role='dialog']//button//span[text()='Activate Cooldown']"
  },
  switchToBpt: "//button/p/span[text()='bpt']"
};



class StakePage extends Page {
  get mainScreen_stakeAAVEBtn () { return $(locators.mainScreen.stakeAAVEBtn) }
  get mainScreen_stakeBPTBtn () { return $(locators.mainScreen.stakeBPTBtn) }
  get stakeAmountInput () {return $(locators.stakeAmountInput)}
  get iUnderstandBtn () {return $(locators.iUnderstandBtn)}
  get stakedAmountBox () {return $(locators.stakedAmountBox)}
  get coolDownBtn () {return $(locators.coolDownBtn)}
  get coolDownTimer () {return $(locators.coolDownTimer)}
  get unstakeBtn () {return $(locators.unstakeBtn)}
  get claimRewardBtn () {return $(locators.claimRewardBtn)}
  get coolDownPopup_CheckBox () { return $(locators.coolDownPopup.checkbox)}
  get coolDownPopup_Btn () { return $(locators.coolDownPopup.agreeBtn)}
  get coolDownTimer () { return $(locators.coolDownTimer)}
  get switchToBpt () { return $(locators.switchToBpt) }

  open() {
    return super.open("/staking");
  }

  doOpenStakeAAVEConfirmationPage(amount){
    elemUtil.doClickWithRedirect(this.mainScreen_stakeAAVEBtn)
    InputPage.doSubmitAmount(amount)
    elemUtil.doClickWithRedirect(this.iUnderstandBtn)
  }

  doOpenStakeBPTConfirmationPage(amount){
    elemUtil.doClickWithRedirect(this.mainScreen_stakeBPTBtn)
    InputPage.doSubmitAmount(amount)
    elemUtil.doClickWithRedirect(this.iUnderstandBtn)
  }

  doGetStakedAmount(){
    browser.pause(2000)
    return elemUtil.doGetText(this.stakedAmountBox)
  }

  doSwitchToBptInterface(){
    elemUtil.doClick(this.switchToBpt)
  }

  doActivateCooldown(){
    elemUtil.doClick(this.coolDownBtn)
    elemUtil.doClick(this.coolDownPopup_CheckBox)
    elemUtil.doClickWithRedirect(this.coolDownPopup_Btn)
    ConfirmationPage.doOneStepProcess()
  }

  doCheckCooldownActivated(){
    browser.pause(1000)
    elemUtil.doIsDisplayed(this.coolDownTimer)
  }

  doUnstake(amount){
    browser.pause(2000)
    elemUtil.doClickWithRedirect(this.unstakeBtn)
    InputPage.doSubmitAmount(amount)
    browser.pause(2000)
    ConfirmationPage.doOneStepProcess()
    browser.pause(2000)
  }

  doWaitCoolDownEnd(){
    browser.waitUntil(
      () => $$(locators.unstakeBtn).length > 0,
      {
        timeout: 200000,
        timeoutMsg: 'cooldown was not finished after 3 min'
      }
    )
  }

  doClaimReward(){
    elemUtil.doClickWithRedirect(this.claimRewardBtn)
    ConfirmationPage.doOneStepProcess()
  }
}

module.exports = new StakePage();
