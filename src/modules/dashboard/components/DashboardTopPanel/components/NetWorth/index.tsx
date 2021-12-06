import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

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
        withSmallDecimals={true}
        maximumValueDecimals={7}
        minimumValueDecimals={1}
        color="white"
        withoutSymbol={true}
        tokenIcon={true}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
