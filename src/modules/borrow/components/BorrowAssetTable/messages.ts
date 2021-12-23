import { defineMessages } from 'react-intl';

export default defineMessages({
  borrowAssets: 'Assets to borrow',
  secondTableColumnTitle: 'Available to borrow',
  stableAPY: 'Stable APY',
  variableAPY: 'Variable APY',

  showDetails: 'Show details',

  borrowedAssets: 'Borrowed assets',
  nothingBorrowed: 'Nothing borrowed yet',
  nothingBorrowedDescription:
    'There will be a list of all the assets you have borrowed. For now, it’s empty since you have not borrowed.',

  noDataCaption: 'No borrow assets available yet', // TODO: need text
  noDataDescription:
    'There will be a list of all available assets you can borrow. For now, it’s empty since you have not collateral.', // TODO: need text
});
