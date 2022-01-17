type SetAmount = {
  amount: number;
  max?: boolean;
};

export const setAmount = ({ amount, max }: SetAmount) => {
  if (max) {
    cy.get(`[data-cy=amountInput-maxBtn]`);
  } else {
    cy.get(`[data-cy=amountInput]`).type(amount.toString(), { delay: 0 });
  }
  cy.get('.BasicForm').find('.Button').click();
};

const clickActionButton = (name?: string) => {
  if (name) {
    cy.get('.TxConfirmationView').get('.Button').contains(name).click();
  } else {
    cy.get('.TxConfirmationView').get('.Button').click();
  }
};

const oneStepConfirm = (actionName?:string) => {
  clickActionButton(actionName);
  cy.get('.TextStatus > p:contains("2/2 Success!")').scrollIntoView().should('be.visible');
};

const twoStepConfirm = (actionName?: string) => {
  cy.get('.TxTopInfo__title:contains("1/3 Approve")').scrollIntoView().should('be.visible');
  cy.get('.TxConfirmationView').find('.Button').contains('Approve').click();
  if (actionName != null)
    cy.get(`.TxTopInfo__title:contains("2/3 ${actionName}")`)
      .scrollIntoView()
      .should('be.visible');
  clickActionButton(actionName);
  cy.get('.TextStatus > p:contains("3/3 Success!")').scrollIntoView().should('be.visible');
};

type ConfirmAction = {
  hasApproval: boolean;
  actionName?: string;
};

export const doConfirm = ({ hasApproval, actionName }: ConfirmAction) => {
  if(hasApproval){
    oneStepConfirm(actionName);
  }else{
    twoStepConfirm(actionName);
  }
  // let clickActionButton = (name?: string) => {
  //   if (name) {
  //     cy.get('.TxConfirmationView').get('.Button').contains(name).click();
  //   } else {
  //     cy.get('.TxConfirmationView').get('.Button').click();
  //   }
  // };

  // let oneStep = () => {
  //   clickActionButton(actionName);
  //   cy.get('.TextStatus > p:contains("2/2 Success!")').scrollIntoView().should('be.visible');
  // }
  //
  // let twoStep = () => {
  //   cy.get('.TxTopInfo__title:contains("1/3 Approve")').scrollIntoView().should('be.visible');
  //   cy.get('.TxConfirmationView').find('.Button').contains('Approve').click();
  //   if (actionName != null)
  //     cy.get(`.TxTopInfo__title:contains("2/3 ${actionName}")`)
  //       .scrollIntoView()
  //       .should('be.visible');
  //   clickActionButton(actionName);
  //   cy.get('.TextStatus > p:contains("3/3 Success!")').scrollIntoView().should('be.visible');
  // }

  // if (hasApproval) {
  //   clickActionButton(actionName);
  //   cy.get('.TextStatus > p:contains("2/2 Success!")').scrollIntoView().should('be.visible');
  // } else {
  //   cy.get('.TxTopInfo__title:contains("1/3 Approve")').scrollIntoView().should('be.visible');
  //   cy.get('.TxConfirmationView').find('.Button').contains('Approve').click();
  //   if (actionName != null)
  //     cy.get(`.TxTopInfo__title:contains("2/3 ${actionName}")`)
  //       .scrollIntoView()
  //       .should('be.visible');
  //   clickActionButton(actionName);
  //   cy.get('.TextStatus > p:contains("3/3 Success!")').scrollIntoView().should('be.visible');
  // }
};

type AdaptiveConfirmAction = {
  actionName?: string;
};

export const doAdaptiveConfirm = ({actionName}: AdaptiveConfirmAction) =>{
  cy.get('.TxTopInfo__title')
    .invoke('text')
    .then((txt) => {
      cy.log(`???? ${txt}`)
      if (txt.trim() == '1/3 Approve'.trim()) {
        cy.log(`11111`)
        twoStepConfirm(actionName);
      } else {
        cy.log(`22222`)
        oneStepConfirm(actionName);
      }
    });
}

function doChooseSwapToOption(assetName: string) {
  cy.get('.AssetSelect__reverse .AssetSelect__button').click();
  cy.get('.AssetSelect__reverse .TokenIcon__name').contains(assetName).click();
}

type SwapForRepayAction = {
  amount: number;
  assetName?: string;
};

export const doSwapForRepay = ({ amount, assetName }: SwapForRepayAction) => {
  cy.log('assetName,' + assetName);
  cy.get(':nth-child(1) > .AmountFieldWithSelect__field-inner  [data-cy=amountInput]').type(
    amount.toString(),
    { delay: 0 }
  );
  if (assetName) {
    doChooseSwapToOption(assetName);
  }
  cy.get('.Button').contains('Continue').parents('.Button').should('not.be.disabled').click();
};

type GetDashBoardBorrowRow = {
  assetName: string;
  apyType?: string;
};

export const getDashBoardBorrowRow = ({ assetName, apyType }: GetDashBoardBorrowRow) => {
  if (apyType == null) {
    return cy.get(`[data-cy="dashboardBorrowListItem_${assetName.toUpperCase()}"]`).first();
  } else {
    return cy
      .get(
        `[data-cy="dashboardBorrowListItem_${assetName.toUpperCase()}"] .Switcher__label:contains('${apyType}')`
      )
      .parents(`[data-cy="dashboardBorrowListItem_${assetName.toUpperCase()}"]`);
  }
};

type GetDashBoardDepositRow = {
  assetName: string;
  collateralType?: string;
};

export const getDashBoardDepositRow = ({ assetName, collateralType }: GetDashBoardDepositRow) => {
  if (!collateralType) {
    return cy.get(`[data-cy="dashboardDespositListItem${assetName.toUpperCase()}"]`).first();
  } else {
    return cy
      .get(
        `[data-cy="dashboardDespositListItem${assetName.toUpperCase()}"] .Switcher__swiper input[aria-checked="${collateralType}"]`
      )
      .parents(`[data-cy="dashboardDespositListItem${assetName.toUpperCase()}"]`);
  }
};
