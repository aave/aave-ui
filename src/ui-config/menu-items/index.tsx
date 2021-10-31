import { Navigation } from '../../components/menu/navigation';
import messages from './messages';
import { isFeatureEnabled } from '../../helpers/config/markets-and-network-config';

export const moreMenuItems: Navigation[] = [
  {
    link: '/faucet',
    title: messages.faucet,
    isVisible: isFeatureEnabled.faucet,
  },
  {
    link: 'https://docs.aave.com/faq/',
    title: messages.faq,
    absolute: true,
  },
];

export const moreMenuExtraItems: Navigation[] = [];

export const moreMenuMobileOnlyItems: Navigation[] = [];
