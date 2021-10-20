import { Denominations } from '@aave/contract-helpers';
import {
  calculateAllUserIncentives,
  calculateAllReserveIncentives,
  normalize,
  ReserveIncentiveDict,
  UserIncentiveDict,
  ETH_DECIMALS,
  RAY_DECIMALS,
  ReserveCalculationData,
  UserReserveCalculationData,
} from '@aave/math-utils';
import { IncentivesControllerInterface, TxBuilderV2 } from '@aave/protocol-js';
import { ethers } from 'ethers';
import React, { ReactNode, useContext } from 'react';
import { useLocation } from 'react-router';
import Preloader from '../../../components/basic/Preloader';
import ErrorPage from '../../../components/ErrorPage';
import { getProvider } from '../../../helpers/markets/markets-data';
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

export interface IncentivesContext {
  reserveIncentives: ReserveIncentiveDict;
  userIncentives: UserIncentiveDict;
  incentivesTxBuilder: IncentivesControllerInterface;
}

const IncentivesDataContext = React.createContext({} as IncentivesContext);

export function IncentivesDataProvider({ children }: { children: ReactNode }) {
  const { userId } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const location = useLocation();
  const { network, networkConfig, currentMarketData } = useProtocolDataContext();
  const { network: apolloClientNetwork } = useApolloConfigContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const currentAccount = userId ? userId.toLowerCase() : ethers.constants.AddressZero;
  // incentivesTxBuilder is used in RewardConfirm component where incentiveControllerAddress is appended to pathname
  const incentivesControllerAddress = location.pathname.split('/')[3]?.toLowerCase();
  const incentivesTxBuilder: IncentivesControllerInterface = new TxBuilderV2(
    network,
    getProvider(network)
  ).getIncentives(incentivesControllerAddress);

  const {
    loading: cachedDataLoading,
    data: cachedData,
    error: cachedDataError,
  }: PoolIncentivesWithCache = useCachedIncentivesData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    networkConfig.chainlinkFeedRegistry,
    networkConfig.usdMarket ? Denominations.usd : Denominations.eth,
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

  // Create array of formatted user and reserve data used for user incentive calculations
  let computedUserReserves: UserReserveCalculationData[] = [];
  if (user) {
    user.reservesData.forEach((userReserve) => {
      const reserve = reserves.find(
        (reserve) =>
          reserve.underlyingAsset.toLowerCase() ===
          userReserve.reserve.underlyingAsset.toLowerCase()
      );
      if (reserve) {
        // Construct UserReserveData object from reserve and userReserve fields
        computedUserReserves.push({
          underlyingAsset: userReserve.reserve.underlyingAsset.toLowerCase(),
          totalLiquidity: normalize(reserve.totalLiquidity, -1 * reserve.decimals),
          liquidityIndex: normalize(reserve.liquidityIndex, -1 * RAY_DECIMALS),
          totalScaledVariableDebt: normalize(
            reserve.totalScaledVariableDebt,
            -1 * reserve.decimals
          ),
          totalPrincipalStableDebt: normalize(
            reserve.totalPrincipalStableDebt,
            -1 * reserve.decimals
          ),
          scaledATokenBalance: normalize(userReserve.scaledATokenBalance, -1 * reserve.decimals),
          scaledVariableDebt: userReserve.scaledVariableDebt,
          principalStableDebt: normalize(userReserve.principalStableDebt, -1 * reserve.decimals),
        });
      }
    });
  }
  // Create array of formatted reserve data used for reserve incentive calculations
  const computedReserves: ReserveCalculationData[] = reserves.map((reserve) => {
    return {
      underlyingAsset: reserve.underlyingAsset,
      symbol: reserve.symbol,
      totalLiquidity: normalize(reserve.totalLiquidity, -1 * reserve.decimals),
      liquidityIndex: normalize(reserve.liquidityIndex, -1 * RAY_DECIMALS),
      totalScaledVariableDebt: normalize(reserve.totalScaledVariableDebt, -1 * reserve.decimals),
      totalPrincipalStableDebt: normalize(reserve.totalPrincipalStableDebt, -1 * reserve.decimals),
      priceInMarketReferenceCurrency: normalize(reserve.price.priceInEth, -1 * ETH_DECIMALS),
      marketReferenceCurrencyDecimals: ETH_DECIMALS,
      decimals: reserve.decimals,
    };
  });

  if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
    return <Preloader withBackground={true} />;
  }

  if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    return <ErrorPage />;
  }

  // Compute the incentive APYs for all reserve assets, returned as dictionary indexed by underlyingAsset
  let reserveIncentives = calculateAllReserveIncentives({
    reserveIncentives: reserveIncentiveData,
    reserves: computedReserves,
  });

  // Compute the total claimable rewards for a user, returned as dictionary indexed by incentivesController
  let userIncentives = calculateAllUserIncentives({
    reserveIncentives: reserveIncentiveData,
    userReserveIncentives: userIncentiveData,
    userReserves: computedUserReserves,
    currentTimestamp,
  });

  return (
    <IncentivesDataContext.Provider
      value={{
        incentivesTxBuilder,
        reserveIncentives,
        userIncentives,
      }}
    >
      {children}
    </IncentivesDataContext.Provider>
  );
}

export const useIncentivesDataContext = () => useContext(IncentivesDataContext);
