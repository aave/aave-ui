import { defineMessages } from 'react-intl';

export default defineMessages({
  assetsToDeposit: 'Assets to supply',

  walletBalance: 'Wallet balance',
  APY: 'APY',
  collateral: 'Can be collateral',

  isolationText: 'Collateral usage is limited because of isolation mode.',
  zeroStateText: 'Your {networkName} wallet is empty. To deposit ...', // TODO: need text
  zeroStateBridgeText: 'Or use {link} to transfer your ETH assets.',
});
