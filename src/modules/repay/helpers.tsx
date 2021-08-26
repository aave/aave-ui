import {
  calculateHealthFactorFromBalancesBigUnits,
  ComputedReserveData,
  ComputedUserReserve,
  UserSummaryData,
  valueToBigNumber,
  BigNumberValue,
  BigNumber,
} from '@aave/protocol-js';

export function calculateHFAfterRepay(
  fromAmount: BigNumberValue,
  fromAssetData: ComputedReserveData | undefined,
  fromAssetUserData: ComputedUserReserve | undefined,
  repayAmount: BigNumberValue,
  repayAssetData: ComputedReserveData | undefined,
  repayAssetUserData: ComputedUserReserve | undefined,
  user: UserSummaryData
) {
  if (!repayAssetData || !fromAssetData) {
    return {
      hfInitialEffectOfFromAmount: '0',
      hfAfterSwap: valueToBigNumber(user.healthFactor),
    };
  }
  const hfInitialEffectOfFromAmount =
    fromAmount &&
    !valueToBigNumber(fromAmount).isNaN() &&
    fromAssetData.usageAsCollateralEnabled &&
    fromAssetUserData?.usageAsCollateralEnabledOnUser
      ? calculateHealthFactorFromBalancesBigUnits(
          valueToBigNumber(fromAmount).multipliedBy(fromAssetData.price.priceInEth),
          user.totalBorrowsETH,
          fromAssetData.reserveLiquidationThreshold
        ).toString()
      : '0';

  const fromAmountInETH = repayAssetUserData?.totalBorrows
    ? valueToBigNumber(repayAmount).multipliedBy(repayAssetData.price.priceInEth).toString(10)
    : '0';
  const debtLeftETH = valueToBigNumber(user.totalBorrowsETH)
    .minus(fromAmountInETH)
    .toFixed(18, BigNumber.ROUND_DOWN);

  const hfAfterRepayBeforeWithdraw = calculateHealthFactorFromBalancesBigUnits(
    user.totalCollateralETH,
    debtLeftETH,
    user.currentLiquidationThreshold
  );

  const hfRealEffectOfFromAmount =
    fromAmount &&
    !valueToBigNumber(fromAmount).isNaN() &&
    fromAssetData.usageAsCollateralEnabled &&
    fromAssetUserData?.usageAsCollateralEnabledOnUser
      ? calculateHealthFactorFromBalancesBigUnits(
          valueToBigNumber(fromAmount).multipliedBy(fromAssetData.price.priceInEth),
          debtLeftETH,
          fromAssetData.reserveLiquidationThreshold
        ).toString()
      : '0';

  const hfAfterSwap = hfAfterRepayBeforeWithdraw.eq(-1)
    ? hfAfterRepayBeforeWithdraw
    : hfAfterRepayBeforeWithdraw.minus(hfRealEffectOfFromAmount);

  return {
    hfInitialEffectOfFromAmount,
    hfAfterSwap,
  };
}
