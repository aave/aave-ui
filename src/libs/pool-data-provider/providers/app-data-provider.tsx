import {
  API_ETH_MOCK_ADDRESS,
  IncentivesController,
  IncentivesControllerInterface,
  IncentivesControllerV2,
  IncentivesControllerV2Interface,
  ReserveDataHumanized,
  WalletBalanceProvider,
} from '@aave/contract-helpers';
import {
  formatReservesAndIncentives,
  formatUserSummaryAndIncentives,
  FormatUserSummaryAndIncentivesResponse,
  nativeToUSD,
  normalize,
  UserReserveData,
} from '@aave/math-utils';
import React, { useContext, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { usePolling } from '../../hooks/use-polling';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { useIncentiveData } from '../hooks/use-incentives-data';
import { usePoolData } from '../hooks/use-pool-data';
import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import useGetEns from '../../hooks/use-get-ens';

/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '');
};

const useWalletBalances = (skip?: boolean) => {
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData, chainId } = useProtocolDataContext();
  const [walletBalances, setWalletBalances] = useState<{
    [address: Lowercase<string>]: string;
  }>({});

  const fetchWalletData = async () => {
    if (!currentAccount) return;
    const contract = new WalletBalanceProvider({
      walletBalanceProviderAddress: currentMarketData.addresses.WALLET_BALANCE_PROVIDER,
      provider: getProvider(chainId),
    });
    const { 0: tokenAddresses, 1: balances } =
      await contract.getUserWalletBalancesForLendingPoolProvider(
        currentAccount,
        currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER
      );
    const cleanBalances = tokenAddresses.reduce((acc, reserve, i) => {
      acc[reserve.toLowerCase()] = balances[i].toString();
      return acc;
    }, {} as { [address: Lowercase<string>]: string });
    setWalletBalances(cleanBalances);
  };

  usePolling(fetchWalletData, 30000, !currentAccount, [
    currentAccount,
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
  ]);

  // reset balances on disconnect
  useEffect(() => {
    if (!currentAccount) setWalletBalances({});
  }, [currentAccount]);

  return { walletBalances, refetch: fetchWalletData };
};

export type ComputedReserveData = ReturnType<typeof formatReservesAndIncentives>[0] &
  ReserveDataHumanized;

export interface AppDataContextType {
  reserves: ComputedReserveData[];
  refreshPoolData?: () => Promise<void>;
  walletBalances: { [address: string]: { amount: string; amountUSD: string } };
  hasEmptyWallet: boolean;
  refetchWalletData: () => Promise<void>;
  isUserHasDeposits: boolean;
  user?: FormatUserSummaryAndIncentivesResponse & { earnedAPY: number; debtAPY: number };
  userId: string;
  refreshIncentives?: () => Promise<void>;
  loading: boolean;
  incentivesTxBuilder: IncentivesControllerInterface;
  incentivesTxBuilderV2: IncentivesControllerV2Interface;
  marketReferencePriceInUsd: string;
  marketReferenceCurrencyDecimals: number;
  userEmodeCategoryId: number;
  ensName?: string;
  ensAvatar?: string;
  userReserves: UserReserveData[];
}

const AppDataContext = React.createContext<AppDataContextType>({} as AppDataContextType);

/**
 * This is the only provider you'll ever need.
 * It fetches reserves /incentives & walletbalances & keeps them updated.
 */
