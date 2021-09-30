import {
  calculateTotalUserIncentives,
  calculateReserveIncentives,
  CalculateReserveIncentivesResponse,
  UserReserveData,
} from '@aave/math-utils';
import { BigNumber } from '@aave/protocol-js';
import { ethers } from 'ethers';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Preloader from '../../../components/basic/Preloader';
import ErrorPage from '../../../components/ErrorPage';
import { useApolloConfigContext } from '../../apollo-config';
import {
  PoolIncentivesWithCache,
  useCachedIncentivesData,
} from '../../caching-server-data-provider/hooks/use-cached-incentives-data';
import { ConnectionMode, useConnectionStatusContext } from '../../connection-status-provider';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useDynamicPoolDataContext } from '../providers/dynamic-pool-data-provider';
import { useStaticPoolDataContext } from '../providers/static-pool-data-provider';
import { useCurrentTimestamp } from './use-current-timestamp';
import {
  IncentiveDataResponse,
  ReserveIncentiveData,
  useIncentivesData,
  UserReserveIncentiveData,
} from './use-incentives-data';

// Reserve incentives response type
interface ReserveIncentiveEmissions {
  underlyingAsset: string;
  aIncentivesAPY: string;
  vIncentivesAPY: string;
  sIncentivesAPY: string;
}

// User incentives input
export interface IncentivesDataContextData {
  reserveIncentives?: ReserveIncentiveEmissions[];
  userTotalRewards: string | undefined;
}

const IncentivesDataContext = React.createContext({} as IncentivesDataContextData);

function formatBNInput(input: string, decimals: number): string {
  let inputBN = new BigNumber(input);
  inputBN = inputBN.shiftedBy(decimals);
  return inputBN.toString();
}

