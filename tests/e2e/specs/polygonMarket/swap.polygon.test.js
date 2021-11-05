const{ configTestWithTenderlyMainnetFork, configTestWithTenderlyPolygonFork } = require('../../steps/configuration-steps')
const { skipState } = require('../../steps/common')
const { deposit, swap } = require('../../steps/steps')
const assets = require('../../fixtures/assets.json')
const mathUtil = require('../../util/mathUtil')
const constants = require('../../fixtures/consts.json');
const { dashboardAssetValuesVerification, dashboardSpotCountVerification } = require('../../steps/verification-steps');
const {createSwapListAsset}  = require('../../steps/preparation-steps.json')

let testData = {
  asset: {
    name: assets.polygonMarket.MATIC,
    deposit: {
      amount: 10,
      hasApproval: true
    },
  },
  ...createSwapListAsset({
    assetsMarket: assets.polygonMarket,
    listOfNumbers: [1, 2, 3],
    assetsCount: 1,
    baseAsset: assets.polygonMarket.MATIC
  }),
  finalVerification: [
    {
      type: constants.dashboardTypes.deposit,
      asset: assets.polygonMarket.MATIC.shortName,
      collateralType: constants.collateralType.isCollateral
    },
  ],
  finalDashboardRowVerification: {
    depositCount: 1,
    borrowCount: 0
  }
}

describe('SWAP SPEC FOR POLYGON',  ()=>{
  const skipTestState = skipState(false);
  configTestWithTenderlyPolygonFork()

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

