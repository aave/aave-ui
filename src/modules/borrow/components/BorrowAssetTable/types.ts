import { ReserveIncentive } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';

export type BorrowTableItem = {
  id: string;
  symbol: string;
  underlyingAsset: string;
  currentBorrows: number | string;
  currentBorrowsInUSD: number | string;
  stableBorrowRate: number | string;
  variableBorrowRate: number | string;
  availableBorrows: number | string;
  availableBorrowsInUSD: number | string;
  stableBorrowRateEnabled?: boolean;
  userId?: string;
  isFreezed?: boolean;
  vIncentives: ReserveIncentive[];
  sIncentives: ReserveIncentive[];
  aIncentives: ReserveIncentive[];
  borrowCap: string;
  borrowCapUSD: string;
  isIsolated: boolean;
  borrowableInIsolation: boolean;
};
