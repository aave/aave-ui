import { defineMessages } from 'react-intl';

export default defineMessages({
  isolationMode: 'Isolation mode',
  nA: 'N/A',
  modalCaption: 'Used as collateral in isolation mode',
  modalDescription:
    'In Isolation mode you can only supply one isolated asset as collateral for borrowing. Other assets will not be able to be used as collateral for borrowing.',
  learnMore: 'Learn more about isolation mode in our {link}.',
  faqGuide: 'FAQ guide',

  cannotUsedAsCollateral:
    'Asset cannot be used as collateral because another asset is used in isolation mode. You can exit isolation mode by repaying any borrowed positions and disabling collateral on that asset from the dashboard.',
});
