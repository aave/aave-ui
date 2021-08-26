import { defineMessages } from 'react-intl';

export default defineMessages({
  error: `Your wallet balance of {userReserveSymbol} is not enough`,
  warningMessage:
    'Mind that due to the continuous accumulation of interest, a small amount could be remaining, as your wallet balance is just above the current amount pending to repay',
  dangerousMessage:
    'The transaction may fail unless sufficient gas price is used to confirm the transaction in time. Failed transactions are also subject to a fee by the Ethereum network. Use the fast gas price option to reduce the likelihood of the transaction failing.',

  caption: 'Repay overview',
  boxDescription: 'Please submit to repay',
  approveDescription: 'Please approve before repaying',

  rowTitle: 'Amount to repay',
  inBorrowCurrency: 'in borrowed currency',
  secondRowTitle: 'Remaining to repay',
  currentHealthFactor: 'Current Health Factor',
  nextHealthFactor: 'Next Health Factor',
  thirdRowTitle: 'Health factor after repay',
  maximumSlippage: 'Maximum slippage',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'We couldn’t detect a wallet. Connect a wallet to repay.',
  fees: 'Fees',
});
