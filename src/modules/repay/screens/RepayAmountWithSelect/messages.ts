import { defineMessages } from 'react-intl';

export default defineMessages({
  description: 'Select an asset and amount to repay',

  fromTitle: 'Select collateral',
  toTitle: 'Borrowed asset',

  notEnoughBalance: 'Not enough balance to repay',
  notEnoughDebt: 'Not enough debt to repay',

  continue: 'Continue',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'We couldn’t detect a wallet. Connect a wallet to repay',

  error: 'Incorrect connection to HOC',

  available: 'Available',
  availableToRepay: 'Available to repay',

  helpText:
    'This action will {increase} your health factor! Always try to maintain a positive health factor to avoid liquidation.',
  increase: 'increase',
  swapLimitError:
    'For safety reasons, the maximum amount to swap at the moment is the equivalent of 150 000 $',
});
