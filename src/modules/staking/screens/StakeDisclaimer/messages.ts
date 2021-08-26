import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Staking {asset}',
  moreInformation: 'More information',
  rememberMyChoice: 'Remember my choice for next time',
  iUnderstand: 'I understand',

  firstDescription:
    '{asset} holders can stake their {asset} in the Safety Module and earn Safety Incentives. In the case of a {upTo} of your stake can be slashed to cover the deficit, providing an additional layer of protection for the protocol.',
  upTo: 'shortfall event, up to {percent}%',
  secondDescription:
    'Stakers receive Safety Incentives in the form of AAVE tokens in exchange for taking this risk to secure the protocol. You will need to activate a {cooldownPeriod} before you are able to withdraw your stake.',
  cooldownPeriod: '{duration} day cooling period',
});
