import { MessageDescriptor } from 'react-intl';
import {
  moreMenuExtraItems,
  moreMenuItems,
  moreMenuMobileOnlyItems,
  stakeConfig,
  governanceConfig,
} from '../../../ui-config';
import { MarketDataType } from '../../../helpers/config/types';

import messages from './messages';

export interface Navigation {
  link: string;
  title: MessageDescriptor;
  hiddenWithoutWallet?: boolean;
  absolute?: boolean;
  onClick?: () => void;
  isVisible?: (data: MarketDataType) => boolean | undefined;
  dataCy?: string;
}

const navigation: Navigation[] = [
  {
    link: '/dashboard',
    title: messages.dashboard,
    dataCy: 'menuDashboard',
  },
  {
    link: '/markets',
    title: messages.markets,
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
