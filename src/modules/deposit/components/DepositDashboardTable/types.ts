import { ComputedUserReserve, RawReserveData } from '@aave/math-utils';
import { ReserveIncentive } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';

export type DepositTableItem = {
  onToggleSwitch: () => void;
  isActive: boolean;
  isFrozen: boolean;
  uiColor: string;
  reserve: Pick<RawReserveData, 'id' | 'symbol' | 'name' | 'liquidityRate' | 'underlyingAsset'>;
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
