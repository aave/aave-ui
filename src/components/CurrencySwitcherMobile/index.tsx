import React from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useCurrencySwitcher } from '../../libs/hooks/use-currency-switcher';
import LabeledSwitcher from '../basic/LabeledSwitcher';

import messages from './messages';
import staticStyles from './style';

export default function CurrencySwitcherMobile() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { setCurrentCurrency, isCurrentCurrencyETH } = useCurrencySwitcher();

  return (
    <div className="CurrencySwitcherMobile">
      <p className="CurrencySwitcherMobile__title">{intl.formatMessage(messages.showInCurrency)}</p>
      <LabeledSwitcher
        value={!isCurrentCurrencyETH}
        leftOption="ETH"
        rightOption="USD"
        onToggle={() =>
          isCurrentCurrencyETH ? setCurrentCurrency('USD') : setCurrentCurrency('ETH')
        }
        width={245}
        height={36}
        fontSize={12}
      />

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .CurrencySwitcherMobile {
          &__title {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
