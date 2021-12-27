import { ReserveIncentiveResponse } from '../../../../libs/pool-data-provider/hooks/use-incentives-data';

export type SupplyTableItem = {
  id: string;
  underlyingAsset: string;
  symbol: string;
  walletBalance: string;
  walletBalanceUSD: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  underlyingBalance: number | string;
  underlyingBalanceInUSD: number | string;
  liquidityRate: number | string;
  aIncentives: ReserveIncentiveResponse[];
  userId?: string;
  borrowingEnabled: boolean;
  isFreezed?: boolean;
  isIsolated: boolean;
  totalLiquidity: string;
  supplyCap: string;
  isActive?: boolean;
  usageAsCollateralEnabled: boolean;
  isUserInIsolationMode?: boolean;
};
