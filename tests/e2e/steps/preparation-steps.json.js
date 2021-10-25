const assets = require('../fixtures/assets.json');
const mathUtil = require('../util/mathUtil');
const constants = require('../fixtures/consts.json');

module.exports.createSwapListAsset = ({assetsMarket, excludeAssetNumber, listOfNumbers = null, assetsCount, baseAsset}) => {

  let getRandomListOfAssets = () => {
    let _randomAssetList = []
    let _marketAssets = assetsMarket
    let _length = Object.keys(_marketAssets).length
    let _randomNumberList
    if(listOfNumbers == null)
      _randomNumberList = mathUtil.randomSetOfNumbers(assetsCount, _length, excludeAssetNumber)
    else
      _randomNumberList = mathUtil.uniqueRandomSetOfValuesFromList(assetsCount, listOfNumbers)
    _randomNumberList.forEach(
      (item) => {
        _randomAssetList.push(_marketAssets[Object.keys(_marketAssets)[item]])
      }
    )
    return _randomAssetList
  }

  let assetsList =  getRandomListOfAssets()

  let swapListFrom = () => {
    let _result = []
    let _isFirstSwap = true
    assetsList.forEach(
      (item) => {
        let _nameFrom = baseAsset
        let _nameTo = item
        let _amount = 1
        _result.push(
          {
            fromAsset:_nameFrom,
            toAsset:_nameTo,
            amount:_amount,
            hasApproval: !_isFirstSwap
          }
        )
        _isFirstSwap = false
      }
    )
    return _result
  }

  let swapListCheck =  () =>{
    let _result = []
    assetsList.forEach(
      (item) => {
        let _type = constants.dashboardTypes.deposit
        let _asset = item.shortName
        let _amount = null
        let _collateralType = item.collateral ?
          constants.collateralType.isCollateral :
          constants.collateralType.isNotCollateral
        _result.push(
          {
            type: _type,
            asset: _asset,
            amount: _amount,
            collateralType: _collateralType
          }
        )
      }
    )
    return _result
  }

  let swapListBack =   () => {
    let _result = []
    assetsList.forEach(
      (item) => {
        let _nameFrom = item
        let _nameTo = baseAsset
        let _amount = constants.maxValue
        _result.push(
          {
            fromAsset:_nameFrom,
            toAsset:_nameTo,
            amount: _amount,
            hasApproval: false
          }
        )
      }
    )
    return _result
  }

  return {
    swapFrom:  swapListFrom(),
    middleVerifications:  swapListCheck(),
    swapTo:  swapListBack(),
  }
}
