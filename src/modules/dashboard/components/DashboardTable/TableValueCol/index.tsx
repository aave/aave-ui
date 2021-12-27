import React from 'react';

import TableCol from '../TableCol';
import Value from '../../../../../components/basic/Value';
import { isAssetStable } from '../../../../../helpers/config/assets-config';

interface TableValueColProps {
  symbol: string;
  value: number;
  subValue?: number;
  tooltipId?: string;
}

export default function TableValueCol({ symbol, value, subValue, tooltipId }: TableValueColProps) {
  return (
    <TableCol>
      <Value
        value={value}
        subValue={subValue}
        subSymbol="USD"
        maximumValueDecimals={isAssetStable(symbol) ? 2 : 7}
        maximumSubValueDecimals={2}
        tooltipId={tooltipId}
        className="TableValueCol__value"
      />
    </TableCol>
  );
}
