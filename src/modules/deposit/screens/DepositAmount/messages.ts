import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'How much would you like to deposit?',
  description:
    'Please enter an amount you would like to deposit. The maximum amount you can deposit is shown below.',
  aaveDescription:
    'Do not deposit your AAVE tokens if you want to {stake} them in the Safety Module. To stake AAVE,  please continue to the {link}',
  stake: 'stake',

  amountTitle: 'Available to deposit',

  noDataTitle: 'Your balance is zero',
  noDataDescription: `Your balance of {currencySymbol} is 0. Transfer {currencySymbol} to your wallet to be able to deposit`,
  noDataLPTokenDescription: `You don't have any {currencySymbol} in your wallet. Transfer {currencySymbol} to your wallet in order to deposit. To get {currencySymbol}, you need to provide liquidity to the correct pool.`,
  noDataButtonTitle: `Faucet`,

  viewPool: 'View Pool',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription:
    'We couldn’t detect a wallet. Connect a wallet to deposit and see your balance grow.',

  warningText:
    'Before depositing {symbol} please check that the amount you want to deposit is not currently being used for staking. If it is being used for staking, your transaction might fail.',

  aaveWarning:
    'Depositing your AAVE tokens is not the same as staking them. If you wish to stake your AAVE tokens, please go to the {link}',
  stakingView: 'staking view',
});
