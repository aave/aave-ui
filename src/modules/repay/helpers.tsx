import {
  BigNumberValue,
  calculateHealthFactorFromBalancesBigUnits,
  ComputedUserReserve,
  FormatUserSummaryAndIncentivesResponse,
  valueToBigNumber,
} from '@aave/math-utils';
import BigNumber from 'bignumber.js';
import { ComputedReserveData } from '../../libs/pool-data-provider';

export function calculateHFAfterSwapRepay(
  fromAmount: BigNumberValue,
  fromAssetData: ComputedReserveData | undefined,
  fromAssetUserData: ComputedUserReserve | undefined,
  repayAmount: BigNumberValue,
  repayAssetData: ComputedReserveData | undefined,
  repayAssetUserData: ComputedUserReserve | undefined,
  user: FormatUserSummaryAndIncentivesResponse
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
      ? calculateHealthFactorFromBalancesBigUnits({
          collateralBalanceMarketReferenceCurrency: valueToBigNumber(fromAmount).multipliedBy(
            fromAssetData.priceInMarketReferenceCurrency
          ),
          borrowBalanceMarketReferenceCurrency: user.totalBorrowsMarketReferenceCurrency,
          currentLiquidationThreshold: fromAssetData.reserveLiquidationThreshold,
        }).toString()
      : '0';

  const fromAmountInETH = repayAssetUserData?.totalBorrows
    ? valueToBigNumber(repayAmount)
        .multipliedBy(repayAssetData.priceInMarketReferenceCurrency)
        .toString(10)
    : '0';
  const debtLeftETH = valueToBigNumber(user.totalBorrowsMarketReferenceCurrency)
    .minus(fromAmountInETH)
    .toFixed(18, BigNumber.ROUND_DOWN);

  const hfAfterRepayBeforeWithdraw = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency: user.totalCollateralMarketReferenceCurrency,
    borrowBalanceMarketReferenceCurrency: debtLeftETH,
    currentLiquidationThreshold: user.currentLiquidationThreshold,
  });

  const hfRealEffectOfFromAmount =
    fromAmount &&
    !valueToBigNumber(fromAmount).isNaN() &&
    fromAssetData.usageAsCollateralEnabled &&
    fromAssetUserData?.usageAsCollateralEnabledOnUser
      ? calculateHealthFactorFromBalancesBigUnits({
          collateralBalanceMarketReferenceCurrency: valueToBigNumber(fromAmount).multipliedBy(
            fromAssetData.priceInMarketReferenceCurrency
          ),
          borrowBalanceMarketReferenceCurrency: debtLeftETH,
          currentLiquidationThreshold: fromAssetData.reserveLiquidationThreshold,
        }).toString()
      : '0';

  const hfAfterSwap = hfAfterRepayBeforeWithdraw.eq(-1)
    ? hfAfterRepayBeforeWithdraw
    : hfAfterRepayBeforeWithdraw.minus(hfRealEffectOfFromAmount);

  return {
    hfInitialEffectOfFromAmount,
    hfAfterSwap,
  };
}
