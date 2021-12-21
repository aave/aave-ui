import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import { BigNumberValue } from '@aave/math-utils';

import { CompactNumber } from '../CompactNumber';

import staticStyles from './style';

interface ValuePercentProps {
  value: BigNumberValue;
  percentSymbol?: boolean;
  maximumDecimals?: number;
  minimumDecimals?: number;
  updateCondition?: boolean;
  color?: 'dark' | 'primary' | 'secondary' | 'green' | 'red' | 'darkOrange' | 'white' | 'lightBlue';
  percentColor?: string;
  className?: string;
  valueColor?: string;
  onWhiteBackground?: boolean;
  isCompact?: boolean;
}

export default function ValuePercent({
  value,
  percentSymbol = true,
  maximumDecimals,
  minimumDecimals,
  updateCondition,
  color = 'dark',
  percentColor,
  className,
  valueColor,
  onWhiteBackground,
  isCompact,
}: ValuePercentProps) {
  const { currentTheme } = useThemeContext();
  const intl = useIntl();

  const [newValue, setNewValue] = useState(value);
  const updateValue = updateCondition ? undefined : value;
  useEffect(() => {
    setNewValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateValue]);

  const formattedNumber = percentSymbol ? Number(newValue) * 100 : Number(newValue);
  const formattedMaximumDecimals = maximumDecimals || 2;
  const formattedMinimumDecimals = minimumDecimals ? minimumDecimals : undefined;

  return (
    <div className={classNames('ValuePercent', `ValuePercent__${color}`, className)}>
      <p className="ValuePercent__value" style={{ color: valueColor }}>
        {isCompact ? (
          <CompactNumber
            value={formattedNumber}
            maximumFractionDigits={formattedMaximumDecimals}
            minimumFractionDigits={formattedMinimumDecimals}
          />
        ) : (
          intl.formatNumber(formattedNumber, {
            maximumFractionDigits: formattedMaximumDecimals,
            minimumFractionDigits: formattedMinimumDecimals,
          })
        )}

        {percentSymbol && <span style={{ color: percentColor }}>%</span>}
      </p>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ValuePercent__dark {
          .ValuePercent__value {
            color: ${onWhiteBackground ? currentTheme.darkBlue.hex : currentTheme.textDarkBlue.hex};
          }
        }
        .ValuePercent__primary {
          .ValuePercent__value {
            color: ${currentTheme.primary.hex};
          }
        }
        .ValuePercent__secondary {
          .ValuePercent__value {
            color: ${currentTheme.secondary.hex};
          }
        }
        .ValuePercent__green {
          .ValuePercent__value {
            color: ${currentTheme.green.hex};
          }
        }
        .ValuePercent__red {
          .ValuePercent__value {
            color: ${currentTheme.red.hex};
          }
        }
        .ValuePercent {
          .ValuePercent__value {
            span {
              color: ${onWhiteBackground
                ? currentTheme.darkBlue.hex
                : currentTheme.textDarkBlue.hex};
            }
          }
        }
        .ValuePercent__darkOrange {
          .ValuePercent__value {
            color: ${currentTheme.darkOrange.hex};
          }
        }
        .ValuePercent__white {
          .ValuePercent__value {
            color: ${currentTheme.white.hex};
            span {
              color: ${currentTheme.white.hex};
            }
          }
        }
        .ValuePercent__lightBlue {
          .ValuePercent__value {
            color: ${currentTheme.lightBlue.hex};
            span {
              color: ${currentTheme.lightBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
