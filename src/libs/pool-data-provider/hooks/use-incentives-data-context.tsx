import {
  calculateTotalUserIncentives,
  calculateReserveIncentives,
  CalculateReserveIncentivesResponse,
  UserReserveData,
  RAY_DECIMALS,
} from '@aave/math-utils';
import { ComputedReserveData } from '@aave/protocol-js';
import BigNumber from 'bignumber.js';
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

// User incentives response type
interface UserIncentiveDict {
  [incentiveControllerAddress: string]: UserIncentiveData;
}

interface UserIncentiveData {
  rewardTokenAddress: string;
  claimableRewards: BigNumber;
  assets: string[];
}

export interface IncentivesDataContextData {
  reserveIncentives: CalculateReserveIncentivesResponse[];
  userIncentives: UserIncentiveDict | undefined;
}

const IncentivesDataContext = React.createContext({} as IncentivesDataContextData);

function formatBNInput(input: string, decimals: number): string {
  let inputBN = new BigNumber(input);
  inputBN = inputBN.shiftedBy(decimals);
  return inputBN.toString();
}

function calculateRewardTokenPrice(reserves: ComputedReserveData[], address: string): string {
  // For stkAave incentives, use Aave price oracle
  if (address === '0x4da27a545c0c5b758a6ba100e3a049001de870f5') {
    address = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9';
  }
  const rewardReserve = reserves.find((reserve) => reserve.underlyingAsset === address);
  if (rewardReserve) {
    return formatBNInput(rewardReserve.price.priceInEth, rewardReserve.decimals);
  } else {
    return '0'; // Will be replaced with fallback call to ChainLink registry
  }
}

export function IncentivesDataProvider({ children }: { children: ReactNode }) {
  const { userId } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { network, networkConfig, currentMarketData } = useProtocolDataContext();
  const { network: apolloClientNetwork } = useApolloConfigContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const [reserveIncentives, setReserveIncentives] = useState<CalculateReserveIncentivesResponse[]>(
    []
  );
  const [userIncentives, setUserIncentives] = useState<UserIncentiveDict | undefined>(undefined);

  const currentAccount = userId ? userId.toLowerCase() : ethers.constants.AddressZero;
  const ETH_DECIMALS: number = 18;

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

  const activeData = isRPCActive && rpcData ? rpcData : cachedData;

  const userIncentiveData: UserReserveIncentiveData[] =
    activeData && activeData.userIncentiveData ? activeData.userIncentiveData : [];
  const reserveIncentiveData: ReserveIncentiveData[] =
    activeData && activeData.reserveIncentiveData ? activeData.reserveIncentiveData : [];

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
            liquidityIndex: formatBNInput(reserve.liquidityIndex, RAY_DECIMALS),
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
          });
        }
      });

      // Compute the total claimable rewards for a user
      // Once aave-utilities is updated to support multiple incentives controller this will return and array of {underlyingAsset, claimableReward}
      const totalIncentives = calculateTotalUserIncentives({
        reserveIncentives: reserveIncentiveData,
        userReserveIncentives: userIncentiveData,
        // userUnclaimedRewards: '43921819137644870', // TO-DO: There will be a seperate userUnclaimedRewards per IncentivesController, this parameter will be removed and calculated using reserveIncentiveData
        userReserves,
        currentTimestamp,
      });
      setUserIncentives(totalIncentives);
    }
  }, [user, reserves, reserveIncentiveData, userIncentiveData]);

  // Calculate and update reserveIncentives
  useEffect(() => {
    if (reserves && reserveIncentiveData) {
      const allReserveIncentives: CalculateReserveIncentivesResponse[] = [];
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
          const calculatedReserveIncentives: CalculateReserveIncentivesResponse =
            calculateReserveIncentives({
              reserveIncentiveData: incentiveData,
              totalLiquidity: formatBNInput(reserve.totalLiquidity, reserve.decimals),
              liquidityIndex: formatBNInput(reserve.liquidityIndex, RAY_DECIMALS),
              totalScaledVariableDebt: formatBNInput(
                reserve.totalScaledVariableDebt,
                reserve.decimals
              ),
              totalPrincipalStableDebt: formatBNInput(
                reserve.totalPrincipalStableDebt,
                reserve.decimals
              ),
              tokenPriceInMarketReferenceCurrency: formatBNInput(
                reserve.price.priceInEth,
                ETH_DECIMALS
              ), // Will be replaced with marketReferencePrice/Decimals
              decimals: reserve.decimals,

              aRewardTokenPriceInMarketReferenceCurrency: calculateRewardTokenPrice(
                reserves,
                incentiveData.aIncentiveData.rewardTokenAddress.toLowerCase()
              ),
              vRewardTokenPriceInMarketReferenceCurrency: calculateRewardTokenPrice(
                reserves,
                incentiveData.vIncentiveData.rewardTokenAddress.toLowerCase()
              ),
              sRewardTokenPriceInMarketReferenceCurrency: calculateRewardTokenPrice(
                reserves,
                incentiveData.sIncentiveData.rewardTokenAddress.toLowerCase()
              ),
            });
          allReserveIncentives.push(calculatedReserveIncentives);
        }
      });
      setReserveIncentives(allReserveIncentives);
    }
  }, [reserves, reserveIncentiveData]);

  if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
    return <Preloader withText={true} />;
  }

  if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    return <ErrorPage />;
  }

  return (
    <IncentivesDataContext.Provider
      value={{
        reserveIncentives,
        userIncentives,
      }}
    >
      {children}
    </IncentivesDataContext.Provider>
  );
}

export const useIncentivesDataContext = () => useContext(IncentivesDataContext);
