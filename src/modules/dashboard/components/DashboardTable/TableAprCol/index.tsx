import React from 'react';

import TableCol from '../TableCol';
import IncentivesCard from '../../../../../components/incentives/IncentivesCard';

import staticStyles from './style';
import { ReserveIncentiveResponse } from '../../../../../libs/pool-data-provider/hooks/use-incentives-data';

interface TableAprColProps {
  value: number;
  incentives: ReserveIncentiveResponse[];
  symbol: string;
}

export default function TableAprCol({ value, incentives, symbol }: TableAprColProps) {
  return (
    <TableCol>
      <IncentivesCard value={value} incentives={incentives} symbol={symbol} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableCol>
  );
}
