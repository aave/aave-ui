import React from 'react';

import TableCol from '../TableCol';
import LiquidityMiningCard from '../../../../../components/liquidityMining/LiquidityMiningCard';

import staticStyles from './style';

interface TableAprColProps {
  value: number;
  liquidityMiningValue: string | number;
  symbol?: string;
  type?: string;
}

export default function TableAprCol({
  value,
  liquidityMiningValue,
  type,
  symbol,
}: TableAprColProps) {
  return (
    <TableCol>
      <LiquidityMiningCard
        value={value}
        liquidityMiningValue={liquidityMiningValue}
        symbol={symbol}
        type={type}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableCol>
  );
}
