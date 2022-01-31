import { defineMessages } from 'react-intl';

export default defineMessages({
  yourInformation: 'Your information',

  deposits: 'Supplied',
  walletBalance: 'Wallet balance',
  youAlreadyDeposited: 'You already supplied',
  collateral: 'Use as collateral',
  depositOffLabel: 'No',
  depositOnLabel: 'Yes',

  depositIsolationWarning:
    '{symbol} can be supplied as collateral in isolation mode only with limited borrowing power.',
  borrowIsolationWarning: 'Borrow power and assets are limited due to Isolation mode.',
  borrowDebtCeilingWarning:
    'Borrowing against collateral is not available because it has reached total debt ceiling',

  borrows: 'Borrows',
  borrowed: 'You already borrowed',
  loanToValue: 'Loan to value',
});
