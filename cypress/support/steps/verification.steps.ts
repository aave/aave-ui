import { getDashBoardBorrowRow, getDashBoardDepositRow } from './actions.steps';
import constants from '../../fixtures/constans.json';
import { getRoundDegree } from '../tools/math.util';

const skipSetup = (skip: any) => {
  before(function () {
    if (skip.get()) {
      this.skip();
    }
  });
};

const amountVerification = ($row: any, estimatedAmount: number) => {
  let _degree = getRoundDegree(estimatedAmount);
  let _balanceValue =
    Math.floor(parseFloat($row.find('.Value__value').text().replace(/,/g, '')) * _degree) / _degree;
  expect(estimatedAmount).to.be.equal(_balanceValue, 'Amount');
};

export const dashboardAssetValuesVerification = (
  estimatedCases: {
    apyType: string;
    asset: string;
    type: string;
    amount: number;
    collateralType: string;
  }[],
  skip: boolean
) => {
  return describe(`Verification dashboard values`, () => {
    skipSetup(skip);
    it(`Open dashboard page`, () => {
      cy.get('.Menu strong').contains('dashboard').click().wait(4000);// awaitng sync
    });
    estimatedCases.forEach((estimatedCase) => {
      describe(`Verification ${estimatedCase.asset} ${estimatedCase.type}, have right values`, () => {
        switch (estimatedCase.type) {
          case constants.dashboardTypes.borrow:
            it(`Check that asset name is ${estimatedCase.asset},
            with apy type ${estimatedCase.apyType}
             ${estimatedCase.amount ? ' and amount ' + estimatedCase.amount : ''}`, () => {
              getDashBoardBorrowRow(estimatedCase.asset, estimatedCase.apyType).within(($row) => {
                expect($row.find('.TokenIcon__name')).to.contain(estimatedCase.asset);
                expect($row.find('.Switcher__label')).to.contain(estimatedCase.apyType);
                if(estimatedCase.amount){
                  amountVerification($row, estimatedCase.amount);
                }
              });
            });
            break;
          case constants.dashboardTypes.deposit:
            it(`Check that asset name is ${estimatedCase.asset},
            with collateral type ${estimatedCase.collateralType}
            ${estimatedCase.amount ? ' and amount ' + estimatedCase.amount : ''}`, () => {
              getDashBoardDepositRow(estimatedCase.asset, estimatedCase.collateralType).within(($row) => {
                expect($row.find('.TokenIcon__name')).to.contain(estimatedCase.asset);
                expect($row.find('.Switcher__label')).to.contain(estimatedCase.collateralType);
                if(estimatedCase.amount){
                  amountVerification($row, estimatedCase.amount);
                }
              });
            });
            break;
        }
      });
    });
  });
};
