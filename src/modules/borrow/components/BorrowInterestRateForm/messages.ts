import { defineMessages } from 'react-intl';

export default defineMessages({
  warningYouCanNotChooseStable:
    "You can't choose stable on reserve which you already using as collateral. Disable usage as collateral and try again.",
  warningYouCanNotBorrowOnStable:
    'The {rate} rate is disabled because you want to borrow more than 25% of the available liquidity ({availableLiquidityToBorrowStable} {poolReserveSymbol} at the moment). If you want to choose the stable rate please go back and select less than 25% to proceed.',

  title: 'Please select your interest rate',
  description:
    'Choose either stable or variable APY for your loan. Please click on the desired rate type and read the info box for more information on each option.',

  stable: 'Stable APY',
  variable: 'Variable APY',

  stableInfoText:
    'You have selected the {rate}. The stable rate acts as a fixed rate in the short term but can be rebalanced in the longer term in response to market changes. The stable rate is not as impacted by fluctuations in the reserve.',
  stableRate: 'stable APY rate',
  variableInfoText:
    'You have selected the {rate}. The variable rate can increase and decrease depending on the amount of liquidity in the reserve.',
  variableRate: 'variable APY rate',

  continue: 'Continue',
});
