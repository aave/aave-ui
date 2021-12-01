const Page = require('./page');
const elemUtil = require('../util/elementUtil')
const mathUtil = require('../util/mathUtil')
const MainPage = require('../pageobjects/main.page');

const locators = {
  depositTable: {
    table: "//div[contains(@class, 'MainDashboardTable__left-inner')]",
    tableRows: "//div[contains(@class, 'MainDashboardTable__left-inner')]//div[contains(@class, 'DashboardTable__content')]/div",
    withdrawBtn: ".//*[text()='Withdraw']",
    swapBtn: ".//*[text()='Swap']",
    balanceBox: ".//p[contains(@class, 'Value__value')]/..",
    collateralTypeBox: ".//p[contains(@class, 'Switcher__label')]",
    emptyContentMessage: "//div[contains(@class, 'MainDashboardTable__left-inner')]//div[@class='NoDataPanel']",
    collateralSwitcher: ".//div[contains(@class, 'Switcher__swiper')]",
    disabledCollateralSwithcer: ".//div[contains(@class, 'Switcher__swiper Switcher__swiperDisabled')]",
  },
  borrowsTable:{
    table: "//div[contains(@class, 'MainDashboardTable__right-inner')]",
    tableRows: "//div[contains(@class, 'MainDashboardTable__right-inner')]//div[contains(@class, 'DashboardTable__content')]/div",
    repayBtn: ".//*[text()='Repay']",
    borrowBtn: ".//*[text()='Borrow']",
    borrowBalanceBox: ".//p[contains(@class, 'Value__value')]/..",
    aprTypeBox: ".//p[contains(@class, 'Switcher__label')]",
    aprSwitcher: ".//div[contains(@class, 'Switcher__swiper')]",
    emptyContentMessage: "//div[contains(@class, 'MainDashboardTable__right-inner')]//div[@class='NoDataPanel']"
  },
  emptyDashboardText: "//*[text()='No deposits found for your address']",
  reward:{
    block: "//div[contains(@class, 'TopIncentiveBalance')]",
    count: "//div[contains(@class, 'IncentiveClaimItem')]//p[contains(@class, 'Value__value')]",
    claimBtn:"//div[contains(@class, 'IncentiveClaimItem')]//*[text()='Claim']",
    availableText:"//p[text()='Available reward']"
  }
};

class DashboardPage extends Page {
  get depositTable() {return $(locators.depositTable.table)}
  get borrowsTable() {return $(locators.borrowsTable.table)}
  get emptyDashboardText() {return $(locators.emptyDashboardText)}
  get rewardCountText() {return $(locators.reward.count)}
  get claimBtn() {return $(locators.reward.claimBtn)}
  get depositTableEmptyMessage() {return $(locators.depositTable.emptyContentMessage)}
  get borrowsTableEmptyMessage() {return $(locators.borrowsTable.emptyContentMessage)}
  get rewardAvailableText() {return $(locators.reward.availableText)}

  depositRow(asset, collateralType = null) {
    elemUtil.doIsDisplayed(this.depositTable, 20000)
    if (collateralType == null) {
      return this.depositTable.$$(".//*[@class='TokenIcon__name']//b[text()='" + asset + "']/../../../..")[0]
    } else {
      let _rowList = this.depositTable.$$(".//*[@class='TokenIcon__name']//b[text()='" + asset + "']/../../../..")
      for (let i = 0; i < _rowList.length; i++) {
        let _collateralType = elemUtil.doGetText(_rowList[i].$(locators.depositTable.collateralTypeBox))
        if (_collateralType === collateralType) {
          return _rowList[i]
        }
      }
    }
  }

  borrowRow(asset, aprType = null) {
    elemUtil.doIsDisplayed(this.borrowsTable, 20000)
    if (aprType == null) {
      return this.borrowsTable.$$(".//*[@class='TokenIcon__name']//b[text()='" + asset + "']/../../../..")[0]
    } else {
      let _rowList = this.borrowsTable.$$(".//*[@class='TokenIcon__name']//b[text()='" + asset + "']/../../../..")
      for (let i = 0; i < _rowList.length; i++) {
        let _aprType = elemUtil.doGetText(_rowList[i].$(locators.borrowsTable.aprTypeBox))
        if (_aprType === aprType) {
          return _rowList[i]
        }
      }
    }
  }

  doChangeApr(asset, aprType = null) {
    browser.pause(2000)
    let _aprSwitcher = this.borrowRow(asset, aprType).$(locators.borrowsTable.aprSwitcher)
    elemUtil.doClickWithRedirect(_aprSwitcher)
  }

  doChangeCollateral(asset) {
    let _collateralSwitcher = this.depositRow(asset).$(locators.depositTable.collateralSwitcher)
    elemUtil.doClickWithRedirect(_collateralSwitcher)
  }

  doCheckCollateralSwiperIsDisabled(asset) {
    let _collateralSwitcher = this.depositRow(asset).$(locators.depositTable.disabledCollateralSwithcer)
    elemUtil.doIsDisplayed(_collateralSwitcher)
  }

