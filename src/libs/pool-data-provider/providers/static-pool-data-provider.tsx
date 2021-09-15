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
  isTestnet: boolean;
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

  const A_TOKENS_WITH_BROKEN_INCENTIVES = [
    '0x6c5024cd4f8a59110119c56f8933403a539555eb', //aSUSD
    '0x101cc05f4a51c0319f570d5e146a8c625198e636', //aTUSD
    '0x272f97b7a56a387ae942350bbc7df5700f8a4576', //aBAL
    '0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0', //aLINK
    '0xc713e5e149d5d0715dcd1c156a020976e7e56b88', //aMKR
    '0x2e8f4bdbe3d47d7d7de490437aea9915d930f1a3', //aPAX
    '0xc9bc48c72154ef3e5425641a3c747242112a46af', //aRAI
    '0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1', //aUNI
    '0xf256cc7847e919fac9b808cc216cac87ccf2f47a', //aXSUSHI
    '0x5165d24277cd063f5ac44efd447b27025e888f37', //aYFI
  ];

  const reserves = activeData.reserves
    .map((reserve) => {
      const reserveWithFix = {
        ...reserve,
        symbol: unPrefixSymbol(reserve.symbol, currentMarketData.aTokenPrefix),
      };
      if (A_TOKENS_WITH_BROKEN_INCENTIVES.includes(reserveWithFix.aTokenAddress)) {
        reserveWithFix.aEmissionPerSecond = '0';
        reserveWithFix.vEmissionPerSecond = '0';
        reserveWithFix.sEmissionPerSecond = '0';
      }
      return reserveWithFix;
    })
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
        isTestnet: network !== Network.mainnet && network !== Network.polygon,
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
