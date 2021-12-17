import { configEnvWithTenderlyMainnetFork } from '../../../support/steps/configuration.steps';
import { deposit, borrow } from '../../../support/steps/main.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
  asset: {
    deposit: {
      asset: assets.aaveMarket.ETH,
      amount: 0.09,
      hasApproval: true,
    },
    borrow: {
      asset: assets.aaveMarket.ETH,
      amount: 0.04,
      apyType: constants.borrowAPYType.variable,
      hasApproval: false,
    },
    //   repay:[
    //     {
    //       amount: 0.01,
    //       hasApproval: true,
    //       repayOption: constants.repayType.wallet
    //     },
    //     {
    //       amount: 0.01,
    //       hasApproval: false,
    //       repayOption: constants.repayType.collateral
    //     }
    //   ],
    //   withdraw:{
    //     amount: 0.01,
    //     hasApproval: false
    //   },
    // },
    // verifications:{
    //   finalDashboard:[
    //     {
    //       type: constants.dashboardTypes.deposit,
    //       asset: assets.aaveMarket.ETH.shortName,
    //       amount: 0.07,
    //       collateralType: constants.collateralType.isCollateral
    //     },
    //     {
    //       type: constants.dashboardTypes.borrow,
    //       asset: assets.aaveMarket.ETH.shortName,
    //       amount: 0.02,
    //       aprType: constants.borrowAPRType.variable
    //     }
    //   ]
  },
};

describe('ETH INTEGRATION SPEC', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyMainnetFork({});

  deposit(testData.asset.deposit, skipTestState, true);

  borrow(testData.asset.borrow, skipTestState, true);

  // testData.asset.repay.forEach((repayCase) =>{
  //   repay(
  //     {
  //       asset: testData.asset.name,
  //       amount: repayCase.amount,
  //       repayOption: repayCase.repayOption,
  //       hasApproval: repayCase.hasApproval
  //
  //     },
  //     skipTestState,
  //     false
  //   )
  // })

  // withdraw(
  //   {
  //     asset: testData.asset.name,
  //     amount: testData.asset.withdraw.amount,
  //     hasApproval: testData.asset.withdraw.hasApproval,
  //   },
  //   skipTestState,
  //   false
  // )
  // dashboardAssetValuesVerification(
  //   testData.verifications.finalDashboard, skipTestState
  // )
});
