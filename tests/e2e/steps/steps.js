const InputPage = require('../pageobjects/input.page')
const ConfirmationPage = require('../pageobjects/confirmation.page')
const DepositPage = require('../pageobjects/deposit.page')
const BorrowPage = require('../pageobjects/borrow.page')
const DashboardPage = require('../pageobjects/dashboard.page')
const RepayPage = require('../pageobjects/repay.page')
const SwapPage = require('../pageobjects/swap.page')

const constants = require('../fixtures/consts.json')

module.exports.deposit = ({asset, amount, hasApproval = true}, skip, updateSkipStatus = false) =>{
  let _shortName =asset.shortName
  let _fullName =asset.fullName
  return describe(`Deposit process for ${_shortName}`, () => {
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Open ${_shortName} borrow view`, () => {
      DepositPage.open()
      DepositPage.openAssetDepositPage(_fullName)
    })
    it(`Set ${amount} deposit amount for ${_shortName}`, () => {
      InputPage.doSubmitAmount(amount)
    })
    it(`Make approve for ${_shortName}, on confirmation page`, (done) => {
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    after(()=>{
      if(!_passed && updateSkipStatus){
        skip.set(true)
      }
    })
  })
}

module.exports.borrow = ({asset, amount, aprType, hasApproval = true}, skip, updateSkipStatus = false) =>{
  let _shortName =asset.shortName
  let _fullName =asset.fullName
  return describe(`Borrow process for ${_shortName}`, () => {
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Open ${_shortName} borrow view`, () => {
      BorrowPage.open()
      BorrowPage.openAssetBorrowPage(_fullName)
    })
    it(`Set ${amount} borrow amount for ${_shortName}, with APR Type ${aprType === constants.borrowAPRType.variable ? "Variable" : "Stable"}`, () => {
      InputPage.doSubmitAmount(amount)
      switch(aprType){
        case constants.borrowAPRType.variable:
          InputPage.doChooseVariableAPR()
          break;
        case constants.borrowAPRType.stable:
          InputPage.doChooseStableAPR()
          break;
        default:
          InputPage.doChooseVariableAPR()
      }
    })
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    after(()=>{
      if(!_passed && updateSkipStatus){
        skip.set(true)
      }
    })
  })
}

