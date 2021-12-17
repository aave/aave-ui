import { setAmount, doConfirm, doSwapForRepay, getDashBoardBorrowRow, getDashBoardDepositRow } from './actions.steps';
import constants from '../../fixtures/constans.json';

const URL = Cypress.env('URL');

const skipSetup = ({ skip, updateSkipStatus }) => {
  before(function() {
    if (skip.get()) {
      this.skip();
    }
  });

  afterEach(function onAfterEach() {
    if (this.currentTest.state === 'failed' && updateSkipStatus) {
      skip.set(true);
    }
  });
};

module.exports.deposit = ({ asset, amount, hasApproval = true }, skip, updateSkipStatus = false) => {
  let _shortName = asset.shortName;
  let _fullName = asset.fullName;

  return describe(`Deposit process for ${_shortName}`, () => {
    skipSetup({ skip, updateSkipStatus });
    it(`Open ${_shortName} borrow view`, () => {
      cy.get('.Menu strong').contains('Deposit').click();
      cy.get('.TokenIcon__name').contains(_fullName).click();
    });
    it(`Set ${amount} deposit amount for ${_shortName}`, () => {
      setAmount({ amount });
    });
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      doConfirm({ hasApproval, actionName: 'Deposit' });
    });
  });
};

module.exports.borrow = (
  { asset, amount, apyType, hasApproval = true },
  skip,
  updateSkipStatus = false,
) => {
  let _shortName = asset.shortName;
  let _fullName = asset.fullName;

  return describe(`Borrow process for ${_shortName}`, () => {
    skipSetup({ skip, updateSkipStatus });
    it(`Open ${_shortName} borrow view`, () => {
      cy.get('.Menu strong').contains('Borrow').click();
      cy.get('.TokenIcon__name').contains(_fullName).click();
    });
    it(`Set ${amount} borrow amount for ${_shortName}`, () => {
      setAmount({ amount });
    });
    it(`Choose ${apyType === constants.borrowAPYType.variable ? 'Variable' : 'Stable'} APY type`, () => {
      switch (apyType) {
        case constants.borrowAPYType.variable:
          cy.get('.InterestRateButton__inner p').contains('Variable APY').click();
          break;
        case constants.borrowAPYType.stable:
          cy.get('.InterestRateButton__inner p').contains('Stable APY').click();
          break;
        default:
          cy.get('.InterestRateButton__inner p').contains('Variable APY').click();
          break;
      }
      cy.get('.Button').contains('Continue').click();
    });
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      doConfirm({ hasApproval, actionName: 'Borrow' });
    });
  });
};

module.exports.repay = (
  { asset, amount, repayOption, assetForRepay = null, hasApproval = false },
  skip,
  updateSkipStatus = false,
) => {
  let _shortName = asset.shortName;
  let _shortNameAssetForRepay = assetForRepay != null ? assetForRepay.shortName : null;

  return describe(`Repay by ${repayOption} process for ${_shortName}`, () => {
    skipSetup({ skip, updateSkipStatus });
    it(`Open ${_shortName} repay view`, () => {
      cy.get('.Menu strong').contains('dashboard').click();
      getDashBoardBorrowRow(_shortName).contains('Repay').click();
    });
    it(`Choose ${repayOption} repay option`, () => {
      switch (repayOption) {
        case constants.repayType.collateral:
          cy.get('.ButtonLink').contains('With your current collateral').click();
          break;
        case constants.repayType.wallet:
          cy.get('.ButtonLink').contains('From your wallet balance').click();
          break;
        case constants.repayType.default:
          break;
        default:
          cy.get('.ButtonLink').contains('From your wallet balance').click();
          break;
      }
    });
    it(`Set ${amount} repay amount for ${_shortName}, with ${repayOption} repay option`, () => {
      switch (repayOption) {
        case constants.repayType.collateral:
          doSwapForRepay({ amount, assetName: _shortNameAssetForRepay });
          break;
        case constants.repayType.wallet:
          setAmount({ amount });
          break;
        case constants.repayType.default:
          setAmount({ amount });
          break;
      }
    });
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      doConfirm({ hasApproval, actionName: 'Repay' });
    });
  });
};

module.exports.withdraw = (
  { asset, amount, hasApproval = false },
  skip,
  updateSkipStatus = false,
) => {
  let _shortName = asset.shortName;
  return describe(`Withdraw process for ${_shortName}`, () => {
    skipSetup({ skip, updateSkipStatus });
    it(`Open ${_shortName} repay view`, () => {
      cy.get('.Menu strong').contains('dashboard').click();
      getDashBoardDepositRow(_shortName).contains('Withdraw').click();
    });
    it(`Set ${amount} withdraw amount for ${_shortName}`, () => {
      setAmount({ amount });
    });
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      doConfirm({ hasApproval, actionName: 'Withdraw' });
    });
  });
};

module.exports.changeBorrowType = (
  { asset, apyType, newAPY, hasApproval = true },
  skip,
  updateSkipStatus = false,
) => {
  let _shortName = asset.shortName;

  describe('Change APY of borrowing', () => {
    skipSetup({ skip, updateSkipStatus });
    it(`Change the ${_shortName} borrowing apr type from ${apyType} to ${newAPY}`, () => {
      cy.get('.Menu strong').contains('dashboard').click();
      getDashBoardBorrowRow(_shortName, apyType).find('.Switcher__swiper').click();
    });
    it(`Make approve for ${_shortName}, on confirmation page`, () => {
      doConfirm({ hasApproval, actionName: 'Submit' });
    });
  });
};
