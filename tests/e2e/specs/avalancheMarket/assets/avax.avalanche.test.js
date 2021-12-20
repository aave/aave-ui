const{configTestWithTenderlyAvalancheFork} = require('../../../steps/configuration-steps')
const {skipState} = require('../../../steps/common')
const {deposit, borrow, repay, withdraw, changeCollateral, confirmCollateralError } = require('../../../steps/steps')
const { dashboardAssetValuesVerification } = require('../../../steps/verification-steps')
const constants= require('../../../fixtures/consts.json')
const assets = require('../../../fixtures/assets.json')

const testData ={
    asset:{
        name: assets.avalancheMarket.AVAX,
        deposit:{
            amount: 0.09,
            hasApproval: true
        },
        borrow:{
            amount: 0.04,
            aprType: constants.borrowAPRType.variable,
            hasApproval: false
        },
        repay:[
            {
                amount: 0.01,
                hasApproval: true,
                repayOption: constants.repayType.default
            },
        ],
        withdraw:{
            amount: 0.01,
            hasApproval: false
        },
      changeCollateral:{
        asset: assets.avalancheMarket.AVAX,
        amount: 0.04,
        aprType: constants.borrowAPRType.variable,
        hasApproval: true
      },
      confirmCollateralError:{
        asset:assets.avalancheMarket.AVAX,
      },
    },
    verifications:{
        finalDashboard:[
            {
                type: constants.dashboardTypes.deposit,
                asset: assets.avalancheMarket.AVAX.shortName,
                amount: 0.08,
                collateralType: constants.collateralType.isCollateral
            },
            {
                type: constants.dashboardTypes.borrow,
                asset: assets.avalancheMarket.AVAX.shortName,
                amount: 0.03,
                aprType: constants.borrowAPRType.variable
            }
        ]
    }
}

describe('AVAX INTEGRATION SPEC ON AVALANCHE',  ()=>{
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
  changeCollateral(
    {
      asset:testData.asset.name,
      amount: testData.asset.changeCollateral.amount,
      hasApproval: testData.asset.changeCollateral.hasApproval
    },
    skipTestState,
    true
  )
    borrow(
        {
            asset: testData.asset.name,
            amount: testData.asset.borrow.amount,
            aprType: testData.asset.borrow.aprType,
            hasApproval: testData.asset.borrow.hasApproval
        },
        skipTestState,
        true
    )
    confirmCollateralError(
    {
        asset:testData.asset.name
      },
        skipTestState,
    )

  testData.asset.repay.forEach((repayCase) =>{
        repay(
            {
                asset: testData.asset.name,
                amount: repayCase.amount,
                repayOption: repayCase.repayOption,
                hasApproval: repayCase.hasApproval

            },
            skipTestState,
            false
        )
    })
    withdraw(
        {
            asset: testData.asset.name,
            amount: testData.asset.withdraw.amount,
            hasApproval: testData.asset.withdraw.hasApproval,
        },
        skipTestState,
        false
    )
    dashboardAssetValuesVerification(
        testData.verifications.finalDashboard, skipTestState
    )
})