export function IncentivesDataProvider({ children }: { children: ReactNode }) {
  const { userId } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { network, networkConfig, currentMarketData } = useProtocolDataContext();
  const { network: apolloClientNetwork } = useApolloConfigContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const [reserveIncentives, setReserveIncentives] = useState<ReserveIncentiveEmissions[]>();
  const [userTotalRewards, setUserTotalRewards] = useState<string | undefined>(undefined);

  const currentAccount = userId ? userId.toLowerCase() : ethers.constants.AddressZero;

  // TO-DO: add use-cached-incentives-data
  const {
    loading: cachedDataLoading,
    data: cachedData,
    error: cachedDataError,
  }: PoolIncentivesWithCache = useCachedIncentivesData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    preferredConnectionMode === ConnectionMode.rpc || network !== apolloClientNetwork
  );

  const {
    data: rpcData,
    loading: rpcDataLoading,
    error: rpcDataError,
  }: IncentiveDataResponse = useIncentivesData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    network,
    networkConfig.uiIncentiveDataProvider,
    !isRPCActive,
    currentAccount
  );

  if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
    return <Preloader withText={true} />;
  }

  const activeData = isRPCActive && rpcData ? rpcData : cachedData;

  if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    return <ErrorPage />;
  }

  const userIncentiveData: UserReserveIncentiveData[] = activeData.userIncentiveData
    ? activeData.userIncentiveData
    : [];
  const reserveIncentiveData: ReserveIncentiveData[] = activeData.reserveIncentiveData
    ? activeData.reserveIncentiveData
    : [];

  // Calculate and update userTotalRewards
  useEffect(() => {
    if (user && userIncentiveData && reserveIncentiveData && reserves) {
      const userReserves: UserReserveData[] = [];
      user.reservesData.forEach((userReserve) => {
        // Account for ETH underlyingReserveAddress not matching incentives
        let reserveUnderlyingAddress = userReserve.reserve.underlyingAsset.toLowerCase();
        if (reserveUnderlyingAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          reserveUnderlyingAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
        }
        // Find the underlying reserve data for each userReserve
        const reserve = reserves.find(
          (reserve) => reserve.underlyingAsset.toLowerCase() === reserveUnderlyingAddress
        );
        if (reserve) {
          // Construct UserReserveData object from reserve and userReserve fields
          userReserves.push({
            underlyingAsset: reserve.underlyingAsset.toLowerCase(),
            totalLiquidity: formatBNInput(reserve.totalLiquidity, reserve.decimals),
            liquidityIndex: formatBNInput(reserve.liquidityIndex, 27),
            totalScaledVariableDebt: formatBNInput(
              reserve.totalScaledVariableDebt,
              reserve.decimals
            ),
            totalPrincipalStableDebt: formatBNInput(
              reserve.totalPrincipalStableDebt,
              reserve.decimals
            ),
            scaledATokenBalance: formatBNInput(userReserve.scaledATokenBalance, reserve.decimals),
            scaledVariableDebt: userReserve.scaledVariableDebt,
            principalStableDebt: formatBNInput(userReserve.principalStableDebt, reserve.decimals),
            aTokenAddress: reserve.aTokenAddress,
            variableDebtTokenAddress: reserve.variableDebtTokenAddress,
            stableDebtTokenAddress: reserve.stableDebtTokenAddress,
          });
        }
      });

      // Compute the total claimable rewards for a user
      // Once aave-utilities is updated to support multiple incentives controller this will return and array of {underlyingAsset, claimableReward}
      const totalRewards = calculateTotalUserIncentives({
        reserveIncentives: reserveIncentiveData,
        userReserveIncentives: userIncentiveData,
        // userUnclaimedRewards: '43921819137644870', // TO-DO: There will be a seperate userUnclaimedRewards per IncentivesController, this parameter will be removed and calculated using reserveIncentiveData
        userReserves,
        currentTimestamp,
      });
      setUserTotalRewards(totalRewards);
    }
  }, [user, reserves, reserveIncentiveData, userIncentiveData]);

  // Calculate and update reserveIncentives
  useEffect(() => {
    if (reserves && reserveIncentiveData) {
      const reserveIncentiveAPY: CalculateReserveIncentivesResponse[] = [];
      reserves.forEach((reserve) => {
        let reserveUnderlyingAddress = reserve.underlyingAsset.toLowerCase();
        if (reserveUnderlyingAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          reserveUnderlyingAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
        }
        // Find the corresponding incentive data for each reserve
        const incentiveData = reserveIncentiveData.find(
          (incentive) => incentive.underlyingAsset.toLowerCase() === reserveUnderlyingAddress
        );
        if (incentiveData) {
          // If there is incentives data, find the reserve information for the token being distributed
          // Will call Chainlink oracle registry if reward asset is not in reserves
          // TO-DO: Refactor to handle different IncentivesController (rewardToken) for a,v,s incentives
          let rewardTokenAddress = incentiveData.aIncentiveData.rewardTokenAddress.toLowerCase();
          // For stkAave incentives, use Aave price oracle
          if (rewardTokenAddress === '0x4da27a545c0c5b758a6ba100e3a049001de870f5') {
            rewardTokenAddress = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9';
          }
          const rewardTokenReserveData = reserves.find(
            (reserveData) => reserveData.underlyingAsset.toLowerCase() === rewardTokenAddress
          );
          // With the reserve, incentive, and incentive token reserve data, calculate incentive APYs
          if (rewardTokenReserveData) {
            const apys = calculateReserveIncentives({
              reserveIncentiveData: incentiveData,

              totalLiquidity: formatBNInput(reserve.totalLiquidity, reserve.decimals),
              liquidityIndex: formatBNInput(reserve.liquidityIndex, 27),
              totalScaledVariableDebt: formatBNInput(
                reserve.totalScaledVariableDebt,
                reserve.decimals
              ),
              totalPrincipalStableDebt: formatBNInput(
                reserve.totalPrincipalStableDebt,
                reserve.decimals
              ),
              tokenPriceInMarketReferenceCurrency: formatBNInput(reserve.price.priceInEth, 18),
              decimals: reserve.decimals,

              aRewardTokenPriceInMarketReferenceCurrency: formatBNInput(
                rewardTokenReserveData.price.priceInEth,
                18
              ),
              vRewardTokenPriceInMarketReferenceCurrency: formatBNInput(
                rewardTokenReserveData.price.priceInEth,
                18
              ),
              sRewardTokenPriceInMarketReferenceCurrency: formatBNInput(
                rewardTokenReserveData.price.priceInEth,
                18
              ),
            });
            reserveIncentiveAPY.push(apys);
          }
        }
      });
      setReserveIncentives(reserveIncentiveAPY);
    }
  }, [reserves, reserveIncentiveData]);

  return (
    <IncentivesDataContext.Provider
      value={{
        reserveIncentives,
        userTotalRewards,
      }}
    >
      {children}
    </IncentivesDataContext.Provider>
  );
}

export const useIncentivesDataContext = () => useContext(IncentivesDataContext);
