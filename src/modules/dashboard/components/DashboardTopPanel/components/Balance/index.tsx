import React from 'react';
import Value from '../../../../../../components/basic/Value';
import classNames from 'classnames';

interface BalanceProps {
  title: string;
  value: number | string;
  isCollapse: boolean;
}

export default function Balance({ title, value, isCollapse }: BalanceProps) {
  return (
    <div className={classNames('Balance', { Balance__collapsed: isCollapse })}>
      <p>{title}</p>
      <Value
        value={value}
        withSmallDecimals={true}
        symbol="USD"
        tokenIcon={true}
        withoutSymbol={true}
        minimumValueDecimals={1}
        maximumValueDecimals={7}
        color="white"
      />
    </div>
  );
}
