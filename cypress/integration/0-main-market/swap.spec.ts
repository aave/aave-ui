import { configEnvWithTenderlyMainnetFork } from '../../support/steps/configuration.steps';
import { deposit, swap, borrow } from '../../support/steps/main.steps';
import { dashboardAssetValuesVerification } from '../../support/steps/verification.steps';
import { skipState } from '../../support/steps/common';
import assets from '../../fixtures/assets.json';
import constants from '../../fixtures/constans.json';

const testData = {
  depositETH: {
    asset: assets.aaveMarket.ETH,
    amount: 0.9,
    hasApproval: true,
  },
};

describe('SWAP SPEC FOR MAINMARKET', () => {
  describe('CASE1: usual swap', () => {
    const skipTestState = skipState(false);
    configEnvWithTenderlyMainnetFork({});

    deposit(testData.depositETH, skipTestState, true);
    swap(
      {
        fromAsset: assets.aaveMarket.ETH,
        toAsset: assets.aaveMarket.DAI,
        amount: 0.1,
        hasApproval: false,
      },
      skipTestState,
      true
    );
    dashboardAssetValuesVerification(
      [
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.aaveMarket.ETH.shortName,
          amount: 0.8,
          collateralType: constants.collateralType.isCollateral,
        },
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.aaveMarket.DAI.shortName,
          collateralType: constants.collateralType.isCollateral,
        },
      ],
      skipTestState
    );
  });
  describe('CASE2: swap to not collateral asset', () => {
    const skipTestState = skipState(false);
    configEnvWithTenderlyMainnetFork({});

    deposit(testData.depositETH, skipTestState, true);
    swap(
      {
        fromAsset: assets.aaveMarket.ETH,
        toAsset: assets.aaveMarket.USDT,
        amount: 0.1,
        hasApproval: false,
      },
      skipTestState,
      true
    );
    dashboardAssetValuesVerification(
      [
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.aaveMarket.ETH.shortName,
          amount: 0.8,
          collateralType: constants.collateralType.isCollateral,
        },
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.aaveMarket.USDT.shortName,
          collateralType: constants.collateralType.isNotCollateral,
        },
      ],
      skipTestState
    );
  });
  describe('CASE3: try to swap for health factor low then 1', () => {
    const skipTestState = skipState(false);
    configEnvWithTenderlyMainnetFork({});

    deposit(testData.depositETH, skipTestState, true);
    borrow(
      {
        asset: assets.aaveMarket.ETH,
        amount: 0.9,
        apyType: constants.borrowAPYType.variable,
        hasApproval: false,
      },
      skipTestState,
      true
    );
    swap(
      {
        fromAsset: assets.aaveMarket.ETH,
        toAsset: assets.aaveMarket.USDT,
        amount: 1,
        failCase: true,
        hasApproval: false,
      },
      skipTestState,
      true
    );
  });
});
