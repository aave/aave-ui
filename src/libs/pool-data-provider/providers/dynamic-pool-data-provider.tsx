import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import { useStaticPoolDataContext } from './static-pool-data-provider';
import {
  FormatReserveUSDResponse,
  formatReserveUSD,
  formatUserSummary,
  FormatUserSummaryResponse,
  normalize,
} from '@aave/math-utils';
import BigNumber from 'bignumber.js';
import { UserReserveDataExtended } from '..';

export interface ComputedReserveData extends FormatReserveUSDResponse {
  id: string;
  underlyingAsset: string;
  name: string;
  symbol: string;
  decimals: number;
  usageAsCollateralEnabled: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  isActive: boolean;
  isFrozen: boolean;
  aTokenAddress: string;
  stableDebtTokenAddress: string;
  variableDebtTokenAddress: string;
  priceInMarketReferenceCurrency: string;
  avg30DaysLiquidityRate?: string;
  avg30DaysVariableBorrowRate?: string;
  // new fields, will not be optional once use-pool-data uses a single UiPoolDataProvider
  isPaused?: boolean;
  eModeCategoryId?: number;
  eModeLtv: string;
  eModeLiquidationThreshold: string;
  eModeLiquidationBonus: string;
  eModePriceSource?: string;
  eModeLabel?: string;
  debtCeiling: string;
  borrowCap: string;
  supplyCap: string;
  borrowableInIsolation: boolean;
}

export interface UserSummary extends FormatUserSummaryResponse {
  id: string;
  isInIsolationMode: boolean;
  isolatedReserve?: UserReserveDataExtended;
  // isolatedAvailableBorrows: string;
}

export interface DynamicPoolDataContextData {
  reserves: ComputedReserveData[];
  user?: UserSummary;
}

const DynamicPoolDataContext = React.createContext({} as DynamicPoolDataContextData);

export function DynamicPoolDataProvider({ children }: PropsWithChildren<{}>) {
  const {
    rawReserves,
    rawUserReserves,
    userId,
    marketRefCurrencyDecimals,
    marketRefPriceInUsd,
    userEmodeCategoryId,
  } = useStaticPoolDataContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const [lastAvgRatesUpdateTimestamp, setLastAvgRatesUpdateTimestamp] = useState(currentTimestamp);

  useEffect(() => {
    if (currentTimestamp > lastAvgRatesUpdateTimestamp + 1000 * 60 * 5) {
      setLastAvgRatesUpdateTimestamp(currentTimestamp);
    }
  }, [currentTimestamp, lastAvgRatesUpdateTimestamp]);

  const computedUserData =
    userId && rawUserReserves
      ? formatUserSummary({
          currentTimestamp,
          marketRefPriceInUsd,
          marketRefCurrencyDecimals,
          rawUserReserves,
          userEmodeCategoryId,
        })
      : undefined;
  const formattedPoolReserves: ComputedReserveData[] = rawReserves.map((reserve) => {
    const formattedReserve = formatReserveUSD({
      reserve,
      currentTimestamp,
      marketRefCurrencyDecimals,
      marketRefPriceInUsd,
    });
    const fullReserve: ComputedReserveData = {
      ...reserve,
      ...formattedReserve,
      priceInMarketReferenceCurrency: normalize(
        reserve.priceInMarketReferenceCurrency,
        marketRefCurrencyDecimals
      ),
      borrowableInIsolation: reserve.borrowableInIsolation ? reserve.borrowableInIsolation : false,
    };
    return fullReserve;
  });

  let userSummary: UserSummary | undefined = undefined;
  if (computedUserData && userId) {
    const isolatedReserve = rawUserReserves?.find(
      (reserve) => reserve.reserve.debtCeiling !== '0' && reserve.usageAsCollateralEnabledOnUser
    );
    const isolatedAvailableBorrows = !!isolatedReserve
      ? normalize(
          new BigNumber(isolatedReserve.reserve.debtCeiling).minus(
            isolatedReserve.reserve.isolationModeTotalDebt
          ),
          isolatedReserve.reserve.debtCeilingDecimals
        )
      : computedUserData.availableBorrowsMarketReferenceCurrency;
    userSummary = {
      id: userId,
      ...computedUserData,
      isInIsolationMode: !!isolatedReserve,
      isolatedReserve,
      availableBorrowsMarketReferenceCurrency: isolatedAvailableBorrows,
    };
  }
  return (
    <DynamicPoolDataContext.Provider
      value={{
        user: userSummary,
        reserves: formattedPoolReserves,
      }}
    >
      {children}
    </DynamicPoolDataContext.Provider>
  );
}

export const useDynamicPoolDataContext = () => useContext(DynamicPoolDataContext);
