import React from 'react';

import TableItem from '../../../../components/BasicAssetsTable/TableItem';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';

import { FaucetTableItem } from './types';

export default function FaucetItem({
  symbol,
  id,
  userId,
  walletBalance,
  underlyingAsset,
}: FaucetTableItem) {
  const url = `/faucet/${id}`;

  return (
    <TableItem className="FaucetItem" symbol={symbol} url={url} isIsolated={false}>
      <TableColumn>
        {!userId ? (
          <span>—</span>
        ) : (
          <Value value={Number(walletBalance)} maximumValueDecimals={5} minimumValueDecimals={5} />
        )}
      </TableColumn>
    </TableItem>
  );
}
