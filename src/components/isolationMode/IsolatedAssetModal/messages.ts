import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Isolated asset',
  description:
    'As a security measure some newly listed assets have limited exposure until the Aave governance decides otherwise.',
  howItWorks: 'How it works',
  howItWorksDescriptionFirst:
    'Assets in isolation mode can be deposited as collateral with limited borrowing capacity and only certain stablecoins are available. It is only possible to supply one asset in isolation mode. If you deposit an asset in isolation mode it will not be possible to use other assets as collateral or borrow any asset other than stablecoins.',
  howItWorksDescriptionSecond:
    'To exit isolation mode, you will need to repay all your borrowed positions and turn off the isolated asset being used as collateral.',
  debtCeiling: 'Debt ceiling',
  debtCeilingDescription:
    'Isolated assets can only be borrowed up to a specific debt ceiling. Once that is reached it will not be possible to borrow more.',
  whoCanUseIt: 'Who can use it',
  whoCanUseItDescription:
    'To supply an asset in isolation mode you should have any other deposited positions being used as collateral and no borrow positions in your account.',
  learnMore: 'Learn more in our {link}.',
  FAQGuide: 'FAQ guide',
  buttonTitle: 'Ok, I got it',
});
