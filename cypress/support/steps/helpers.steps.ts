/// <reference types="cypress" />
import {
  setAmount,
  doConfirm,
  doSwapForRepay,
  getDashBoardBorrowRow,
  getDashBoardDepositRow,
} from './actions.steps';
import constants from '../../fixtures/constans.json';

type SkipType = {
  set: (val: boolean) => void;
  get: () => boolean;
};

const skipSetup = ({ skip, updateSkipStatus }: { skip: SkipType; updateSkipStatus: boolean }) => {
  before(function () {
    if (skip.get()) {
      this.skip();
    }
  });

  afterEach(function onAfterEach() {
    if ((this.currentTest as Mocha.Test).state === 'failed' && updateSkipStatus) {
      skip.set(true);
    }
  });
};

export const faucetBalance = (
  {
    asset,
    hasApproval = true,
  }: {
    asset: { shortName: string; fullName: string };
    hasApproval: boolean;
  },
  skip: SkipType,
  updateSkipStatus = false
) => {
  let _shortName = asset.shortName;
  let _fullName = asset.fullName;

  return describe(`Faucet ${_shortName}, if Balance 0`, () => {
    skipSetup({ skip, updateSkipStatus });
    let isZero = true;
    beforeEach(function () {
      if (!isZero) {
        this.skip();
      }
    });
    it('Get current balance', () => {
      cy.get(`[data-cy=menuDashboard]`).click();
      cy.get(`p:contains('Show assets with 0 balance')`).click();
      cy.get(`[data-cy="supply${_shortName.toUpperCase()}TableItem"]`)
        .find('.Value__value')
        .invoke('text')
        .then((txt) => {
          if (txt != '0') {
            isZero = false;
            cy.log(`Balance is not 0 for ${_shortName}`);
          }
        });
    });
    it('Faucet', () => {
      cy.get(`.Link:contains('Faucet')`).click();
      cy.get(`.FaucetItem .TokenIcon:contains(${_fullName})`).click();
      doConfirm({ hasApproval, actionName: 'Faucet' });
    });
  });
};
