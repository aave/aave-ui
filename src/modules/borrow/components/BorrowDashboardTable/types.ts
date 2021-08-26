import { ReserveData } from '@aave/protocol-js';

export type BorrowTableItem = {
  onSwitchToggle: () => void;
  isActive: boolean;
  isFrozen: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  uiColor: string;
  avg30DaysVariableRate?: string;
  borrowRate: string;
  vIncentivesAPY: string;
  sIncentivesAPY: string;
  borrowRateMode: string;
  currentBorrows: string;
  currentBorrowsUSD: string;
  repayLink: string;
  borrowLink: string;
  reserve: Pick<ReserveData, 'symbol'>;
  index?: number;
};
