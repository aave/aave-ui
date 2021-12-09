import { RawReserveData } from '@aave/math-utils';
import { ReserveIncentive } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';

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
  reserve: Pick<RawReserveData, 'symbol'>;
  index?: number;
};
