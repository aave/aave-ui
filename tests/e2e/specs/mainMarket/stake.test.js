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
  const skipTestState = skipState(false);
  configTestWithTenderlyMainnetFork({
    account: testData.testWallet,
    ERC20Tokens:[
      assets.staking.AAVE,
      assets.staking.ABPT
    ]
  })
  describe('Stake AAVE', ()=>{
    describe('Stake Process', () =>{
      it('Open stake page', () =>{
        StakePage.open()
      })
      it('Stake 1 AAVE', () =>{
        StakePage.doOpenStakeAAVEConfirmationPage("1")
        ConfirmationPage.doTwoStepProcess()
      })
      it('Check Staked amount', () => {
        browser.waitUntil(
          () => StakePage.doGetStakedAmount() == "1",
          {
            timeout: 30000,
            timeoutMsg: 'staked value after 10 sec is ' + StakePage.doGetStakedAmount() + ' but should be ' + "1"
          }
        )
      })
    })

    describe('Activate cooldown', () => {
      it('Activate cooldown', ()=>{
        StakePage.doActivateCooldown()
      })
      it('Check that cooldown was activated', () => {
        StakePage.doCheckCooldownActivated()
      })
    })

    describe('Claim Reward', () =>{
      it('Claim reward', () => {
        StakePage.open()
        StakePage.doClaimReward()
      })
    })
  })

  describe('Stake ABPT', ()=>{
    describe('Stake Process', () =>{
      it('Open stake page', () =>{
        StakePage.open()
      })
      it('Stake 1 BPT', () =>{
        StakePage.doOpenStakeBPTConfirmationPage("1")
        ConfirmationPage.doTwoStepProcess()
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
      })
    })

    describe('Activate cooldown', () => {
      it('Activate cooldown', ()=>{
        StakePage.doActivateCooldown()
      })
      it('Check that cooldown was activated', () => {
        StakePage.doCheckCooldownActivated()
      })
    })

    describe('Claim Reward', () =>{
      it('Claim reward', () => {
        StakePage.open()
        StakePage.doClaimReward()
      })
    })
  })

})
