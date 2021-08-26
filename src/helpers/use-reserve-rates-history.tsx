import { useState } from 'react';
import { ReservesRatesHistoryMode } from '../libs/pool-data-provider/hooks/use-reserve-rates-history-with-subscription';

interface ReservesRatesHistoryHelperProps {
  poolReserveId: string;
}

export function useReservesRateHistoryHelper({ poolReserveId }: ReservesRatesHistoryHelperProps) {
  const [mode, setMode] = useState<ReservesRatesHistoryMode>('all-time');

  const poolId = `0x${poolReserveId.split('0x')[2]}`;

  return {
    mode,
    setMode,
    poolId,
  };
}
