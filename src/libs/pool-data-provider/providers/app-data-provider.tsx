import { WalletBalanceProvider } from '@aave/contract-helpers';
import {
  formatReservesAndIncentives,
  formatUserSummaryAndIncentives,
  FormatUserSummaryResponse,
  nativeToUSD,
  normalize,
  ReserveDataComputed,
} from '@aave/math-utils';
import { API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import React, { useContext, useState } from 'react';
import BigNumber from 'bignumber.js';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { usePolling } from '../../hooks/use-polling';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useUserWalletDataContext } from '../../web3-data-provider';
import { useIncentiveData } from '../hooks/use-incentives-data';
import { usePoolData } from '../hooks/use-pool-data';
import { useCurrentTimestamp } from '../hooks/use-current-timestamp';

const useWalletBalances = (skip: boolean) => {
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

  return { walletBalances, refetch: fetchWalletData };
};

export interface AppDataContextType {
  reserves: ReturnType<typeof formatReservesAndIncentives>;
  refreshPoolData?: () => Promise<void>;
  walletBalances: { [address: string]: { amount: string; amountUSD: string } };
  refetchWalletData: () => Promise<void>;
  isUserHasDeposits: boolean;
  user?: FormatUserSummaryResponse;
  refreshIncentives: () => Promise<void>;
  loading: boolean;
}

const AppDataContext = React.createContext<AppDataContextType>({
  reserves: [],
  refreshPoolData: async () => {},
  walletBalances: {},
  isUserHasDeposits: false,
  refetchWalletData: async () => {},
  refreshIncentives: async () => {},
  loading: true,
});

/**
 * This is the only provider you'll ever need.
 * It fetches reserves /incentives & walletbalances & keeps them updated.
 * @param param0
 * @returns
 */
export const AppDataProvider: React.FC = ({ children }) => {
  const currentTimestamp = useCurrentTimestamp(1);
  const { networkConfig } = useProtocolDataContext();
  const {
    loading: loadingReserves,
    data: { reserves: rawReservesData, userReserves: rawUserReserves, userEmodeCategoryId = 0 },
    // error: loadingReservesError,
    refresh: refreshPoolData,
  } = usePoolData();
  const reserves = rawReservesData ? rawReservesData.reservesData : [];
  const userReserves = rawUserReserves ? rawUserReserves : [];
  const baseCurrencyData =
    rawReservesData && rawReservesData.baseCurrencyData
      ? rawReservesData.baseCurrencyData
      : {
          marketReferenceCurrencyDecimals: 0,
          marketReferenceCurrencyPriceInUsd: '0',
          networkBaseTokenPriceInUsd: '0',
          networkBaseTokenPriceDecimals: 0,
        };
  const skipIncentiveLoading = !!reserves.length;
  const {
    data,
    //error,
    loading: _loading,
    refresh: refreshIncentives,
  } = useIncentiveData(skipIncentiveLoading);
  const { walletBalances, refetch: refetchWalletData } = useWalletBalances(skipIncentiveLoading);
  const loading = (loadingReserves && !reserves.length) || (_loading && !data);

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

  const userReservesWithBase = formattedPoolReserves.length
    ? userReserves.map((reserve) => ({
        ...reserve,
        reserve: formattedPoolReserves.find(
          (r) => r.underlyingAsset.toLowerCase() === reserve.underlyingAsset.toLowerCase()
        ) as ReserveDataComputed,
      }))
    : [];

  const user = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves: userReservesWithBase,
    userEmodeCategoryId,
    reserveIncentives: data?.reserveIncentiveData || [],
    userIncentives: data?.userIncentiveData || [],
  });

  /*
  const proportions = user.userReservesData.reduce(
    (acc, value) => {
      // TODO: remove once user formatting accepts formatted reserve as input
      const reserve = formattedPoolReserves.find(
        (r) => r.underlyingAsset === value.reserve.underlyingAsset
      );

      if (reserve) {
        acc.positiveProportion = acc.positiveProportion.plus(
          new BigNumber(reserve.supplyAPR).multipliedBy(value.underlyingBalanceUSD)
        );
        acc.positiveSampleSize = acc.positiveSampleSize.plus(value.underlyingBalanceUSD);

        acc.negativeProportion = acc.negativeProportion.plus(
          new BigNumber(reserve.variableBorrowAPY).multipliedBy(value.variableBorrowsUSD)
        );
        acc.negativeSampleSize = acc.negativeSampleSize.plus(value.variableBorrowsUSD);

        acc.negativeProportion = acc.negativeProportion.plus(
          new BigNumber(value.stableBorrowAPY).multipliedBy(value.stableBorrowsUSD)
        );
        acc.negativeSampleSize = acc.negativeSampleSize.plus(value.stableBorrowsUSD);

        if (reserve.aIncentivesData) {
          reserve.aIncentivesData.forEach((incentive) => {
            acc.positiveSampleSize = acc.positiveSampleSize.plus(value.underlyingBalanceUSD);
            acc.positiveProportion = acc.positiveProportion.plus(
              new BigNumber(incentive.incentiveAPR).multipliedBy(value.underlyingBalanceUSD) // TODO: is this the correct value?
            );
          });
        }
        if (reserve.vIncentivesData) {
          reserve.vIncentivesData.forEach((incentive) => {
            acc.positiveSampleSize = acc.positiveSampleSize.plus(value.variableBorrowsUSD);
            acc.positiveProportion = acc.positiveProportion.plus(
              new BigNumber(incentive.incentiveAPR).multipliedBy(value.variableBorrowsUSD)
            );
          });
        }
        if (reserve.sIncentivesData) {
          reserve.sIncentivesData.forEach((incentive) => {
            acc.positiveSampleSize = acc.positiveSampleSize.plus(value.stableBorrowsUSD);
            acc.positiveProportion = acc.positiveProportion.plus(
              new BigNumber(incentive.incentiveAPR).multipliedBy(value.stableBorrowsUSD)
            );
          });
        }
      } else {
        throw new Error('no possible to calculate net apy');
      }

      return acc;
    },
    {
      positiveProportion: new BigNumber(0),
      positiveSampleSize: new BigNumber(0),
      negativeProportion: new BigNumber(0),
      negativeSampleSize: new BigNumber(0),
    }
  );

  // console.log(proportions.positiveProportion.dividedBy(proportions.positiveSampleSize).toString());
  const netBalance = new BigNumber(user.totalLiquidityUSD).minus(user.totalBorrowsUSD).toString();
 */
  return (
    <AppDataContext.Provider
      value={{
        walletBalances: aggregatedBalance, // formerly walletData
        reserves: formattedPoolReserves,
        user,
        isUserHasDeposits: false /** formattedUser.totalLiquidity !==0 */,
        refetchWalletData,
        refreshPoolData, // formerly "refresh"
        refreshIncentives,
        loading,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => useContext(AppDataContext);
