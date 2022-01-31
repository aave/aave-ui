import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import NoData from '../../../../../../components/basic/NoData';
import Value from '../../../../../../components/basic/Value';
import Row from '../../../../../../components/basic/Row';

import staticStyles from './style';

interface BalanceProps {
  title: string;
  value: number | string;
  isCollapse: boolean;
  type?: 'deposit' | 'borrow';
  userId?: string;
}

export default function Balance({ title, value, isCollapse, type, userId }: BalanceProps) {
  const { currentTheme, md, sm } = useThemeContext();

  const isValueCompact = (isCollapse && md && !sm) || +value > 999999999;

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
      title={title}
      color="white"
      weight="light"
      className={classNames('Balance', {
        Balance__collapsed: isCollapse,
        Balance__decimalsGray: +value > 0 && +value < 1000000000,
      })}
      isColumn={!md ? true : md && !sm && isCollapse}
    >
      {!userId ? (
        <NoData color="white" />
      ) : (
        <Value
          value={value}
          withSmallDecimals={
            !value ? false : +value > 999999 && +value < 1000000000 ? false : !isValueCompact
          }
          symbol="USD"
          tokenIcon={true}
          withoutSymbol={true}
          maximumValueDecimals={!value ? undefined : isValueCompact ? 2 : maxDecimals}
          minimumValueDecimals={!value ? undefined : isValueCompact ? undefined : 0}
          color="white"
          compact={isValueCompact}
          tooltipId={+value > 0 ? `${title}_${type}` : undefined}
          maximumTooltipDecimals={7}
          minimumTooltipDecimals={7}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Balance__decimalsGray {
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
