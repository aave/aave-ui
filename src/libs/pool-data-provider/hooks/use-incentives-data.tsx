import { useEffect, useState } from 'react';
import { ethers, providers } from 'ethers';
import { Network } from '@aave/protocol-js';

import { getProvider } from '../../../helpers/markets/markets-data';
import { FullReservesIncentiveDataResponse, UiIncentiveDataProvider } from '@aave/contract-helpers';

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
  data: {
    reserveIncentiveData?: ReserveIncentiveData[];
    userIncentiveData?: UserReserveIncentiveData[];
  };
  error?: string;
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
  userAddress?: string,
  injectedProvider?: providers.Web3Provider
): IncentiveDataResponse {
  const currentAccount = userAddress ? userAddress.toLowerCase() : ethers.constants.AddressZero;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [reserveIncentiveData, setReserveIncentiveData] = useState<
    ReserveIncentiveData[] | undefined
  >(undefined);
  const [userIncentiveData, setUserIncentiveData] = useState<
    UserReserveIncentiveData[] | undefined
  >(undefined);

  const fetchData = async (
    userAddress: string,
    network: Network,
    lendingPoolAddressProvider: string,
    incentiveDataProviderAddress: string
  ) => {
    const provider = getProvider(network);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      incentiveDataProviderAddress,
      lendingPoolAddressProvider,
      provider,
    });

    try {
      const result: FullReservesIncentiveDataResponse =
        await incentiveDataProviderContract.getAllIncentives(userAddress);
      const { 0: rawReserveIncentiveData, 1: rawUserIncentiveData } = result;
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
      setReserveIncentiveData(formattedReserveIncentiveData);
      setError(undefined);
    } catch (e) {
      console.log('e', e);
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // if cached data is being used - clean the storage to prevent using outdated data
    if (skip) {
      setReserveIncentiveData(undefined);
      setUserIncentiveData(undefined);
      setLoading(true);
      return;
    }

    fetchData(currentAccount, network, lendingPoolAddressProvider, incentiveDataProviderAddress);

    const intervalID = setInterval(
      () =>
        fetchData(
          currentAccount,
          network,
          lendingPoolAddressProvider,
          incentiveDataProviderAddress
        ),
      error ? RECOVER_INTERVAL : POOLING_INTERVAL
    );
    return () => clearInterval(intervalID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, injectedProvider, lendingPoolAddressProvider, skip, error]);

  return {
    loading,
    data: { reserveIncentiveData, userIncentiveData },
    error,
    refresh: () =>
      fetchData(currentAccount, network, lendingPoolAddressProvider, incentiveDataProviderAddress),
  };
}
