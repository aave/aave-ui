import { normalize } from '@aave/protocol-js';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
  useReserveRatesHistoryUpdateQueryQuery,
  ReserveRatesHistoryUpdateQueryQuery,
} from '../graphql';
import { RATES_HISTORY_ENDPOINT } from '../../../config';

/**
 * The newest reserve history is not necessarily close to "now".
 * If it isn't we can safely assume it's close to the last one we have, so we extend the history with one point to plot nicer charts.
 * @param currentItems
 */
const closeGap = (
  currentItems: ReserveRatesHistoryUpdateQueryQuery['reserveParamsHistoryItems']
) => {
  const currentTimestamp = dayjs().unix();
  const items = [...currentItems];
  if (items.length && currentTimestamp - items[items.length - 1].timestamp > 60 * 5) {
    items.push({
      ...items[items.length - 1],
      timestamp: currentTimestamp,
    });
  }
  return items;
};

export function useReserveRatesHistoryOld(reserveAddress: string) {
  const [items, setItems] = useState<
    ReserveRatesHistoryUpdateQueryQuery['reserveParamsHistoryItems']
  >([]);
  const { loading, data, error } = useReserveRatesHistoryUpdateQueryQuery({
    variables: { reserveAddress },
    pollInterval: 60 * 1000,
  });

  useEffect(() => {
    let items = [...(data?.reserveParamsHistoryItems || [])];
    setItems(
      closeGap(
        items
          .sort((a, b) => (a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0))
          .map((item) => ({
            ...item,
            stableBorrowRate: normalize(item.stableBorrowRate, 27),
            variableBorrowRate: normalize(item.variableBorrowRate, 27),
            liquidityRate: normalize(item.liquidityRate, 27),
          }))
      )
    );
  }, [data]);

  return {
    loading,
    error,
    data: items,
  };
}

type APIResponse = {
  liquidityRate_avg: number;
  variableBorrowRate_avg: number;
  stableBorrowRate_avg: number;
  utilizationRate_avg: number;
  x: { year: number; month: number; date: number; hours: number };
};

const fetchStats = async (address: string, endpointURL: string) => {
  const thirtyDaysAgo = dayjs().subtract(45, 'day').unix();
  try {
    const result = await fetch(
      `${endpointURL}?reserveId=${address}&from=${thirtyDaysAgo}&resolutionInHours=6`
    );
    const json = await result.json();
    return json;
  } catch (e) {
    return [];
  }
};

const BROKEN_ASSETS = [
  // ampl https://governance.aave.com/t/arc-fix-ui-bugs-in-reserve-overview-for-ampl/5885/5?u=sakulstra
  '0xd46ba6d942050d489dbd938a2c909a5d5039a1610xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
];

export function useReserveRatesHistory(reserveAddress: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    {
      timestamp: number;
      stableBorrowRate: number;
      variableBorrowRate: number;
      liquidityRate: number;
      utilizationRate: number;
    }[]
  >([]);

  useEffect(() => {
    if (RATES_HISTORY_ENDPOINT && !BROKEN_ASSETS.includes(reserveAddress)) {
      fetchStats(reserveAddress, RATES_HISTORY_ENDPOINT).then((data: APIResponse[]) => {
        setData(
          data.map((d) => ({
            timestamp: Math.floor(
              new Date(d.x.year, d.x.month, d.x.date, d.x.hours).getTime() / 1000
            ),
            liquidityRate: d.liquidityRate_avg,
            variableBorrowRate: d.variableBorrowRate_avg,
            utilizationRate: d.utilizationRate_avg,
            stableBorrowRate: d.stableBorrowRate_avg,
          }))
        );
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [reserveAddress]);

  return {
    loading,
    data,
  };
}
