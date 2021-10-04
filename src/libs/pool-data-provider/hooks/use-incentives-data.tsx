import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Network } from '@aave/protocol-js';

import { getProvider } from '../../../helpers/markets/markets-data';
import {
  UserReserveIncentiveDataResponse,
  ReserveIncentiveDataResponse,
  UiIncentiveDataProvider,
} from '@aave/contract-helpers';

// interval in which the rpc data is refreshed
const POOLING_INTERVAL = 30 * 1000;
// decreased interval in case there was a network error for faster recovery
const RECOVER_INTERVAL = 10 * 1000;

// From UiIncentiveDataProvider
export interface ReserveIncentiveData {
  id: string;
  underlyingAsset: string;
  aIncentiveData: ReserveTokenIncentives;
  vIncentiveData: ReserveTokenIncentives;
  sIncentiveData: ReserveTokenIncentives;
}

// From UiIncentiveDataProvider
export interface UserReserveIncentiveData {
  id: string;
  underlyingAsset: string;
  aTokenIncentivesUserData: UserTokenIncentives;
  vTokenIncentivesUserData: UserTokenIncentives;
  sTokenIncentivesUserData: UserTokenIncentives;
}

interface ReserveTokenIncentives {
  emissionPerSecond: string;
  incentivesLastUpdateTimestamp: number;
  tokenIncentivesIndex: string;
  emissionEndTimestamp: number;
  tokenAddress: string;
  rewardTokenAddress: string;
  incentiveControllerAddress: string;
  rewardTokenDecimals: number;
  precision: number;
}

interface UserTokenIncentives {
  tokenIncentivesUserIndex: string;
  userUnclaimedRewards: string;
  tokenAddress: string;
  rewardTokenAddress: string;
  incentiveControllerAddress: string;
  rewardTokenDecimals: number;
}
export interface IncentiveDataResponse {
  loading: boolean;
  error: boolean;
  data: {
    reserveIncentiveData?: ReserveIncentiveData[];
    userIncentiveData?: UserReserveIncentiveData[];
  };
  refresh: () => Promise<void>;
}

// Format reserve incentive contract data into object with BigNumber fields converted to string
function formatIncentiveData(incentive: any): ReserveTokenIncentives {
  const {
    0: emissionPerSecond,
    1: incentivesLastUpdateTimestamp,
    2: tokenIncentivesIndex,
    3: emissionEndTimestamp,
    4: tokenAddress,
    5: rewardTokenAddress,
    6: incentiveControllerAddress,
    7: rewardTokenDecimals,
    8: precision,
  } = incentive;
  const formattedIncentiveData: ReserveTokenIncentives = {
    emissionPerSecond: emissionPerSecond.toString(),
    incentivesLastUpdateTimestamp,
    tokenIncentivesIndex: tokenIncentivesIndex.toString(),
    emissionEndTimestamp,
    tokenAddress,
    rewardTokenAddress,
    incentiveControllerAddress,
    rewardTokenDecimals,
    precision,
  };
  return formattedIncentiveData;
}

// Format user incentive contract data  into object with BigNumber fields converted to string
function formatUserIncentiveData(incentive: any): UserTokenIncentives {
  const {
    0: tokenIncentivesUserIndex,
    1: userUnclaimedRewards,
    2: tokenAddress,
    3: rewardTokenAddress,
    4: incentiveControllerAddress,
    5: rewardTokenDecimals,
  } = incentive;
  const formattedIncentiveData: UserTokenIncentives = {
    tokenIncentivesUserIndex: tokenIncentivesUserIndex.toString(),
    userUnclaimedRewards: userUnclaimedRewards.toString(),
    tokenAddress,
    rewardTokenAddress,
    incentiveControllerAddress,
    rewardTokenDecimals,
  };
  return formattedIncentiveData;
}

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function useIncentivesData(
  lendingPoolAddressProvider: string,
  network: Network,
  incentiveDataProviderAddress: string,
  skip: boolean,
  userAddress?: string
): IncentiveDataResponse {
  const currentAccount: string | undefined = userAddress ? userAddress.toLowerCase() : undefined;
  const [loadingReserveIncentives, setLoadingReserveIncentives] = useState<boolean>(true);
  const [errorReserveIncentives, setErrorReserveIncentives] = useState<boolean>(false);
  const [loadingUserIncentives, setLoadingUserIncentives] = useState<boolean>(true);
  const [errorUserIncentives, setErrorUserIncentives] = useState<boolean>(false);
  const [reserveIncentiveData, setReserveIncentiveData] = useState<
    ReserveIncentiveData[] | undefined
  >(undefined);
  const [userIncentiveData, setUserIncentiveData] = useState<
    UserReserveIncentiveData[] | undefined
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
    const provider = getProvider(network);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      incentiveDataProviderAddress,
      provider,
    });

    try {
      const rawReserveIncentiveData: ReserveIncentiveDataResponse[] =
        await incentiveDataProviderContract.getReservesIncentives(lendingPoolAddressProvider);
      const formattedReserveIncentiveData: ReserveIncentiveData[] = rawReserveIncentiveData.map(
        (reserveIncentive) => {
          const {
            0: underlyingAsset,
            1: aIncentiveData,
            2: vIncentiveData,
            3: sIncentiveData,
          } = reserveIncentive;

          const formattedReserveIncentive: ReserveIncentiveData = {
            id: (underlyingAsset + lendingPoolAddressProvider).toLowerCase(),
            underlyingAsset,
            aIncentiveData: formatIncentiveData(aIncentiveData),
            vIncentiveData: formatIncentiveData(vIncentiveData),
            sIncentiveData: formatIncentiveData(sIncentiveData),
          };
          return formattedReserveIncentive;
        }
      );
      setReserveIncentiveData(formattedReserveIncentiveData);
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
    const provider = getProvider(network);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      incentiveDataProviderAddress,
      provider,
    });

    try {
      const rawUserIncentiveData: UserReserveIncentiveDataResponse[] =
        await incentiveDataProviderContract.getUserReservesIncentives(
          currentAccount,
          lendingPoolAddressProvider
        );
      const formattedUserIncentiveData: UserReserveIncentiveData[] = rawUserIncentiveData.map(
        (userIncentive) => {
          const {
            0: underlyingAsset,
            1: aTokenIncentivesUserData,
            2: vTokenIncentivesUserData,
            3: sTokenIncentivesUserData,
          } = userIncentive;
          const formattedUserIncentive: UserReserveIncentiveData = {
            id: (underlyingAsset + lendingPoolAddressProvider).toLowerCase(),
            underlyingAsset,
            aTokenIncentivesUserData: formatUserIncentiveData(aTokenIncentivesUserData),
            vTokenIncentivesUserData: formatUserIncentiveData(vTokenIncentivesUserData),
            sTokenIncentivesUserData: formatUserIncentiveData(sTokenIncentivesUserData),
          };
          return formattedUserIncentive;
        }
      );
      setUserIncentiveData(formattedUserIncentiveData);
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

    if (!skip) {
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
    refresh: () =>
      fetchData(currentAccount, lendingPoolAddressProvider, incentiveDataProviderAddress),
  };
}
