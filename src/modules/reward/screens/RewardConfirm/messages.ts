import { defineMessages } from 'react-intl';

export default defineMessages({
  pageTitle: 'Reward',

  title: 'Your transaction overview',
  description:
    'These are your transaction details. Make sure to check if this is correct before submitting.',
  claim: 'Claim',
  boxDescription: 'Please submit to claim',

  notEnoughBalance: 'Your reward balance is 0',
  notHaveEnoughIncentives: 'You do not have enough incentives to claim',

  tribeWarningFirst:
    'The Fei Protocol governance has decided to give TRIBE rewards to variable borrowing of FEI on Aave in this {proposal}. For more information about the rewards visit the {link}.',
  proposal: 'proposal',
  feiMessage: 'Fei Protocol App',
  tribeWarningSecond:
    'This is offered strictly by the Fei Protocol and the Aave Protocol does not have any involvement in the TRIBE rewards. The Fei Protocol App is a third party application affiliated with Fei and not with Aave in any way.',
});
