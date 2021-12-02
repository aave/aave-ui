import {
  Denominations,
  IncentivesController,
  IncentivesControllerInterface,
  ReservesIncentiveDataHumanized,
  UserReservesIncentivesDataHumanized,
} from '@aave/contract-helpers';
import {
  calculateAllUserIncentives,
  calculateAllReserveIncentives,
  ReserveIncentiveDict,
  UserIncentiveDict,
  WEI_DECIMALS,
  ReserveCalculationData,
  UserReserveCalculationData,
} from '@aave/math-utils';
import { API_ETH_MOCK_ADDRESS, calculateSupplies } from '@aave/protocol-js';
import React, { ReactNode, useContext } from 'react';
import Preloader from '../../../components/basic/Preloader';
import ErrorPage from '../../../components/ErrorPage';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useStaticPoolDataContext } from '../providers/static-pool-data-provider';
import { useCurrentTimestamp } from './use-current-timestamp';
import { useIncentiveData } from './use-incentives-data';

export interface IncentivesContext {
  reserveIncentives: ReserveIncentiveDict;
  userIncentives: UserIncentiveDict;
  incentivesTxBuilder: IncentivesControllerInterface;
  refresh?: () => void;
}

const IncentivesDataContext = React.createContext({} as IncentivesContext);

export function IncentivesDataProvider({ children }: { children: ReactNode }) {
  const { rawReservesWithBase, rawUserReservesWithBase } = useStaticPoolDataContext();
  const { chainId, networkConfig } = useProtocolDataContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const incentivesTxBuilder: IncentivesControllerInterface = new IncentivesController(
    getProvider(chainId)
  );

  const { data, error, loading, refresh } = useIncentiveData();

  const userIncentiveData: UserReservesIncentivesDataHumanized[] =
    data && data.userIncentiveData ? data.userIncentiveData : [];
  const reserveIncentiveData: ReservesIncentiveDataHumanized[] =
    data && data.reserveIncentiveData ? data.reserveIncentiveData : [];

  // Create array of formatted user and reserve data used for user incentive calculations
  let computedUserReserves: UserReserveCalculationData[] = [];
  if (rawUserReservesWithBase) {
    rawUserReservesWithBase.forEach((userReserve) => {
      const reserve = rawReservesWithBase.find(
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
  // Create array of formatted reserve data used for reserve incentive calculations
  const computedReserves: ReserveCalculationData[] = rawReservesWithBase.map((reserve) => {
    const reserveSupplyData = {
      totalScaledVariableDebt: reserve.totalScaledVariableDebt,
      variableBorrowIndex: reserve.variableBorrowIndex,
      variableBorrowRate: reserve.variableBorrowRate,
      totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
      averageStableRate: reserve.averageStableRate,
      availableLiquidity: reserve.availableLiquidity,
      stableDebtLastUpdateTimestamp: reserve.stableDebtLastUpdateTimestamp,
      lastUpdateTimestamp: reserve.lastUpdateTimestamp,
    };
    const supplies = calculateSupplies(reserveSupplyData, currentTimestamp);
    return {
      underlyingAsset: reserve.underlyingAsset,
      symbol: reserve.symbol,
      totalLiquidity: supplies.totalLiquidity.toString(),
      totalVariableDebt: supplies.totalVariableDebt.toString(),
      totalStableDebt: supplies.totalStableDebt.toString(),
      priceInMarketReferenceCurrency: reserve.priceInMarketReferenceCurrency,
      marketReferenceCurrencyDecimals: WEI_DECIMALS,
      decimals: reserve.decimals,
    };
  });

  if (loading) {
    return <Preloader withBackground={true} />;
  }
  if (error) {
    return <ErrorPage />;
  }

  // Compute the incentive APYs for all reserve assets, returned as dictionary indexed by underlyingAsset
  let reserveIncentives = calculateAllReserveIncentives({
    reserveIncentives: reserveIncentiveData,
    reserves: computedReserves,
  });

  // Add entry with mock address (0xeeeee..) for base asset incentives
  if (
    networkConfig.baseAssetWrappedAddress &&
    reserveIncentives[networkConfig.baseAssetWrappedAddress.toLowerCase()]
  ) {
    reserveIncentives[API_ETH_MOCK_ADDRESS.toLowerCase()] =
      reserveIncentives[networkConfig.baseAssetWrappedAddress.toLowerCase()];
  }
  // Compute the total claimable rewards for a user, returned as dictionary indexed by incentivesController
  let userIncentives = {}; // Temporary
  //  let userIncentives = calculateAllUserIncentives({
  //    reserveIncentives: reserveIncentiveData,
  //    userReserveIncentives: userIncentiveData,
  //    userReserves: computedUserReserves,
  //    currentTimestamp,
  //  });

  return (
    <IncentivesDataContext.Provider
      value={{
        incentivesTxBuilder,
        reserveIncentives,
        userIncentives,
        refresh,
      }}
    >
      {children}
    </IncentivesDataContext.Provider>
  );
}

export const useIncentivesDataContext = () => useContext(IncentivesDataContext);
