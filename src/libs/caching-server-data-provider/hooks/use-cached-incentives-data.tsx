import { useEffect } from 'react';
import {
  C_PoolIncentivesDataUpdateDocument,
  C_PoolIncentivesDataUpdateSubscription,
  C_PoolIncentivesDataUpdateSubscriptionVariables,
  C_UserPoolIncentivesDataUpdateDocument,
  C_UserPoolIncentivesDataUpdateSubscription,
  C_UserPoolIncentivesDataUpdateSubscriptionVariables,
  ReserveIncentivesData,
  useC_ReservesIncentivesQuery,
  useC_UserIncentivesQuery,
  UserIncentivesData,
} from '../graphql';

type IncentivesData = {
  userId?: string;
  reserveIncentiveData: ReserveIncentivesData[];
  userIncentiveData: UserIncentivesData[];
};
export interface PoolIncentivesWithCache {
  loading: boolean;
  data?: IncentivesData;
  error?: string;
}

export function useCachedIncentivesData(
  lendingPoolAddressProvider: string,
  currentAccount?: string,
  chainlinkFeedsRegistry?: string,
  quote?: string,
  skip = false
): PoolIncentivesWithCache {
  const userId = currentAccount?.toLowerCase() || undefined;
  const {
    loading: incentivesDataLoading,
    data: incentivesData,
    subscribeToMore: subscribeToIncentivesData,
  } = useC_ReservesIncentivesQuery({
    variables: {
      lendingPoolAddressProvider,
      chainlinkFeedsRegistry: chainlinkFeedsRegistry || '',
      quote: quote || '',
    },
    skip,
  });

  // Reserve incentives
  useEffect(() => {
    if (!skip) {
      return subscribeToIncentivesData<
        C_PoolIncentivesDataUpdateSubscription,
        C_PoolIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_PoolIncentivesDataUpdateDocument,
        variables: {
          lendingPoolAddressProvider,
          chainlinkFeedsRegistry: chainlinkFeedsRegistry || '',
          quote: quote || '',
        },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const poolIncentivesDataUpdate = subscriptionData.data?.poolIncentivesDataUpdate;

          if (!poolIncentivesDataUpdate) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            poolIncentivesData: poolIncentivesDataUpdate,
          };
        },
      });
    }
  }, [subscribeToIncentivesData, lendingPoolAddressProvider, skip]);

  // User incentives
  const {
    loading: userIncentivesDataLoading,
    data: userIncentivesData,
    subscribeToMore: subscribeToUserIncentivesData,
  } = useC_UserIncentivesQuery({
    variables: {
      lendingPoolAddressProvider,
      userAddress: userId || '',
      chainlinkFeedsRegistry: chainlinkFeedsRegistry || '',
      quote: quote || '',
    },
    skip: !userId || skip,
  });

  useEffect(() => {
    if (userId && !skip)
      return subscribeToUserIncentivesData<
        C_UserPoolIncentivesDataUpdateSubscription,
        C_UserPoolIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_UserPoolIncentivesDataUpdateDocument,
        variables: {
          lendingPoolAddressProvider,
          userAddress: userId || '',
          chainlinkFeedsRegistry: chainlinkFeedsRegistry || '',
          quote: quote || '',
        },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const userData = subscriptionData.data?.userPoolIncentivesDataUpdate;
          if (!userData) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            userIncentives: userData,
          };
        },
      });
  }, [subscribeToUserIncentivesData, lendingPoolAddressProvider, userId, skip]);

  // logic
  const loading = (userId && userIncentivesDataLoading) || incentivesDataLoading;
  const reserveIncentiveData: ReserveIncentivesData[] = incentivesData?.reservesIncentives || [];
  const userIncentiveData: UserIncentivesData[] = userIncentivesData?.userIncentives || [];

  return {
    loading,
    data: {
      userId,
      reserveIncentiveData,
      userIncentiveData,
    },
  };
}
