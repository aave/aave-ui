export default class Table {
  constructor(tableSelector) {
    this.table = cy.get(tableSelector)
  }

  findRow(assetName, switcherValue){
    if(switcherValue){
      return this.table
        .find('.TableItem')
        .filter(`:contains("${assetName}")`)
        .contains('.Switcher__label',switcherValue)
        .parents('.TableItem')
    }else{
      return this.table
        .find('.TableItem')
        .contains('.TokenIcon__name',assetName)
        .parents('.TableItem')
    }
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
