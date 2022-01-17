import {
  configEnvWithArbitrumRinkeby,
  configEnvWithTenderlyAvalancheFork,
} from '../../../support/steps/configuration.steps';
import {
  deposit,
  borrow,
  repay,
  withdraw,
  changeBorrowType,
} from '../../../support/steps/main.steps';
import { faucetBalance } from '../../../support/steps/helpers.steps'
import { skipSetup, skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';
import { dashboardAssetValuesVerification } from '../../../support/steps/verification.steps';


const testData = {
  testWallet: {
    address: '0x3618D4cc9a7630Ac8f09E73C6e167A4c6c3749e2',
    privateKey: 'b29b20cb306b92e84208b6728532500d21a53ecf83ac083aa2eb159f05611380',
  },
  faucet: {
    asset: assets.arbitrumMarket.DAI,
    hasApproval: true,
  },
  testCases: {
    deposit: {
      asset: assets.arbitrumMarket.DAI,
      amount: 100,
      hasApproval: undefined,
      adaptiveApproval: true,
    },
    borrow: {
      asset: assets.arbitrumMarket.DAI,
      amount: 25,
      apyType: constants.borrowAPYType.variable,
      hasApproval: undefined,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.arbitrumMarket.DAI.shortName,
        amount: 9,
        collateralType: constants.collateralType.isCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.arbitrumMarket.DAI.shortName,
        amount: 23,
        apyType: constants.borrowAPYType.variable,
      },
    ],
  },
  clean:{
    repay: {
      asset: assets.arbitrumMarket.DAI,
      amount: 10000,
      hasApproval: undefined,
      repayOption: constants.repayType.default,
    },
    withdraw: {
      asset: assets.arbitrumMarket.DAI,
      amount: 10000,
      hasApproval: undefined,
    },
  },
};
describe('DAI INTEGRATION SPEC, ARBITRUM RINKEBY', () => {
  const skipTestState = skipState(false);
  configEnvWithArbitrumRinkeby({ wallet: testData.testWallet });
  faucetBalance(testData.faucet, skipTestState, true);

  deposit(testData.testCases.deposit, skipTestState, true);
  borrow(testData.testCases.borrow, skipTestState, true);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
  repay(testData.clean.repay, skipTestState, false);
  withdraw(testData.clean.withdraw, skipTestState, false);

});
