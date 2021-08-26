import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { CompactNumber } from '../../../../components/basic/CompactNumber';

import messages from './messages';
import staticStyles from './style';

interface TotalMarketsSizeProps {
  value: number;
}

export default function TotalMarketsSize({ value }: TotalMarketsSizeProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="TotalMarketsSize">
      <p>{intl.formatMessage(messages.title)}</p>
      <h2>
        ${' '}
        {value < 100000000000 ? (
          intl.formatNumber(value, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ) : (
          <CompactNumber value={value} maximumFractionDigits={2} minimumFractionDigits={2} />
        )}
      </h2>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TotalMarketsSize {
          color: ${currentTheme.white.hex};
          background: ${currentTheme.darkBlue.hex};
        }
      `}</style>
    </div>
  );
}
