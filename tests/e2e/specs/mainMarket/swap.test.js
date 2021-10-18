const{configTestWithTenderlyMainnetFork} = require('../../steps/configuration-steps')
const {skipState} = require('../../steps/common')
const {deposit, withdraw, claimReward} = require('../../steps/steps')
const constants= require('../../fixtures/consts.json')
const assets= require('../../fixtures/assets.json')
const MM = require('../../../metamask/mm.control')

const testData ={
  asset: {
    name: assets.aaveMarket.ETH,
    deposit: {
      amount: 5,
      hasApproval: true
    },
  },
  swap: [
    {
      fromAsset:assets.aaveMarket.ETH,
      toAsset:assets.aaveMarket.USDT,
      amount:1
    },
    {
      fromAsset:assets.aaveMarket.ETH,
      toAsset:assets.aaveMarket.DAI,
      amount:1
    },
    {
      fromAsset:assets.aaveMarket.ETH,
      toAsset:assets.aaveMarket.MANA,
      amount:1
    }
  ]
}

describe('REWARD MAIN MARKET INTEGRATION SPEC',  ()=>{
  const skipTestState = skipState(false);
  configTestWithTenderlyMainnetFork({})

  deposit(
    {
      asset: testData.asset.name,
      amount: testData.asset.deposit.amount,
      hasApproval: testData.asset.deposit.hasApproval,
    },
    skipTestState,
    true
  )


  swap(
    {

    }
  )


  // describe("test", () =>{
  //   it("test1", () => {
  //     console.log("11111")
  //     MM.doOpenMMNewTab()
  //     browser.pause(500000)
  //   })
  // })

  // deposit(
  //   {
  //     asset: testData.asset.name,
  //     amount: testData.asset.deposit.amount,
  //     hasApproval: testData.asset.deposit.hasApproval,
  //   },
  //   skipTestState,
  //   true
  // )
})
