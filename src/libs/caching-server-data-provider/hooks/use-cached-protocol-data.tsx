import { useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { ReserveData, UserReserveData } from '@aave/protocol-js';

import {
  C_ProtocolDataUpdateDocument,
  C_ProtocolDataUpdateSubscription,
  C_ProtocolDataUpdateSubscriptionVariables,
  C_UserDataUpdateDocument,
  C_UserDataUpdateSubscription,
  C_UserDataUpdateSubscriptionVariables,
  useC_ProtocolDataQuery,
  useC_UserDataQuery,
} from '../graphql';

type PoolData = {
  reserves: ReserveData[];
  userReserves: UserReserveData[];
  usdPriceEth: string;
  userId?: string;
  rewardsData: {
    userUnclaimedRewards: string;
    emissionEndTimestamp: number;
  };
};

interface PoolReservesWithCache {
  loading: boolean;
  data?: PoolData;
  error?: string;
}

export function useCachedProtocolData(
  poolAddress: string,
  currentAccount?: string,
  skip = false
): PoolReservesWithCache {
  const userId = currentAccount?.toLowerCase() || undefined;
  const {
    loading: poolDataLoading,
    data: poolData,
    subscribeToMore: subscribeToProtocolData,
  } = useC_ProtocolDataQuery({ variables: { poolAddress }, skip });
  useEffect(() => {
    if (!skip) {
      return subscribeToProtocolData<
        C_ProtocolDataUpdateSubscription,
        C_ProtocolDataUpdateSubscriptionVariables
      >({
        document: C_ProtocolDataUpdateDocument,
        variables: { poolAddress },
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
  }, [subscribeToProtocolData, poolAddress, skip]);

  const {
    loading: userDataLoading,
    data: userData,
    subscribeToMore: subscribeToUserData,
  } = useC_UserDataQuery({
    variables: { poolAddress, userAddress: userId || '' },
    skip: !userId || skip,
  });
  useEffect(() => {
    if (userId && !skip)
      return subscribeToUserData<
        C_UserDataUpdateSubscription,
        C_UserDataUpdateSubscriptionVariables
      >({
        document: C_UserDataUpdateDocument,
        variables: { poolAddress, userAddress: userId || '' },
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
  }, [subscribeToUserData, poolAddress, userId, skip]);

  const loading = (userId && userDataLoading) || poolDataLoading;

  const reserves = poolData?.protocolData.reserves || [];
  const usdPriceEth = new BigNumber(10)
    .exponentiatedBy(18 + 8)
    .div(poolData?.protocolData.usdPriceEth || '0')
    .toFixed(0, BigNumber.ROUND_DOWN);

  const userReserves: UserReserveData[] = [];

  if (userData?.userData.userReserves.length && reserves.length) {
    userData?.userData.userReserves.reduce((prev, userReserve) => {
      const reserve = reserves.find(
        (res) => res.underlyingAsset === userReserve.underlyingAsset.toLowerCase()
      );
      if (reserve) {
        userReserves.push({
          ...userReserve,
          reserve: {
            id: reserve.id,
            underlyingAsset: reserve.underlyingAsset,
            name: reserve.name,
            symbol: reserve.symbol,
            decimals: reserve.decimals,
            liquidityRate: reserve.liquidityRate,
            reserveLiquidationBonus: reserve.reserveLiquidationBonus,
            lastUpdateTimestamp: reserve.lastUpdateTimestamp,
          },
        });
      }
      return prev;
    }, userReserves);
  }

  return {
    loading,
    data: {
      userId,
      usdPriceEth,
      reserves,
      userReserves,
      rewardsData: {
        emissionEndTimestamp: poolData?.protocolData.emissionEndTimestamp || 0,
        userUnclaimedRewards: userData?.userData.userUnclaimedRewards || '0',
      },
    },
  };
}
