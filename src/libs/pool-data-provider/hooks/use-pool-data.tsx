import { useState } from 'react';

import {
  UiPoolDataProvider,
  ReservesDataHumanized,
  UserReserveDataHumanized,
  ChainId,
} from '@aave/contract-helpers';
import { usePolling } from '../../hooks/use-polling';
import { getProvider } from '../../../helpers/config/markets-and-network-config';

// interval in which the rpc data is refreshed
const POLLING_INTERVAL = 30 * 1000;

export interface PoolDataResponse {
  loading: boolean;
  error: boolean;
  data: {
    reserves?: ReservesDataHumanized;
    userReserves?: UserReserveDataHumanized[];
  };
  refresh: () => Promise<any>;
}

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function usePoolData(
  lendingPoolAddressProvider: string,
  chainId: ChainId,
  poolDataProviderAddress: string,
  skip: boolean,
  userAddress?: string
): PoolDataResponse {
  const currentAccount: string | undefined = userAddress ? userAddress.toLowerCase() : undefined;
  const [loadingReserves, setLoadingReserves] = useState<boolean>(false);
  const [errorReserves, setErrorReserves] = useState<boolean>(false);
  const [loadingUserReserves, setLoadingUserReserves] = useState<boolean>(false);
  const [errorUserReserves, setErrorUserReserves] = useState<boolean>(false);
  const [reserves, setReserves] = useState<ReservesDataHumanized | undefined>(undefined);
  const [userReserves, setUserReserves] = useState<UserReserveDataHumanized[] | undefined>(
    undefined
  );

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
      const userReservesResponse: UserReserveDataHumanized[] =
        await poolDataProviderContract.getUserReservesHumanized(
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
    data: { reserves, userReserves },
    refresh: () => {
      return Promise.all([fetchUserReserves(), fetchReserves()]);
    },
  };
}
