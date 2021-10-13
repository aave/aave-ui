const MetamaskPage = require('./pages/metamask.page')
const elemUtil = require('./util/element.util')
const exec = require('child_process').exec;

const data ={
  seedPhrase: "diary enrich solar frown choose chest fiction farm risk approve corn upon",
  password: "12345678",
}

class MM {
  doMainSetup(){
    browser.switchWindow('MetaMask')
    elemUtil.doClick(MetamaskPage.setupStartSetupBtn)
    elemUtil.doClick(MetamaskPage.setupImportWalletBtn)
    elemUtil.doClick(MetamaskPage.setupAgreeBtn)
    elemUtil.doSetValue(MetamaskPage.setupImportSeedPhraseInput, data.seedPhrase)
    elemUtil.doSetValue(MetamaskPage.setupImportSeedPassword, data.password)
    elemUtil.doSetValue(MetamaskPage.setupImportSeedConfirmPassword, data.password)
    elemUtil.doClick(MetamaskPage.setupImportSeedTermsAgree)
    elemUtil.doClickWithRedirect(MetamaskPage.setupImportSeedImportBtn)
    elemUtil.doClickWithRedirect(MetamaskPage.setupAllDoneBtn)
    //need to delete try
    try{
      elemUtil.doClick(MetamaskPage.closePopUpBtn)
    }catch(err){}
    this.doClosePopup()
    this.extensionUrl = browser.getUrl()
  }

  doSetupCustomNetwork({networkName, rpcUrl, chainID, currencySymbol = 'ETH'}){
    this.doSwitchNetwork("Custom RPC")
    elemUtil.doSetValue(MetamaskPage.networkForm_networkNameInput, networkName)
    elemUtil.doSetValue(MetamaskPage.networkForm_rpcUrlInput, rpcUrl)
    elemUtil.doSetValue(MetamaskPage.networkForm_chainIDInput, chainID)
    elemUtil.doSetValue(MetamaskPage.networkForm_symbolInput, currencySymbol)
    elemUtil.doClick(MetamaskPage.networkForm_saveBtn)
    browser.pause(1000) // awaiting saving need update
    this.doOpenMainPage()
  }

  doClosePopup(){
    // need to delete try
    try{
      elemUtil.doClick(MetamaskPage.closePopUpBtn)
    }catch(err){}
  }

  doCloseMetamaskTab(){
    browser.switchWindow(this.extensionUrl)
    browser.closeWindow()
  }

  doOpenMainPage(){
    elemUtil.doClick(MetamaskPage.logo)
  }

  doSetupProfile(){
    this.doSwitchNetwork("Localhost 8545")
    this.doImportAccount()
  }

  doSwitchNetwork(name){
    elemUtil.doClick(MetamaskPage.networkListBtn)
    let liXpath = '//li//*[text()="'+name+'"]'
    elemUtil.doClick($(liXpath))
  }

  doImportAccount(privatKey){
    elemUtil.doClick(MetamaskPage.accountAccountIcon)
    elemUtil.doClick(MetamaskPage.accountMenuImportAccount)
    elemUtil.doSetValue(MetamaskPage.accountKeyInput, privatKey)
    elemUtil.doClick(MetamaskPage.accountImportBtn)
  }

  doAddCustomToken(contract){
    elemUtil.doClickWithRedirect(MetamaskPage.addTokenAddTokenBtn)
    elemUtil.doClick(MetamaskPage.addTokenCustomTokenTab)
    elemUtil.doSetValue(MetamaskPage.addTokenCustomAddressInput, contract)
    browser.pause(3000)
    elemUtil.doClickWithRedirect(MetamaskPage.addTokenNextBtn)
    browser.pause(3000)
    elemUtil.doClickWithRedirect(MetamaskPage.addTokenConfirmBtn)
    browser.pause(3000)
  }

  doConnect(){
    elemUtil.doClick(MetamaskPage.integratePopUpNextBtn)
    elemUtil.doClick(MetamaskPage.integratePopUpConnectBtn)
  }

  doSubmitPayment(){
    elemUtil.doClick(MetamaskPage.paymentPopUpConfirmBtn)
  }

  doRejectPayment(){
    elemUtil.doClick(MetamaskPage.paymentPopUpRejectBtn)
  }

  doTransferBetweenWallets(toName, amount){
    elemUtil.doClickWithRedirect(MetamaskPage.mainPageSendBtn)
    elemUtil.doClick(MetamaskPage.transferBtwnAccountsBtn)
    elemUtil.doClick($("//*[text()='"+toName+"']"))
    browser.pause(1000)
    elemUtil.doSetValue(MetamaskPage.paymentFormAmountInput,amount)
    elemUtil.doClick(MetamaskPage.paymentFormNextBtn)
    elemUtil.doClickWithRedirect(MetamaskPage.paymentFormConfirmBtn)
  }

  doSwitchAccount(accountName){
    elemUtil.doClick(MetamaskPage.accountAccountIcon)
    elemUtil.doClick($("//*[@class='account-menu__account-info']//*[text()='"+accountName+"']"))
    browser.pause(1000)
  }

  doWaitBalanceChangeTo(amount, timeout=10000){
    elemUtil.doGetText(MetamaskPage.currentBalance)
    browser.waitUntil(
      () => elemUtil.doGetText(MetamaskPage.currentBalance) == amount.toString(),
      {
        timeout: timeout,
        timeoutMsg: 'expected amount is different'
      }
    )
  }

  doSwitchToMetamaskNotificationWindow(){
    let i = 0
    while(i<29){
      try{
        browser.pause(1000)
        browser.switchWindow("MetaMask Notification")
        i=29
      }catch(error){
        browser.pause(1000)
        i++
        if(i==29){
          console.log("MetaMask Notification wasn't opened by some reason after 30 sec")
        }
      }
    }
  }
}
module.exports = new MM();
