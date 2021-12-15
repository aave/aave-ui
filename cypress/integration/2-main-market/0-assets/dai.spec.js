const {configEnvWithTenderlyMainnetFork} = require('../../../support/steps/configuration.steps');
const {deposit, borrow, repay, withdraw, changeBorrowType} = require('../../../support/steps/main.steps')
const {skipState} = require('../../../support/steps/common')
const assets = require('../../../fixtures/assets.json');
const constants = require('../../../fixtures/constans.json')
const URL = Cypress.env('URL');

const testData ={
  depositETH:{
    asset:assets.aaveMarket.ETH,
    amount: 0.9,
    hasApproval: true
  },
  testCases:{
    borrow:[
      {
        asset:assets.aaveMarket.DAI,
        amount: 50,
        apyType: constants.borrowAPYType.variable,
        hasApproval: true
      },
      {
        asset:assets.aaveMarket.DAI,
        amount: 50,
        apyType: constants.borrowAPYType.stable,
        hasApproval: true
      }
    ],
    deposit:{
      asset: assets.aaveMarket.DAI,
      amount: 50,
      hasApproval: false
    },
    changeBorrowType:[
      {
        asset:assets.aaveMarket.DAI,
        apyType: constants.borrowAPYType.stable,
        newAPY: constants.borrowAPYType.variable,
        hasApproval: true
      },
      {
        asset:assets.aaveMarket.DAI,
        apyType: constants.borrowAPYType.variable,
        newAPY: constants.borrowAPYType.stable,
        hasApproval: true
      }
    ],
    repay:[
      {
        asset:assets.aaveMarket.DAI,
        amount: 10,
        hasApproval: true,
        repayOption: constants.repayType.wallet
      },
      {
        asset:assets.aaveMarket.DAI,
        amount: 10,
        hasApproval: false,
        repayOption: constants.repayType.collateral,
        assetForRepay: assets.aaveMarket.ETH
      }
    ],
    withdraw:{
      asset: assets.aaveMarket.DAI,
      amount: 10,
      hasApproval: true
    },
  // verifications:{
  //   finalDashboard:[
  //     {
  //       type: constants.dashboardTypes.deposit,
  //       asset: assets.aaveMarket.DAI.shortName,
  //       amount: 30,
  //       collateralType: constants.collateralType.isCollateral
  //     },
  //     {
  //       type: constants.dashboardTypes.borrow,
  //       asset: assets.aaveMarket.DAI.shortName,
  //       amount: 80,
  //       aprType: constants.borrowAPRType.stable
  //     }
  //   ]
  }
}

describe('DAI INTEGRATION SPEC',  ()=>{
  const skipTestState = skipState(false);
  configEnvWithTenderlyMainnetFork({})

  deposit(
    {
      ...testData.depositETH
    },
    skipTestState,
    true
  );

  testData.testCases.borrow.forEach((borrowCase) => {
    borrow(
      {
        ...borrowCase
      },
      skipTestState,
      true
    );
  });

  testData.testCases.changeBorrowType.forEach((changeAPRCase) =>{
    changeBorrowType(
      {
        ...changeAPRCase
      },
      skipTestState,
      true
    );
  });

  deposit(
    {
      ...testData.testCases.deposit
    },
    skipTestState,
    true
  );

  testData.testCases.repay.forEach((repayCase) =>{
    repay(
      {
        ...repayCase
      },
      skipTestState,
      false
    );
  });

  withdraw(
    {
      ...testData.testCases.withdraw
    },
    skipTestState,
    false
  );

  // dashboardAssetValuesVerification(
  //   testData.verifications.finalDashboard, skipTestState
  // )
})
