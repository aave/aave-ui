import { ComputedUserReserve, ReserveData } from '@aave/protocol-js';

export type DepositTableItem = {
  onToggleSwitch: () => void;
  isActive: boolean;
  isFrozen: boolean;
  usageAsCollateralEnabledOnThePool: boolean;
  uiColor: string;
  reserve: Pick<ReserveData, 'id' | 'symbol' | 'name' | 'liquidityRate' | 'underlyingAsset'>;
  avg30DaysLiquidityRate?: string;
  aIncentivesAPY: string;
  borrowingEnabled: boolean;
  index?: number;
} & Pick<
  ComputedUserReserve,
  'usageAsCollateralEnabledOnUser' | 'underlyingBalance' | 'underlyingBalanceUSD'
>;
