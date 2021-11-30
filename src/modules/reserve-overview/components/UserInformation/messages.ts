import { defineMessages } from 'react-intl';

export default defineMessages({
  yourInformation: 'Your information',

  deposits: 'Deposits',
  yourWalletBalance: 'Your wallet balance',
  youAlreadyDeposited: 'You already deposited',
  collateral: 'Use as collateral',
  depositOffLabel: 'No',
  depositOnLabel: 'Yes',

  depositIsolationWarning:
    '{symbol} can be supplied as collateral in isolation mode only with limited borrowing power.',
  borrowIsolationWarning: 'Borrow power and assets are limited due to Isolation mode.',

  borrows: 'Borrows',
  borrowed: 'Borrowed',
  loanToValue: 'Loan to value',
  availableToYou: 'Available to you',
});
