import { configEnvWithTenderlyMainnetFork } from '../../../support/steps/configuration.steps';
import { deposit, borrow, repay, withdraw } from '../../../support/steps/main.steps';
import {
  dashboardAssetValuesVerification,
  switchCollateralBlocked,
  switchApyBlocked,
} from '../../../support/steps/verification.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
  depositETH: {
    asset: assets.aaveMarket.ETH,
    amount: 0.5,
    hasApproval: true,
  },
  testCases: {
    deposit: {
      asset: assets.aaveMarket.USDT,
      amount: 50,
      hasApproval: false,
    },
    borrow: [
      {
        asset: assets.aaveMarket.USDT,
        amount: 100,
        apyType: constants.borrowAPYType.variable,
        hasApproval: true,
      },
    ],
    repay: [
      {
        asset: assets.aaveMarket.USDT,
        amount: 10,
        hasApproval: true,
        repayOption: constants.repayType.default,
      },
    ],
    withdraw: {
      asset: assets.aaveMarket.USDT,
      amount: 10,
      hasApproval: true,
    },
    checkDisabledCollateral: {
      asset: assets.aaveMarket.USDT,
    },
    switchApyBlocked: {
      asset: assets.aaveMarket.USDT,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.aaveMarket.USDT.shortName,
        amount: 40,
        collateralType: constants.collateralType.isNotCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.aaveMarket.USDT.shortName,
        amount: 90,
        apyType: constants.borrowAPYType.variable,
      },
    ],
  },
};

describe('USDT INTEGRATION SPEC, AMM MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyMainnetFork({
    market: 'fork_amm_mainnet',
  });

  deposit(testData.depositETH, skipTestState, true);
  testData.testCases.borrow.forEach((borrowCase) => {
    borrow(borrowCase, skipTestState, true);
  });
  deposit(testData.testCases.deposit, skipTestState, true);
  testData.testCases.repay.forEach((repayCase) => {
    repay(repayCase, skipTestState, false);
  });
  withdraw(testData.testCases.withdraw, skipTestState, false);
  switchCollateralBlocked(testData.testCases.checkDisabledCollateral, skipTestState);
  switchApyBlocked(testData.testCases.checkDisabledCollateral, skipTestState);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
