import { ReserveIncentive } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';

export type DepositTableItem = {
  id: string;
  underlyingAsset: string;
  symbol: string;
  walletBalance: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  underlyingBalance: number | string;
  underlyingBalanceInUSD: number | string;
  liquidityRate: number | string;
  aIncentives: ReserveIncentive[];
  userId?: string;
  borrowingEnabled: boolean;
  isFreezed?: boolean;
  isIsolated: boolean;
  totalLiquidity: string;
  supplyCap: string;
};
