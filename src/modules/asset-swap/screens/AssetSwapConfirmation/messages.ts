import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'Swap overview',
  description:
    'These are your transaction details. Make sure to check if this is correct before submitting.',

  boxDescription: 'Please submit to swap',
  approveDescription: 'Please approve before swap',

  fromTitle: 'From asset',
  toTitle: 'To asset',
  currentHealthFactor: 'Current health factor',
  newHealthFactor: 'New health factor',
  maximumSlippage: 'Maximum slippage',
  fees: 'Fees',

  balanceNotEnough: 'Your balance in the pool is not enough',
  healthDropBellow: 'Health factor can drop bellow one after swap',

  warningMessage:
    'The transaction may fail unless sufficient gas price is used to confirm the transaction in time. Failed transactions are also subject to a fee by the network. Use the fast gas price option to reduce the likelihood of the transaction failing.',
});
