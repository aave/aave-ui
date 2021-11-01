import React, { ReactElement, ReactNode, useContext } from 'react';
import { API_ETH_MOCK_ADDRESS, Network } from '@aave/protocol-js';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { NetworkConfig } from '../../../helpers/markets/markets-data';
import { useCachedProtocolData } from '../../caching-server-data-provider/hooks/use-cached-protocol-data';
import { useApolloConfigContext } from '../../apollo-config';
import { ConnectionMode, useConnectionStatusContext } from '../../connection-status-provider';
import { assetsOrder } from '../../../ui-config/assets';
import { usePoolData } from '../hooks/use-pool-data';
import { ReserveDataHumanized, UserReserveDataHumanized } from '@aave/contract-helpers';

/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '');
};

export interface UserReserveDataExtended extends UserReserveDataHumanized {
  reserve: ReserveDataHumanized;
  variableBorrowIndex: string;
}

export interface StaticPoolDataContextData {
  userId?: string;
  network: Network;
  networkConfig: NetworkConfig;
  isUserHasDeposits: boolean;
  rawReserves: ReserveDataHumanized[];
  rawUserReserves?: UserReserveDataExtended[];
  rawReservesWithBase: ReserveDataHumanized[];
  rawUserReservesWithBase?: UserReserveDataExtended[];
  marketRefCurrencyDecimals: number;
  marketRefPriceInUsd: string;
  WrappedBaseNetworkAssetAddress: string;
  refresh: () => Promise<void>;
}

const StaticPoolDataContext = React.createContext({} as StaticPoolDataContextData);

interface StaticPoolDataProviderProps {
  children: ReactNode;
  loader: ReactElement;
  errorPage: ReactElement;
}

export function StaticPoolDataProvider({
  children,
  loader,
  errorPage,
}: StaticPoolDataProviderProps) {
  const { currentAccount } = useUserWalletDataContext();
  const { network: apolloClientNetwork } = useApolloConfigContext();
  const { currentMarketData, network, networkConfig } = useProtocolDataContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const RPC_ONLY_MODE = networkConfig.rpcOnly;

  const {
    error: rpcDataError,
    loading: rpcDataLoading,
    data: rpcData,
    refresh,
  } = usePoolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    network,
    networkConfig.addresses.uiPoolDataProvider,
    false, // For now just default to RPC to test
    currentAccount
  );

  // TO-DO: Enable cached data
  /*   const {
    error: cachedDataError,
    loading: cachedDataLoading,
    data: cachedData,
  } = useCachedProtocolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    preferredConnectionMode === ConnectionMode.rpc || network !== apolloClientNetwork
    );
    console.log(cachedData); */

  //const activeData = isRPCActive && rpcData ? rpcData : cachedData;
  const activeData = rpcData;
  //if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
  //  return loader;
  // }
  // if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
  //  return errorPage;
  //}

  const reserves: ReserveDataHumanized[] | undefined = activeData.reserves?.reservesData
    .map((reserve) => ({
      ...reserve,
      symbol: unPrefixSymbol(reserve.symbol, currentMarketData.aTokenPrefix),
    }))
    .sort(
      ({ symbol: a }, { symbol: b }) =>
        assetsOrder.indexOf(a.toUpperCase()) - assetsOrder.indexOf(b.toUpperCase())
    );

  let WrappedBaseNetworkAssetAddress = '';
  const reservesWithFixedUnderlying: ReserveDataHumanized[] | undefined = reserves?.map(
    (reserve) => {
      if (reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
        WrappedBaseNetworkAssetAddress = reserve.underlyingAsset;
        return {
          ...reserve,
          symbol: networkConfig.baseAsset,
          underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
        };
      }
      return reserve;
    }
  );

  const userReserves: UserReserveDataExtended[] = [];
  const userReservesWithFixedUnderlying: UserReserveDataExtended[] = [];
  activeData.userReserves?.forEach((userReserve) => {
    const reserve = reserves?.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === userReserve.underlyingAsset.toLowerCase()
    );
    const reserveFixed = reservesWithFixedUnderlying?.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === userReserve.underlyingAsset.toLowerCase()
    );
    if (reserve) {
      const UserReserve: UserReserveDataExtended = {
        ...userReserve,
        variableBorrowIndex: '',
        reserve,
      };
      userReserves.push(UserReserve);
    }
    if (reserveFixed) {
      const UserReserveFixed: UserReserveDataExtended = {
        ...userReserve,
        variableBorrowIndex: '',
        reserve: reserveFixed,
      };
      userReservesWithFixedUnderlying.push(UserReserveFixed);
    }
  });

  const isUserHasDeposits = userReserves.some(
    (userReserve) => userReserve.scaledATokenBalance !== '0'
  );

  if (!RPC_ONLY_MODE && isRPCActive && rpcData) {
    console.log('switched to RPC');
  }

  const marketRefPriceInUsd = activeData?.reserves?.baseCurrencyData
    ?.marketReferenceCurrencyPriceInUsd
    ? activeData.reserves.baseCurrencyData?.marketReferenceCurrencyPriceInUsd
    : '0';

  const marketRefCurrencyDecimals = activeData?.reserves?.baseCurrencyData
    ?.marketReferenceCurrencyDecimals
    ? activeData.reserves.baseCurrencyData?.marketReferenceCurrencyDecimals
    : 18;

  return (
    <StaticPoolDataContext.Provider
      value={{
        userId: currentAccount,
        network,
        networkConfig,
        refresh: isRPCActive ? refresh : async () => {},
        WrappedBaseNetworkAssetAddress,
        rawReserves: reserves ? reserves : [],
        rawUserReserves: userReservesWithFixedUnderlying,
        rawReservesWithBase: reserves ? reserves : [],
        rawUserReservesWithBase: userReserves,
        marketRefPriceInUsd,
        marketRefCurrencyDecimals,
        isUserHasDeposits,
      }}
    >
      {children}
    </StaticPoolDataContext.Provider>
  );
}

export const useStaticPoolDataContext = () => useContext(StaticPoolDataContext);
