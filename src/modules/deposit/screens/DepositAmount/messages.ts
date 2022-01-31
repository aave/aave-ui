import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'How much would you like to supply?',
  description:
    'Please enter an amount you would like to supply. The maximum amount you can supply is shown below.',
  aaveDescription:
    'Do not supply your AAVE tokens if you want to {stake} them in the Safety Module. To stake AAVE,  please continue to the {link}',
  stake: 'stake',

  noDataTitle: 'Your balance is zero',
  noDataDescription: `Your balance of {currencySymbol} is 0. Transfer {currencySymbol} to your wallet to be able to supply`,
  noDataLPTokenDescription: `You don't have any {currencySymbol} in your wallet. Transfer {currencySymbol} to your wallet in order to supply. To get {currencySymbol}, you need to provide liquidity to the correct pool.`,
  noDataButtonTitle: `Faucet`,

  viewPool: 'View Pool',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription:
    'We couldn’t detect a wallet. Connect a wallet to supply and see your balance grow.',

  warningText:
    'Before supplying {symbol} please check that the amount you want to supply is not currently being used for staking. If it is being used for staking, your transaction might fail.',

  aaveWarning:
    'Supplying your AAVE tokens is not the same as staking them. If you wish to stake your AAVE tokens, please go to the {link}',
  stakingView: 'staking view',

  supplyCapReached: 'Supply cap is reached',
  supplyCapReachedDescription:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.', // TODO: need text
});
