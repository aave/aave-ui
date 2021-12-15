const { click } = require('@testing-library/user-event/dist/click');

module.exports.setAmount = ({amount, max =false}) => {
  if(max){
    cy.get(`[data-cy=amountInput-maxBtn]`)
  }else{
    cy.get(`[data-cy=amountInput]`).type(amount);
  }
  cy.get('.BasicForm').contains('Continue').click();
}

module.exports.doConfirm = ({hasApproval, actionName = null}) => {
  let _confirmForm = dw cy.get('.TxConfirmationView');
  let clickActionButton = (name) =>{
    if(name != null){
      _confirmForm.find('.Button').contains(name).click();
    }else{
      _confirmForm.find('.Button').click();
    }
  }
  if(hasApproval){
    clickActionButton(actionName)
    cy.get('.TextStatus > p').contains('2/2 Success!');
  }else{
    cy.get('.TxTopInfo__title').contains('1/3 Approve');
    _confirmForm.find('.Button').contains('Approve').click();
    if(actionName != null)
      cy.get(`.TxTopInfo__title:contains("2/3 ${actionName}")`)
    clickActionButton(actionName)
    cy.get('.TextStatus').contains('3/3 Success!');
  }
}

function doChooseSwapToOption(assetName){
  cy.get('.AssetSelect__reverse .AssetSelect__button').click();
  cy.get('.AssetSelect__reverse .TokenIcon__name').contains(assetName).click();
}

module.exports.doSwapForRepay = ({amount, assetName = null}) => {
  cy.log('assetName,' + assetName);
  cy.get(':nth-child(1) > .AmountFieldWithSelect__field-inner  [data-cy=amountInput]').type(amount);
  if(assetName != null){
    doChooseSwapToOption(assetName);
  }
  cy.get('.Button')
    .contains('Continue')
    .parents('.Button')
    .should('not.be.disabled')
    .click();
}
