import { ParaSwap, APIError, Transaction } from 'paraswap';
import { ContractMethod, SwapSide } from 'paraswap/build/constants';
import { OptimalRate } from 'paraswap-core';
import { useCallback, useEffect, useState } from 'react';
import {
  ComputedReserveData,
  normalize,
  valueToBigNumber,
  API_ETH_MOCK_ADDRESS,
  ChainId,
  Network,
  BigNumberZD,
} from '@aave/protocol-js';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from '../pool-data-provider';
import { mapChainIdToName } from '../web3-data-provider';

const mainnetParaswap = new ParaSwap(ChainId.mainnet);
const polygonParaswap = new ParaSwap(ChainId.polygon);
const avalancheParaswap = new ParaSwap(ChainId.avalanche);

const getParaswap = (chainId: ChainId) => {
  if ([Network.fork, Network.mainnet].includes(mapChainIdToName(chainId) as Network))
    return mainnetParaswap;
  if ([Network.polygon, Network.polygon_fork].includes(mapChainIdToName(chainId) as Network))
    return polygonParaswap;
  if ([Network.avalanche, Network.avalanche_fork].includes(mapChainIdToName(chainId) as Network))
    return avalancheParaswap;
  throw new Error('chain not supported');
};

type UseSwapProps = {
  max?: boolean;
  swapIn: { address: string; amount: string };
  swapOut: { address: string; amount: string };
  variant: 'exactIn' | 'exactOut';
  userId?: string;
  chainId: ChainId;
};

const getReserve = (address: string, reserves: ComputedReserveData[], WETHAddress: string) => {
  const reserve = reserves.find(
    (reserve) => reserve.underlyingAsset.toLowerCase() === address.toLowerCase()
  ) as ComputedReserveData;
  return {
    address: address.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase() ? WETHAddress : address,
    decimals: Number.parseInt(reserve?.decimals as any),
    priceInEth: reserve?.price.priceInEth,
    liquidityRate: reserve?.liquidityRate,
  };
};

const MESSAGE_MAP = {
  ESTIMATED_LOSS_GREATER_THAN_MAX_IMPACT: 'Price impact to high',
};

// TODO: resolve error codes to human understandable error messages https://github.com/paraswap/paraswap-sdk/issues/22
export const useSwap = ({ swapIn, swapOut, variant, userId, max, chainId }: UseSwapProps) => {
  const paraSwap = getParaswap(chainId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [priceRoute, setPriceRoute] = useState<OptimalRate | null>(null);
  const { WrappedBaseNetworkAssetAddress } = useStaticPoolDataContext();
  const { reserves } = useDynamicPoolDataContext();

  const reserveIn = getReserve(swapIn.address, reserves, WrappedBaseNetworkAssetAddress);
  const reserveOut = getReserve(swapOut.address, reserves, WrappedBaseNetworkAssetAddress);

  const fetchRoute = useCallback(async () => {
    if (!swapIn.address || !swapOut.address || !userId) return;
    if (variant === 'exactIn' && (!swapIn.amount || swapIn.amount === '0')) return;
    if (variant === 'exactOut' && (!swapOut.amount || swapOut.amount === '0')) return;
    setLoading(true);
    let _amount = valueToBigNumber(variant === 'exactIn' ? swapIn.amount : swapOut.amount);
    if (max) {
      _amount = _amount.plus(_amount.multipliedBy(reserveIn.liquidityRate).dividedBy(360 * 24));
    }
    const amount = valueToBigNumber(
      normalize(_amount, (variant === 'exactIn' ? reserveIn.decimals : reserveOut.decimals) * -1)
    );
    try {
      const response = await paraSwap.getRate(
        reserveIn.address,
        reserveOut.address,
        amount.toFixed(0),
        userId,
        variant === 'exactIn' ? SwapSide.SELL : SwapSide.BUY,
        {
          partner: 'aave',
          ...(max
            ? {
                excludeDEXS: 'Balancer',
                excludeContractMethods: [ContractMethod.simpleSwap],
              }
            : {}),
        },
        reserveIn.decimals,
        reserveOut.decimals
      );
      if ((response as APIError).message) throw new Error((response as APIError).message);
      setError('');
      setPriceRoute(response as OptimalRate);
    } catch (e) {
      console.log(e);
      const message = (MESSAGE_MAP as { [key: string]: string })[e.message];
      setError(message || 'There was an issue fetching data from Paraswap');
    }
    setLoading(false);
  }, [JSON.stringify(swapIn), JSON.stringify(swapOut), variant, max]);

  // updates the route on input change
  useEffect(() => {
    setPriceRoute(null);
    const timeout = setTimeout(fetchRoute, 400);
    return () => clearTimeout(timeout);
  }, [fetchRoute]);

  // updates the route based on on interval
  useEffect(() => {
    const interval = setInterval(fetchRoute, error ? 3000 : 15000);
    return () => clearInterval(interval);
  }, [fetchRoute, error]);

  if (priceRoute) {
    return {
      // full object needed for building the tx
      priceRoute: priceRoute,
      outputAmount: normalize(priceRoute.destAmount ?? '0', reserveOut.decimals),
      outputAmountUSD: priceRoute.destUSD ?? '0',
      inputAmount: normalize(priceRoute.srcAmount ?? '0', reserveIn.decimals),
      inputAmountUSD: priceRoute.srcUSD ?? '0',
      loading: loading,
      error: error,
      reserveIn,
      reserveOut,
    };
  }
  return {
    // full object needed for building the tx
    priceRoute: null,
    outputAmount: '0',
    outputAmountUSD: '0',
    inputAmount: '0',
    inputAmountUSD: '0',
    loading: loading,
    error: error,
    reserveIn,
    reserveOut,
  };
};

type GetSwapCallDataProps = {
  srcToken: string;
  srcDecimals: number;
  destToken: string;
  destDecimals: number;
  user: string;
  route: OptimalRate;
  max?: boolean;
  chainId: ChainId;
};

export const getSwapCallData = async ({
  srcToken,
  srcDecimals,
  destToken,
  destDecimals,
  user,
  route,
  chainId,
}: GetSwapCallDataProps) => {
  const paraSwap = getParaswap(chainId);
  const destAmountWithSlippage = new BigNumberZD(route.destAmount)
    .multipliedBy(99)
    .dividedBy(100)
    .toFixed(0);
  const params = await paraSwap.buildTx(
    srcToken,
    destToken,
    route.srcAmount,
    destAmountWithSlippage,
    route,
    user,
    'aave',
    undefined,
    undefined,
    undefined,
    { ignoreChecks: true },
    srcDecimals,
    destDecimals
  );
  if ((params as APIError).message) throw new Error('Error getting txParams');
  return { swapCallData: (params as Transaction).data, augustus: (params as Transaction).to };
};
