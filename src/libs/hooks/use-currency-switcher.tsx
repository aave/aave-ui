import { useState } from 'react';

import ethIcon from '../../images/ethIcon.svg';
import usdIcon from '../../images/usdIcon.svg';

export type Currency = 'ETH' | 'USD';

interface Currencies {
  slug: Currency;
  icon: string;
}

export const currencies: Currencies[] = [
  {
    slug: 'USD',
    icon: usdIcon,
  },
  {
    slug: 'ETH',
    icon: ethIcon,
  },
];

interface UseCurrencies {
  currentCurrency: Currency;
  setCurrentCurrency: (value: Currency) => void;
  isCurrentCurrencyETH: boolean;
}

export function useCurrencySwitcher(): UseCurrencies {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('ETH');

  const isCurrentCurrencyETH = currentCurrency === 'ETH';

  return { currentCurrency, setCurrentCurrency, isCurrentCurrencyETH };
}
