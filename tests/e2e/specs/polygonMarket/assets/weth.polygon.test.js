const{configTestWithTenderlyPolygonFork} = require('../../../steps/configuration-steps')
const {skipState} = require('../../../steps/common')
const {deposit, borrow, repay, withdraw} = require('../../../steps/steps')
const { dashboardAssetValuesVerification } = require('../../../steps/verification-steps')
const constants= require('../../../fixtures/consts.json')
const assets = require('../../../fixtures/assets.json')

const testData ={
    depositBaseAmount:{
        name: assets.polygonMarket.MATIC,
        amount: 5000,
        hasApproval: true
    },
    asset:{
        name:assets.polygonMarket.WETH,
        borrow:{
            amount: 0.1,
            aprType: constants.borrowAPRType.variable,
            hasApproval: true
        },
        deposit:{
            amount: 0.06,
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
            hasApproval: true
        },
    },
    verifications:{
        finalDashboard:[
            {
                type: constants.dashboardTypes.deposit,
                asset: assets.polygonMarket.WETH.shortName,
                amount: 0.05,
                collateralType: constants.collateralType.isCollateral
            },
            {
                type: constants.dashboardTypes.borrow,
                asset: assets.polygonMarket.WETH.shortName,
                amount: 0.09,
                aprType: constants.borrowAPRType.variable
            }
        ]
    }
}

describe('WETH INTEGRATION SPEC ON POLYGON',  ()=>{
    const skipTestState = skipState(false);
    configTestWithTenderlyPolygonFork()

    deposit(
        {
            asset: testData.depositBaseAmount.name,
            amount: testData.depositBaseAmount.amount,
            hasApproval: testData.depositBaseAmount.hasApproval,
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

    deposit(
        {
            asset: testData.asset.name,
            amount: testData.asset.deposit.amount,
            hasApproval: testData.asset.deposit.hasApproval,
        },
        skipTestState,
        true
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
