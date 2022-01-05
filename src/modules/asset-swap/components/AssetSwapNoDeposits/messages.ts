import { defineMessages } from 'react-intl';

export default defineMessages({
  description:
    'You must have at least {assetsDeposited} in the Aave Protocol to make use of the swap functionality. This swap functionality only {supplied} in the Aave Protocol.',
  assetsDeposited: 'asset supplied',
  supplied: 'contains the assets you supplied',

  moreInfo: 'For more information on the swap feature, please read the {faq}',

  depositFirst: 'Supply {number} asset first',

  depositNow: 'Supply now',
});
