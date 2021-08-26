import { defineMessages } from 'react-intl';

export default defineMessages({
  txName: 'Usage as collateral',
  pageTitleMobile: `{currencySymbol}`,
  pageTitleFirst: `Use {currencySymbol} as collateral`,
  pageTitleSecond: `Do not use {currencySymbol} as collateral`,

  errorDoNotHaveDepositsInThisCurrency: "You don't have deposits in this currency",
  errorCanNotUseThisCurrencyAsCollateral: "You can't use this currency as collateral",
  errorCanNotSwitchUsageAsCollateralMode:
    "You can't switch usage as collateral mode for this currency, because it will cause collateral call",
  firstCaption: 'Use {currencySymbol} as collateral',
  secondCaption: 'Do not use {currencySymbol} as collateral',
  boxTitle: 'Usage as collateral',
  boxDescriptionNotUse: 'Please submit not to use {currencySymbol} as collateral',
  boxDescriptionUse: 'Please submit to use {currencySymbol} as collateral',
  rowTitle: 'Currency',
  currentHealthFactor: 'Current Health Factor',
  nextHealthFactor: 'Next Health Factor',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'We couldn’t detect a wallet.',

  buttonTitle: 'Submit',
});
