import { useEffect } from 'react';
import {
  C_StakeGeneralUiDataUpdateDocument,
  C_StakeGeneralUiDataUpdateSubscription,
  C_StakeUserUiDataUpdateDocument,
  C_StakeUserUiDataUpdateSubscription,
  C_StakeUserUiDataUpdateSubscriptionVariables,
  useC_StakeGeneralUiDataQuery,
  useC_StakeUserUiDataQuery,
} from '../graphql';
import { StakesData, StakeUserData } from '../../pool-data-provider/types/stake';

const zeroStakeUserData: StakeUserData = {
  stakeTokenUserBalance: '0',
  underlyingTokenUserBalance: '0',
  userCooldown: 0,
  userIncentivesToClaim: '0',
  userPermitNonce: '0',
};

interface StakeDataWithCache {
  loading: boolean;
  data?: StakesData;
  usdPriceEth?: string;
}

export function useCachedStakeData(currentAccount?: string, skip = false): StakeDataWithCache {
  const userId = currentAccount?.toLowerCase() || '';
  const {
    loading: stakeGeneralUIDataLoading,
    data: stakeGeneralResult,
    subscribeToMore: subscribeToStakeGeneralUiData,
  } = useC_StakeGeneralUiDataQuery({ skip });

  useEffect(() => {
    if (!skip) {
      return subscribeToStakeGeneralUiData<C_StakeGeneralUiDataUpdateSubscription>({
        document: C_StakeGeneralUiDataUpdateDocument,
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const stakeGeneralUIDataUpdate = subscriptionData.data?.stakeGeneralUIDataUpdate;

          if (!stakeGeneralUIDataUpdate) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            stakeGeneralUIData: stakeGeneralUIDataUpdate,
          };
        },
      });
    }
  }, [subscribeToStakeGeneralUiData]);

  const {
    loading: stakeUserUIDataLoading,
    data: stakeUserResult,
    subscribeToMore: subscribeToStakeUserUiData,
  } = useC_StakeUserUiDataQuery({
    variables: { userAddress: userId },
    skip: !userId || skip,
  });

  useEffect(() => {
    if (userId && !skip) {
      return subscribeToStakeUserUiData<
        C_StakeUserUiDataUpdateSubscription,
        C_StakeUserUiDataUpdateSubscriptionVariables
      >({
        document: C_StakeUserUiDataUpdateDocument,
        variables: { userAddress: userId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const stakeUserUIDataUpdate = subscriptionData.data?.stakeUserUIDataUpdate;
          if (!stakeUserUIDataUpdate) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            stakeUserUIData: stakeUserUIDataUpdate,
          };
        },
      });
    }
  }, [subscribeToStakeUserUiData, userId]);

  const loading = (userId && stakeUserUIDataLoading) || stakeGeneralUIDataLoading;

  const stakeGeneralData = stakeGeneralResult?.stakeGeneralUIData || undefined;
  if (!stakeGeneralData || (!stakeUserResult?.stakeUserUIData && !stakeUserUIDataLoading)) {
    return {
      loading,
      data: undefined,
      usdPriceEth: undefined,
    };
  }
  const stakeUserData = stakeUserResult?.stakeUserUIData || {
    aave: zeroStakeUserData,
    bpt: zeroStakeUserData,
  };
  const usdPriceEth = stakeGeneralData?.usdPriceEth!;

  return {
    loading,
    data: {
      aave: { ...stakeGeneralData.aave, ...stakeUserData.aave },
      bpt: { ...stakeGeneralData.bpt, ...stakeUserData.bpt },
    },
    usdPriceEth,
  };
}
