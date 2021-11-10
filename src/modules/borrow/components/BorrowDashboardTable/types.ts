import { RawReserveData } from '@aave/math-utils';

export type BorrowTableItem = {
  onSwitchToggle: () => void;
  isActive: boolean;
  isFrozen: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  uiColor: string;
  avg30DaysVariableRate?: string;
  borrowRate: string;
  vincentivesAPR: string;
  sincentivesAPR: string;
  borrowRateMode: string;
  currentBorrows: string;
  currentBorrowsUSD: string;
  repayLink: string;
  borrowLink: string;
  reserve: Pick<RawReserveData, 'symbol'>;
  index?: number;
};
