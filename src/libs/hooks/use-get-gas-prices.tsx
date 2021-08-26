import { useState, useEffect } from 'react';
import { useStateLoading, LOADING_STATE } from './use-state-loading';
import { usePooling } from './use-pooling';

interface ResponseGasPrice {
  [key: string]: string | undefined;
}

const TIME_POOLING = 100000;

const useGetGasPrices = (skip?: boolean, interval?: number) => {
  const { loading, setLoading } = useStateLoading();
  const [error, setError] = useState(false);
  const [data, setData] = useState<ResponseGasPrice | null>();

  const apiRequest = async () => {
    try {
      setLoading(LOADING_STATE.LOADING);
      const data = await fetch('https://www.gasnow.org/api/v3/gas/price');
      const dataJson = await data.json();
      setData(dataJson.data as ResponseGasPrice);
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
