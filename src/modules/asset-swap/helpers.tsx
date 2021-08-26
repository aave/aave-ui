import {
  calculateHealthFactorFromBalancesBigUnits,
  ComputedReserveData,
  ComputedUserReserve,
  UserSummaryData,
  valueToBigNumber,
  BigNumberValue,
} from '@aave/protocol-js';

export function calculateHFAfterSwap(
  fromAmount: BigNumberValue | undefined,
  fromAssetData: ComputedReserveData | undefined,
  fromAssetUserData: ComputedUserReserve | undefined,
  toAmount: BigNumberValue | undefined,
  toAssetData: ComputedReserveData | undefined,
  toAssetUserData: ComputedUserReserve | undefined,
  user: UserSummaryData,
  maxSlippage: BigNumberValue
) {
  const hfEffectOfFromAmount =
    fromAmount &&
    fromAssetData &&
    fromAssetData.usageAsCollateralEnabled &&
    fromAssetUserData?.usageAsCollateralEnabledOnUser
      ? calculateHealthFactorFromBalancesBigUnits(
          valueToBigNumber(fromAmount).multipliedBy(fromAssetData.price.priceInEth),
          user.totalBorrowsETH,
          fromAssetData.reserveLiquidationThreshold
        ).toString()
      : '0';
  const hfEffectOfToAmount =
    toAmount &&
    toAssetData &&
    toAssetData.usageAsCollateralEnabled &&
    (toAssetUserData && toAssetUserData.underlyingBalance !== '0'
      ? toAssetUserData.usageAsCollateralEnabledOnUser
      : true)
      ? calculateHealthFactorFromBalancesBigUnits(
          valueToBigNumber(toAmount)
            .multipliedBy(toAssetData.price.priceInEth)
            .multipliedBy(1 - +maxSlippage / 100),
          user.totalBorrowsETH,
          toAssetData.reserveLiquidationThreshold
        ).toString()
      : '0';

  return {
    hfEffectOfFromAmount,
    hfAfterSwap:
      user.healthFactor === '-1'
        ? valueToBigNumber('-1')
        : valueToBigNumber(user.healthFactor).minus(hfEffectOfFromAmount).plus(hfEffectOfToAmount),
  };
}
