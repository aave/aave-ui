import { defineMessages } from 'react-intl';

export default defineMessages({
  formTitle: 'Repay from wallet balance',
  formDescription: 'Set the amount to repay',
  formDescriptionWithSelect: 'Select an asset and set the amount to repay',
  amountTitle: 'Available to repay',
  selectTitle: 'Select an asset',

  error: 'Incorrect connection to HOC',
  select: 'Select and asset',
  warningText:
    'Before repaying {symbol} please check the amount you want to repay is not used for staking. If it is used for staking, your transaction might fail.',
});
