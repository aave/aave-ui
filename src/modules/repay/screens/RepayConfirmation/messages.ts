import { defineMessages } from 'react-intl';

export default defineMessages({
  error: `Your wallet balance of {userReserveSymbol} is not enough`,
  warningMessage:
    'Mind that due to the continuous accumulation of interest, a small amount could be remaining, as your wallet balance is just above the current amount pending to repay',

  caption: 'Repay overview',
  boxDescription: 'Please submit to repay',
  approveDescription: 'Please approve before repaying',

  rowTitle: 'Amount to repay',
  secondRowTitle: 'Remaining to repay',
  secondRowTitleSubTitle: 'You don’t have enough funds to repay the full amount',
  currentHealthFactor: 'Current Health Factor',
  nextHealthFactor: 'Next Health Factor',
  thirdRowTitle: 'Health factor after repay',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'We couldn’t detect a wallet. Connect a wallet to repay.',
});
