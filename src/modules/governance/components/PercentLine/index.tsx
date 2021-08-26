import React from 'react';
import { valueToBigNumber } from '@aave/protocol-js';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface PercentLineProps {
  color?: 'green' | 'red' | 'orange' | 'primary';
  totalValue: number | string;
  currentValue: number | string;
  withBorder?: boolean;
}

export default function PercentLine({
  color,
  totalValue,
  currentValue,
  withBorder,
}: PercentLineProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const percent = valueToBigNumber(currentValue).dividedBy(totalValue).multipliedBy(100).toNumber();

  return (
    <div className={classNames('PercentLine', { PercentLine__withBorder: withBorder })}>
      <div
        className={classNames('PercentLine__color', `PercentLine__${color}`)}
        style={{ width: `${percent}%` }}
      />

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .PercentLine {
          background: ${isCurrentThemeDark ? currentTheme.white.hex : currentTheme.mainBg.hex};
          &__color {
            background: ${currentTheme.darkBlue.hex};
          }
          &__green {
            background: ${currentTheme.green.hex};
          }
          &__red {
            background: ${currentTheme.red.hex};
          }
          &__orange {
            background: ${currentTheme.orange.hex};
          }
          &__primary {
            background: ${currentTheme.primary.hex};
          }

          &:after {
            border: 1px solid ${currentTheme.lightBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
