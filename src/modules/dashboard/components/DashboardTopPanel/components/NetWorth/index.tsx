import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Row from '../../../../../../components/basic/Row';
import Value from '../../../../../../components/basic/Value';

import messages from './messages';
import staticStyles from './style';

interface NetWorthProps {
  isColumn?: boolean;
  value: number;
}

export default function NetWorth({ isColumn, value }: NetWorthProps) {
  const intl = useIntl();
  const { currentTheme, lg, sm } = useThemeContext();

  const isValueCompact = (isColumn && lg && !sm) || +value > 999999999;

  const maxDecimals =
    +value < 1 && +value !== 0
      ? 4
      : +value > 0 && +value < 1000000
      ? 2
      : +value > 999999999
      ? 2
      : 0;

  return (
    <Row
      className={classNames('NetWorth', {
        NetWorth__column: isColumn,
        NetWorth__decimalsGray: +value > 0 && +value < 1000000000,
      })}
      title={intl.formatMessage(messages.netWorth)}
      weight="light"
      isColumn={isColumn}
      color="white"
    >
      <Value
        value={value}
        symbol="USD"
        withSmallDecimals={
          !value ? false : +value > 999999 && +value < 1000000000 ? false : !isValueCompact
        }
        maximumValueDecimals={!value ? undefined : isValueCompact ? 2 : maxDecimals}
        minimumValueDecimals={!value ? undefined : isValueCompact ? undefined : 0}
        color="white"
        withoutSymbol={true}
        tokenIcon={true}
        compact={isValueCompact}
        tooltipId={+value > 0 ? 'net_worth' : undefined}
        maximumTooltipDecimals={7}
        minimumTooltipDecimals={7}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .NetWorth__decimalsGray {
          .Value__value {
            .ValueWithSmallDecimals {
              color: ${currentTheme.lightBlue.hex};
            }
          }
        }
      `}</style>
    </Row>
  );
}
