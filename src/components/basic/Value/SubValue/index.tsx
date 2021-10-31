import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';
import { getAssetInfo } from '../../../../helpers/config/assets-config';

interface SubValueProps {
  symbol?: string;
  value: number;
  maximumDecimals?: number;
  minimumDecimals?: number;
  color?: 'dark' | 'white' | 'primary';
}

export default function SubValue({
  value,
  symbol,
  maximumDecimals,
  minimumDecimals,
  color = 'dark',
}: SubValueProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const asset = symbol && getAssetInfo(symbol);

  return (
    <p className={classNames('SubValue', `SubValue__${color}`)}>
      {symbol === 'USD' && <span className="SubValue__symbol SubValue__usdSymbol">$</span>}

      {intl.formatNumber(value, {
        maximumFractionDigits: maximumDecimals || 5,
        minimumFractionDigits: minimumDecimals ? minimumDecimals : undefined,
      })}

      <span className={classNames('SubValue__symbol', { SubValue__symbolUSD: symbol === 'USD' })}>
        {asset && asset.formattedSymbol ? asset.formattedSymbol : asset && asset.symbol}
      </span>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .SubValue {
          &__dark {
            color: ${currentTheme.lightBlue.hex};
          }
          &__white {
            color: ${currentTheme.white.hex};
          }
          &__primary {
            color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </p>
  );
}
