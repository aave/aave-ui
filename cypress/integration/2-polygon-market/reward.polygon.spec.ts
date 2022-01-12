import { configEnvWithTenderlyPolygonFork } from '../../support/steps/configuration.steps';
import { deposit, withdraw, claimReward } from '../../support/steps/main.steps';
import { rewardIsNotAvailable } from '../../support/steps/verification.steps';
import { skipState } from '../../support/steps/common';
import assets from '../../fixtures/assets.json';

const testData = {
  deposit: {
    asset: assets.polygonMarket.MATIC,
    amount: 0.9,
    hasApproval: true,
  },
  withdraw: {
    asset: assets.polygonMarket.MATIC,
    amount: 1,
    hasApproval: false,
  },
};

describe('REWARD INTEGRATION SPEC, POLYGON MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyPolygonFork({});

  deposit(testData.deposit, skipTestState, true);
  claimReward(skipTestState, true);
  withdraw(testData.withdraw, skipTestState, true);
  claimReward(skipTestState, true);
  rewardIsNotAvailable(skipTestState);
});
