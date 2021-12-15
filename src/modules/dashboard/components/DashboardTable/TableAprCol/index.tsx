import React from 'react';

import { ReserveIncentive } from '../../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import TableCol from '../TableCol';
import IncentivesCard from '../../../../../components/incentives/IncentivesCard';

import staticStyles from './style';

interface TableAprColProps {
  value: number;
  incentives: ReserveIncentive[];
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
