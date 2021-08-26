import { defineMessages } from 'react-intl';

export default defineMessages({
  txName: `Switch Interest Type`,
  pageTitle: `Switch {currencySymbol} Interest Type`,

  errorNotBorrowYetUsingThisCurrency: 'You have not borrow yet using this currency',
  errorStableInterestTypeIsDisabled: 'Stable Interest Type is disabled for this currency',
  errorYouCantBorrowStableNow:
    "You can't change Interest Type to stable as your borrowings are higher than your collateral",
  caption: `Switch Interest Type to {rateModeAfterSwitch}`,
  boxTitle: 'Switch of Interest Type',
  boxDescription: 'Please submit to switch Interest Type to {rateModeAfterSwitch}',
  currentBorrowRateTitle: 'Current {borrowRateMode} rate',
  nextBorrowRateMode: 'Next {borrowRateMode} rate',

  currency: 'Currency',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription:
    'We couldn’t detect a wallet. Connect a wallet to switch interest type.',

  buttonTitle: 'Submit',
});
