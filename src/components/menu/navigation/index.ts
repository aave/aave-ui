import { MessageDescriptor } from 'react-intl';
import {
  moreMenuExtraItems,
  moreMenuItems,
  moreMenuMobileOnlyItems,
  stakeConfig,
  governanceConfig,
} from '../../../ui-config';
import { MarketDataType } from '../../../helpers/config/types';
import { isFeatureEnabled } from '../../../helpers/config/markets-and-network-config';

import messages from './messages';

export interface Navigation {
  link: string;
  title: MessageDescriptor;
  hiddenWithoutWallet?: boolean;
  absolute?: boolean;
  onClick?: () => void;
  isVisible?: (data: MarketDataType) => boolean | undefined;
}

const navigation: Navigation[] = [
  {
    link: '/markets',
    title: messages.markets,
  },
  {
    link: '/dashboard',
    title: messages.dashboard,
  },
  {
    link: '/deposit',
    title: messages.deposit,
  },
  {
    link: '/borrow',
    title: messages.borrow,
  },
  {
    link: '/asset-swap',
    title: messages.swap,
    isVisible: isFeatureEnabled.liquiditySwap,
  },
  {
    link: '/staking',
    title: messages.stake,
    isVisible: () => !!stakeConfig,
  },
  {
    link: '/governance',
    title: messages.governance,
    isVisible: () => !!governanceConfig,
  },
];

export const moreNavigation: Navigation[] = [...moreMenuItems, ...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [
  ...navigation,
  ...moreMenuItems,
  ...moreMenuMobileOnlyItems,
];

export default navigation;
