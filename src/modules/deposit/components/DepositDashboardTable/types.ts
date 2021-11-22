import { ComputedUserReserve, RawReserveData } from '@aave/math-utils';

export type DepositTableItem = {
  onToggleSwitch: () => void;
  isActive: boolean;
  isFrozen: boolean;
  usageAsCollateralEnabledOnThePool: boolean;
  uiColor: string;
  reserve: Pick<RawReserveData, 'id' | 'symbol' | 'name' | 'liquidityRate' | 'underlyingAsset'>;
  avg30DaysLiquidityRate?: string;
  aincentivesAPR: string;
  borrowingEnabled: boolean;
  index?: number;
} & Pick<
  ComputedUserReserve,
  'usageAsCollateralEnabledOnUser' | 'underlyingBalance' | 'underlyingBalanceUSD'
>;
