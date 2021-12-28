import {
  configEnvWithTenderlyMainnetFork,
  configEnvWithTenderlyPolygonFork,
} from '../../../support/steps/configuration.steps';
import { deposit, borrow, repay, withdraw } from '../../../support/steps/main.steps';
import {
  dashboardAssetValuesVerification,
  switchCollateralBlocked,
} from '../../../support/steps/verification.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
  depositBaseAmount: {
    asset: assets.polygonMarket.MATIC,
    amount: 800,
    hasApproval: true,
  },
  testCases: {
    borrow: {
      asset: assets.polygonMarket.USDT,
      amount: 25,
      apyType: constants.borrowAPYType.variable,
      hasApproval: true,
    },
    deposit: {
      asset: assets.polygonMarket.USDT,
      amount: 10,
      hasApproval: false,
    },
    repay: {
      asset: assets.polygonMarket.USDT,
      amount: 2,
      hasApproval: true,
      repayOption: constants.repayType.default,
    },
    withdraw: {
      asset: assets.polygonMarket.USDT,
      amount: 1,
      hasApproval: true,
    },
    checkDisabledCollateral: {
      asset: assets.polygonMarket.USDT,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.polygonMarket.USDT.shortName,
        amount: 9,
        collateralType: constants.collateralType.isNotCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.polygonMarket.USDT.shortName,
        amount: 23,
        apyType: constants.borrowAPYType.variable,
      },
    ],
  },
};

describe('USDT INTEGRATION SPEC, POLYGON MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyPolygonFork({});

  deposit(testData.depositBaseAmount, skipTestState, true);
  borrow(testData.testCases.borrow, skipTestState, true);
  deposit(testData.testCases.deposit, skipTestState, true);
  repay(testData.testCases.repay, skipTestState, false);
  withdraw(testData.testCases.withdraw, skipTestState, false);
  switchCollateralBlocked(testData.testCases.checkDisabledCollateral, skipTestState);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
