import {
  configEnvWithTenderlyAvalancheFork,
  configEnvWithTenderlyMainnetFork,
  configEnvWithTenderlyPolygonFork,
} from '../../../support/steps/configuration.steps';
import {
  deposit,
  borrow,
  repay,
  withdraw,
  changeCollateral,
  changeCollateralNegative,
} from '../../../support/steps/main.steps';
import {
  borrowsUnavailable,
  dashboardAssetValuesVerification,
  switchCollateralBlocked,
} from '../../../support/steps/verification.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
  testCases: {
    deposit: {
      asset: assets.avalancheMarket.AVAX,
      amount: 0.09,
      hasApproval: true,
    },
    collateral: {
      switchOff: {
        asset: assets.avalancheMarket.AVAX,
        collateralType: constants.collateralType.isCollateral,
        hasApproval: true,
      },
      switchOn: {
        asset: assets.avalancheMarket.AVAX,
        collateralType: constants.collateralType.isNotCollateral,
        hasApproval: true,
      },
      switchNegative: {
        asset: assets.avalancheMarket.AVAX,
        collateralType: constants.collateralType.isCollateral,
      },
    },
    borrow: {
      asset: assets.avalancheMarket.AVAX,
      amount: 0.04,
      apyType: constants.borrowAPYType.variable,
      hasApproval: false,
    },
    repay: {
      asset: assets.avalancheMarket.AVAX,
      amount: 0.01,
      hasApproval: true,
      repayOption: constants.repayType.default,
    },
    withdraw: {
      asset: assets.avalancheMarket.AVAX,
      amount: 0.01,
      hasApproval: false,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.avalancheMarket.AVAX.shortName,
        amount: 0.08,
        collateralType: constants.collateralType.isCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.avalancheMarket.AVAX.shortName,
        amount: 0.03,
        apyType: constants.borrowAPYType.variable,
      },
    ],
  },
};

describe('AVAX INTEGRATION SPEC, AVALANCHE MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyAvalancheFork({});

  deposit(testData.testCases.deposit, skipTestState, true);
  describe('Check Collateral switching', () => {
    changeCollateral(testData.testCases.collateral.switchOff, skipTestState, false);
    borrowsUnavailable(skipTestState);
    changeCollateral(testData.testCases.collateral.switchOn, skipTestState, false);
  });
  borrow(testData.testCases.borrow, skipTestState, true);
  changeCollateralNegative(testData.testCases.collateral.switchNegative, skipTestState, false);
  repay(testData.testCases.repay, skipTestState, false);
  withdraw(testData.testCases.withdraw, skipTestState, false);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
