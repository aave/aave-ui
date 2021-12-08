import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Liquidation risk parametres',
  description:
    'Your health factor and loan to value determine the assurance of your collateral. To avoid liquidations you can supply more collateral or repay borrow positions. {link}',
  learnMore: 'Learn more',

  hfTopInfo:
    'Safety of your deposited collateral against the borrowed assets and its underlying value.',
  hfBottomInfo:
    '* If the health factor goes below 1, the liquidation of your collateral might be triggered.',

  currentLTV: 'Current LTV',
  ltvTopInfo: 'Your current loan to value based on your collateral supplied.',
  ltvBottomInfo:
    '** If your loan to value goes above the liquidation threshold your collateral supplied may be liquidated.',

  buttonTitle: 'Ok, I got it',
});
