import React, { ReactElement, ReactNode, useContext, useState } from 'react';
import { API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { NetworkConfig } from '../../../helpers/config/types';
import { assetsOrder } from '../../../ui-config/assets';
import { ChainId, WalletBalanceProvider } from '@aave/contract-helpers';
import { usePoolData } from '../hooks/use-pool-data';
import { ReserveDataHumanized, UserReserveDataHumanized } from '@aave/contract-helpers';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import useGetEns from '../../hooks/use-get-ens';
import { usePolling } from '../../hooks/use-polling';
import { nativeToUSD, normalize } from '@aave/math-utils';
import BigNumber from 'bignumber.js';

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
  marketReferenceCurrencyDecimals: number;
  marketReferencePriceInUsd: string;
  WrappedBaseNetworkAssetAddress: string;
  ensName?: string;
  ensAvatar?: string;
  userEmodeCategoryId: number;
  refresh?: () => Promise<void>;
  walletData: { [address: string]: { amount: string; amountUSD: string } };
  refetchWalletData: () => {};
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
  const { currentMarketData, chainId, networkConfig } = useProtocolDataContext();
  const { name, avatar } = useGetEns(currentAccount);
  const [walletData, setWalletsBalance] = useState<{
    [address: string]: { amount: string; amountUSD: string };
  }>({});

  const { loading, data, error, refresh } = usePoolData();

  const marketReferencePriceInUsd =
    data?.reserves?.baseCurrencyData?.marketReferenceCurrencyPriceInUsd ?? '0';

  const marketReferenceCurrencyDecimals =
    data?.reserves?.baseCurrencyData?.marketReferenceCurrencyDecimals ?? 18;

  async function fetchWalletData() {
    if (!currentAccount || !data?.reserves) return;
    const contract = new WalletBalanceProvider({
      walletBalanceProviderAddress: networkConfig.addresses.walletBalanceProvider,
      provider: getProvider(chainId),
    });
    const { 0: reserves, 1: balances } = await contract.getUserWalletBalancesForLendingPoolProvider(
      currentAccount,
      currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER
    );

    const aggregatedBalance = reserves.reduce((acc, reserve, i) => {
      const poolReserve = data.reserves?.reservesData.find((poolReserve) => {
        // TODO: not 100% sure this is correct
        if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
          return (
            poolReserve.underlyingAsset.toLowerCase() ===
            networkConfig.baseAssetWrappedAddress?.toLowerCase()
          );
        }
        return poolReserve.underlyingAsset.toLowerCase() === reserve.toLowerCase();
      });
      if (poolReserve) {
        acc[reserve.toLowerCase()] = {
          amount: normalize(balances[i].toString(), poolReserve.decimals),
          amountUSD: nativeToUSD({
            amount: new BigNumber(balances[i].toString()),
            currencyDecimals: poolReserve.decimals,
            priceInMarketReferenceCurrency: poolReserve.priceInMarketReferenceCurrency,
            marketReferenceCurrencyDecimals,
            marketReferencePriceInUsd,
          }),
        };
      }
      return acc;
    }, {} as { [address: string]: { amount: string; amountUSD: string } });
    setWalletsBalance(aggregatedBalance);
  }

  usePolling(fetchWalletData, 30000, !currentAccount, [
    currentAccount,
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    loading,
  ]);

  if (loading && !data) {
    return loader;
  }

  if (!data || error) {
    return errorPage;
  }

  const reserves: ReserveDataHumanized[] | undefined = data.reserves?.reservesData
    .map((reserve) => ({
      ...reserve,
    }))
    .sort(
      ({ symbol: a }, { symbol: b }) =>
        assetsOrder.indexOf(a.toUpperCase()) - assetsOrder.indexOf(b.toUpperCase())
    );

  const reservesWithFixedUnderlying: ReserveDataHumanized[] | undefined = reserves?.map(
    (reserve) => {
      if (reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
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
  data.userReserves?.forEach((userReserve) => {
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

  let userEmodeCategoryId = userReserves?.[0]?.userEmodeCategoryId ?? 0;
  //  userEmodeCategoryId = 1;
  return (
    <StaticPoolDataContext.Provider
      value={{
        userId: currentAccount,
        chainId,
        networkConfig,
        refresh,
        WrappedBaseNetworkAssetAddress: networkConfig.baseAssetWrappedAddress
          ? networkConfig.baseAssetWrappedAddress
          : '', // TO-DO: Replace all instances of this with the value from protocol-data-provider instead
        rawReserves: reservesWithFixedUnderlying ? reservesWithFixedUnderlying : [],
        rawUserReserves: userReservesWithFixedUnderlying,
        rawReservesWithBase: reserves ? reserves : [],
        rawUserReservesWithBase: userReserves,
        marketReferencePriceInUsd: marketReferencePriceInUsd,
        marketReferenceCurrencyDecimals,
        isUserHasDeposits,
        ensName: name,
        ensAvatar: avatar,
        walletData,
        refetchWalletData: fetchWalletData,
        userEmodeCategoryId,
      }}
    >
      {children}
    </StaticPoolDataContext.Provider>
  );
}

export const useStaticPoolDataContext = () => useContext(StaticPoolDataContext);
