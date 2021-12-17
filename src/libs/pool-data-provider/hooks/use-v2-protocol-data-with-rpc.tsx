import { useEffect, useState } from 'react';
import { ethers, providers } from 'ethers';
import BigNumber from 'bignumber.js';
import { ReserveData, UserReserveData } from '@aave/protocol-js';

import { IUiPoolDataProviderFactory } from '../contracts/IUiPoolDataProviderFactory';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { ChainId } from '@aave/contract-helpers';

// interval in which the rpc data is refreshed
const POOLING_INTERVAL = 30 * 1000;
// decreased interval in case there was a network error for faster recovery
const RECOVER_INTERVAL = 10 * 1000;

function formatObjectWithBNFields(obj: object): any {
  return Object.keys(obj).reduce((acc, key) => {
    if (isNaN(Number(key))) {
      // @ts-ignore
      let value = obj[key];
      if (value._isBigNumber) {
        value = value.toString();
      }
      acc[key] = value;
    }
    return acc;
  }, {} as any);
}

type PoolData = {
  reserves: ReserveData[];
  userReserves: UserReserveData[];
  usdPriceEth: string;
  userId?: string;
  rewardsData: {
    userUnclaimedRewards: string;
    emissionEndTimestamp: number;
  };
};

interface PoolReservesWithRPC {
  loading: boolean;
  data?: PoolData;
  error?: string;
  refresh: () => Promise<void>;
}

export function useProtocolDataWithRpc(
  poolAddress: string,
  rawCurrentAccount: string,
  chainId: ChainId,
  batchPoolDataProviderAddress: string,
  skip: boolean,
  injectedProvider?: providers.Web3Provider
): PoolReservesWithRPC {
  const currentAccount = rawCurrentAccount
    ? rawCurrentAccount.toLowerCase()
    : ethers.constants.AddressZero;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [poolData, setPoolData] = useState<PoolData | undefined>(undefined);

  const fetchData = async (
    poolAddress: string,
    userAddress: string,
    chainId: ChainId,
    poolDataProvider: string
  ) => {
    const provider = getProvider(chainId);
    const helperContract = IUiPoolDataProviderFactory.connect(poolDataProvider, provider);
    try {
      const result = await helperContract.getReservesData(poolAddress, userAddress);

      const { 0: rawReservesData, 1: userReserves, 2: usdPriceEth, 3: rawRewardsData } = result;

      const rewardsData = {
        userUnclaimedRewards: rawRewardsData.userUnclaimedRewards.toString(),
        emissionEndTimestamp: rawRewardsData.emissionEndTimestamp.toNumber(),
      };

      const formattedReservesData = rawReservesData.map((rawReserve) => {
        const formattedReserve = formatObjectWithBNFields(rawReserve);
        formattedReserve.symbol = rawReserve.symbol.toUpperCase();
        formattedReserve.id = (rawReserve.underlyingAsset + poolAddress).toLowerCase();
        formattedReserve.underlyingAsset = rawReserve.underlyingAsset.toLowerCase();
        formattedReserve.price = { priceInEth: rawReserve.priceInEth.toString() };
        return formattedReserve;
      });

      const formattedUserReserves = userReserves.map((rawUserReserve) => {
        const reserve = formattedReservesData.find(
          (res) => res.underlyingAsset === rawUserReserve.underlyingAsset.toLowerCase()
        );
        const formattedUserReserve = formatObjectWithBNFields(rawUserReserve);
        formattedUserReserve.id = (userAddress + reserve.id).toLowerCase();

        formattedUserReserve.reserve = {
          id: reserve.id,
          underlyingAsset: reserve.underlyingAsset,
          name: reserve.name,
          symbol: reserve.symbol,
          decimals: reserve.decimals,
          reserveLiquidationBonus: reserve.reserveLiquidationBonus,
          lastUpdateTimestamp: reserve.lastUpdateTimestamp,
        };
        return formattedUserReserve;
      });

      const formattedUsdPriceEth = new BigNumber(10)
        .exponentiatedBy(18 + 8)
        .div(usdPriceEth.toString())
        .toFixed(0, BigNumber.ROUND_DOWN);

      setPoolData({
        reserves: formattedReservesData,
        userReserves: userAddress !== ethers.constants.AddressZero ? formattedUserReserves : [],
        usdPriceEth: formattedUsdPriceEth,
        userId: userAddress !== ethers.constants.AddressZero ? userAddress : undefined,
        rewardsData, // userUnclaimedRewards: userUnclaimedRewards.toString(),
      });
      setError(undefined);
    } catch (e) {
      console.log('e', e); // TODO: should be thrown most probably
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // if data not needed now - clean the storage to don't use outdated next time
    if (skip) {
      setPoolData(undefined);
      setLoading(true);
      return;
    }

    setLoading(true);
    fetchData(poolAddress, currentAccount, chainId, batchPoolDataProviderAddress);

    const intervalID = setInterval(
      () => fetchData(poolAddress, currentAccount, chainId, batchPoolDataProviderAddress),
      error ? RECOVER_INTERVAL : POOLING_INTERVAL
    );
    return () => clearInterval(intervalID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, injectedProvider, poolAddress, skip, error]);

  return {
    loading,
    data: poolData,
    error,
    refresh: () => fetchData(poolAddress, currentAccount, chainId, batchPoolDataProviderAddress),
  };
}
