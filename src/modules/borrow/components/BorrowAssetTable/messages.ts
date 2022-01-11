import { defineMessages } from 'react-intl';

export default defineMessages({
  assetsToBorrow: 'Assets to borrow',

  APYVariable: 'APY variable',
  APYStable: 'APY stable',

  yourBorrows: 'Your borrows',
  nothingBorrowed: 'Nothing borrowed yet',

  noCollateralText: 'To borrow you need to supply any asset to be used as collateral.', // TODO: maybe need fix
  isolationText: 'Borrow power and assets are limited due to Isolation mode.',
  liquidationText: 'A message (you are very close to liquidation)', // TODO: need text
});
