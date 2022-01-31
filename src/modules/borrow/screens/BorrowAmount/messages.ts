import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'How much would you like to borrow?',
  description:
    'Please enter an amount you would like to borrow. The maximum amount you can borrow is shown below.',

  noDataTitle: 'No supplies yet',
  noDataDescription: 'You need to supply some collateral first to unlock your borrowing power.',
  noLiquidityAvailableTitle: 'No liquidity',
  noLiquidityAvailableDescription: 'There is no {symbol} available liquidity to borrow.',
  healthFactorTooLowTitle: 'Health factor too low',
  healthFactorTooLowDescription:
    'Supply more collateral or repay part of your borrowings to increase your health factor and be able to borrow.',
  noDataButtonTitle: 'Supply now',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'We couldn’t detect a wallet. Connect a wallet to borrow.',

  borrowingAgainst: 'Borrowing against collateral is not available',
  borrowingAgainstDescription:
    'Borrowing against collateral is not available because it has reached total debt ceiling.',

  borrowCapReached: 'Borrow cap is reached',
  borrowCapReachedDescription:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.', // TODO: need text
});
