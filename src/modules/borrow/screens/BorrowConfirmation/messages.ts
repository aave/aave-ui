import { defineMessages } from 'react-intl';

export default defineMessages({
  errorPageDescription: 'Incorrect transaction',
  errorStableRateNotEnabled: 'The Stable Rate is not enabled for this currency',
  errorNotEnoughLiquidity: 'There are not enough funds in the {currencySymbol} reserve to borrow',
  errorNotEnoughCollateral: 'Your collateral is not enough to borrow this amount',
  errorBorrowingNotAvailable: 'Borrowing is currently unavailable for {currencySymbol}.',
  caption: 'Borrow overview',
  boxDescription: 'Please submit to borrow',
  approveDescription: 'Please approve before borrowing',
  valueRowTitle: 'Amount',
  APYRowTitle: 'Interest (APY)',
  currentBorrowRateTitle: 'Current {borrowRateMode} rate',
  borrowRateMode: 'New {borrowRateMode} rate',
  rateTypeRowTitle: 'Interest rate type',
  healthFactorRowTitle: 'New health factor',
  originationFeeRowTitle: 'Origination fee {percent}%',
  variable: 'Variable',
  stable: 'Stable',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'We couldn’t detect a wallet. Connect a wallet to borrow.',
  errorBorrowingAreTooSmall: "You can't borrow less then {amount}{symbol}",
});
