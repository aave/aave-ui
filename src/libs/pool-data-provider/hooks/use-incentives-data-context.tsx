import { Denominations } from '@aave/contract-helpers';
import {
  calculateTotalUserIncentives,
  calculateReserveIncentives,
  CalculateReserveIncentivesResponse,
  UserReserveData,
  RAY_DECIMALS,
} from '@aave/math-utils';
import { ComputedReserveData, IncentivesControllerInterface, TxBuilderV2 } from '@aave/protocol-js';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Preloader from '../../../components/basic/Preloader';
import ErrorPage from '../../../components/ErrorPage';
import { getProvider } from '../../../helpers/markets/markets-data';
import { useApolloConfigContext } from '../../apollo-config';
import {
  PoolIncentivesWithCache,
  useCachedIncentivesData,
} from '../../caching-server-data-provider/hooks/use-cached-incentives-data';
import { ConnectionMode, useConnectionStatusContext } from '../../connection-status-provider';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useDynamicPoolDataContext } from '../providers/dynamic-pool-data-provider';
import { useStaticPoolDataContext } from '../providers/static-pool-data-provider';
import { useCurrentTimestamp } from './use-current-timestamp';
import {
  IncentiveDataResponse,
  ReserveIncentiveData,
  useIncentivesData,
  UserReserveIncentiveData,
} from './use-incentives-data';

// User incentives response type
interface UserIncentiveDict {
  [incentiveControllerAddress: string]: UserIncentiveData;
}

export interface UserIncentiveData {
  rewardTokenAddress: string;
  rewardTokenDecimals: number;
  claimableRewards: BigNumber;
  assets: string[];
}

export interface IncentivesDataContextData {
  reserveIncentives: CalculateReserveIncentivesResponse[];
  userIncentives: UserIncentiveDict;
  txBuilder: IncentivesControllerInterface;
}

const IncentivesDataContext = React.createContext({} as IncentivesDataContextData);

function formatBNInput(input: string, decimals: number): string {
  let inputBN = new BigNumber(input);
  inputBN = inputBN.shiftedBy(decimals);
  return inputBN.toString();
}

// Calculate incentive token price from reserves data or priceFeed from UiIncentiveDataProvider
function calculateRewardTokenPrice(
  reserves: ComputedReserveData[],
  address: string,
  priceFeed: string,
  priceFeedDecimals: number
): string {
  // For stkAave incentives, use Aave reserve data
  if (address === '0x4da27a545c0c5b758a6ba100e3a049001de870f5') {
    address = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9';
  }
  // For WMATIC/WAVAX incentives, use MATIC/AVAX reserve data
  if (
    address === '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' ||
    address === '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
  ) {
    address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  }
  const rewardReserve = reserves.find((reserve) => reserve.underlyingAsset === address);
  if (rewardReserve) {
    return formatBNInput(rewardReserve.price.priceInEth, Number(rewardReserve.decimals));
  } else {
    return formatBNInput(priceFeed, priceFeedDecimals);
  }
}

