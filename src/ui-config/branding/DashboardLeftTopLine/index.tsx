import { ChainId } from '@aave/contract-helpers';
import { IntlShape } from 'react-intl/src/types';

export interface DashboardLeftTopLineProps {
  chainId: ChainId;
  intl: IntlShape;
  onMobile?: boolean;
}

export function DashboardLeftTopLine(props: DashboardLeftTopLineProps) {
  return null;
}
