// import { useReservesRateHistoryQuery } from 'libs/pool-data-provider/graphql'; TODO: need query for new reserve history

export type ReservesRatesHistoryMode = 'week' | 'month' | 'all-time' | undefined;
export interface ReservesRatesHistorySetMode {
  setMode: (value: ReservesRatesHistoryMode) => void;
  mode: ReservesRatesHistoryMode;
}
