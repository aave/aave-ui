import {
  configEnvWithTenderlyArbitrumRinkebyFork,
  configEnvWithTenderlyAvalancheFork,
  configEnvWithTenderlyPolygonFork,
} from '../../support/steps/configuration.steps';
import { deposit, withdraw, claimReward } from '../../support/steps/main.steps';
import { rewardIsNotAvailable } from '../../support/steps/verification.steps';
import { skipState } from '../../support/steps/common';
import assets from '../../fixtures/assets.json';

const account = {
  address: "0xf276C42196CC4435DFCceFf37b0C32Fc30F9Af94",
  privateKey: "91df6027b851506e996b6d45bf7336578efe5c53c111f83a4a439b8fe175e236"
}

const testData = {
  deposit: {
    asset: assets.avalancheMarket.AVAX,
    amount: 0.9,
    hasApproval: true,
  },
  withdraw: {
    asset: assets.avalancheMarket.AVAX,
    amount: 1,
    hasApproval: false,
  },
};

describe('E-MODE SPEC, AVALANCHE MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyArbitrumRinkebyFork({account: account});
  describe('Babla', ()=>{
    it('111', ()=>{

    })
  })
});
