const{configTestWithTenderlyMainnetFork} = require('../../../steps/configuration-steps')
const {skipState} = require('../../../steps/common')
const {deposit, borrow, repay, withdraw} = require('../../../steps/steps')
const { dashboardAssetValuesVerification } = require('../../../steps/verification-steps')
const constants= require('../../../fixtures/consts.json')
const assets = require('../../../fixtures/assets.json')

const testData ={
  depositETH:{
    asset:assets.ammMarket.ETH,
    amount: 0.1,
    hasApproval: true
  },
  testCases:{
    deposit:{
      asset: assets.ammMarket.USDT,
      amount: 40,
      hasApproval: false
    },
    borrow:[
      {
        asset:assets.ammMarket.USDT,
        amount: 50,
        aprType: constants.borrowAPRType.variable,
        hasApproval: true
      },
    ],
    repay:[
      {
        asset:assets.ammMarket.USDT,
        amount: 10,
        hasApproval: true,
        repayOption: constants.repayType.default
      },
    ],
    withdraw:{
      asset: assets.ammMarket.USDT,
      amount: 10,
      hasApproval: true
    },
  },
  verifications:{
    finalDashboard:[
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.ammMarket.USDT.shortName,
        amount: 30,
        collateralType: constants.collateralType.isNotCollateral
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.ammMarket.USDT.shortName,
        amount: 40,
        aprType: constants.borrowAPRType.variable
      },
    ]
  }
}

describe('USDT AMM MARKET INTEGRATION SPEC',  ()=>{
  const skipTestState = skipState(false);
  configTestWithTenderlyMainnetFork({
    market: constants.markets.ammFork
  })
  deposit(
    {
      asset: testData.depositETH.asset,
      amount: testData.depositETH.amount,
      hasApproval: testData.depositETH.hasApproval,
    },
    skipTestState,
    true
  )
  testData.testCases.borrow.forEach((borrowCase) =>{
    borrow(
      borrowCase,
      skipTestState,
      true
    )
  })
  deposit(
    testData.testCases.deposit,
    skipTestState,
    true
  )
  testData.testCases.repay.forEach((repayCase) =>{
    repay(
      repayCase,
      skipTestState,
      false
    )
  })
  withdraw(
    testData.testCases.withdraw,
    skipTestState,
    false
  )
  dashboardAssetValuesVerification(
    testData.verifications.finalDashboard,
    skipTestState
  )
})
