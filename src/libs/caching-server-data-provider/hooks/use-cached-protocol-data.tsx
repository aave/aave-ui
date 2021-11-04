import { useEffect } from 'react';

import {
  BaseCurrencyData,
  C_ProtocolDataUpdateDocument,
  C_ProtocolDataUpdateSubscription,
  C_ProtocolDataUpdateSubscriptionVariables,
  C_UserDataUpdateDocument,
  C_UserDataUpdateSubscription,
  C_UserDataUpdateSubscriptionVariables,
  ReserveData,
  useC_ProtocolDataQuery,
  useC_UserDataQuery,
  UserReserveData,
} from '../graphql';

type PoolData = {
  reserves: {
    reservesData: ReserveData[];
    baseCurrencyData: BaseCurrencyData | undefined;
  };
  userReserves: UserReserveData[];
  userId?: string;
};

interface PoolReservesWithCache {
  loading: boolean;
  data?: PoolData;
  error?: string;
}

export function useCachedProtocolData(
  lendingPoolAddressProvider: string,
  currentAccount?: string,
  skip = false
): PoolReservesWithCache {
  const userId = currentAccount?.toLowerCase() || undefined;
  const {
    loading: poolDataLoading,
    data: poolData,
    subscribeToMore: subscribeToProtocolData,
  } = useC_ProtocolDataQuery({ variables: { lendingPoolAddressProvider }, skip });
  useEffect(() => {
    if (!skip) {
      return subscribeToProtocolData<
        C_ProtocolDataUpdateSubscription,
        C_ProtocolDataUpdateSubscriptionVariables
      >({
        document: C_ProtocolDataUpdateDocument,
        variables: { lendingPoolAddressProvider },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const protocolDataUpdate = subscriptionData.data?.protocolDataUpdate;

          if (!protocolDataUpdate) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            protocolData: protocolDataUpdate,
          };
        },
      });
    }
  }, [subscribeToProtocolData, lendingPoolAddressProvider, skip]);

  const {
    loading: userDataLoading,
    data: userData,
    subscribeToMore: subscribeToUserData,
  } = useC_UserDataQuery({
    variables: { lendingPoolAddressProvider, userAddress: userId || '' },
    skip: !userId || skip,
  });
  useEffect(() => {
    if (userId && !skip)
      return subscribeToUserData<
        C_UserDataUpdateSubscription,
        C_UserDataUpdateSubscriptionVariables
      >({
        document: C_UserDataUpdateDocument,
        variables: { lendingPoolAddressProvider, userAddress: userId || '' },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const userData = subscriptionData.data?.userDataUpdate;
          if (!userData) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            userData,
          };
        },
      });
  }, [subscribeToUserData, lendingPoolAddressProvider, userId, skip]);

  const loading = (userId && userDataLoading) || poolDataLoading;

  const reserves = poolData?.protocolData.reserves || [];
  const userReserves: UserReserveData[] = userData?.userData || [];
  const baseCurrencyInfo = poolData?.protocolData.baseCurrencyData;

  // const usdPriceEth = new BigNumber(10)
  //   .exponentiatedBy(18 + 8)
  //   .div(poolData?.protocolData.usdPriceEth || '0')
  //   .toFixed(0, BigNumber.ROUND_DOWN);
  // if (userData?.userData.length && reserves.length) {
  //   userData?.userData.reduce((prev, userReserve) => {
  //     const reserve = reserves.find(
  //       (res) => res.underlyingAsset === userReserve.underlyingAsset.toLowerCase()
  //     );
  //     if (reserve) {
  //       userReserves.push({
  //         ...userReserve,
  //         // reserve: {
  //         //   id: reserve.id,
  //         //   underlyingAsset: reserve.underlyingAsset,
  //         //   name: reserve.name,
  //         //   symbol: reserve.symbol,
  //         //   decimals: reserve.decimals,
  //         //   liquidityRate: reserve.liquidityRate,
  //         //   reserveLiquidationBonus: reserve.reserveLiquidationBonus,
  //         //   lastUpdateTimestamp: reserve.lastUpdateTimestamp,
  //         // },
  //       });
  //     }
  //     return prev;
  //   }, userReserves);
  // }

  return {
    loading,
    data: {
      userId,
      reserves: {
        reservesData: reserves,
        baseCurrencyData: baseCurrencyInfo,
      },
      userReserves,
    },
  };
}
