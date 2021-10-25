const{ configTestWithTenderlyMainnetFork, configTestWithTenderlyPolygonFork, configTestWithTenderlyAvalancheFork } = require('../../steps/configuration-steps')
const { skipState } = require('../../steps/common')
const { deposit, swap } = require('../../steps/steps')
const assets = require('../../fixtures/assets.json')
const mathUtil = require('../../util/mathUtil')
const constants = require('../../fixtures/consts.json');
const { dashboardAssetValuesVerification, dashboardSpotCountVerification } = require('../../steps/verification-steps');
const {createSwapListAsset}  = require('../../steps/preparation-steps.json')

let testData = {
  asset: {
    name: assets.avalancheMarket.AVAX,
    deposit: {
      amount: 10,
      hasApproval: true
    },
  },
  ...createSwapListAsset({
    assetsMarket: assets.avalancheMarket,
    assetsCount: 1,
    listOfNumbers: [1, 2, 3],
    baseAsset: assets.avalancheMarket.AVAX
  }),
  finalVerification: [
    {
      type: constants.dashboardTypes.deposit,
      asset: assets.avalancheMarket.AVAX.shortName,
      collateralType: constants.collateralType.isCollateral
    },
  ],
  finalDashboardRowVerification: {
    depositCount: 1,
    borrowCount: 0
  }
}

describe('SWAP SPEC FOR AVALANCHE',  ()=>{
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

  testData.swapFrom.forEach( (swapCase) =>{
    swap(
      swapCase,
      skipTestState,
      true
    )
  })

  dashboardAssetValuesVerification(
    testData.middleVerifications,
    skipTestState
  )

  testData.swapTo.forEach( (swapCase) =>{
    swap(
      swapCase,
      skipTestState,
      true
    )
  })

  dashboardAssetValuesVerification(
    testData.finalVerification,
    skipTestState
  )

  dashboardSpotCountVerification({
      ...testData.finalDashboardRowVerification
    },
    skipTestState
  )
})

