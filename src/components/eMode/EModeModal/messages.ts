import { defineMessages } from 'react-intl';

export default defineMessages({
  efficiencyMode: 'Efficiency mode (E-Mode)',
  efficiencyModeDescription:
    'E-Mode increases your borrowing power for a selected category of assets up to 99%. {link}',
  learnMore: 'Learn more',

  status: 'Status',
  assetsCategory: 'Assets category',
  availableAssets: 'Available assets',

  eModeEnableNote:
    'Note: Enabling E-Mode only allows you to borrow assets belonging to the selected category {assetCategory}. Please visit out {link} to learn more about how it works and the applied restrictions.',
  FAQGuide: 'FAQ guide',
  eModeDisabledNote:
    'Note: The E-Mode feature is currently unavailable because you currently have borrowing positions in another category. In order to enable E-Mode for asset category {assetCategory} you will need to close your position in the other category. See our {link} to learn more.',
  FAQs: 'FAQs',
  eModeDisabledLiquidation:
    'Note: You can’t disable E-Mode as your current collateralization level is above 80%, disabling E-Mode can cause liquidation. To exit E-Mode supply or repay borrowed positions.',

  enableEmode: 'Enable E-Mode',
  disableEmode: 'Disable E-Mode',
});
