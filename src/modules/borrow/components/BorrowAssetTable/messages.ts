import { defineMessages } from 'react-intl';

export default defineMessages({
  assetsToBorrow: 'Assets to borrow',

  maxAmount: 'Max amount',
  APYVariable: 'APY variable',
  APYStable: 'APY stable',

  yourBorrows: 'Your borrows',
  nothingBorrowed: 'Nothing borrowed yet', // TODO: need text
  nothingBorrowedDescription:
    'There will be a list of all the assets you have borrowed. For now, it’s empty since you have not borrowed.', // TODO: need text

  noDataCaption: 'No borrow assets available yet', // TODO: need text
  noDataDescription:
    'There will be a list of all available assets you can borrow. For now, it’s empty since you have not collateral.', // TODO: need text

  isolationText: 'Borrow power and assets are limited due to Isolation mode.',
});
