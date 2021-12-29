import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Isolated asset',
  description:
    'As a security measure some newly listed assets have limited exposure until the Aave governance decides otherwise.',
  howItWorks: 'How it works',
  howItWorksDescriptionFirst:
    'In Isolation mode you cannot supply other assets as collateral for borrowing. Assets used as collateral in Isolation mode can only be borrowed to a specific debt ceiling.',
  howItWorksDescriptionSecond:
    'To exit isolation mode, you will need to repay all your borrowed positions and turn off the isolated asset being used as collateral from your dashboard.',
  debtCeiling: 'Debt ceiling',
  debtCeilingDescription:
    'Isolated assets can only be borrowed up to a specific debt ceiling. Once that is reached it will not be possible to borrow more.',
  whoCanUseIt: 'Who can use it',
  whoCanUseItDescription:
    'To deposit an asset in isolation mode you should have any other deposited positions being used as collateral and no borrow positions in your account.',
  learnMore: 'Learn more in our {link}.',
  FAQGuide: 'FAQ guide',
  buttonTitle: 'Ok, I got it',
});
