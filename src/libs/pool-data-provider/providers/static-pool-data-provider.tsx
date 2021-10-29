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
import { usePoolData } from '../hooks/use-pool-data';
import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
  UserReserveDataHumanized,
} from '@aave/contract-helpers';

/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(new RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '');
};

export interface UserReserveDataExtended extends UserReserveDataHumanized {
  reserve: ReserveDataHumanized;
  variableBorrowIndex: string;
}

export interface StaticPoolDataContextData {
  userId?: string;
  network: Network;
  networkConfig: NetworkConfig;
  rawReserves: ReserveData[]; // TO-DO: REMOVE
  isUserHasDeposits: boolean;
  rawUserReserves?: UserReserveData[]; // TO-DO: REMOVE
  rawReservesWithBase: ReserveData[]; // TO-DO: REMOVE
  rawUserReservesWithBase?: UserReserveData[]; // TO-DO: REMOVE
  rawReservesNew: ReserveDataHumanized[];
  rawUserReservesNew?: UserReserveDataExtended[];
  rawReservesWithBaseNew: ReserveDataHumanized[];
  rawUserReservesWithBaseNew?: UserReserveDataExtended[];
  baseCurrencyData: PoolBaseCurrencyHumanized | undefined;
  userUnclaimedRewards: string; // TO-DO: REMOVE
  rewardsEmissionEndTimestamp: number; // TO-DO: REMOVE
  marketRefPriceInUsd: string; // TO-DO: REMOVE
  usdPriceEth: string; // TO-DO: REMOVE
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

  // OLD RPC DATA HOOK
  const {
    error: rpcDataErrorOld,
    loading: rpcDataLoadingOld,
    data: rpcDataOld,
    refresh: refreshOld,
  } = useProtocolDataWithRpc(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    network,
    '0xf49670C78794b6a604f3B49393d8eE951713339F', // old mainnet
    //'0x04110Dc40B04b99B94840E53B2a33bE45E45A8Ed', // old kovan
    //'0x3b4108475a8092967225564C05a1E74e9F7A45D6', // old polygon
    //'0x589390E0AaEB95be573A87Ca828989d8e3e77C04', // old mumbao
    //'0x41b6b18DfF735dbaEda5F5FB5393F57E420D5CB8', // old avalanche
    //'0x7d9d970CaE574912221d25107A6728f0d17Cb901', // old fuji
    false
  );

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
  } = usePoolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    network,
    networkConfig.addresses.uiPoolDataProvider,
    false, // For now just default to RPC to test
    currentAccount
  );

  const activeDataNew = rpcData;
  // Disable these for now while only rpc is being used
  //if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
  //  return loader;
  // }
  // if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
  //   return errorPage;
  // }
  //const activeData = isRPCActive && rpcData ? rpcData : cachedData;

  const baseCurrencyData = activeDataNew.reserves?.baseCurrencyData;

  const reservesNew: ReserveDataHumanized[] | undefined = activeDataNew.reserves?.reservesData
    .map((reserve) => ({
      ...reserve,
      symbol: unPrefixSymbol(reserve.symbol, currentMarketData.aTokenPrefix),
    }))
    .sort(
      ({ symbol: a }, { symbol: b }) =>
        assetsOrder.indexOf(a.toUpperCase()) - assetsOrder.indexOf(b.toUpperCase())
    );

  let WrappedBaseNetworkAssetAddress = '';
  const reservesWithFixedUnderlyingNew: ReserveDataHumanized[] | undefined = reservesNew?.map(
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

  const userReservesNew: UserReserveDataExtended[] = [];
  const userReservesWithFixedUnderlyingNew: UserReserveDataExtended[] = [];
  activeDataNew.userReserves?.forEach((userReserve) => {
    const reserve = reservesNew?.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === userReserve.underlyingAsset.toLowerCase()
    );
    const reserveFixed = reservesWithFixedUnderlyingNew?.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === userReserve.underlyingAsset.toLowerCase()
    );
    if (reserve) {
      const newUserReserve: UserReserveDataExtended = {
        ...userReserve,
        variableBorrowIndex: '',
        reserve,
      };
      userReservesNew.push(newUserReserve);
    }
    if (reserveFixed) {
      const newUserReserveFixed: UserReserveDataExtended = {
        ...userReserve,
        variableBorrowIndex: '',
        reserve: reserveFixed,
      };
      userReservesWithFixedUnderlyingNew.push(newUserReserveFixed);
    }
  });

  // FROM HERE BELOW IS THE LEGACY STATIC PROVIDER CODE
  const activeDataOld = rpcDataOld
    ? rpcDataOld
    : {
        rewardsData: {
          emissionEndTimestamp: 0,
          userUnclaimedRewards: 0,
        },
        usdPriceEth: 0,
        userId: '',
        reserves: [],
        userReserves: [],
      };

  const {
    rewardsData: {
      emissionEndTimestamp: rewardsEmissionEndTimestamp,
      userUnclaimedRewards: userUnclaimedRewardsRaw,
    },
    usdPriceEth,
    userId,
  } = activeDataOld;

  const reserves = activeDataOld.reserves
    .map((reserve) => ({
      ...reserve,
      symbol: unPrefixSymbol(reserve.symbol, currentMarketData.aTokenPrefix),
    }))
    .sort(
      ({ symbol: a }, { symbol: b }) =>
        assetsOrder.indexOf(a.toUpperCase()) - assetsOrder.indexOf(b.toUpperCase())
    );
  const userReserves = activeDataOld.userReserves.map((userReserve) => ({
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
        rawReservesWithBase: reserves,
        rawUserReservesWithBase: userReserves,
        rawReservesNew: reservesNew ? reservesNew : [],
        rawUserReservesNew: userReservesWithFixedUnderlyingNew,
        rawReservesWithBaseNew: reservesNew ? reservesNew : [],
        rawUserReservesWithBaseNew: userReservesNew,
        baseCurrencyData,
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