export const AppDataProvider: React.FC = ({ children }) => {
  const currentTimestamp = useCurrentTimestamp(1);
  const { currentAccount } = useUserWalletDataContext();
  const { chainId, networkConfig } = useProtocolDataContext();
  const incentivesTxBuilder: IncentivesControllerInterface = new IncentivesController(
    getProvider(chainId)
  );
  const incentivesTxBuilderV2: IncentivesControllerV2Interface = new IncentivesControllerV2(
    getProvider(chainId)
  );
  const { name: ensName, avatar: ensAvatar } = useGetEns(currentAccount);
  const {
    loading: loadingReserves,
    data: { reserves: rawReservesData, userReserves: rawUserReserves, userEmodeCategoryId = 0 },
    // error: loadingReservesError,
    refresh: refreshPoolData,
  } = usePoolData();
  const reserves: ReserveDataHumanized[] = rawReservesData ? rawReservesData.reservesData : [];
  const baseCurrencyData =
    rawReservesData && rawReservesData.baseCurrencyData
      ? rawReservesData.baseCurrencyData
      : {
          marketReferenceCurrencyDecimals: 0,
          marketReferenceCurrencyPriceInUsd: '0',
          networkBaseTokenPriceInUsd: '0',
          networkBaseTokenPriceDecimals: 0,
        };
  const {
    data,
    //error,
    loading: _loading,
    refresh: refreshIncentives,
  } = useIncentiveData();
  let hasEmptyWallet = true;
  const { walletBalances, refetch: refetchWalletData } = useWalletBalances();
  const loading =
    (loadingReserves && !reserves.length) || (_loading && !data?.reserveIncentiveData);

  const aggregatedBalance = Object.keys(walletBalances).reduce((acc, reserve) => {
    const poolReserve = reserves.find((poolReserve) => {
      if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
        return (
          poolReserve.underlyingAsset.toLowerCase() ===
          networkConfig.baseAssetWrappedAddress?.toLowerCase()
        );
      }
      return poolReserve.underlyingAsset.toLowerCase() === reserve.toLowerCase();
    });
    if (walletBalances[reserve] !== '0') hasEmptyWallet = false;
    if (poolReserve) {
      acc[reserve.toLowerCase()] = {
        amount: normalize(walletBalances[reserve], poolReserve.decimals),
        amountUSD: nativeToUSD({
          amount: new BigNumber(walletBalances[reserve]),
          currencyDecimals: poolReserve.decimals,
          priceInMarketReferenceCurrency: poolReserve.priceInMarketReferenceCurrency,
          marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
          marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        }),
      };
    }
    return acc;
  }, {} as { [address: string]: { amount: string; amountUSD: string } });

  const formattedPoolReserves = formatReservesAndIncentives({
    reserves,
    currentTimestamp,
    marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: data?.reserveIncentiveData || [],
  });

  const userReserves: UserReserveData[] = [];
  if (rawUserReserves && reserves.length) {
    rawUserReserves.forEach((rawUserReserve) => {
      const reserve = reserves.find(
        (r) => r.underlyingAsset.toLowerCase() === rawUserReserve.underlyingAsset.toLowerCase()
      );
      if (reserve) {
        userReserves.push({
          ...rawUserReserve,
          reserve,
        });
      }
    });
  }

  const user: FormatUserSummaryAndIncentivesResponse = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves,
    userEmodeCategoryId,
    reserveIncentives: data?.reserveIncentiveData || [],
    userIncentives: data?.userIncentiveData || [],
  });

  const proportions = user.userReservesData.reduce(
    (acc, value) => {
      const reserve = formattedPoolReserves.find(
        (r) => r.underlyingAsset === value.reserve.underlyingAsset
      );

      if (reserve) {
        if (value.underlyingBalanceUSD !== '0') {
          acc.positiveProportion = acc.positiveProportion.plus(
            new BigNumber(reserve.supplyAPY).multipliedBy(value.underlyingBalanceUSD)
          );
          if (reserve.aIncentivesData) {
            reserve.aIncentivesData.forEach((incentive) => {
              acc.positiveProportion = acc.positiveProportion.plus(
                new BigNumber(incentive.incentiveAPR).multipliedBy(value.underlyingBalanceUSD)
              );
            });
          }
        }
        if (value.variableBorrowsUSD !== '0') {
          acc.negativeProportion = acc.negativeProportion.plus(
            new BigNumber(reserve.variableBorrowAPY).multipliedBy(value.variableBorrowsUSD)
          );
          if (reserve.vIncentivesData) {
            reserve.vIncentivesData.forEach((incentive) => {
              acc.positiveProportion = acc.positiveProportion.plus(
                new BigNumber(incentive.incentiveAPR).multipliedBy(value.variableBorrowsUSD)
              );
            });
          }
        }
        if (value.stableBorrowsUSD !== '0') {
          acc.negativeProportion = acc.negativeProportion.plus(
            new BigNumber(value.stableBorrowAPY).multipliedBy(value.stableBorrowsUSD)
          );
          if (reserve.sIncentivesData) {
            reserve.sIncentivesData.forEach((incentive) => {
              acc.positiveProportion = acc.positiveProportion.plus(
                new BigNumber(incentive.incentiveAPR).multipliedBy(value.stableBorrowsUSD)
              );
            });
          }
        }
      } else {
        throw new Error('no possible to calculate net apy');
      }

      return acc;
    },
    {
      positiveProportion: new BigNumber(0),
      negativeProportion: new BigNumber(0),
    }
  );

  const isUserHasDeposits = user.userReservesData.some(
    (userReserve) => userReserve.scaledATokenBalance !== '0'
  );

  return (
    <AppDataContext.Provider
      value={{
        walletBalances: aggregatedBalance,
        hasEmptyWallet,
        reserves: formattedPoolReserves.map((r) => ({
          ...r,
          underlyingAsset:
            r.underlyingAsset === networkConfig.baseAssetWrappedAddress
              ? API_ETH_MOCK_ADDRESS.toLowerCase()
              : r.underlyingAsset,
          symbol:
            r.underlyingAsset === networkConfig.baseAssetWrappedAddress
              ? networkConfig.baseAsset
              : r.symbol,
        })),
        user: {
          ...user,
          userReservesData: user.userReservesData.map((r) => ({
            ...r,
            reserve: {
              ...r.reserve,
              underlyingAsset:
                r.reserve.underlyingAsset === networkConfig.baseAssetWrappedAddress
                  ? API_ETH_MOCK_ADDRESS.toLowerCase()
                  : r.reserve.underlyingAsset,
              symbol:
                r.reserve.underlyingAsset === networkConfig.baseAssetWrappedAddress
                  ? networkConfig.baseAsset
                  : r.reserve.symbol,
            },
          })),
          earnedAPY: proportions.positiveProportion
            .dividedBy(user.netWorthUSD)
            .multipliedBy(100)
            .toNumber(),
          debtAPY: proportions.negativeProportion
            .dividedBy(user.netWorthUSD)
            .multipliedBy(100)
            .toNumber(),
        },
        userReserves,
        userId: currentAccount,
        isUserHasDeposits,
        refetchWalletData,
        refreshPoolData,
        refreshIncentives,
        loading,
        marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
        incentivesTxBuilderV2,
        incentivesTxBuilder,
        userEmodeCategoryId,
        ensName,
        ensAvatar,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => useContext(AppDataContext);
