import { configEnvWithTenderlyMainnetFork } from '../../support/steps/configuration.steps';
import { deposit, withdraw, claimReward } from '../../support/steps/main.steps';
import { rewardIsNotAvailable } from '../../support/steps/verification.steps';
import { skipSetup, skipState } from '../../support/steps/common';
import assets from '../../fixtures/assets.json';
import { doConfirm, setAmount } from '../../support/steps/actions.steps';

const testData = {
  testWallet: {
    address: '0x76da23649aF481883A2654034132E69275493E76',
    privateKey: 'cd1120986473aa1db82560891d244c7bb683ab3cb37270dd6599e917ad6f7269',
  },
};

const stakeTest = (asset: { fullName: string; shortName: string; address: string }) => {
  let _shortName = asset.shortName;
  let _address = asset.address;
  return describe(`Stake AAVE ${_shortName}`, () => {
    const skipTestState = skipState(false);
    configEnvWithTenderlyMainnetFork({
      account: testData.testWallet,
      tokens: [asset],
    });
    it('Open stake Page', () => {
      cy.get('.Menu strong').contains('Stake').click();
    });
    describe(`Stake 1 ${_shortName}`, () => {
      skipSetup({
        skip: skipTestState,
        updateSkipStatus: true,
      });
      it('Open stake AAVE', () => {
        switch (_shortName) {
          case assets.staking.AAVE.shortName:
            cy.get('[href="/staking/aave"], [href="#/staking/aave"]').click();
            break;
          case assets.staking.ABPT.shortName:
            cy.get('[href="/staking/bpt"], [href="#/staking/bpt"]').click();
            break;
          default:
            cy.get('[href="/staking/aave"], [href="#/staking/aave"]').click();
            break;
        }
      });
      it('Set amount', () => {
        setAmount({ amount: 1 });
      });
      it('Confirm notification', () => {
        cy.get(`.Button:contains('I understand')`).click();
      });
      it('Make confirm', () => {
        doConfirm({ hasApproval: false, actionName: 'Stake' });
      });
    });
    describe('Claim reward', () => {
      skipSetup({
        skip: skipTestState,
        updateSkipStatus: false,
      });
      if (assets.staking.ABPT.shortName == _shortName) {
        it('Switch to BPT tab', () => {
          cy.get(`.LabeledSwitch__inner Button:contains('bpt')`).click();
        });
      }
      it('Open Claim', () => {
        cy.get(`.Button:contains('Claim')`).should('not.be.disabled').click();
      });
      it('Make confirm', () => {
        doConfirm({ hasApproval: true, actionName: 'Claim' });
      });
    });
    describe('Activate Cooldown', () => {
      skipSetup({
        skip: skipTestState,
        updateSkipStatus: false,
      });
      it('Open notification popup', () => {
        cy.get(`.Button:contains('Activate Cooldown')`).should('not.be.disabled').click();
      });
      it('Accept notification', () => {
        cy.get('.CooldownInfoModal__buttonInner')
          .find('.Button:contains("Activate Cooldown")')
          .should('be.disabled');
        cy.get('.CheckBoxField__label').click();
        cy.get('.CooldownInfoModal__buttonInner')
          .find('.Button:contains("Activate Cooldown")')
          .should('not.be.disabled')
          .click();
      });
      it('Activate cooldown', () => {
        doConfirm({ hasApproval: true, actionName: 'Activate' });
        cy.get('.StakingWrapper__info-timerInner').should('be.visible');
      });
    });
  });
};

describe('STAKE INTEGRATION SPEC', () => {
  stakeTest(assets.staking.AAVE);
  stakeTest(assets.staking.ABPT);
});
