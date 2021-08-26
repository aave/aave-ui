import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import {
  ComputedReserveData,
  formatReserves,
  formatUserSummaryData,
  normalize,
  normalizeBN,
  RewardsInformation,
  UserSummaryData,
  valueToBigNumber,
} from '@aave/protocol-js';

import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import { useStaticPoolDataContext } from './static-pool-data-provider';

export interface DynamicPoolDataContextData {
  reserves: ComputedReserveData[];
  user?: UserSummaryData;
}

const DynamicPoolDataContext = React.createContext({} as DynamicPoolDataContextData);

export function DynamicPoolDataProvider({ children }: PropsWithChildren<{}>) {
  const {
    rawReserves,
    rawUserReserves,
    networkConfig,
    rewardsEmissionEndTimestamp,
    usdPriceEth,
    userId,
  } = useStaticPoolDataContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const [lastAvgRatesUpdateTimestamp, setLastAvgRatesUpdateTimestamp] = useState(currentTimestamp);

  useEffect(() => {
    if (currentTimestamp > lastAvgRatesUpdateTimestamp + 1000 * 60 * 5) {
      setLastAvgRatesUpdateTimestamp(currentTimestamp);
    }
  }, [currentTimestamp, lastAvgRatesUpdateTimestamp]);

  // TODO: get price from reserve
  const rewardReserve = rawReserves.find(
    (reserve) =>
      reserve.underlyingAsset.toLowerCase() === networkConfig.rewardTokenAddress.toLowerCase()
  );
  const rewardTokenPriceEth = rewardReserve ? rewardReserve.price.priceInEth : '0';

  const rewardInfo: RewardsInformation = {
    rewardTokenAddress: networkConfig.rewardTokenAddress,
    rewardTokenDecimals: networkConfig.rewardTokenDecimals,
    incentivePrecision: networkConfig.incentivePrecision,
    rewardTokenPriceEth,
    emissionEndTimestamp: rewardsEmissionEndTimestamp,
  };

  const computedUserData =
    userId && rawUserReserves
      ? formatUserSummaryData(
          rawReserves,
          rawUserReserves,
          userId,
          networkConfig.usdMarket ? valueToBigNumber(1) : normalize(usdPriceEth, -18),
          currentTimestamp,
          rewardInfo
        )
      : undefined;

  // This is a fix continue to use same aave-js. When update to aave-js with correct usd/eth market logic is integrated, remove
  if (networkConfig.usdMarket && computedUserData) {
    computedUserData.totalBorrowsUSD =
      computedUserData.totalBorrowsUSD !== '0'
        ? normalizeBN(computedUserData.totalBorrowsUSD, 8).toString()
        : '0';
    computedUserData.totalCollateralUSD =
      computedUserData.totalCollateralUSD !== '0'
        ? normalizeBN(computedUserData.totalCollateralUSD, 8).toString()
        : '0';
    computedUserData.totalLiquidityUSD =
      computedUserData.totalLiquidityUSD !== '0'
        ? normalizeBN(computedUserData.totalLiquidityUSD, 8).toString()
        : '0';

    computedUserData.reservesData.forEach((reserveData, index) => {
      computedUserData.reservesData[index].aTokenRewardsUSD =
        computedUserData.reservesData[index].aTokenRewardsUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].aTokenRewardsUSD, 8).toString()
          : '0';
      computedUserData.reservesData[index].sTokenRewardsUSD =
        computedUserData.reservesData[index].sTokenRewardsUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].sTokenRewardsUSD, 8).toString()
          : '0';
      computedUserData.reservesData[index].vTokenRewardsUSD =
        computedUserData.reservesData[index].vTokenRewardsUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].vTokenRewardsUSD, 8).toString()
          : '0';
      computedUserData.reservesData[index].stableBorrowsUSD =
        computedUserData.reservesData[index].stableBorrowsUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].stableBorrowsUSD, 8).toString()
          : '0';
      computedUserData.reservesData[index].variableBorrowsUSD =
        computedUserData.reservesData[index].variableBorrowsUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].variableBorrowsUSD, 8).toString()
          : '0';
      computedUserData.reservesData[index].underlyingBalanceUSD =
        computedUserData.reservesData[index].underlyingBalanceUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].underlyingBalanceUSD, 8).toString()
          : '0';
      computedUserData.reservesData[index].totalBorrowsUSD =
        computedUserData.reservesData[index].totalBorrowsUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].totalBorrowsUSD, 8).toString()
          : '0';
      computedUserData.reservesData[index].totalRewardsUSD =
        computedUserData.reservesData[index].totalRewardsUSD !== '0'
          ? normalizeBN(computedUserData.reservesData[index].totalRewardsUSD, 8).toString()
          : '0';
    });
  }

  const formattedPoolReserves = formatReserves(
    rawReserves,
    currentTimestamp,
    undefined, //TODO: recover at some point
    rewardTokenPriceEth,
    rewardsEmissionEndTimestamp
  );

  return (
    <DynamicPoolDataContext.Provider
      value={{
        user: computedUserData,
        reserves: formattedPoolReserves,
      }}
    >
      {children}
    </DynamicPoolDataContext.Provider>
  );
}

export const useDynamicPoolDataContext = () => useContext(DynamicPoolDataContext);
