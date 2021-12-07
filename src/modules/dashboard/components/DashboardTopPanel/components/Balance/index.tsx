import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Value from '../../../../../../components/basic/Value';
import Row from '../../../../../../components/basic/Row';

import staticStyles from './style';

interface BalanceProps {
  title: string;
  value: number | string;
  isCollapse: boolean;
}

export default function Balance({ title, value, isCollapse }: BalanceProps) {
  const { md, sm } = useThemeContext();

  return (
    <Row
      title={title}
      color="white"
      weight="light"
      className={classNames('Balance', { Balance__collapsed: isCollapse })}
      isColumn={!md ? true : md && !sm && isCollapse}
    >
      <Value
        value={value}
        withSmallDecimals={!value ? false : !(isCollapse && md && !sm)}
        symbol="USD"
        tokenIcon={true}
        withoutSymbol={true}
        maximumValueDecimals={!value ? undefined : 7}
        minimumValueDecimals={!value ? undefined : 1}
        color="white"
        compact={isCollapse && md && !sm}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
