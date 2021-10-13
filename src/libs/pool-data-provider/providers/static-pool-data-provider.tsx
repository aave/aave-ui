import React, { ReactElement, ReactNode, useContext } from 'react';
import {
  API_ETH_MOCK_ADDRESS,
  Network,
  normalize,
  ReserveData,
  UserReserveData,
} from '@aave/protocol-js';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useProtocolDataWithRpc } from '../hooks/use-v2-protocol-data-with-rpc';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { NetworkConfig } from '../../../helpers/markets/markets-data';
import { useCachedProtocolData } from '../../caching-server-data-provider/hooks/use-cached-protocol-data';
import { useApolloConfigContext } from '../../apollo-config';
import { ConnectionMode, useConnectionStatusContext } from '../../connection-status-provider';
import { assetsOrder } from '../../../ui-config/assets';

/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(new RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '');
};

export interface StaticPoolDataContextData {
  userId?: string;
  network: Network;
  networkConfig: NetworkConfig;
  rawReserves: ReserveData[];
  isUserHasDeposits: boolean;
  rawUserReserves?: UserReserveData[];
  userUnclaimedRewards: string;
  rewardsEmissionEndTimestamp: number;
  marketRefPriceInUsd: string;
  usdPriceEth: string;
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
    error: cachedDataError,
    loading: cachedDataLoading,
    data: cachedData,
  } = useCachedProtocolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    preferredConnectionMode === ConnectionMode.rpc || network !== apolloClientNetwork
  );

  const {
    error: rpcDataError,
    loading: rpcDataLoading,
    data: rpcData,
    refresh,
  } = useProtocolDataWithRpc(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    network,
    networkConfig.uiPoolDataProvider,
    !isRPCActive // TODO: think one more time
  );

  if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
    return loader;
  }

  const activeData = isRPCActive && rpcData ? rpcData : cachedData;

  if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    return errorPage;
  }

  const {
    rewardsData: {
      emissionEndTimestamp: rewardsEmissionEndTimestamp,
      userUnclaimedRewards: userUnclaimedRewardsRaw,
    },
    usdPriceEth,
    userId,
  } = activeData;

  const reserves = activeData.reserves
    .map((reserve) => ({
      ...reserve,
      symbol: unPrefixSymbol(reserve.symbol, currentMarketData.aTokenPrefix),
    }))
    .sort(
      ({ symbol: a }, { symbol: b }) =>
        assetsOrder.indexOf(a.toUpperCase()) - assetsOrder.indexOf(b.toUpperCase())
    );
  const userReserves = activeData.userReserves.map((userReserve) => ({
    ...userReserve,
    reserve: {
      ...userReserve.reserve,
      symbol: unPrefixSymbol(userReserve.reserve.symbol, currentMarketData.aTokenPrefix),
    },
  }));

  const isUserHasDeposits = userReserves.some(
    (userReserve) => userReserve.scaledATokenBalance !== '0'
  );

  if (!RPC_ONLY_MODE && isRPCActive && rpcData) {
    console.log('switched to RPC');
  }

  const userUnclaimedRewards = normalize(
    userUnclaimedRewardsRaw,
    networkConfig.rewardTokenDecimals
  );

  let WrappedBaseNetworkAssetAddress = '';
  const reservesWithFixedUnderlying = reserves.map((reserve) => {
    if (reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
      WrappedBaseNetworkAssetAddress = reserve.underlyingAsset;
      return {
        ...reserve,
        symbol: networkConfig.baseAsset,
        underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
      };
    }
    return reserve;
  });
  const userReservesWithFixedUnderlying = userReserves.map((userReserve) => {
    if (userReserve.reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
      return {
        ...userReserve,
        reserve: {
          ...userReserve.reserve,
          symbol: networkConfig.baseAsset,
          underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
        },
      };
    }
    return userReserve;
  });

  return (
    <StaticPoolDataContext.Provider
      value={{
        userId,
        network,
        networkConfig,
        refresh: isRPCActive ? refresh : async () => {},
        WrappedBaseNetworkAssetAddress,
        rawReserves: reservesWithFixedUnderlying,
        rawUserReserves: userReservesWithFixedUnderlying,
        isUserHasDeposits,
        marketRefPriceInUsd: networkConfig.usdMarket
          ? normalize(1, 10)
          : normalize(usdPriceEth, 18),
        usdPriceEth: normalize(usdPriceEth, 18),
        rewardsEmissionEndTimestamp,
        userUnclaimedRewards,
      }}
    >
      {children}
    </StaticPoolDataContext.Provider>
  );
}

export const useStaticPoolDataContext = () => useContext(StaticPoolDataContext);
