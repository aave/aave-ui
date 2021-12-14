import { ComputedReserveData } from '../../../../libs/pool-data-provider';
import { ReserveIncentiveResponse } from '../../../../libs/pool-data-provider/hooks/use-incentives-data';

export type BorrowTableItem = {
  onSwitchToggle: () => void;
  isActive: boolean;
  isFrozen: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  uiColor: string;
  borrowRate: string;
  vIncentives: ReserveIncentiveResponse[];
  sIncentives: ReserveIncentiveResponse[];
  borrowRateMode: string;
  currentBorrows: string;
  currentBorrowsUSD: string;
  repayLink: string;
  borrowLink: string;
  reserve: Pick<ComputedReserveData, 'symbol'>;
  index?: number;
};
