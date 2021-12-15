import 'cypress-waitfor';

export default class Table {
  constructor(tableSelector) {
    this.tableSelector = tableSelector
    this.table = cy.get(tableSelector)
  }

  findRow(assetName, switcherValue){
    if(switcherValue){
      return cy.get(this.tableSelector).should



        .get('.TableItem')
        .filter(`:contains("${assetName}")`)
        .should(($list)=>{
          expect($list).to.have.length(2)
        })
        .contains('.Switcher__label',switcherValue)
        .parents('.TableItem')
    }else{
      return this.table
        .find('.TableItem')
        .contains('.TokenIcon__name',assetName, { timeout: 10000 })
        .parents('.TableItem').should('be.visible')
    }
    //expect($div).to.have.text('Introduction')

    // if(switcherValue){
    //   return this.table
    //       .find('.TableItem')
    //       .find(`:contains("${assetName}")`,{ timeout: 10000 })
    //       .find(`.Switcher__label:contains("${switcherValue}")`, { timeout: 10000 })
    //       .parents('.TableItem').should('be.visible')
    // }else{
    //   return this.table
    //     .find('.TableItem')
    //     .contains('.TokenIcon__name',assetName, { timeout: 10000 })
    //     .parents('.TableItem').should('be.visible')
    // }
  }

  openRepay(rowElem){
    rowElem.find('.Link').contains('Repay').click()
  }

  openSwap(rowElem){
    rowElem.find('.Link').contains('Swap').click()
  }

  openWithdraw(rowElem){
    rowElem.find('.Link').contains('Withdraw').click()
  }
}
