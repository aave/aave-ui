import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import GradientText from '../../../../components/basic/GradientText';

import staticStyles from './style';

interface VoteBalanceProps {
  value: number;
}

export default function VoteBalance({ value }: VoteBalanceProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="VoteBalance">
      <GradientText
        className="VoteBalance__value"
        colorStart={currentTheme.secondary.rgb}
        colorEnd={currentTheme.primary.rgb}
        title={intl.formatNumber(value, { maximumFractionDigits: 2 })}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
