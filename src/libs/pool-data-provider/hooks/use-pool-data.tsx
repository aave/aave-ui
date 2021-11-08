import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Network } from '@aave/protocol-js';

import { getProvider } from '../../../helpers/markets/markets-data';
import {
  UiPoolDataProvider,
  ReservesDataHumanized,
  UserReserveDataHumanized,
} from '@aave/contract-helpers';

// interval in which the rpc data is refreshed
const POOLING_INTERVAL = 30 * 1000;
// decreased interval in case there was a network error for faster recovery
const RECOVER_INTERVAL = 10 * 1000;

export interface PoolDataResponse {
  loading: boolean;
  error: boolean;
  data: {
    reserves?: ReservesDataHumanized;
    userReserves?: UserReserveDataHumanized[];
  };
  refresh: () => Promise<void>;
}

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function usePoolData(
  lendingPoolAddressProvider: string,
  network: Network,
  poolDataProviderAddress: string,
  skip: boolean,
  userAddress?: string
): PoolDataResponse {
  const currentAccount: string | undefined = userAddress ? userAddress.toLowerCase() : undefined;
  const [loadingReserves, setLoadingReserves] = useState<boolean>(true);
  const [errorReserves, setErrorReserves] = useState<boolean>(false);
  const [loadingUserReserves, setLoadingUserReserves] = useState<boolean>(true);
  const [errorUserReserves, setErrorUserReserves] = useState<boolean>(false);
  const [reserves, setReserves] = useState<ReservesDataHumanized | undefined>(undefined);
  const [userReserves, setUserReserves] = useState<UserReserveDataHumanized[] | undefined>(
    undefined
  );

  // Fetch reserves data, and user reserves data only if currentAccount is set
  const fetchData = async () => {
    fetchReserves();
    if (currentAccount && currentAccount !== ethers.constants.AddressZero) {
      fetchUserReserves(currentAccount);
    } else {
      setLoadingUserReserves(false);
    }
  };

  // Fetch and format reserve incentive data from UiIncentiveDataProvider contract
  const fetchReserves = async () => {
    const provider = getProvider(network);
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: poolDataProviderAddress,
      provider,
    });

    try {
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
  const fetchUserReserves = async (userId: string) => {
    const provider = getProvider(network);
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: poolDataProviderAddress,
      provider,
    });

    try {
      const userReservesResponse: UserReserveDataHumanized[] =
        await poolDataProviderContract.getUserReservesHumanized(lendingPoolAddressProvider, userId);

      setUserReserves(userReservesResponse);
      setErrorUserReserves(false);
    } catch (e) {
      console.log('e', e);
      setErrorUserReserves(e.message);
    }
    setLoadingUserReserves(false);
  };

  useEffect(() => {
    setLoadingReserves(true);
    setLoadingUserReserves(true);

    if (!skip) {
      fetchData();
      const intervalID = setInterval(
        () => fetchData(),
        errorReserves || errorUserReserves ? RECOVER_INTERVAL : POOLING_INTERVAL
      );
      return () => clearInterval(intervalID);
    } else {
      setLoadingReserves(false);
      setLoadingUserReserves(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, lendingPoolAddressProvider, skip]);

  const loading = loadingReserves || loadingUserReserves;
  const error = errorReserves || errorUserReserves;
  return {
    loading,
    error,
    data: { reserves, userReserves },
    refresh: () => fetchData(),
  };
}
