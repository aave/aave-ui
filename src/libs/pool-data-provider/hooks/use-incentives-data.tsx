import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

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

// interval in which the rpc data is refreshed
const POOLING_INTERVAL = 30 * 1000;
// decreased interval in case there was a network error for faster recovery
const RECOVER_INTERVAL = 10 * 1000;

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
  const [loadingReserveIncentives, setLoadingReserveIncentives] = useState<boolean>(true);
  const [errorReserveIncentives, setErrorReserveIncentives] = useState<boolean>(false);
  const [loadingUserIncentives, setLoadingUserIncentives] = useState<boolean>(true);
  const [errorUserIncentives, setErrorUserIncentives] = useState<boolean>(false);
  const [reserveIncentiveData, setReserveIncentiveData] = useState<
    ReservesIncentiveDataHumanized[] | undefined
  >(undefined);
  const [userIncentiveData, setUserIncentiveData] = useState<
    UserReservesIncentivesDataHumanized[] | undefined
  >(undefined);

  // Fetch reserve incentive data and user incentive data only if currentAccount is set
  const fetchData = async (
    currentAccount: string | undefined,
    lendingPoolAddressProvider: string,
    incentiveDataProviderAddress: string
  ) => {
    fetchReserveIncentiveData(lendingPoolAddressProvider, incentiveDataProviderAddress);
    if (currentAccount && currentAccount !== ethers.constants.AddressZero) {
      fetchUserIncentiveData(
        currentAccount,
        lendingPoolAddressProvider,
        incentiveDataProviderAddress
      );
    } else {
      setLoadingUserIncentives(false);
    }
  };

  // Fetch and format reserve incentive data from UiIncentiveDataProvider contract
  const fetchReserveIncentiveData = async (
    lendingPoolAddressProvider: string,
    incentiveDataProviderAddress: string
  ) => {
    const provider = getProvider(chainId);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      provider,
      uiIncentiveDataProviderAddress: incentiveDataProviderAddress,
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
  const fetchUserIncentiveData = async (
    currentAccount: string,
    lendingPoolAddressProvider: string,
    incentiveDataProviderAddress: string
  ) => {
    const provider = getProvider(chainId);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      uiIncentiveDataProviderAddress: incentiveDataProviderAddress,
      provider,
    });

    try {
      const rawUserIncentiveData: UserReservesIncentivesDataHumanized[] =
        await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
          user: currentAccount,
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

  useEffect(() => {
    setLoadingReserveIncentives(true);
    setLoadingUserIncentives(true);

    if (!skip && incentiveDataProviderAddress) {
      fetchData(currentAccount, lendingPoolAddressProvider, incentiveDataProviderAddress);
      const intervalID = setInterval(
        () => fetchData(currentAccount, lendingPoolAddressProvider, incentiveDataProviderAddress),
        errorReserveIncentives || errorUserIncentives ? RECOVER_INTERVAL : POOLING_INTERVAL
      );
      return () => clearInterval(intervalID);
    } else {
      setLoadingReserveIncentives(false);
      setLoadingUserIncentives(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, lendingPoolAddressProvider, skip]);

  const loading = loadingReserveIncentives || loadingUserIncentives;
  const error = errorReserveIncentives || errorUserIncentives;
  return {
    loading,
    error,
    data: { reserveIncentiveData, userIncentiveData },
    refresh: async () => {
      if (incentiveDataProviderAddress)
        return fetchData(currentAccount, lendingPoolAddressProvider, incentiveDataProviderAddress);
    },
  };
}

export const useIncentiveData = () => {
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
