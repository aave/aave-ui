import { ComputedUserReserve, RawReserveData } from '@aave/math-utils';

export type DepositTableItem = {
  onToggleSwitch: () => void;
  isActive: boolean;
  isFrozen: boolean;
  uiColor: string;
  reserve: Pick<RawReserveData, 'id' | 'symbol' | 'name' | 'liquidityRate' | 'underlyingAsset'>;
  aincentivesAPR: string;
  borrowingEnabled: boolean;
  index?: number;
  /**
   * false when isolation mode makes it impossible to use asset as collateral
   */
  canBeEnabledAsCollateral: boolean;
  isUserInIsolationMode: boolean;
  isIsolated: boolean;
} & Pick<
  ComputedUserReserve,
  'usageAsCollateralEnabledOnUser' | 'underlyingBalance' | 'underlyingBalanceUSD'
>;
