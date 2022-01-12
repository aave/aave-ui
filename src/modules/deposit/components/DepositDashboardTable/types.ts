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
  /**
   * false when isolation mode makes it impossible to use asset as collateral
   */
  canBeEnabledAsCollateral: boolean;
  isIsolated: boolean;
  swapLink: string;
  depositLink: string;
  withdrawLink: string;
} & Pick<
  ComputedUserReserve,
  'usageAsCollateralEnabledOnUser' | 'underlyingBalance' | 'underlyingBalanceUSD'
>;
