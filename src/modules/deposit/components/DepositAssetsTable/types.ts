export type DepositTableItem = {
  id: string;
  underlyingAsset: string;
  symbol: string;
  walletBalance: string;
  walletBalanceInUSD: number | string;
  underlyingBalance: number | string;
  underlyingBalanceInUSD: number | string;
  liquidityRate: number | string;
  avg30DaysLiquidityRate?: number;
  aincentivesAPR: string;
  userId?: string;
  borrowingEnabled: boolean;
  isFreezed?: boolean;
};
