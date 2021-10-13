const Page = require('./page');
const elemUtil = require('../util/elementUtil')
const mathUtil = require('../util/mathUtil')

const locators = {
  depositTable: {
    table: "//div[contains(@class, 'MainDashboardTable__left-inner')]",
    withdrawBtn: ".//*[text()='Withdraw']",
    swapBtn: ".//*[text()='Swap']",
    balanceBox: ".//p[contains(@class, 'Value__value')]/..",
    collateralTypeBox: ".//p[contains(@class, 'Switcher__label')]"

  },
  borrowsTable:{
    table: "//div[contains(@class, 'MainDashboardTable__right-inner')]",
    repayBtn: ".//*[text()='Repay']",
    borrowBtn: ".//*[text()='Borrow']",
    borrowBalanceBox: ".//p[contains(@class, 'Value__value')]/..",
    aprTypeBox: ".//p[contains(@class, 'Switcher__label')]",
    aprSwitcher: ".//div[contains(@class, 'Switcher__swiper')]"

  },
  emptyDashboardText: "//*[text()='No deposits found for your address']",
  reward:{
    block: "//div[contains(@class, 'TopIncentiveBalance')]",
    count: "//div[contains(@class, 'TopIncentiveBalance')]//div[contains(@class, 'TopIncentiveBalance__value--inner')]",
    claimBtn:"//div[contains(@class, 'TopIncentiveBalance')]//*[text()='Claim']/../.."
  }
};

class DashboardPage extends Page {
  get depositTable () { return $(locators.depositTable.table) }
  get borrowsTable () { return $(locators.borrowsTable.table) }
  get emptyDashboardText () {return $(locators.emptyDashboardText)}
  get rewardCountText () {return $(locators.reward.count)}
  get claimBtn () {return $(locators.reward.claimBtn)}


  depositRow(asset, collateralType = null){
    elemUtil.doIsDisplayed(this.depositTable, 20000)
    if(collateralType == null){
      return this.depositTable.$$(".//*[@class='TokenIcon__name']//b[text()='"+asset+"']/../../../..")[0]
    }else{
      let _rowList = this.depositTable.$$(".//*[@class='TokenIcon__name']//b[text()='"+asset+"']/../../../..")
      for(let i = 0; i < _rowList.length; i++){
        let _collateralType = elemUtil.doGetText(_rowList[i].$(locators.depositTable.collateralTypeBox))
        if(_collateralType === collateralType){
          return _rowList[i]
        }
      }
    }
  }

  borrowRow(asset, aprType = null){
    elemUtil.doIsDisplayed(this.borrowsTable, 20000)
    if(aprType == null){
       return this.borrowsTable.$$(".//*[@class='TokenIcon__name']//b[text()='"+asset+"']/../../../..")[0]
    }else{
      let _rowList = this.borrowsTable.$$(".//*[@class='TokenIcon__name']//b[text()='"+asset+"']/../../../..")
      for(let i = 0; i < _rowList.length; i++){
        let _aprType = elemUtil.doGetText(_rowList[i].$(locators.borrowsTable.aprTypeBox))
        if(_aprType === aprType){
          return _rowList[i]
        }
      }
    }
  }

  doChangeApr(asset, aprType = null){
    let _aprSwitcher = this.borrowRow(asset, aprType).$(locators.borrowsTable.aprSwitcher)
    elemUtil.doClickWithRedirect(_aprSwitcher)
  }

  open() {
    return super.open("/dashboard");
  }

  doOpenRepayView(asset, aprType = null){
    let _repayBtn = this.borrowRow(asset, aprType).$(locators.borrowsTable.repayBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doOpenBorrowView(asset, aprType = null){
    let _repayBtn = this.borrowRow(asset, aprType).$(locators.borrowsTable.borrowBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doOpenWithdrawView(asset, collateralType = null){
    let _repayBtn = this.depositRow(asset, collateralType).$(locators.depositTable.withdrawBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doOpenSwapView(asset, collateralType = null){
    let _repayBtn = this.depositRow(asset, collateralType).$(locators.depositTable.swapBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doGetCollateralValue(asset, collateralType = null){
    let _assetRow = this.depositRow(asset, collateralType)
    let _balanceBox = _assetRow.$(locators.depositTable.balanceBox)
    let _balanceValue =  elemUtil.doGetText(_balanceBox)
    return _balanceValue
  }

  doGetCollateralTypeValue(asset, collateralType = null){
    let _assetRow = this.depositRow(asset, collateralType)
    let _collateralBox = _assetRow.$(locators.depositTable.collateralTypeBox)
    let _collateralValue =  elemUtil.doGetText(_collateralBox)
    return _collateralValue
  }

  doGetBorrowedValue(asset, aprType = null){
    let _assetRow = this.borrowRow(asset, aprType)
    let _borrowedBox = _assetRow.$(locators.borrowsTable.borrowBalanceBox)
    let _borrowedValue =  elemUtil.doGetText(_borrowedBox)
    return _borrowedValue
  }

  doGetAPRTypeValue(asset, aprType = null){
    let _assetRow = this.borrowRow(asset, aprType)
    let _aprBox = _assetRow.$(locators.borrowsTable.aprTypeBox)
    let _aprValue =  elemUtil.doGetText(_aprBox)
    return _aprValue
  }

  doCheckDepositValue(asset, balance, isCollateral){
    let _degree = mathUtil.getRoundDegree(balance)
    let _balanceValue = Math.floor(parseFloat(
      this.doGetCollateralValue(asset, isCollateral).replace(/,/g, "")
    )* _degree) / _degree
    let _collateralValue = this.doGetCollateralTypeValue(asset, isCollateral)
    expect(balance).to.be.equal(_balanceValue, "Balance incorrect")
    expect(isCollateral).to.be.equal(_collateralValue, "Collateral incorrect")
  }

  doCheckBorrowValue(asset, borrowed, aprType){
    let _degree = mathUtil.getRoundDegree(borrowed)
    let _balanceValue = Math.floor(parseFloat(
      this.doGetBorrowedValue(asset, aprType).replace(/,/g, "")
    )* _degree) / _degree
    let _collateralValue = this.doGetAPRTypeValue(asset, aprType)
    expect(borrowed).to.be.equal(_balanceValue, "Borrowed incorrect")
    expect(aprType).to.be.equal(_collateralValue, "APR type incorrect")
  }

  doCheckIsDashboardEmpty(){
    elemUtil.doIsDisplayed(this.emptyDashboardText)
  }

  doCheckRewardIsAvailable(){
    let _rewardValue = elemUtil.doGetText(this.rewardCountText)
    expect(_rewardValue).to.be.not.equal("0.00")
    expect(elemUtil.doIsElemDisable(this.claimBtn)).to.be.false
  }

  doCheckRewardIsNotAvailable(){
    let _rewardValue = elemUtil.doGetText(this.rewardCountText)
    expect(_rewardValue).to.be.equal("0.00")
    expect(elemUtil.doIsElemDisable(this.claimBtn)).to.be.true
  }

  doOpenClaimReward(){
    elemUtil.doClick(this.claimBtn)
  }
}

module.exports = new DashboardPage();
