import React, { ReactNode } from 'react';

import TableCol from '../TableCol';
import Value from '../../../../../components/basic/Value';
import NoData from '../../../../../components/basic/NoData';

interface TableValueColProps {
  userId?: string;
  symbol: string;
  value: number;
  subValue?: number;
  tooltipId?: string;
  nextToValue?: ReactNode;
}

export default function TableValueCol({
  userId,
  symbol,
  value,
  subValue,
  tooltipId,
  nextToValue,
}: TableValueColProps) {
  return (
    <TableCol>
      {!userId || Number(value) <= 0 ? (
        <NoData color="dark" />
      ) : (
        <Value
          value={value}
          symbol="USD"
          withoutSymbol={true}
          tokenIcon={true}
          maximumValueDecimals={2}
          tooltipId={tooltipId}
          className="TableValueCol__value"
          maximumTooltipDecimals={2}
          tooltipSymbol="USD"
          tooltipSubValue={subValue}
          tooltipSubSymbol={symbol}
          nextToValue={nextToValue}
        />
      )}
    </TableCol>
  );
}
