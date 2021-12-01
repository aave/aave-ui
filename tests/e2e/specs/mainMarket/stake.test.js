const{configTestWithKovan, configTestWithTenderlyMainnetFork } = require('../../steps/configuration-steps')
const {skipState} = require('../../steps/common')
const {deposit, withdraw, claimReward} = require('../../steps/steps')
const StakePage = require('../../pageobjects/stake.page')
const ConfirmationPage = require('../../pageobjects/confirmation.page')
const assets = require('../../fixtures/assets.json')

const testData = {
  testWallet:{
    address: "0x76da23649aF481883A2654034132E69275493E76",
    privateKey: "cd1120986473aa1db82560891d244c7bb683ab3cb37270dd6599e917ad6f7269"
  }
}

describe('STAKE INTEGRATION SPEC',  ()=> {
  configTestWithTenderlyMainnetFork({
    account: testData.testWallet,
    ERC20Tokens:[
      assets.staking.AAVE,
      assets.staking.ABPT
    ]
  })
  describe('Stake AAVE', ()=>{
    const skip = skipState(false);
    let _passed = false
    describe('Stake Process', () =>{
      beforeEach(function(){
        if(skip.get()){
          this.skip()
        }
      })
      it('Open stake page', () =>{
        StakePage.open()
        _passed = true
      })
      it('Stake 1 AAVE', () =>{
        StakePage.doOpenStakeAAVEConfirmationPage("1")
        ConfirmationPage.doTwoStepProcess()
        _passed = true
      })
      it('Check Staked amount', () => {
        browser.waitUntil(
          () => StakePage.doGetStakedAmount() == "1",
          {
            timeout: 30000,
            timeoutMsg: 'staked value after 10 sec is ' + StakePage.doGetStakedAmount() + ' but should be ' + "1"
          }
        )
        _passed = true
      })
      afterEach(() => {
        if (!_passed) {
          skip.set(true)
        }
      })
    })

    describe('Activate cooldown', () => {
      beforeEach(function(){
        if(skip.get()){
          this.skip()
        }
      })
      it('Activate cooldown', ()=>{
        StakePage.doActivateCooldown()
      })
      it('Check that cooldown was activated', () => {
        StakePage.doCheckCooldownActivated()
      })
    })

    describe('Claim Reward', () =>{
      beforeEach(function(){
        if(skip.get()){
          this.skip()
        }
      })
      it('Claim reward', () => {
        StakePage.open()
        StakePage.doClaimReward()
      })
    })
  })

  describe('Stake ABPT', ()=>{
    const skip = skipState(false);
    let _passed = false
    describe('Stake Process', () =>{
      beforeEach(function(){
        if(skip.get()){
          this.skip()
        }
      })
      it('Open stake page', () =>{
        StakePage.open()
        _passed = true
      })
      it('Stake 1 BPT', () =>{
        StakePage.doOpenStakeBPTConfirmationPage("1")
        ConfirmationPage.doTwoStepProcess()
        _passed = true
      })
      it('Check Staked amount', () => {
        StakePage.doSwitchToBptInterface()
        browser.waitUntil(
          () => StakePage.doGetStakedAmount() == "1",
          {
            timeout: 30000,
            timeoutMsg: 'staked value after 10 sec is ' + StakePage.doGetStakedAmount() + ' but should be ' + "1"
          }
        )
        _passed = true
      })
      afterEach(() => {
        if (!_passed) {
          skip.set(true)
        }
      })
    })

    describe('Activate cooldown', () => {
      beforeEach(function(){
        if(skip.get()){
          this.skip()
        }
      })
      it('Activate cooldown', ()=>{
        StakePage.doActivateCooldown()
      })
      it('Check that cooldown was activated', () => {
        StakePage.doCheckCooldownActivated()
      })
    })

    describe('Claim Reward', () =>{
      beforeEach(function(){
        if(skip.get()){
          this.skip()
        }
      })
      it('Claim reward', () => {
        StakePage.open()
        StakePage.doClaimReward()
      })
    })
  })
})
