const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')
const MM = require('../../metamask/mm.control')

const locators = {
  submitBtn: "//button[@type='submit']",
  approveBtn: "//button[@type='submit']//*[text()='Approve']",
  successResult: {
    success2Status: "//*[text()='2/2 Success!']",
    success3Status: "//*[text()='3/3 Success!']",
    confirmedStatus: "//*[text()='Confirmed']",
    successMessage:"//*[text()='Your action has been successfully executed']",
    jsonError:"//*[contains(text(),'Response has no error or result for request')]"
  },
  pendingRow:"//div[contains(@class, 'DotStatus')]/*[text()='Pending']"
};


class ConfirmationPage extends Page {
  get submitBtn() { return $(locators.submitBtn)}
  get successResult_success2Status() { return $(locators.successResult.success2Status)}
  get successResult_success3Status() { return $(locators.successResult.success3Status)}
  get successResult_confirmedStatus() { return $(locators.successResult.confirmedStatus)}
  get successResult_successMessage() { return $(locators.successResult.successMessage)}
  get successResult_jsonError() { return $(locators.successResult.jsonError)}
  get pendingRow() {return $(locators.pendingRow)}

  doOneStepProcess() {
    elemUtil.doClick(this.submitBtn)
    MM.doSwitchToMetamaskNotificationWindow()
    MM.doSubmitPayment()
    MainPage.doSwitchToAave()
  }

  doTwoStepProcess() {
    elemUtil.doClick(this.submitBtn)
    MM.doSwitchToMetamaskNotificationWindow()
    MM.doSubmitPayment()
    MainPage.doSwitchToAave()
    elemUtil.doClick(this.submitBtn)
    MM.doSwitchToMetamaskNotificationWindow()
    MM.doSubmitPayment()
    MainPage.doSwitchToAave()
  }

  doIsSuccessOneStepProcess(timeout = 20000){
    elemUtil.doIsDisplayed(this.successResult_success2Status, timeout)
    elemUtil.doIsDisplayed(this.successResult_confirmedStatus, timeout)
    elemUtil.doIsDisplayed(this.successResult_successMessage, timeout)
  }

  doIsSuccessTwoStepProcess(timeout){
    elemUtil.doIsDisplayed(this.successResult_success3Status, timeout)
    elemUtil.doIsDisplayed(this.successResult_confirmedStatus, timeout)
    elemUtil.doIsDisplayed(this.successResult_successMessage, timeout)
  }

  doApproveProcess(hasApproval){
    if(hasApproval){
      this.doOneStepProcess()
      this.doIsSuccessOneStepProcess()
    }else {
      this.doTwoStepProcess()
      this.doIsSuccessTwoStepProcess()
      try {
        //sometimes metamask return error via tenderly fork
        if (elemUtil.doIsDisplayed(this.successResult_jsonError, 2000)) {
          this.doTwoStepProcess()
          this.doIsSuccessTwoStepProcess()
        }
      }catch (e){}
    }
  }
}

module.exports = new ConfirmationPage();
