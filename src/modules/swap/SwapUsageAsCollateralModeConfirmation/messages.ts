import { defineMessages } from 'react-intl';

export default defineMessages({
  txName: 'Usage as collateral',
  pageTitleMobile: `{currencySymbol}`,
  pageTitleFirst: `Use {currencySymbol} as collateral`,
  pageTitleSecond: `Disable {currencySymbol} as collateral`,

  errorDoNotHaveDepositsInThisCurrency: "You don't have supplies in this currency",
  errorCanNotUseThisCurrencyAsCollateral: "You can't use this currency as collateral",
  errorCanNotSwitchUsageAsCollateralMode:
    "You can't switch usage as collateral mode for this currency, because it will cause collateral call",
  firstCaption: 'Use {currencySymbol} as collateral',
  secondCaption: 'Disable {currencySymbol} as collateral',
  firstCaptionIsolated: 'Use {currencySymbol} as collateral and enter isolation mode',
  secondCaptionIsolated: 'Disable {currencySymbol} as collateral and exit isolation mode',
  boxTitle: 'Usage as collateral',
  boxDescriptionNotUse: 'Please submit to disable {currencySymbol} as collateral',
  boxDescriptionUse: 'Please submit to use {currencySymbol} as collateral',
  rowTitle: 'Currency',
  currentHealthFactor: 'Current Health Factor',
  nextHealthFactor: 'Next Health Factor',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'We couldn’t detect a wallet.',

  buttonTitle: 'Submit',
});
