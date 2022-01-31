import {
  BigNumberValue,
  calculateHealthFactorFromBalancesBigUnits,
  ComputedUserReserve,
  FormatUserSummaryAndIncentivesResponse,
  valueToBigNumber,
} from '@aave/math-utils';
import { ComputedReserveData } from '../../libs/pool-data-provider';

export function calculateHFAfterSwap(
  fromAmount: BigNumberValue | undefined,
  fromAssetData: ComputedReserveData | undefined,
  fromAssetUserData: ComputedUserReserve | undefined,
  toAmount: BigNumberValue | undefined,
  toAssetData: ComputedReserveData | undefined,
  toAssetUserData: ComputedUserReserve | undefined,
  user: FormatUserSummaryAndIncentivesResponse,
  maxSlippage: BigNumberValue
) {
  const hfEffectOfFromAmount =
    fromAmount &&
    fromAssetData &&
    fromAssetData.usageAsCollateralEnabled &&
    fromAssetUserData?.usageAsCollateralEnabledOnUser
      ? calculateHealthFactorFromBalancesBigUnits({
          collateralBalanceMarketReferenceCurrency: valueToBigNumber(fromAmount).multipliedBy(
            fromAssetData.formattedPriceInMarketReferenceCurrency
          ),
          borrowBalanceMarketReferenceCurrency: user.totalBorrowsMarketReferenceCurrency,
          currentLiquidationThreshold: fromAssetData.formattedReserveLiquidationThreshold,
        }).toString()
      : '0';
  const hfEffectOfToAmount =
    toAmount &&
    toAssetData &&
    toAssetData.usageAsCollateralEnabled &&
    (toAssetUserData && toAssetUserData.underlyingBalance !== '0'
      ? toAssetUserData.usageAsCollateralEnabledOnUser
      : true)
      ? calculateHealthFactorFromBalancesBigUnits({
          collateralBalanceMarketReferenceCurrency: valueToBigNumber(toAmount)
            .multipliedBy(toAssetData.formattedPriceInMarketReferenceCurrency)
            .multipliedBy(1 - +maxSlippage / 100),
          borrowBalanceMarketReferenceCurrency: user.totalBorrowsMarketReferenceCurrency,
          currentLiquidationThreshold: toAssetData.formattedReserveLiquidationThreshold,
        }).toString()
      : '0';

  return {
    hfEffectOfFromAmount,
    hfAfterSwap:
      user.healthFactor === '-1'
        ? valueToBigNumber('-1')
        : valueToBigNumber(user.healthFactor).minus(hfEffectOfFromAmount).plus(hfEffectOfToAmount),
  };
}
