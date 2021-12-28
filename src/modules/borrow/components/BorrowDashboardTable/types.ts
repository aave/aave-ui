import { ComputedReserveData } from '../../../../libs/pool-data-provider';
import { ReserveIncentiveResponse } from '../../../../libs/pool-data-provider/hooks/use-incentives-data';

export type BorrowTableItem = {
  userId?: string;
  onSwitchToggle: () => void;
  isActive: boolean;
  isFrozen: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  borrowRate: string;
  vIncentives: ReserveIncentiveResponse[];
  sIncentives: ReserveIncentiveResponse[];
  borrowRateMode: string;
  currentBorrows: string;
  currentBorrowsUSD: string;
  repayLink: string;
  borrowLink: string;
  reserve: Pick<ComputedReserveData, 'symbol' | 'underlyingAsset'>;
  index?: number;
};
