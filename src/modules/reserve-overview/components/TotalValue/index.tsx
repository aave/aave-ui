import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Value from '../../../../components/basic/Value';

import staticStyles from './style';

interface TotalValueProps {
  color?: 'green' | 'red';
  title: string;
  value: number | string;
  subValue: number | string;
  borrowingEnabled: boolean;
}

export default function TotalValue({
  color = 'green',
  title,
  value,
  subValue,
  borrowingEnabled,
}: TotalValueProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('TotalValue', `TotalValue__${color}`)}>
      <div className="TotalValue__inner">
        <span className="TotalValue__title">
          {title} <i />
        </span>
        <strong>
          {borrowingEnabled || color === 'red' ? (
            <Value
              value={Number(value)}
              subValue={Number(subValue)}
              maximumValueDecimals={2}
              minimumValueDecimals={2}
              maximumSubValueDecimals={2}
              minimumSubValueDecimals={2}
              subSymbol="USD"
            />
          ) : (
            <>—</>
          )}
        </strong>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TotalValue {
          color: ${currentTheme.textDarkBlue.hex};

          .Value .Value__value {
            &:after {
              background: ${currentTheme.textDarkBlue.hex};
            }
          }

          .Value .SubValue {
            color: ${currentTheme.textDarkBlue.hex};
          }

          &__green {
            .TotalValue__title {
              i {
                background: ${currentTheme.green.hex};
              }
            }
          }
          &__red {
            .TotalValue__title {
              i {
                background: ${currentTheme.red.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
