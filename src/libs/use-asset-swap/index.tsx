import { useEffect, useState } from 'react';
import { normalize, valueToBigNumber, API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import { useDebouncedCallback } from 'use-debounce';

import { useStaticPoolDataContext } from '../pool-data-provider';
import { IBaseUniswapAdapterFactory } from './IBaseUniswapAdapterFactory';
import { useProtocolDataContext } from '../protocol-data-provider';

const USD_DECIMALS = 8;

interface AssetParams {
  address: string;
  decimals: number;
  amount?: string;
}

interface AssetSwapParams {
  reverse?: boolean;
  initialFromAsset?: AssetParams;
  initialToAsset?: AssetParams;
  poolingInterval?: number;
}

export function useAssetSwap(params?: AssetSwapParams) {
  const poolingInterval = params?.poolingInterval || 10 * 1000;
  const { jsonRpcProvider, networkConfig, chainId } = useProtocolDataContext();
  const { WrappedBaseNetworkAssetAddress } = useStaticPoolDataContext();

  const [loading, setLoading] = useState(false);

  const [fromAsset, setFromAsset] = useState(params?.initialFromAsset?.address || '');
  const [toAsset, setToAsset] = useState(params?.initialToAsset?.address || '');
  const [fromAssetDecimals, setFromAssetDecimals] = useState(
    params?.initialFromAsset?.decimals || 18
  );
  const [toAssetDecimals, setToAssetDecimals] = useState(params?.initialToAsset?.decimals || 18);
  const [fromAmount, setFromAmount] = useState(params?.initialFromAsset?.amount || '');
  const [toAmount, setToAmount] = useState(params?.initialToAsset?.amount || '');
  const [path, setPath] = useState<string[]>([]);
  const [fromAmountInUSD, setFromAmountInUSD] = useState('');
  const [toAmountInUSD, setToAmountInUSD] = useState('');

  // if true than we're calculating input based on output
  const [isReverse, setIsReverse] = useState(!!params?.initialToAsset?.amount);

  const getSwapData = async (
    _fromAsset: string,
    _toAsset: string,
    _fromAmount: string,
    _toAmount: string,
    _fromAssetDecimals: number,
    _toAssetDecimals: number,
    _isReverse: boolean
  ): Promise<void> => {
    if (
      _fromAsset &&
      _toAsset &&
      !((!_fromAmount || _fromAmount === '0') && !_isReverse) &&
      !((!_toAmount || _toAmount === '0') && _isReverse)
    ) {
      if (!networkConfig.baseUniswapAdapter) {
        throw new Error(`baseUniswapAdapter not configured on ${chainId}`);
      }

      setLoading(true);

      // we have some mess with ETH/WETH addresses, and this is the smallest modification to make it work
      // but maybe at some point better to change the general flow
      const fixedFromAsset =
        _fromAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
          ? WrappedBaseNetworkAssetAddress
          : _fromAsset;
      const fixedToAsset =
        _toAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
          ? WrappedBaseNetworkAssetAddress
          : _toAsset;

      try {
        const swapAdapter = IBaseUniswapAdapterFactory.connect(
          networkConfig.baseUniswapAdapter,
          jsonRpcProvider
        );

        if (!_isReverse) {
          const {
            0: calcToAmount,
            2: calcFromUSDAmount,
            3: calcToUSDAmount,
            4: path,
          } = await swapAdapter.getAmountsOut(
            valueToBigNumber(normalize(_fromAmount, _fromAssetDecimals * -1)).toFixed(0),
            fixedFromAsset,
            fixedToAsset
          );

          setToAmount(normalize(calcToAmount.toString(), _toAssetDecimals));
          setFromAmountInUSD(normalize(calcFromUSDAmount.toString(), USD_DECIMALS));
          setToAmountInUSD(normalize(calcToUSDAmount.toString(), USD_DECIMALS));
          setPath(path);
        } else {
          const {
            0: calcFromAmount,
            2: calcFromUSDAmount,
            3: calcToUSDAmount,
            4: path,
          } = await swapAdapter.getAmountsIn(
            valueToBigNumber(normalize(_toAmount, _toAssetDecimals * -1)).toFixed(0),
            fixedFromAsset,
            fixedToAsset
          );
          setFromAmount(normalize(calcFromAmount.toString(), _fromAssetDecimals));
          setFromAmountInUSD(normalize(calcFromUSDAmount.toString(), USD_DECIMALS));
          setToAmountInUSD(normalize(calcToUSDAmount.toString(), USD_DECIMALS));
          setPath(path);
        }
      } catch (e) {
        console.log('swap data loading failed with the reason', e);
      }
      setLoading(false);
    }
  };
  const debGetSwapData = useDebouncedCallback(getSwapData, 400);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        debGetSwapData(
          fromAsset,
          toAsset,
          fromAmount,
          toAmount,
          fromAssetDecimals,
          toAssetDecimals,
          isReverse
        ),
      poolingInterval
    );
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fromAsset,
    toAsset,
    fromAmount,
    toAmount,
    isReverse,
    fromAssetDecimals,
    toAssetDecimals,
    poolingInterval,
    chainId,
  ]);

  const onSetFromAsset = (newFromAsset: string, decimals: number) => {
    if (isReverse) {
      debGetSwapData(
        newFromAsset,
        toAsset,
        fromAmount,
        toAmount,
        decimals,
        toAssetDecimals,
        isReverse
      );
    } else {
      setFromAmount('');
      setToAmount('');
    }
    setFromAsset(newFromAsset);
    setFromAssetDecimals(decimals);
  };
  const onSetToAsset = (newToAsset: string, decimals: number) => {
    if (!isReverse) {
      debGetSwapData(
        fromAsset,
        newToAsset,
        fromAmount,
        toAmount,
        fromAssetDecimals,
        decimals,
        isReverse
      );
    } else {
      setToAmount('');
      setFromAmount('');
    }
    setToAsset(newToAsset);
    setToAssetDecimals(decimals);
  };
  const onSetFromAmount = (newAmount: string) => {
    setIsReverse(false);
    setToAmount('');
    setFromAmount(newAmount);
    debGetSwapData(fromAsset, toAsset, newAmount, '0', fromAssetDecimals, toAssetDecimals, false);
  };

  const onSetToAmount = (newAmount: string) => {
    setIsReverse(true);
    setFromAmount('');
    setToAmount(newAmount);
    debGetSwapData(fromAsset, toAsset, '0', newAmount, fromAssetDecimals, toAssetDecimals, true);
  };
  return {
    loading,
    fromAsset,
    toAsset,
    fromAmount,
    toAmount,
    fromAmountInUSD,
    toAmountInUSD,
    isReverse,
    onSetFromAsset,
    onSetToAsset,
    onSetFromAmount,
    onSetToAmount,
    path,
  };
}
