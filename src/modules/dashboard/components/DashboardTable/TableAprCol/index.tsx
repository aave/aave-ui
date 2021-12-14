import React from 'react';

import TableCol from '../TableCol';
import LiquidityMiningCard from '../../../../../components/liquidityMining/LiquidityMiningCard';

import staticStyles from './style';
import { ReserveIncentiveResponse } from '../../../../../libs/pool-data-provider/hooks/use-incentives-data';

interface TableAprColProps {
  value: number;
  liquidityMiningValues: ReserveIncentiveResponse[];
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
