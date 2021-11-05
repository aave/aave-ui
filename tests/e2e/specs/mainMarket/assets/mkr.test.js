const{configTestWithTenderlyMainnetFork} = require('../../../steps/configuration-steps')
const {skipState} = require('../../../steps/common')
const {deposit, borrow, repay, withdraw, changeBorrowType} = require('../../../steps/steps')
const { dashboardAssetValuesVerification } = require('../../../steps/verification-steps')
const constants= require('../../../fixtures/consts.json')
const assets = require('../../../fixtures/assets.json')

const testData ={
  depositETH:{
    asset:assets.aaveMarket.ETH,
    amount: 0.1,
    hasApproval: true
  },
  testCases:{
    deposit:{
      asset: assets.aaveMarket.MKR,
      amount: 0.05,
      hasApproval: false
    },
    borrow:[
      {
        asset:assets.aaveMarket.MKR,
        amount: 0.05,
        aprType: constants.borrowAPRType.variable,
        hasApproval: true
      },
      {
        asset:assets.aaveMarket.MKR,
        amount: 0.05,
        aprType: constants.borrowAPRType.stable,
        hasApproval: true
      }
    ],
    changeBorrowType:[
      {
        asset:assets.aaveMarket.MKR,
        aprType: constants.borrowAPRType.stable,
        newAPR: constants.borrowAPRType.variable,
        hasApproval: true
      },
      {
        asset:assets.aaveMarket.MKR,
        aprType: constants.borrowAPRType.variable,
        newAPR: constants.borrowAPRType.stable,
        hasApproval: true
      }
    ],
    repay:[
      {
        asset:assets.aaveMarket.MKR,
        amount: 0.01,
        hasApproval: true,
        repayOption: constants.repayType.wallet
      },
      {
        asset:assets.aaveMarket.MKR,
        amount: 0.01,
        hasApproval: false,
        repayOption: constants.repayType.collateral
      }
    ],
    withdraw:{
      asset: assets.aaveMarket.MKR,
      amount: 0.01,
      hasApproval: true
    },
  },
  verifications:{
    finalDashboard:[
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.aaveMarket.MKR.shortName,
        amount: 0.03,
        collateralType: constants.collateralType.isCollateral
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.aaveMarket.MKR.shortName,
        amount: 0.08,
        aprType: constants.borrowAPRType.stable
      }
    ]
  }
}

describe('MKR INTEGRATION SPEC',  ()=>{
  const skipTestState = skipState(false);
  configTestWithTenderlyMainnetFork({})

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
  testData.testCases.changeBorrowType.forEach((changeAPRCase) =>{
    changeBorrowType(
        changeAPRCase,
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