export function IncentivesDataProvider({ children }: { children: ReactNode }) {
  const { userId } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const location = useLocation();
  const { network, networkConfig, currentMarketData } = useProtocolDataContext();
  const { network: apolloClientNetwork } = useApolloConfigContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const [reserveIncentives, setReserveIncentives] = useState<CalculateReserveIncentivesResponse[]>(
    []
  );
  const [userReserves, setUserReserves] = useState<UserReserveData[]>([]);

  const currentAccount = userId ? userId.toLowerCase() : ethers.constants.AddressZero;
  const ETH_DECIMALS: number = 18;
  const incentivesControllerAddress = location.pathname.split('/')[3]?.toLowerCase();
  const txBuilder: IncentivesControllerInterface = new TxBuilderV2(
    network,
    getProvider(network)
  ).getIncentives(incentivesControllerAddress);

  const {
    loading: cachedDataLoading,
    data: cachedData,
    error: cachedDataError,
  }: PoolIncentivesWithCache = useCachedIncentivesData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentAccount,
    networkConfig.chainlinkFeedRegistry,
    networkConfig.usdMarket ? Denominations.usd : Denominations.eth,
    preferredConnectionMode === ConnectionMode.rpc || network !== apolloClientNetwork
  );

  const {
    data: rpcData,
    loading: rpcDataLoading,
    error: rpcDataError,
  }: IncentiveDataResponse = useIncentivesData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    network,
    networkConfig.uiIncentiveDataProvider,
    !isRPCActive,
    currentAccount
  );

  const activeData = isRPCActive && rpcData ? rpcData : cachedData;

  const userIncentiveData: UserReserveIncentiveData[] =
    activeData && activeData.userIncentiveData ? activeData.userIncentiveData : [];
  const reserveIncentiveData: ReserveIncentiveData[] =
    activeData && activeData.reserveIncentiveData ? activeData.reserveIncentiveData : [];

  // Calculate and update userReserves
  useEffect(() => {
    if (user && reserves) {
      const userReserves: UserReserveData[] = [];
      user.reservesData.forEach((userReserve) => {
        // Account for underlyingReserveAddress of network base assets not matching wrapped incentives
        let reserveUnderlyingAddress = userReserve.reserve.underlyingAsset.toLowerCase();
        // Find the underlying reserve data for each userReserve
        const reserve = reserves.find(
          (reserve) => reserve.underlyingAsset.toLowerCase() === reserveUnderlyingAddress
        );
        // Convert to match incentives data which uses wrapped addresses for base assets (ETH, MATIC, AVAX)
        if (reserveUnderlyingAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          if (userReserve.reserve.symbol === 'MATIC') {
            reserveUnderlyingAddress = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';
          } else if (userReserve.reserve.symbol === 'ETH') {
            reserveUnderlyingAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
          } else if (userReserve.reserve.symbol === 'AVAX') {
            reserveUnderlyingAddress = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7';
          }
        }
        if (reserve) {
          // Construct UserReserveData object from reserve and userReserve fields
          userReserves.push({
            underlyingAsset: reserveUnderlyingAddress,
            totalLiquidity: formatBNInput(reserve.totalLiquidity, Number(reserve.decimals)),
            liquidityIndex: formatBNInput(reserve.liquidityIndex, RAY_DECIMALS),
            totalScaledVariableDebt: formatBNInput(
              reserve.totalScaledVariableDebt,
              Number(reserve.decimals)
            ),
            totalPrincipalStableDebt: formatBNInput(
              reserve.totalPrincipalStableDebt,
              Number(reserve.decimals)
            ),
            scaledATokenBalance: formatBNInput(
              userReserve.scaledATokenBalance,
              Number(reserve.decimals)
            ),
            scaledVariableDebt: userReserve.scaledVariableDebt,
            principalStableDebt: formatBNInput(
              userReserve.principalStableDebt,
              Number(reserve.decimals)
            ),
          });
        }
      });
      setUserReserves(userReserves);
    }
  }, [user, reserves]);

  // Calculate and update reserveIncentives
  useEffect(() => {
    if (reserves && reserveIncentiveData) {
      const allReserveIncentives: CalculateReserveIncentivesResponse[] = [];
      reserves.forEach((reserve) => {
        // Account for underlyingReserveAddress of network base assets not matching wrapped incentives
        let reserveUnderlyingAddress = reserve.underlyingAsset.toLowerCase();
        let isBaseAsset = false;
        if (reserveUnderlyingAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          isBaseAsset = true;
          if (reserve.symbol === 'MATIC') {
            reserveUnderlyingAddress = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';
          } else if (reserve.symbol === 'ETH') {
            reserveUnderlyingAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
          } else if (reserve.symbol === 'AVAX') {
            reserveUnderlyingAddress = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7';
          }
        }
        // Find the corresponding incentive data for each reserve
        const incentiveData = reserveIncentiveData.find(
          (incentive) => incentive.underlyingAsset.toLowerCase() === reserveUnderlyingAddress
        );
        if (incentiveData) {
          const calculatedReserveIncentives: CalculateReserveIncentivesResponse =
            calculateReserveIncentives({
              reserveIncentiveData: incentiveData,
              totalLiquidity: formatBNInput(reserve.totalLiquidity, Number(reserve.decimals)),
              liquidityIndex: formatBNInput(reserve.liquidityIndex, RAY_DECIMALS),
              totalScaledVariableDebt: formatBNInput(
                reserve.totalScaledVariableDebt,
                Number(reserve.decimals)
              ),
              totalPrincipalStableDebt: formatBNInput(
                reserve.totalPrincipalStableDebt,
                Number(reserve.decimals)
              ),
              priceInMarketReferenceCurrency: formatBNInput(reserve.price.priceInEth, ETH_DECIMALS), // Will be replaced with marketReferencePrice/Decimals
              decimals: Number(reserve.decimals),

              aRewardTokenPriceInMarketReferenceCurrency: calculateRewardTokenPrice(
                reserves,
                incentiveData.aIncentiveData.rewardTokenAddress.toLowerCase(),
                incentiveData.aIncentiveData.priceFeed,
                incentiveData.aIncentiveData.priceFeedDecimals
              ),

              vRewardTokenPriceInMarketReferenceCurrency: calculateRewardTokenPrice(
                reserves,
                incentiveData.vIncentiveData.rewardTokenAddress.toLowerCase(),
                incentiveData.vIncentiveData.priceFeed,
                incentiveData.vIncentiveData.priceFeedDecimals
              ),
              sRewardTokenPriceInMarketReferenceCurrency: calculateRewardTokenPrice(
                reserves,
                incentiveData.sIncentiveData.rewardTokenAddress.toLowerCase(),
                incentiveData.sIncentiveData.priceFeed,
                incentiveData.sIncentiveData.priceFeedDecimals
              ),
            });
          calculatedReserveIncentives.underlyingAsset = isBaseAsset
            ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            : calculatedReserveIncentives.underlyingAsset; // ETH, MATIC, and AVAX all use reserve address of '0xee...'
          allReserveIncentives.push(calculatedReserveIncentives);
        }
      });
      setReserveIncentives(allReserveIncentives);
    }
  }, [reserves, reserveIncentiveData]);

  if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
    return <Preloader withBackground={true} />;
  }

  if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    return <ErrorPage />;
  }
  // Compute the total claimable rewards for a user, returned as dictionary indexed by incentivesController
  let userIncentives = calculateTotalUserIncentives({
    reserveIncentives: reserveIncentiveData,
    userReserveIncentives: userIncentiveData,
    userReserves,
    currentTimestamp,
  });
  userIncentives = Object.fromEntries(
    Object.entries(userIncentives).filter(
      (incentive) =>
        incentive[1].rewardTokenAddress !== '0x0000000000000000000000000000000000000000'
    )
  );

  return (
    <IncentivesDataContext.Provider
      value={{
        txBuilder,
        reserveIncentives,
        userIncentives: userIncentives ? userIncentives : {},
      }}
    >
      {children}
    </IncentivesDataContext.Provider>
  );
}

export const useIncentivesDataContext = () => useContext(IncentivesDataContext);
