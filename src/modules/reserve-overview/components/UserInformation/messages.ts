import { defineMessages } from 'react-intl';

export default defineMessages({
  yourInformation: 'Your information',

  deposits: 'Deposits',
  walletBalance: 'Wallet balance',
  youAlreadyDeposited: 'You already deposited',
  collateral: 'Use as collateral',
  depositOffLabel: 'No',
  depositOnLabel: 'Yes',

  depositIsolationWarning:
    '{symbol} can be deposited as collateral in isolation mode only with limited borrowing power.',
  borrowIsolationWarning: 'Borrow power and assets are limited due to Isolation mode.',
  borrowDebtCeilingWarning: 'Borrowing is not available due to debt ceiling.', // TODO: need change text

  borrows: 'Borrows',
  borrowed: 'You already borrowed',
  loanToValue: 'Loan to value',
});
