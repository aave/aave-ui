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
  avg30DaysVariableRate?: number;
  stableBorrowRateEnabled?: boolean;
  userId?: string;
  isFreezed?: boolean;
  vincentivesAPR: string;
  sincentivesAPR: string;
  aincentivesAPR: string;
};
