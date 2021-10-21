import { Denominations } from '@aave/contract-helpers';
import {
  calculateAllUserIncentives,
  calculateAllReserveIncentives,
  ReserveIncentiveDict,
  UserIncentiveDict,
  ETH_DECIMALS,
  ReserveCalculationData,
  UserReserveCalculationData,
} from '@aave/math-utils';
import {
  API_ETH_MOCK_ADDRESS,
  calculateSupplies,
  IncentivesControllerInterface,
  TxBuilderV2,
} from '@aave/protocol-js';
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
  const { userId, rawReservesWithBase, rawUserReservesWithBase } = useStaticPoolDataContext();
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
  if (rawUserReservesWithBase) {
    rawUserReservesWithBase.forEach((userReserve) => {
      const reserve = rawReservesWithBase.find(
        (reserve) =>
          reserve.underlyingAsset.toLowerCase() ===
          userReserve.reserve.underlyingAsset.toLowerCase()
      );
      if (reserve) {
        const reserveSupplyData = {
          totalScaledVariableDebt: reserve.totalScaledVariableDebt,
          variableBorrowIndex: reserve.variableBorrowIndex,
          variableBorrowRate: reserve.variableBorrowRate,
          totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
          averageStableRate: reserve.averageStableRate,
          availableLiquidity: reserve.availableLiquidity,
          stableDebtLastUpdateTimestamp: reserve.stableDebtLastUpdateTimestamp,
          lastUpdateTimestamp: reserve.lastUpdateTimestamp,
        };
        const supplies = calculateSupplies(reserveSupplyData, currentTimestamp);
        // Construct UserReserveData object from reserve and userReserve fields
        computedUserReserves.push({
          underlyingAsset: userReserve.reserve.underlyingAsset.toLowerCase(),
          totalLiquidity: supplies.totalLiquidity.toString(),
          liquidityIndex: reserve.liquidityIndex,
          totalScaledVariableDebt: reserve.totalScaledVariableDebt,
          totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
          scaledATokenBalance: userReserve.scaledATokenBalance,
          scaledVariableDebt: userReserve.scaledVariableDebt,
          principalStableDebt: userReserve.principalStableDebt,
        });
      }
    });
  }
  // Create array of formatted reserve data used for reserve incentive calculations
  const computedReserves: ReserveCalculationData[] = rawReservesWithBase.map((reserve) => {
    const reserveSupplyData = {
      totalScaledVariableDebt: reserve.totalScaledVariableDebt,
      variableBorrowIndex: reserve.variableBorrowIndex,
      variableBorrowRate: reserve.variableBorrowRate,
      totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
      averageStableRate: reserve.averageStableRate,
      availableLiquidity: reserve.availableLiquidity,
      stableDebtLastUpdateTimestamp: reserve.stableDebtLastUpdateTimestamp,
      lastUpdateTimestamp: reserve.lastUpdateTimestamp,
    };
    const supplies = calculateSupplies(reserveSupplyData, currentTimestamp);
    return {
      underlyingAsset: reserve.underlyingAsset,
      symbol: reserve.symbol,
      totalLiquidity: supplies.totalLiquidity.toString(),
      totalVariableDebt: supplies.totalVariableDebt.toString(),
      totalStableDebt: supplies.totalStableDebt.toString(),
      priceInMarketReferenceCurrency: reserve.price.priceInEth,
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

  // Add entry with mock address (0xeeeee..) for base asset incentives
  if (
    networkConfig.baseAssetWrappedAddress &&
    reserveIncentives[networkConfig.baseAssetWrappedAddress.toLowerCase()]
  ) {
    reserveIncentives[API_ETH_MOCK_ADDRESS.toLowerCase()] =
      reserveIncentives[networkConfig.baseAssetWrappedAddress.toLowerCase()];
  }

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