module.exports.repay = ({asset, amount, repayOption, hasApproval = false}, skip, updateSkipStatus = false) =>{
  let _shortName =asset.shortName
  return describe(`Repay by ${repayOption} process for ${_shortName}`, () => {
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Open ${_shortName} repay view`, () => {
      DashboardPage.open()
      DashboardPage.doOpenRepayView(_shortName)
    })
    it(`Choose ${repayOption} repay option`, ()=>{
      RepayPage.doChooseRepayOption(repayOption)
    })
    it(`Set ${amount} repay amount for ${_shortName}, with ${repayOption} repay option`, () => {
      switch(repayOption) {
        case constants.repayType.collateral:
          SwapPage.doSwapForRepay(amount, _shortName ==='ETH' ? null : _shortName)
          break;
        case constants.repayType.wallet:
          InputPage.doSubmitAmount(amount)
          break;
        case constants.repayType.default:
          InputPage.doSubmitAmount(amount)
          break;
      }
    })
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    after(()=>{
      if(!_passed && updateSkipStatus){
        skip.set(true)
      }
    })
  })
}

module.exports.withdraw = ({asset, amount, hasApproval = false}, skip, updateSkipStatus = false) => {
  let _shortName =asset.shortName
  return describe(`Withdraw process for ${_shortName}`, ()=>{
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Open ${_shortName} repay view`, () => {
      DashboardPage.open()
      DashboardPage.doOpenWithdrawView(_shortName)
    })
    it(`Set ${amount} withdraw amount for ${_shortName}`, () => {
      InputPage.doSubmitAmount(amount)
    })
    it(`Make approve for ${_shortName}, on confirmation page`, ()=>{
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    after(()=>{
      if(!_passed && updateSkipStatus){
        skip.set(true)
      }
    })
  })
}

module.exports.claimReward = ({rewardIsGrowing}, skip) =>{
  describe("Claim reward which is growing",()=>{
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it("check that claim reward is available", ()=>{
      DashboardPage.open()
      DashboardPage.doCheckRewardIsAvailable()
    })
    it("Claim reward",()=>{
      DashboardPage.doOpenClaimReward()
      ConfirmationPage.doOneStepProcess()
    })
    if(rewardIsGrowing){
      it("check that claim reward is still available", ()=>{
        DashboardPage.open()
        DashboardPage.doCheckRewardIsAvailable()
      })
    }else{
      it("check that claim reward is not available any more", ()=>{
        DashboardPage.open()
        DashboardPage.doCheckRewardIsNotAvailable()
      })
    }
  })
}

module.exports.changeBorrowType= ({asset, aprType, newAPR, hasApproval = true}, skip, updateSkipStatus = false) =>{
  let _shortName =asset.shortName
  describe("Change APR of borrowing",()=>{
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Change the ${_shortName} borrowing apr type from ${aprType} to ${newAPR}`, ()=>{
      DashboardPage.open()
      DashboardPage.doChangeApr(_shortName, aprType)
    })
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    after(()=>{
      if(!_passed && updateSkipStatus){
        skip.set(true)
      }
    })
  })
}

module.exports.changeCollateral = ({asset, amount, aprType, hasApproval = true}, skip, updateSkipStatus = false) =>{
  let _shortName =asset.shortName
  let _fullName =asset.fullName
  return describe(`Check that borrowing without collateral is impossible ${_shortName}`, () => {
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Turn off the collateral for ${_shortName}`, () => {
      DashboardPage.open()
      DashboardPage.doChangeCollateral(_shortName)
    })
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    it(`Check borrowing is off when there is no collateral`, () => {
      BorrowPage.open()
      BorrowPage.doTryBorrowAsset(_fullName)
      BorrowPage.doCheckBorrowErrorMessage()
    })
    it(`Turn collateral back on`, () => {
      DashboardPage.open()
      DashboardPage.doChangeCollateral(_shortName)
    })
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    after(()=>{
      if(!_passed && updateSkipStatus){
        skip.set(true)
      }
    })
  })
}
module.exports.confirmCollateralError= ({asset}, skip, updateSkipStatus = false) =>{
  let _shortName =asset.shortName
  return describe(`Check that changing collateral is disabled when ${_shortName} is borrowed`, () => {
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Try to turn off the collateral for ${_shortName}`, () => {
      DashboardPage.open()
      DashboardPage.doChangeCollateral(_shortName)
    })
    it(`Confirm you can't turn collateral off when asset is borrowed `, () => {
      ConfirmationPage.doCheckCollateralErrorMessage()
      _passed = true
    })
    after(() => {
      if (!_passed && updateSkipStatus) {
        skip.set(true)
      }
    })
  })
}
module.exports.checkDisabledCollateral = ({asset}, skip, updateSkipStatus = false) =>{
  let _shortName =asset.shortName
  return describe(`Check that changing collateral for ${_shortName} is disabled`, () => {
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Confirm collateral swiper is disabled for ${_shortName}`, ()=>{
      DashboardPage.open()
      DashboardPage.doCheckCollateralSwiperIsDisabled(_shortName)
      _passed = true
    })
    after(() => {
      if (!_passed && updateSkipStatus) {
        skip.set(true)
      }
    })
  })
}

module.exports.swap= ({fromAsset, toAsset, amount, hasApproval = true}, skip, updateSkipStatus = false) =>{
  let _shortNameFrom = fromAsset.shortName
  let _shortNameTo = toAsset.shortName
  describe(`Swap ${amount} ${_shortNameFrom} to ${_shortNameTo}`,()=>{
    let _passed = false
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Choosing swap options, ${amount} ${_shortNameFrom} to ${_shortNameTo}`, ()=>{
      SwapPage.open()
      SwapPage.doSwap(_shortNameFrom, _shortNameTo, amount)
    })
    it(`Make approve for swap`, ()=>{
      ConfirmationPage.doApproveProcess(hasApproval)
      _passed = true
    })
    after(()=>{
      if(!_passed && updateSkipStatus){
        skip.set(true)
      }
    })
  })
}

