import { defineMessages } from 'react-intl';

export default defineMessages({
  isolationMode: 'Isolation mode',
  nA: 'N/A',
  modalCaption: 'Isolation mode',
  modalDescription:
    'Assets in isolation mode can be deposited as collateral with limited borrowing capacity and only certain stablecoins are available. It is only possible to deposit one asset in isolation mode. If you deposit an asset in isolation mode it will not be possible to use other assets as collateral or borrow any asset other than stablecoins.',
  learnMore: 'Learn more about isolation mode in our {link}.',
  faqGuide: 'FAQ guide',

  cannotUsedAsCollateral:
    'Asset cannot be used as collateral because another asset is used in isolation mode.',
});
