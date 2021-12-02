import { ReserveDataHumanized, WalletBalanceProvider } from '@aave/contract-helpers';
import {
  calculateAllUserIncentives,
  formatReserves,
  FormatReservesUSDRequest,
  formatUserSummary,
  FormatUserSummaryResponse,
  nativeToUSD,
  normalize,
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

const humanizedFormatReserves = (
  reserves: Array<ReserveDataHumanized & { underlyingAsset: string }>,
  params: FormatReservesUSDRequest
) => formatReserves<ReserveDataHumanized>(reserves, params);
export type ComputedReservesData = ReturnType<typeof humanizedFormatReserves>[0];

const useWalletBalances = (skip: boolean) => {
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData, chainId, networkConfig } = useProtocolDataContext();
  const [walletBalances, setWalletBalances] = useState<{
    [address: Lowercase<string>]: string;
  }>({});

  const fetchWalletData = async () => {
    if (!currentAccount) return;
    const contract = new WalletBalanceProvider({
      walletBalanceProviderAddress: networkConfig.addresses.walletBalanceProvider,
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
  reserves: ComputedReservesData[];
  refreshPoolData?: () => Promise<void>;
  walletBalances: { [address: string]: { amount: string; amountUSD: string } };
  refetchWalletData: () => Promise<void>;
  isUserHasDeposits: boolean;
  user?: FormatUserSummaryResponse;
}

const AppDataContext = React.createContext<AppDataContextType>({
  reserves: [],
  refreshPoolData: async () => {},
  walletBalances: {},
  isUserHasDeposits: false,
  refetchWalletData: async () => {},
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
    reserves,
    userReserves,
    userEmodeCategoryId = 0,
    baseCurrencyData,
    error: loadingReservesError,
    refresh: refreshPoolData,
  } = usePoolData();
  const skipIncentiveLoading = !!reserves?.length;
  const { data, error, loading } = useIncentiveData(skipIncentiveLoading);
  const { walletBalances, refetch: refetchWalletData } = useWalletBalances(skipIncentiveLoading);

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
          marketRefCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
          marketRefPriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        }),
      };
    }
    return acc;
  }, {} as { [address: string]: { amount: string; amountUSD: string } });

  const formattedPoolReserves = humanizedFormatReserves(reserves, {
    currentTimestamp,
    marketRefCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    marketRefPriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: data?.reserveIncentiveData,
  });

  // TODO: add a method which allows formatting user reserves passing in formatted reserves
  const user = formatUserSummary({
    currentTimestamp,
    marketRefPriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketRefCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    rawUserReserves: userReserves.map((reserve) => ({
      ...reserve,
      reserve: reserves.find(
        (r) => r.underlyingAsset === reserve.underlyingAsset
      ) as ReserveDataHumanized,
    })),
    userEmodeCategoryId,
  });

  // const userIncentives = calculateAllUserIncentives({
  //   reserveIncentives: data?.reserveIncentiveData,
  //   userReserveIncentives: data?.userIncentiveData,
  //   userReserves: user.userReservesData,
  //   currentTimestamp,
  // });

  return (
    <AppDataContext.Provider
      value={{
        walletBalances: aggregatedBalance, // formerly walletData
        isUserHasDeposits: false /** formattedUser.totalLiquidity !==0 */,
        refetchWalletData,
        reserves: formattedPoolReserves,
        refreshPoolData, // formerly "refresh"
        user,
        // userIncentives
        // userReserves - why is this even needed? shouldn't user be neough
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => useContext(AppDataContext);
