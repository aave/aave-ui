import { useState, useEffect } from 'react';
import { useStateLoading, LOADING_STATE } from './use-state-loading';
import { usePooling } from './use-pooling';

type GasInfo = {
  legacyGasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};

export type ResponseGasPrice = {
  safeLow: GasInfo;
  average: GasInfo;
  fast: GasInfo;
  fastest: GasInfo;
};

const TIME_POOLING = 100000;

const useGetGasPrices = (skip?: boolean, interval?: number) => {
  const { loading, setLoading } = useStateLoading();
  const [error, setError] = useState(false);
  const [data, setData] = useState<ResponseGasPrice | null>();

  const apiRequest = async () => {
    try {
      setLoading(LOADING_STATE.LOADING);
      const data = await fetch('https://apiv5.paraswap.io/prices/gas/1?eip1559=true');
      const dataJson = await data.json();
      setData(dataJson as ResponseGasPrice);
      setError(false);
    } catch (err) {
      console.error(' Error on get the gas price ', err);
      setError(true);
    }
    setLoading(LOADING_STATE.FINISHED);
  };

  useEffect(() => {
    if (!skip) apiRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  usePooling(apiRequest, interval ? interval : TIME_POOLING, !!skip, [skip]);

  return { loading, data, error };
};

export default useGetGasPrices;
