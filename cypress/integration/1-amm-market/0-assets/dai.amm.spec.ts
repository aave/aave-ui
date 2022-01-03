import { configEnvWithTenderlyMainnetFork } from '../../../support/steps/configuration.steps';
import { deposit, borrow, repay, withdraw } from '../../../support/steps/main.steps';
import {
  dashboardAssetValuesVerification,
  switchApyBlocked,
} from '../../../support/steps/verification.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
  depositETH: {
    asset: assets.aaveMarket.ETH,
    amount: 0.9,
    hasApproval: true,
  },
  testCases: {
    borrow: [
      {
        asset: assets.aaveMarket.DAI,
        amount: 100,
        apyType: constants.borrowAPYType.variable,
        hasApproval: true,
      },
    ],
    deposit: {
      asset: assets.aaveMarket.DAI,
      amount: 50,
      hasApproval: false,
    },
    repay: [
      {
        asset: assets.aaveMarket.DAI,
        amount: 10,
        hasApproval: true,
        repayOption: constants.repayType.default,
      },
    ],
    withdraw: {
      asset: assets.aaveMarket.DAI,
      amount: 10,
      hasApproval: true,
    },
    switchApyBlocked: {
      asset: assets.aaveMarket.DAI,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.aaveMarket.DAI.shortName,
        amount: 40,
        collateralType: constants.collateralType.isCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.aaveMarket.DAI.shortName,
        amount: 90,
        apyType: constants.borrowAPYType.variable,
      },
    ],
  },
};

describe('DAI INTEGRATION SPEC, AMM MARKET', () => {
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
  switchApyBlocked(testData.testCases.switchApyBlocked, skipTestState);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
