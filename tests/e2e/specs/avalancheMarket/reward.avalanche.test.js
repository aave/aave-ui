const{configTestWithTenderlyAvalancheFork} = require('../../steps/configuration-steps')
const {skipState} = require('../../steps/common')
const {deposit, withdraw, claimReward} = require('../../steps/steps')
const constants= require('../../fixtures/consts.json')
const assets = require('../../fixtures/assets.json')

const testData ={
  asset: {
    name: assets.avalancheMarket.AVAX,
    deposit: {
      amount: 10,
      hasApproval: true
    },
    withdraw:{
      amount: 11,
      hasApproval: false
    },
  }
}

describe('REWARD AVALANCHE MARKET INTEGRATION SPEC',  ()=>{
  const skipTestState = skipState(false);
    configTestWithTenderlyAvalancheFork()

  deposit(
    {
      asset: testData.asset.name,
      amount: testData.asset.deposit.amount,
      hasApproval: testData.asset.deposit.hasApproval,
    },
    skipTestState,
    true
  )
  claimReward(
    {
      rewardIsGrowing: true
    },
    skipTestState
  )
  withdraw(
    {
      asset: testData.asset.name,
      amount: testData.asset.withdraw.amount,
      hasApproval: testData.asset.withdraw.hasApproval,
    },
    skipTestState,
    false
  )
  claimReward(
    {
      rewardIsGrowing: false
    },
    skipTestState
  )
})
