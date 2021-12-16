import { useState } from 'react';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import {
  UiIncentiveDataProvider,
  ChainId,
  ReservesIncentiveDataHumanized,
  UserReservesIncentivesDataHumanized,
} from '@aave/contract-helpers';
import { useProtocolDataContext } from '../../protocol-data-provider';
import {
  PoolIncentivesWithCache,
  useCachedIncentivesData,
} from '../../caching-server-data-provider/hooks/use-cached-incentives-data';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { useConnectionStatusContext } from '../../connection-status-provider';
import { useApolloConfigContext } from '../../apollo-config';
import { BigNumber } from '@aave/protocol-js';
import { usePolling } from '../../hooks/use-polling';

// interval in which the rpc data is refreshed
const POOLING_INTERVAL = 30 * 1000;
// decreased interval in case there was a network error for faster recovery
const RECOVER_INTERVAL = 10 * 1000;

export interface ReserveIncentiveResponse {
  incentiveAPR: string;
  rewardTokenAddress: string;
  rewardTokenSymbol: string;
}

export interface UserIncentiveResponse {
  incentiveControllerAddress: string;
  rewardTokenSymbol: string;
  rewardPriceFeed: string;
  rewardTokenDecimals: number;
  claimableRewards: BigNumber;
  assets: string[];
}

export interface IncentiveDataResponse {
  loading: boolean;
  error: boolean;
  data: {
    reserveIncentiveData?: ReservesIncentiveDataHumanized[];
    userIncentiveData?: UserReservesIncentivesDataHumanized[];
  };
  refresh: () => Promise<void>;
}

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function useRPCIncentivesData(
  lendingPoolAddressProvider: string,
  chainId: ChainId,
  incentiveDataProviderAddress: string | undefined,
  skip: boolean,
  userAddress?: string
): IncentiveDataResponse {
  const currentAccount: string | undefined = userAddress ? userAddress.toLowerCase() : undefined;
  const [loadingReserveIncentives, setLoadingReserveIncentives] = useState<boolean>(false);
  const [errorReserveIncentives, setErrorReserveIncentives] = useState<boolean>(false);
  const [loadingUserIncentives, setLoadingUserIncentives] = useState<boolean>(false);
  const [errorUserIncentives, setErrorUserIncentives] = useState<boolean>(false);
  const [reserveIncentiveData, setReserveIncentiveData] = useState<
    ReservesIncentiveDataHumanized[] | undefined
  >(undefined);
  const [userIncentiveData, setUserIncentiveData] = useState<
    UserReservesIncentivesDataHumanized[] | undefined
  >(undefined);

  // Fetch and format reserve incentive data from UiIncentiveDataProvider contract
  const fetchReserveIncentiveData = async () => {
    setLoadingReserveIncentives(true);
    const provider = getProvider(chainId);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      provider,
      uiIncentiveDataProviderAddress: incentiveDataProviderAddress!,
    });

    try {
      const rawReserveIncentiveData =
        await incentiveDataProviderContract.getReservesIncentivesDataHumanized(
          lendingPoolAddressProvider
        );
      setReserveIncentiveData(rawReserveIncentiveData);
      setErrorReserveIncentives(false);
    } catch (e) {
      console.log('e', e);
      setErrorReserveIncentives(e.message);
    }
    setLoadingReserveIncentives(false);
  };

  // Fetch and format user incentive data from UiIncentiveDataProvider
  const fetchUserIncentiveData = async () => {
    setLoadingUserIncentives(true);
    const provider = getProvider(chainId);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      uiIncentiveDataProviderAddress: incentiveDataProviderAddress!,
      provider,
    });

    try {
      const rawUserIncentiveData: UserReservesIncentivesDataHumanized[] =
        await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
          user: currentAccount!,
          lendingPoolAddressProvider,
        });

      setUserIncentiveData(rawUserIncentiveData);
      setErrorUserIncentives(false);
    } catch (e) {
      console.log('e', e);
      setErrorUserIncentives(e.message);
    }
    setLoadingUserIncentives(false);
  };

  usePolling(
    fetchReserveIncentiveData,
    errorReserveIncentives || errorUserIncentives ? RECOVER_INTERVAL : POOLING_INTERVAL,
    skip || !incentiveDataProviderAddress,
    [lendingPoolAddressProvider, incentiveDataProviderAddress]
  );

  usePolling(
    fetchUserIncentiveData,
    errorReserveIncentives || errorUserIncentives ? RECOVER_INTERVAL : POOLING_INTERVAL,
    skip || !currentAccount || !incentiveDataProviderAddress,
    [lendingPoolAddressProvider, incentiveDataProviderAddress, currentAccount]
  );

  const loading = loadingReserveIncentives || loadingUserIncentives;
  const error = errorReserveIncentives || errorUserIncentives;
  return {
    loading,
    error,
    data: { reserveIncentiveData, userIncentiveData },
    refresh: async () => {
      if (incentiveDataProviderAddress) {
        if (currentAccount) await fetchUserIncentiveData();
        await fetchReserveIncentiveData();
      }
    },
  };
}

export const useIncentiveData = (skip: boolean) => {
  const { currentAccount } = useUserWalletDataContext();
  const { chainId: apolloClientChainId } = useApolloConfigContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { isRPCActive } = useConnectionStatusContext();

  const rpcMode = isRPCActive || chainId !== apolloClientChainId;

  const {
    loading: cachedDataLoading,
    data: cachedData,
    error: cachedDataError,
  }: PoolIncentivesWithCache = useCachedIncentivesData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    rpcMode || !currentMarketData.addresses.UI_INCENTIVE_DATA_PROVIDER
  );

  const {
    data: rpcData,
    loading: rpcDataLoading,
    error: rpcDataError,
    refresh,
  }: IncentiveDataResponse = useRPCIncentivesData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    chainId,
    currentMarketData.addresses.UI_INCENTIVE_DATA_PROVIDER,
    !rpcMode || !currentMarketData.addresses.UI_INCENTIVE_DATA_PROVIDER,
    currentAccount
  );

  if (rpcMode) {
    return {
      loading: rpcDataLoading,
      data: rpcData,
      error: rpcDataError,
      refresh,
    };
  }

  return {
    loading: cachedDataLoading,
    data: cachedData,
    error: cachedDataError,
  };
};
