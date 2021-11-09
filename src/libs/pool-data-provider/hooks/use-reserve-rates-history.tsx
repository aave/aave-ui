import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { RATES_HISTORY_ENDPOINT } from '../../../helpers/config/misc-config';

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

export type FormattedReserveHistoryItem = {
  timestamp: number;
  liquidityRate: number;
  utilizationRate: number;
  stableBorrowRate: number;
  variableBorrowRate: number;
};

const BROKEN_ASSETS = [
  // ampl https://governance.aave.com/t/arc-fix-ui-bugs-in-reserve-overview-for-ampl/5885/5?u=sakulstra
  '0xd46ba6d942050d489dbd938a2c909a5d5039a1610xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
];

export function useReserveRatesHistory(reserveAddress: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FormattedReserveHistoryItem[]>([]);

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
