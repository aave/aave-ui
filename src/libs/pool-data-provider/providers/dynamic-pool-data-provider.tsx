import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import { useStaticPoolDataContext } from './static-pool-data-provider';
import {
  formatReserves,
  formatUserSummary,
  FormatUserSummaryResponse,
  normalize,
  FormatReservesUSDRequest,
} from '@aave/math-utils';
import BigNumber from 'bignumber.js';
import { UserReserveDataExtended } from '..';
import { ReserveDataHumanized } from '@aave/contract-helpers';

const humanizedFormatReserves = (
  reserves: Array<ReserveDataHumanized & { underlyingAsset: string }>,
  params: FormatReservesUSDRequest
) => formatReserves<ReserveDataHumanized>(reserves, params);
export type ComputedReserveData = ReturnType<typeof humanizedFormatReserves>[0];

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
    marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd,
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
          marketReferencePriceInUsd,
          marketReferenceCurrencyDecimals,
          rawUserReserves,
          userEmodeCategoryId,
        })
      : undefined;

  const formattedPoolReserves = humanizedFormatReserves(rawReserves, {
    currentTimestamp,
    marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd,
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
