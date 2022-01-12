import { Navigation } from '../../components/menu/navigation';
import messages from './messages';

export const moreMenuItems: Navigation[] = [
  {
    link: 'https://docs.aave.com/faq/',
    title: messages.faq,
    absolute: true,
  },
  {
    link: 'https://docs.aave.com/portal/',
    title: messages.developers,
    absolute: true,
  },
];

export const moreMenuExtraItems: Navigation[] = [];

export const moreMenuMobileOnlyItems: Navigation[] = [];
