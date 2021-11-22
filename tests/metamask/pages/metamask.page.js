const elemUtil = require('../util/element.util')

const locators = {
  setup:{
      startSetupBtn:'//*[text()="Get Started"]',
      importWalletBtn:'//*[text()="Import wallet"]',
      agreeBtn:'//*[text()="I Agree"]',
      importWindow:{
          seedPhraseInput: '//*[@placeholder="Paste seed phrase from clipboard"]',
          password: '//*[@id="password"]',
          confirmPassword: '//*[@id="confirm-password"]',
          termsAgree: '//*[@class="first-time-flow__checkbox first-time-flow__terms"]',
          importBtn: '//*[text()="Import"]'
      },
      allDoneBtn: '//*[text()="All Done"]',
  },
  closePopUpBtn: '//*[@title="Close"]',
  network:{
      listBtn:'//div[@class="network-indicator__down-arrow"]',
      ropstenLI:'//*[text()="Ropsten Test Network"]'
  },
  account:{
      accountIcon:'//*[@class="identicon__address-wrapper"]',
      menuImportAccount:'//*[text()="Import Account"]',
      keyInput:'//*[@id="private-key-box"]',
      importBtn:'//button[text()="Import"]'
  },
  addToken:{
      AddTokenBtn:'//button[text()="Add Token"]',
      CustomTokenTab:'//*[text()="Custom Token"]',
      CustomAddressInput:'//*[@id="custom-address"]',
      NextBtn:'//*[text()="Next"]',
      ConfirmBtn:'//button[text()="Add Tokens"]',
  },
  payment:{
      form:{
          addressInput: '//*[@data-testid="ens-input"]',
          amountInput: '//*[@class="unit-input__input-container"]/input',
          nextBtn: "//button[text()='Next']",
          confirmBtn: '//*[text()="Confirm"]'
      }
  },
  integratePopUp:{
      nextBtn: '//*[text()="Next"]',
      connectBtn: '//*[text()="Connect"]',
  },
  paymentPopUp:{
      confirmBtn: '//*[text()="Confirm"]',
      rejectBtn: '//*[text()="Reject"]'
  },
  mainPage:{
    sendBtn:'//*[text()="Send"]'
  },
  transfer:{
    betweenAccountsBtn:'//*[text()="Transfer between my accounts"]'
  },
  currentBalanceText:'//*[@class="currency-display-component__text"]',
  customNetworkForm:{
    networkNameInput:'//*[@id="network-name"]',
    rpcUrlInput:'//*[@id="rpc-url"]',
    chainIDInput:'//*[@id="chainId"]',
    symbolInput:'//*[@id="network-ticker"]',
    saveBtn:'//button[text()="Save"]'
  },
  logo:'//*[@class="app-header__metafox-logo app-header__metafox-logo--horizontal"]'

};


class MetamaskPage {
  get setupStartSetupBtn() { return $(locators.setup.startSetupBtn) }
  get setupImportWalletBtn() { return $(locators.setup.importWalletBtn) }
  get setupAgreeBtn() { return $(locators.setup.agreeBtn) }
  get setupImportSeedPhraseInput() { return $(locators.setup.importWindow.seedPhraseInput) }
  get setupImportSeedPassword() { return $(locators.setup.importWindow.password) }
  get setupImportSeedConfirmPassword() { return $(locators.setup.importWindow.confirmPassword) }
  get setupImportSeedTermsAgree() { return $(locators.setup.importWindow.termsAgree) }
  get setupImportSeedImportBtn() { return $(locators.setup.importWindow.importBtn) }
  get setupAllDoneBtn() { return $(locators.setup.allDoneBtn) }

  get closePopUpBtn() { return $(locators.closePopUpBtn) }

  get networkListBtn() { return $(locators.network.listBtn) }
  get networkRopstenLI() { return $(locators.network.ropstenLI) }

  get accountAccountIcon() { return $(locators.account.accountIcon) }
  get accountMenuImportAccount() { return $(locators.account.menuImportAccount) }
  get accountKeyInput() { return $(locators.account.keyInput) }
  get accountImportBtn() { return $(locators.account.importBtn) }

  get addTokenAddTokenBtn() { return $(locators.addToken.AddTokenBtn) }
  get addTokenCustomTokenTab() { return $(locators.addToken.CustomTokenTab) }
  get addTokenCustomAddressInput() { return $(locators.addToken.CustomAddressInput) }
  get addTokenNextBtn() { return $(locators.addToken.NextBtn) }
  get addTokenConfirmBtn() { return $(locators.addToken.ConfirmBtn) }

  get paymentFormAddressInput() {return $(locators.payment.form.addressInput)}
  get paymentFormAmountInput() {return $(locators.payment.form.amountInput)}
  get paymentFormNextBtn() {return $(locators.payment.form.nextBtn)}
  get paymentFormConfirmBtn() {return $(locators.payment.form.confirmBtn)}

  get integratePopUpNextBtn() { return $(locators.integratePopUp.nextBtn) }
  get integratePopUpConnectBtn() { return $(locators.integratePopUp.connectBtn) }

  get paymentPopUpConfirmBtn() { return $(locators.paymentPopUp.confirmBtn) }
  get paymentPopUpRejectBtn() {return $(locators.paymentPopUp.rejectBtn)}

  get mainPageSendBtn() { return $(locators.mainPage.sendBtn) }

  get transferBtwnAccountsBtn(){ return $(locators.transfer.betweenAccountsBtn)}

  get currentBalance(){return $(locators.currentBalanceText)}

  get networkForm_networkNameInput(){return $(locators.customNetworkForm.networkNameInput)}
  get networkForm_rpcUrlInput(){return $(locators.customNetworkForm.rpcUrlInput)}
  get networkForm_chainIDInput(){return $(locators.customNetworkForm.chainIDInput)}
  get networkForm_symbolInput(){return $(locators.customNetworkForm.symbolInput)}
  get networkForm_saveBtn(){return $(locators.customNetworkForm.saveBtn)}

  get logo(){return $(locators.logo)}

  networkXpath() {return locators.network.listBtn}
}

module.exports = new MetamaskPage();
