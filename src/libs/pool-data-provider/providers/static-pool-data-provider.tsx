import React, { ReactElement, ReactNode, useContext } from 'react';
import { API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { NetworkConfig } from '../../../helpers/config/types';
import { useCachedProtocolData } from '../../caching-server-data-provider/hooks/use-cached-protocol-data';
import { useApolloConfigContext } from '../../apollo-config';
import { ConnectionMode, useConnectionStatusContext } from '../../connection-status-provider';
import { assetsOrder } from '../../../ui-config/assets';
import { ChainId } from '@aave/contract-helpers';
import { usePoolData } from '../hooks/use-pool-data';
import { ReserveDataHumanized, UserReserveDataHumanized } from '@aave/contract-helpers';
import { normalize } from '@aave/math-utils';

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
}

export interface StaticPoolDataContextData {
  userId?: string;
  chainId: ChainId;
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
  const { chainId: apolloClientChainId } = useApolloConfigContext();
  const { currentMarketData, chainId, networkConfig } = useProtocolDataContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const RPC_ONLY_MODE = networkConfig.rpcOnly;

  const {
    error: cachedDataError,
    loading: cachedDataLoading,
    data: cachedData,
  } = useCachedProtocolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    preferredConnectionMode === ConnectionMode.rpc || chainId !== apolloClientChainId
  );

  const {
    error: rpcDataError,
    loading: rpcDataLoading,
    data: rpcData,
    refresh,
  } = usePoolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    chainId,
    networkConfig.addresses.uiPoolDataProvider,
    !isRPCActive,
    currentAccount
  );

  const activeData = isRPCActive && rpcData ? rpcData : cachedData;
  if ((isRPCActive && rpcDataLoading && !rpcData) || (!isRPCActive && cachedDataLoading)) {
    return loader;
  }

  if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    return errorPage;
  }

  const reserves: ReserveDataHumanized[] | undefined = activeData.reserves?.reservesData.map(
    (reserve) => ({
      ...reserve,
    })
  );

  const reservesWithFixedUnderlying: ReserveDataHumanized[] | undefined = reserves
    ?.map((reserve) => {
      if (reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
        return {
          ...reserve,
          symbol: networkConfig.baseAsset,
          underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
        };
      }
      if (
        reserve.underlyingAsset.toLowerCase() ===
        '0x50379f632ca68d36e50cfbc8f78fe16bd1499d1e'.toLowerCase()
      ) {
        reserve.symbol = 'GUNIDAIUSDC';
      }
      if (
        reserve.underlyingAsset.toLowerCase() ===
        '0xd2eec91055f07fe24c9ccb25828ecfefd4be0c41'.toLowerCase()
      ) {
        reserve.symbol = 'GUNIUSDCUSDT';
      }
      return reserve;
    })
    .sort(
      ({ symbol: a }, { symbol: b }) =>
        assetsOrder.indexOf(a.toUpperCase()) - assetsOrder.indexOf(b.toUpperCase())
    );

  const userReserves: UserReserveDataExtended[] = [];
  const userReservesWithFixedUnderlying: UserReserveDataExtended[] = [];
  activeData.userReserves?.forEach((userReserve) => {
    const reserve = reserves?.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === userReserve.underlyingAsset.toLowerCase()
    );
    if (reserve) {
      const reserveWithBase: UserReserveDataExtended = {
        ...userReserve,
        reserve,
      };
      userReserves.push(reserveWithBase);
      if (reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
        const userReserveFixed: UserReserveDataExtended = {
          ...userReserve,
          underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          reserve: {
            ...reserve,
            symbol: networkConfig.baseAsset,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          },
        };
        userReservesWithFixedUnderlying.push(userReserveFixed);
      } else {
        userReservesWithFixedUnderlying.push(reserveWithBase);
      }
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
        chainId,
        networkConfig,
        refresh: isRPCActive ? refresh : async () => {},
        WrappedBaseNetworkAssetAddress: networkConfig.baseAssetWrappedAddress
          ? networkConfig.baseAssetWrappedAddress
          : '', // TO-DO: Replace all instances of this with the value from protocol-data-provider instead
        rawReserves: reservesWithFixedUnderlying ? reservesWithFixedUnderlying : [],
        rawUserReserves: userReservesWithFixedUnderlying,
        rawReservesWithBase: reserves ? reserves : [],
        rawUserReservesWithBase: userReserves,
        marketRefPriceInUsd: normalize(marketRefPriceInUsd, 8),
        marketRefCurrencyDecimals,
        isUserHasDeposits,
      }}
    >
      {children}
    </StaticPoolDataContext.Provider>
  );
}

export const useStaticPoolDataContext = () => useContext(StaticPoolDataContext);
