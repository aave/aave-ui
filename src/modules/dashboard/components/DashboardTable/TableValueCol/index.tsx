import React, { ReactNode } from 'react';

import { isAssetStable } from '../../../../../helpers/config/assets-config';
import TableCol from '../TableCol';
import Value from '../../../../../components/basic/Value';
import NoData from '../../../../../components/basic/NoData';

interface TableValueColProps {
  userId?: string;
  symbol: string;
  value: number;
  tooltipValue?: number;
  tooltipSubValue?: number;
  subValue?: number;
  tooltipId?: string;
  nextToValue?: ReactNode;
  withSubValue?: boolean;
}

export default function TableValueCol({
  userId,
  symbol,
  value,
  tooltipValue,
  tooltipSubValue,
  subValue,
  tooltipId,
  nextToValue,
  withSubValue,
}: TableValueColProps) {
  return (
    <TableCol>
      {!userId ? (
        <NoData color="dark" />
      ) : (
        <Value
          value={value}
          maximumValueDecimals={isAssetStable(symbol) ? 2 : 7}
          subValue={withSubValue ? subValue : undefined}
          subSymbol="USD"
          maximumSubValueDecimals={2}
          tooltipId={tooltipId}
          className="TableValueCol__value"
          maximumTooltipDecimals={2}
          tooltipValue={tooltipValue}
          tooltipSymbol="USD"
          tooltipSubValue={tooltipSubValue || subValue}
          tooltipSubSymbol={symbol}
          nextToValue={nextToValue}
        />
      )}
    </TableCol>
  );
}