  open() {
    return super.open("/dashboard");
  }

  doOpenRepayView(asset, aprType = null) {
    let _repayBtn = this.borrowRow(asset, aprType).$(locators.borrowsTable.repayBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doOpenBorrowView(asset, aprType = null) {
    let _repayBtn = this.borrowRow(asset, aprType).$(locators.borrowsTable.borrowBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doOpenWithdrawView(asset, collateralType = null) {
    let _repayBtn = this.depositRow(asset, collateralType).$(locators.depositTable.withdrawBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doOpenSwapView(asset, collateralType = null) {
    let _repayBtn = this.depositRow(asset, collateralType).$(locators.depositTable.swapBtn)
    elemUtil.doClickWithRedirect(_repayBtn)
  }

  doGetCollateralValue(asset, collateralType = null) {
    let _assetRow = this.depositRow(asset, collateralType)
    let _balanceBox = _assetRow.$(locators.depositTable.balanceBox)
    let _balanceValue = elemUtil.doGetText(_balanceBox)
    return _balanceValue
  }

  doGetCollateralTypeValue(asset, collateralType = null) {
    let _assetRow = this.depositRow(asset, collateralType)
    let _collateralBox = _assetRow.$(locators.depositTable.collateralTypeBox)
    let _collateralValue = elemUtil.doGetText(_collateralBox)
    return _collateralValue
  }

  doGetBorrowedValue(asset, aprType = null) {
    let _assetRow = this.borrowRow(asset, aprType)
    let _borrowedBox = _assetRow.$(locators.borrowsTable.borrowBalanceBox)
    let _borrowedValue = elemUtil.doGetText(_borrowedBox)
    return _borrowedValue
  }

  doGetAPRTypeValue(asset, aprType = null) {
    let _assetRow = this.borrowRow(asset, aprType)
    let _aprBox = _assetRow.$(locators.borrowsTable.aprTypeBox)
    let _aprValue = elemUtil.doGetText(_aprBox)
    return _aprValue
  }

  doCheckDepositValue(asset, isCollateral, balance = null) {
    let _degree = mathUtil.getRoundDegree(balance)
    let _balanceValue = Math.floor(parseFloat(
      this.doGetCollateralValue(asset, isCollateral).replace(/,/g, "")
    ) * _degree) / _degree
    let _collateralValue = this.doGetCollateralTypeValue(asset, isCollateral)
    if (balance != null)
      expect(balance).to.be.equal(_balanceValue, "Balance incorrect")
    expect(isCollateral).to.be.equal(_collateralValue, "Collateral incorrect")
  }

  doCheckBorrowValue(asset, aprType, borrowed = null) {
    let _degree = mathUtil.getRoundDegree(borrowed)
    let _balanceValue = Math.floor(parseFloat(
      this.doGetBorrowedValue(asset, aprType).replace(/,/g, "")
    ) * _degree) / _degree
    let _collateralValue = this.doGetAPRTypeValue(asset, aprType)
    if (borrowed != null)
      expect(borrowed).to.be.equal(_balanceValue, "Borrowed incorrect")
    expect(aprType).to.be.equal(_collateralValue, "APR type incorrect")
  }

  doCheckIsDashboardEmpty() {
    elemUtil.doIsDisplayed(this.emptyDashboardText)
  }

  doCheckRewardIsAvailable() {
    browser.waitUntil(
      () => elemUtil.doGetText(this.rewardCountText) != "0.00",
      {
        timeout: 10000,
        timeoutMsg: 'expected reward != 0.00, but it is ' + elemUtil.doGetText(this.rewardCountText)
      }
    )
    expect(elemUtil.doIsElemDisable(this.claimBtn)).to.be.false
  }

  doCheckRewardIsNotAvailable() {
    elemUtil.doIsNotExist(locators.reward.availableText)
  }

  doOpenClaimReward() {
    elemUtil.doClick(this.claimBtn)
  }

  doCheckCountOfDepositRows(depositCount) {
    if(depositCount != 0){
      browser.waitUntil(
        () => $$(locators.depositTable.tableRows).length == depositCount,
        {
          timeout: 10000,
          timeoutMsg: 'Count of lines on dashboard is wrong, actual: ' + $$(locators.depositTable.tableRows).length
        }
      )
    }else{
      elemUtil.doIsExist(this.depositTableEmptyMessage)
    }
  }

  doCheckCountOfBorrowRows(borrowCount) {
    if(borrowCount != 0){
      browser.waitUntil(
        () => $$(locators.borrowsTable.tableRows).length == borrowCount,
        {
          timeout: 10000,
          timeoutMsg: 'Count of lines on dashboard is wrong, actual: ' + $$(locators.borrowsTable.tableRows).length
        }
      )
    }else{
      elemUtil.doIsExist(this.borrowsTableEmptyMessage)
    }
  }
}

module.exports = new DashboardPage();
