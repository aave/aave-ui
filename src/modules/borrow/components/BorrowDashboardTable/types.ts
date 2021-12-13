import { ReserveIncentive } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { ComputedReserveData } from '../../../../libs/pool-data-provider/providers/dynamic-pool-data-provider';

export type BorrowTableItem = {
  onSwitchToggle: () => void;
  isActive: boolean;
  isFrozen: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  uiColor: string;
  borrowRate: string;
  vIncentives: ReserveIncentive[];
  sIncentives: ReserveIncentive[];
  borrowRateMode: string;
  currentBorrows: string;
  currentBorrowsUSD: string;
  repayLink: string;
  borrowLink: string;
  reserve: Pick<ComputedReserveData, 'symbol'>;
  index?: number;
};
