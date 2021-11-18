const DashboardPage = require('../pageobjects/dashboard.page')

const constants = require('../fixtures/consts.json')

module.exports.dashboardAssetValuesVerification = (estimatedCases, skip) => {
  return describe(`Verification dashboard values`, () => {
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Open dashboard page`, () => {
      DashboardPage.open()
    })
    estimatedCases.forEach((estimatedCase) =>{
      describe(`Verification ${estimatedCase.asset} ${estimatedCase.type}, have right values`, () =>{
        switch (estimatedCase.type) {
          case constants.dashboardTypes.deposit:
            it(`Check that ${estimatedCase.asset} ${estimatedCase.type},` +
              estimatedCase.amount == null ? `amount = undefined,` : `have amount ${estimatedCase.amount} with `+
              `collateral is ${estimatedCase.collateralType}`, ()=>{
              DashboardPage.doCheckDepositValue(estimatedCase.asset, estimatedCase.collateralType, estimatedCase.amount)
            })
            break
          case constants.dashboardTypes.borrow:
            it(`Check that ${estimatedCase.asset} ${estimatedCase.type},`+
              estimatedCase.amount == null?`amount = undefined,`:`have amount ${estimatedCase.amount} with ` +
              `APR type ${estimatedCase.aprType}`,()=>{
              DashboardPage.doCheckBorrowValue(estimatedCase.asset, estimatedCase.aprType, estimatedCase.amount)
            })
            break
        }
      })
    })
  })
}

module.exports.dashboardSpotCountVerification = ({depositCount, borrowCount}, skip) => {
  return describe(`Verification dashboard count of rows`, () => {
    before(function(){
      if(skip.get()){
        this.skip()
      }
    })
    it(`Open dashboard page`, () => {
      DashboardPage.open()
    })
    if (depositCount !=undefined && depositCount != null)
      it(`Deposit count of rows should be: ${depositCount}`,()=>{
      DashboardPage.doCheckCountOfDepositRows(depositCount)
    })
    if (borrowCount != undefined && borrowCount != null)
      it(`Borrows count of rows should be: ${borrowCount}`, ()=>{
      DashboardPage.doCheckCountOfBorrowRows(borrowCount)
    })
  })
}
