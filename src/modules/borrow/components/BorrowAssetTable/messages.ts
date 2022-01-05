import { defineMessages } from 'react-intl';

export default defineMessages({
  assetsToBorrow: 'Assets to borrow',

  maxAmount: 'Max amount',
  APYVariable: 'APY variable',
  APYStable: 'APY stable',

  yourBorrows: 'Your borrows',
  nothingBorrowed: 'Nothing borrowed yet',

  noDataCaption: 'No borrow assets available yet', // TODO: need text
  noDataDescription:
    'There will be a list of all available assets you can borrow. For now, it’s empty since you have not collateral.', // TODO: need text

  noCollateralText: 'To borrow you need to supply any asset to be used as collateral.', // TODO: maybe need fix
  isolationText: 'Borrow power and assets are limited due to Isolation mode.',
});
