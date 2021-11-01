import { ComputedUserReserve } from '@aave/math-utils';
import {
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
  BigNumberValue,
  BigNumber,
} from '@aave/protocol-js';
import { ComputedReserveData, UserSummary } from '../../libs/pool-data-provider';

export function calculateHFAfterRepay(
  fromAmount: BigNumberValue,
  fromAssetData: ComputedReserveData | undefined,
  fromAssetUserData: ComputedUserReserve | undefined,
  repayAmount: BigNumberValue,
  repayAssetData: ComputedReserveData | undefined,
  repayAssetUserData: ComputedUserReserve | undefined,
  user: UserSummary
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
          valueToBigNumber(fromAmount).multipliedBy(fromAssetData.priceInMarketReferenceCurrency),
          user.totalBorrowsMarketReferenceCurrency,
          fromAssetData.reserveLiquidationThreshold
        ).toString()
      : '0';

  const fromAmountInETH = repayAssetUserData?.totalBorrows
    ? valueToBigNumber(repayAmount)
        .multipliedBy(repayAssetData.priceInMarketReferenceCurrency)
        .toString(10)
    : '0';
  const debtLeftETH = valueToBigNumber(user.totalBorrowsMarketReferenceCurrency)
    .minus(fromAmountInETH)
    .toFixed(18, BigNumber.ROUND_DOWN);

  const hfAfterRepayBeforeWithdraw = calculateHealthFactorFromBalancesBigUnits(
    user.totalCollateralMarketReferenceCurrency,
    debtLeftETH,
    user.currentLiquidationThreshold
  );

  const hfRealEffectOfFromAmount =
    fromAmount &&
    !valueToBigNumber(fromAmount).isNaN() &&
    fromAssetData.usageAsCollateralEnabled &&
    fromAssetUserData?.usageAsCollateralEnabledOnUser
      ? calculateHealthFactorFromBalancesBigUnits(
          valueToBigNumber(fromAmount).multipliedBy(fromAssetData.priceInMarketReferenceCurrency),
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
