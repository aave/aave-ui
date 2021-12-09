import { ReserveDataHumanized, WalletBalanceProvider } from '@aave/contract-helpers';
import {
  calculateAllUserIncentives,
  formatReserves,
  FormatReservesUSDRequest,
  formatUserSummary,
  FormatUserSummaryResponse,
  nativeToUSD,
  normalize,
  UserIncentiveDict,
  UserReserveCalculationData,
} from '@aave/math-utils';
import { API_ETH_MOCK_ADDRESS, calculateSupplies } from '@aave/protocol-js';
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
  userIncentives: UserIncentiveDict;
  refreshIncentives: () => Promise<void>;
  loading: boolean;
}

const AppDataContext = React.createContext<AppDataContextType>({
  reserves: [],
  refreshPoolData: async () => {},
  walletBalances: {},
  isUserHasDeposits: false,
  refetchWalletData: async () => {},
  userIncentives: {},
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
    reserves,
    userReserves,
    userEmodeCategoryId = 0,
    baseCurrencyData,
    error: loadingReservesError,
    refresh: refreshPoolData,
  } = usePoolData();
  const skipIncentiveLoading = !!reserves?.length;
  const {
    data,
    error,
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

  const formattedPoolReserves = humanizedFormatReserves(reserves, {
    currentTimestamp,
    marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: data?.reserveIncentiveData,
  });

  const userReservesWithBase = userReserves.map((reserve) => ({
    ...reserve,
    reserve: reserves.find(
      (r) => r.underlyingAsset === reserve.underlyingAsset
    ) as ReserveDataHumanized,
  }));

  // TODO: add a method which allows formatting user reserves passing in formatted reserves
  const user = formatUserSummary({
    currentTimestamp,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    rawUserReserves: userReservesWithBase,
    userEmodeCategoryId,
  });

  // TODO: this is shit and should be removed
  let computedUserReserves: UserReserveCalculationData[] = [];
  if (userReservesWithBase) {
    userReservesWithBase.forEach((userReserve) => {
      const reserve = reserves.find(
        (reserve) =>
          reserve.underlyingAsset.toLowerCase() ===
          userReserve.reserve.underlyingAsset.toLowerCase()
      );
      if (reserve) {
        const supplies = calculateSupplies(reserve, currentTimestamp);
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

  const userIncentives = calculateAllUserIncentives({
    reserveIncentives: data?.reserveIncentiveData || [],
    userReserveIncentives: data?.userIncentiveData || [],
    userReserves: computedUserReserves,
    currentTimestamp,
  });

  return (
    <AppDataContext.Provider
      value={{
        walletBalances: aggregatedBalance, // formerly walletData
        isUserHasDeposits: false /** formattedUser.totalLiquidity !==0 */,
        refetchWalletData,
        reserves: formattedPoolReserves,
        refreshPoolData, // formerly "refresh"
        user,
        userIncentives,
        refreshIncentives,
        loading,
        // userReserves - why is this even needed? shouldn't user be neough
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => useContext(AppDataContext);
