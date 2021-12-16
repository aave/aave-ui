import { useState } from 'react';

import {
  UiPoolDataProvider,
  ReservesDataHumanized,
  UserReserveDataHumanized,
  ChainId,
} from '@aave/contract-helpers';
import { usePolling } from '../../hooks/use-polling';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { useApolloConfigContext } from '../../apollo-config';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useConnectionStatusContext } from '../../connection-status-provider';
import { useCachedProtocolData } from '../../caching-server-data-provider/hooks/use-cached-protocol-data';

// interval in which the rpc data is refreshed
const POLLING_INTERVAL = 30 * 1000;

export interface PoolDataResponse {
  loading: boolean;
  error: boolean;
  data: {
    reserves?: ReservesDataHumanized;
    userReserves?: UserReserveDataHumanized[];
    userEmodeCategoryId?: number;
  };
  refresh: () => Promise<any>;
}

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function useRPCPoolData(
  lendingPoolAddressProvider: string,
  chainId: ChainId,
  poolDataProviderAddress: string,
  skip: boolean,
  userAddress?: string
): PoolDataResponse {
  const currentAccount: string | undefined = userAddress ? userAddress.toLowerCase() : undefined;
  const [loadingReserves, setLoadingReserves] = useState<boolean>(true);
  const [errorReserves, setErrorReserves] = useState<boolean>(false);
  const [loadingUserReserves, setLoadingUserReserves] = useState<boolean>(false);
  const [errorUserReserves, setErrorUserReserves] = useState<boolean>(false);
  const [reserves, setReserves] = useState<ReservesDataHumanized | undefined>(undefined);
  const [userReserves, setUserReserves] = useState<
    { userReserves: UserReserveDataHumanized[]; userEmodeCategoryId: number } | undefined
  >(undefined);

  // Fetch and format reserve incentive data from UiIncentiveDataProvider contract
  const fetchReserves = async () => {
    const provider = getProvider(chainId);
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: poolDataProviderAddress,
      provider,
    });

    try {
      setLoadingReserves(true);
      const reservesResponse = await poolDataProviderContract.getReservesHumanized(
        lendingPoolAddressProvider
      );
      setReserves(reservesResponse);
      setErrorReserves(false);
    } catch (e) {
      console.log('e', e);
      setErrorReserves(e.message);
    }
    setLoadingReserves(false);
  };

  // Fetch and format user incentive data from UiIncentiveDataProvider
  const fetchUserReserves = async () => {
    if (!currentAccount) return;
    const provider = getProvider(chainId);
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: poolDataProviderAddress,
      provider,
    });

    try {
      setLoadingUserReserves(true);
      const userReservesResponse = await poolDataProviderContract.getUserReservesHumanized(
        lendingPoolAddressProvider,
        currentAccount
      );

      setUserReserves(userReservesResponse);
      setErrorUserReserves(false);
    } catch (e) {
      console.log('e', e);
      setErrorUserReserves(e.message);
    }
    setLoadingUserReserves(false);
  };

  usePolling(fetchReserves, POLLING_INTERVAL, skip, [skip, poolDataProviderAddress, chainId]);
  usePolling(fetchUserReserves, POLLING_INTERVAL, skip, [
    skip,
    poolDataProviderAddress,
    chainId,
    currentAccount,
  ]);

  const loading = loadingReserves || loadingUserReserves;
  const error = errorReserves || errorUserReserves;
  return {
    loading,
    error,
    data: {
      reserves,
      userReserves: userReserves?.userReserves,
      userEmodeCategoryId: userReserves?.userEmodeCategoryId,
    },
    refresh: () => {
      return Promise.all([fetchUserReserves(), fetchReserves()]);
    },
  };
}

export const usePoolData = () => {
  const { currentAccount } = useUserWalletDataContext();
  const { chainId: apolloClientChainId } = useApolloConfigContext();
  const { currentMarketData, chainId } = useProtocolDataContext();
  const { isRPCActive } = useConnectionStatusContext();

  const rpcMode = isRPCActive || chainId !== apolloClientChainId;

  const { loading: cachedDataLoading, data: cachedData } = useCachedProtocolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    rpcMode
  );

  const {
    error: rpcDataError,
    loading: rpcDataLoading,
    data: rpcData,
    refresh,
  } = useRPCPoolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    chainId,
    currentMarketData.addresses.UI_POOL_DATA_PROVIDER,
    !rpcMode,
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
    // TODO: fix caching data
    data: cachedData,
  };
};
