import { ComputedUserReserve } from '@aave/math-utils';
import { ComputedReserveData } from '../../../../libs/pool-data-provider';
import { ReserveIncentiveResponse } from '../../../../libs/pool-data-provider/hooks/use-incentives-data';

export type DepositTableItem = {
  userId?: string;
  onToggleSwitch: () => void;
  isActive: boolean;
  isFrozen: boolean;
  reserve: Pick<
    ComputedReserveData,
    'id' | 'symbol' | 'name' | 'liquidityRate' | 'underlyingAsset'
  >;
  aIncentives: ReserveIncentiveResponse[];
  borrowingEnabled: boolean;
  /**
   * false when isolation mode makes it impossible to use asset as collateral
   */
  canBeEnabledAsCollateral: boolean;
  isIsolated: boolean;
} & Pick<
  ComputedUserReserve,
  'usageAsCollateralEnabledOnUser' | 'underlyingBalance' | 'underlyingBalanceUSD'
>;
