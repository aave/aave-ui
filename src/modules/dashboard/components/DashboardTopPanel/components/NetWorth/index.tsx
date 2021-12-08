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
  const { lg, sm } = useThemeContext();

  const isValueCompact = isColumn && lg && !sm;

  return (
    <Row
      className={classNames('NetWorth', { NetWorth__column: isColumn })}
      title={intl.formatMessage(messages.netWorth)}
      weight="light"
      isColumn={isColumn}
      color="white"
    >
      <Value
        value={value}
        symbol="USD"
        withSmallDecimals={!value ? false : !isValueCompact}
        maximumValueDecimals={!value ? undefined : isValueCompact ? 2 : 7}
        minimumValueDecimals={!value ? undefined : isValueCompact ? undefined : 0}
        color="white"
        withoutSymbol={true}
        tokenIcon={true}
        compact={isValueCompact}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
