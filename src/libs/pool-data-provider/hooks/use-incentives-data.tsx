import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { getProvider } from '../../../helpers/config/markets-and-network-config';
import {
  UiIncentiveDataProvider,
  UserReserveIncentiveDataHumanizedResponse,
  Denominations,
  ChainId,
} from '@aave/contract-helpers';
import { useProtocolDataContext } from '../../protocol-data-provider';

// interval in which the rpc data is refreshed
const POOLING_INTERVAL = 30 * 1000;
// decreased interval in case there was a network error for faster recovery
const RECOVER_INTERVAL = 10 * 1000;

// From UiIncentiveDataProvider
export interface ReserveIncentiveData {
  underlyingAsset: string;
  aIncentiveData: ReserveTokenIncentives;
  vIncentiveData: ReserveTokenIncentives;
  sIncentiveData: ReserveTokenIncentives;
}

// From UiIncentiveDataProvider
export interface UserReserveIncentiveData {
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
  priceFeed: string;
  priceFeedTimestamp: number;
  priceFeedDecimals: number;
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

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function useIncentivesData(
  lendingPoolAddressProvider: string,
  chainId: ChainId,
  incentiveDataProviderAddress: string | undefined,
  skip: boolean,
  userAddress?: string
): IncentiveDataResponse {
  const { networkConfig } = useProtocolDataContext();
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
    const provider = getProvider(chainId);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      incentiveDataProviderAddress,
      provider,
    });

    try {
      const rawReserveIncentiveData =
        await incentiveDataProviderContract.getIncentivesDataWithPrice({
          lendingPoolAddressProvider,
          quote: networkConfig.usdMarket ? Denominations.usd : Denominations.eth,
          chainlinkFeedsRegistry: networkConfig.addresses.chainlinkFeedRegistry,
        });
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
      incentiveDataProviderAddress,
      provider,
    });

    try {
      const rawUserIncentiveData: UserReserveIncentiveDataHumanizedResponse[] =
        await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized(
          currentAccount,
          lendingPoolAddressProvider
        );

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
