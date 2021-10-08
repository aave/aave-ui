import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Network } from '@aave/protocol-js';

import { getProvider } from '../../../helpers/markets/markets-data';
import {
  UiIncentiveDataProvider,
  IncentivesWithFeeds,
  UserReserveIncentiveDataHumanizedResponse,
  IncentiveUserDataHumanized,
  Denominations,
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

// Format reserve incentive contract data into object with BigNumber fields converted to string
function formatIncentiveData(incentive: IncentivesWithFeeds): ReserveTokenIncentives {
  const formattedIncentiveData: ReserveTokenIncentives = {
    emissionPerSecond: incentive.emissionPerSecond.toString(),
    incentivesLastUpdateTimestamp: incentive.incentivesLastUpdateTimestamp,
    tokenIncentivesIndex: incentive.tokenIncentivesIndex.toString(),
    emissionEndTimestamp: incentive.emissionEndTimestamp,
    tokenAddress: incentive.tokenAddress,
    rewardTokenAddress: incentive.rewardTokenAddress,
    incentiveControllerAddress: incentive.incentiveControllerAddress,
    rewardTokenDecimals: incentive.rewardTokenDecimals,
    precision: incentive.precision,
    priceFeed: incentive.priceFeed,
    priceFeedDecimals: incentive.priceFeedDecimals,
    priceFeedTimestamp: incentive.priceFeedTimestamp,
  };
  return formattedIncentiveData;
}

// Format user incentive contract data  into object with BigNumber fields converted to string
function formatUserIncentiveData(incentive: IncentiveUserDataHumanized): UserTokenIncentives {
  const formattedIncentiveData: UserTokenIncentives = {
    tokenIncentivesUserIndex: incentive.tokenIncentivesUserIndex.toString(),
    userUnclaimedRewards: incentive.userUnclaimedRewards.toString(),
    tokenAddress: incentive.tokenAddress,
    rewardTokenAddress: incentive.rewardTokenAddress,
    incentiveControllerAddress: incentive.incentiveControllerAddress,
    rewardTokenDecimals: incentive.rewardTokenDecimals,
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
    const provider = getProvider(network);
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      incentiveDataProviderAddress,
      provider,
    });

    try {
      const rawReserveIncentiveData =
        await incentiveDataProviderContract.getIncentivesDataWithPrice({
          lendingPoolAddressProvider,
          quote: networkConfig.usdMarket ? Denominations.usd : Denominations.eth,
          chainlinkFeedsRegistry: networkConfig.chainlinkFeedRegistry,
        });
      const formattedReserveIncentiveData: ReserveIncentiveData[] = rawReserveIncentiveData.map(
        (reserveIncentive) => {
          const formattedReserveIncentive: ReserveIncentiveData = {
            underlyingAsset: reserveIncentive.underlyingAsset,
            aIncentiveData: formatIncentiveData(reserveIncentive.aIncentiveData),
            vIncentiveData: formatIncentiveData(reserveIncentive.vIncentiveData),
            sIncentiveData: formatIncentiveData(reserveIncentive.sIncentiveData),
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
      const rawUserIncentiveData: UserReserveIncentiveDataHumanizedResponse[] =
        await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized(
          currentAccount,
          lendingPoolAddressProvider
        );
      const formattedUserIncentiveData: UserReserveIncentiveData[] = rawUserIncentiveData.map(
        (userIncentive) => {
          const formattedUserIncentive: UserReserveIncentiveData = {
            underlyingAsset: userIncentive.underlyingAsset,
            aTokenIncentivesUserData: formatUserIncentiveData(
              userIncentive.aTokenIncentivesUserData
            ),
            vTokenIncentivesUserData: formatUserIncentiveData(
              userIncentive.vTokenIncentivesUserData
            ),
            sTokenIncentivesUserData: formatUserIncentiveData(
              userIncentive.sTokenIncentivesUserData
            ),
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
