import React from 'react';
import classNames from 'classnames';

import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';
import ValuePercent from '../../basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';

interface ThirtyDayAverageProps {
  value: number;
  className?: string;
  size?: 'normal' | 'small';
  forTooltip?: boolean;
}

export default function ThirtyDayAverage({
  value,
  className,
  size = 'normal',
  forTooltip,
}: ThirtyDayAverageProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('ThirtyDayAverage', `ThirtyDayAverage__${size}`, className)}>
      {!!value && (
        <>
          <span className="ThirtyDayAverage__text">
            {intl.formatMessage(
              forTooltip ? messages.thirtyDaysAverageFull : messages.thirtyDaysAverage
            )}
          </span>
          <ValuePercent
            value={value}
            minimumDecimals={2}
            maximumDecimals={2}
            color={forTooltip ? 'white' : 'lightBlue'}
          />
        </>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .ThirtyDayAverage {
          .ThirtyDayAverage__text {
            color: ${forTooltip ? currentTheme.white.hex : currentTheme.lightBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
