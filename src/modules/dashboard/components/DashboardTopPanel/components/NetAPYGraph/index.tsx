import React from 'react';
import { useIntl } from 'react-intl';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface NetAPYGraphProps {
  earnedAPY: number;
  debtAPY: number;
}

export default function NetAPYGraph({ earnedAPY, debtAPY }: NetAPYGraphProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const topValue = earnedAPY > debtAPY ? Math.ceil(earnedAPY) : Math.ceil(debtAPY);
  const centerValue = topValue / 2;

  const earnedColumnHeight = valueToBigNumber(earnedAPY)
    .div(topValue)
    .multipliedBy(100)
    .precision(20, BigNumber.ROUND_UP)
    .toNumber();

  const debtColumnHeight = valueToBigNumber(debtAPY)
    .div(topValue)
    .multipliedBy(100)
    .precision(20, BigNumber.ROUND_UP)
    .toNumber();

  return (
    <div className="NetAPYGraph">
      <div className="NetAPYGraph__line NetAPYGraph__lineTop">
        {topValue > 0 ? intl.formatNumber(topValue) : 2}%
      </div>
      <div className="NetAPYGraph__line NetAPYGraph__lineCenter">
        {topValue > 0 ? intl.formatNumber(centerValue) : 1}%
      </div>
      <div className="NetAPYGraph__line NetAPYGraph__lineBottom">0%</div>

      {!!earnedColumnHeight && (
        <div
          className="NetAPYGraph__column NetAPYGraph__earnedColumn"
          style={{ height: `${earnedColumnHeight}%` }}
        />
      )}

      {!!debtColumnHeight && (
        <div
          className="NetAPYGraph__column NetAPYGraph__debtColumn"
          style={{ height: `${debtColumnHeight}%` }}
        />
      )}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .NetAPYGraph {
          &__line {
            color: ${currentTheme.lightBlue.hex};
            border-bottom: 1px dashed ${currentTheme.lightBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
