const{configTestWithKovan} = require('../../steps/configuration-steps')
const {skipState} = require('../../steps/common')
const {deposit, withdraw, claimReward} = require('../../steps/steps')
const constants = require('../../fixtures/consts.json')
const StakePage = require('../../pageobjects/stake.page')
const ConfirmationPage = require('../../pageobjects/confirmation.page')

describe('STAKE INTEGRATION SPEC ON KOVAN',  ()=> {
  const skipTestState = skipState(false);
  configTestWithKovan()

  describe('Stake 1 AAVE', () =>{
    it('Open stake page', () =>{
      StakePage.open()
    })
    it('Stake 1 AAVE asset', () =>{
      StakePage.doOpenStakeAAVEConfirmationPage("1")
      ConfirmationPage.doOneStepProcess()
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
  describe('Unstake', () =>{
    it('Activate colldown for unstaking process', () => {
      browser.pause(5000)
      StakePage.doActivateCooldown()
    })
    it('Awaiting 3 min for cooldown', () => {
      StakePage.doWaitCoolDownEnd()
      // browser.pause(180000)
    })
    it('Unstake full amount', () =>{
      browser.pause(5000)
      StakePage.doUnstake("10")
    })
    it('Check that full amount was unstaked', () => {
      browser.pause(5000)
      expect(StakePage.doGetStakedAmount()).to.be.equal('0')
    })
  })

  describe('Claim Reward', () =>{
    it('Claim reward', () => {
      StakePage.open()
      StakePage.doClaimReward()
    })
  })
})
