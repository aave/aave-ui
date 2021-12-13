import { ComputedUserReserve } from '@aave/math-utils';
import { ReserveIncentive } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { ComputedReserveData } from '../../../../libs/pool-data-provider/providers/dynamic-pool-data-provider';

export type DepositTableItem = {
  onToggleSwitch: () => void;
  isActive: boolean;
  isFrozen: boolean;
  uiColor: string;
  reserve: Pick<
    ComputedReserveData,
    'id' | 'symbol' | 'name' | 'liquidityRate' | 'underlyingAsset'
  >;
  aIncentives: ReserveIncentive[];
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
