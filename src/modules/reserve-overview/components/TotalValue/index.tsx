import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Value from '../../../../components/basic/Value';
import CapsHelpModal from '../../../../components/caps/CapsHelpModal';
import { CapType } from '../../../../components/caps/helper';
import NoData from '../../../../components/basic/NoData';

import staticStyles from './style';

interface TotalValueProps {
  symbol: string;
  color?: 'green' | 'red';
  title: string;
  value: number | string;
  subValue: number | string;
  borrowingEnabled: boolean;
  capValue: string;
  capValueUSD: string;
}

export default function TotalValue({
  symbol,
  color = 'green',
  title,
  value,
  subValue,
  borrowingEnabled,
  capValue,
  capValueUSD,
}: TotalValueProps) {
  const { currentTheme, xl } = useThemeContext();

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
            <NoData color="dark" />
          )}
        </strong>

        <div className="TotalValue__caps">
          <CapsHelpModal
            capType={color === 'red' ? CapType.borrowCap : CapType.supplyCap}
            lightWeight={true}
            iconSize={xl ? 10 : 12}
          />
          {capValue !== '0' ? (
            <Value value={capValue} subValue={capValueUSD} subSymbol="USD" symbol={symbol} />
          ) : (
            <NoData color="dark" />
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TotalValue {
          color: ${currentTheme.textDarkBlue.hex};

          .Value .SubValue {
            color: ${currentTheme.lightBlue.hex};
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

          &__caps {
            &:after {
              background: ${currentTheme.textDarkBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
