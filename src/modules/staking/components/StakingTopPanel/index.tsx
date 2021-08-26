import React from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import Value from '../../../../components/basic/Value';

import messages from './messages';
import staticStyles from './style';

interface StakingTopPanelProps {
  title: string;
  fundsInTheSM: number | string;
  totalEmissionPerDay: number | string;
}

export default function StakingTopPanel({
  title,
  fundsInTheSM,
  totalEmissionPerDay,
}: StakingTopPanelProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const data = [
    {
      title: messages.fundsInTheSM,
      value: fundsInTheSM,
      symbol: 'USD',
    },
    {
      title: messages.totalEmissionPerDay,
      value: totalEmissionPerDay,
      symbol: 'AAVE',
    },
  ];

  return (
    <div className="StakingTopPanel">
      <h3 className="StakingTopPanel__caption">{title}</h3>

      <div className="StakingTopPanel__values">
        {data.map((item) => (
          <div className="StakingTopPanel__value-inner" key={item.symbol}>
            <p className="StakingTopPanel__value-title">{intl.formatMessage(item.title)}</p>
            <Value
              value={item.value}
              symbol={item.symbol}
              maximumValueDecimals={2}
              minimumValueDecimals={2}
              color="white"
              tokenIcon={item.symbol === 'USD'}
            />
          </div>
        ))}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .StakingTopPanel {
          background: ${currentTheme.darkBlue.hex};
          color: ${currentTheme.white.hex};
        }
      `}</style>
    </div>
  );
}
