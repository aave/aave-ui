import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import { useStaticPoolDataContext } from './static-pool-data-provider';
import { formatReserves, formatUserSummary, FormatUserSummaryResponse } from '@aave/math-utils';
import { ReserveDataHumanized } from '@aave/contract-helpers';

export type ComputedReserveData = ReturnType<typeof formatReserves>[0] & ReserveDataHumanized;

export interface UserSummary extends FormatUserSummaryResponse {
  id: string;
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

  const formattedPoolReserves = formatReserves({
    reserves: rawReserves,
    currentTimestamp,
    marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd,
  });

  let userSummary: UserSummary | undefined = undefined;
  if (computedUserData && userId) {
    userSummary = {
      id: userId,
      ...computedUserData,
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
