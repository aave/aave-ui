import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Change GAS settings',
  description:
    'When the Ethereum network is congested the gas price for your transaction increases. You may need to increase your gas price in gwei for your transactions to be approved faster or wait for lower transaction cost over the network',

  warningText: 'The GAS price for the second step can be different',

  valuesDescription: 'Approximated cost for this transaction',
  total: 'Total:',

  optionsTitle: 'Change GAS setting',

  standard: 'Standard',
  fast: 'Fast',
  instant: 'Instant',
  manual: 'Manual',
  time: '< {time} min',

  confirm: 'Confirm',
  readMore: 'Read more {link}',
});
