import { configEnvWithTenderlyMainnetFork } from '../../../support/steps/configuration.steps';
import {
  deposit,
  borrow,
  changeCollateral,
  repay,
  withdraw,
  changeBorrowTypeNegative,
  changeCollateralNegative,
} from '../../../support/steps/main.steps';
import {
  dashboardAssetValuesVerification,
  borrowsUnavailable,
} from '../../../support/steps/verification.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
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
  switchBorrowType: {
    asset: assets.aaveMarket.ETH,
    apyType: constants.borrowAPYType.variable,
  },
  collateral: {
    switchOff: {
      asset: assets.aaveMarket.ETH,
      collateralType: constants.collateralType.isCollateral,
      hasApproval: true,
    },
    switchOn: {
      asset: assets.aaveMarket.ETH,
      collateralType: constants.collateralType.isNotCollateral,
      hasApproval: true,
    },
    switchNegative: {
      asset: assets.aaveMarket.ETH,
      collateralType: constants.collateralType.isCollateral,
    },
  },
  repay: [
    {
      asset: assets.aaveMarket.ETH,
      amount: 0.01,
      hasApproval: true,
      repayOption: constants.repayType.wallet,
    },
    {
      asset: assets.aaveMarket.ETH,
      amount: 0.01,
      hasApproval: false,
      repayOption: constants.repayType.collateral,
    },
  ],
  withdraw: {
    asset: assets.aaveMarket.ETH,
    amount: 0.01,
    hasApproval: false,
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.aaveMarket.ETH.shortName,
        amount: 0.07,
        collateralType: constants.collateralType.isCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.aaveMarket.ETH.shortName,
        amount: 0.02,
        apyType: constants.borrowAPYType.variable,
      },
    ],
  },
};

describe('ETH INTEGRATION SPEC', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyMainnetFork({});

  deposit(testData.deposit, skipTestState, true);
  describe('Check Collateral switching', () => {
    changeCollateral(testData.collateral.switchOff, skipTestState, false);
    borrowsUnavailable(skipTestState);
    changeCollateral(testData.collateral.switchOn, skipTestState, false);
  });
  borrow(testData.borrow, skipTestState, true);
  changeBorrowTypeNegative(testData.switchBorrowType, skipTestState, false);
  changeCollateralNegative(testData.collateral.switchNegative, skipTestState, false);
  testData.repay.forEach((repayCase) => {
    repay(repayCase, skipTestState, false);
  });
  withdraw(testData.withdraw, skipTestState, false);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
