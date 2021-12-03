import React from 'react';

import TableCol from '../TableCol';
import LiquidityMiningCard from '../../../../../components/liquidityMining/LiquidityMiningCard';

import staticStyles from './style';
import { ReserveIncentive } from '../../../../../libs/pool-data-provider/hooks/use-incentives-data-context';

interface TableAprColProps {
  value: number;
  liquidityMiningValues: ReserveIncentive[];
  symbol?: string;
  type?: string;
}

export default function TableAprCol({
  value,
  liquidityMiningValues,
  type,
  symbol,
}: TableAprColProps) {
  return (
    <TableCol>
      <LiquidityMiningCard
        value={value}
        liquidityMiningValues={liquidityMiningValues}
        symbol={symbol}
        type={type}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableCol>
  );
}
