import React from 'react';

import BasicAssetsTable from '../../../../components/BasicAssetsTable';
import DepositItem from './DepositItem';

import messages from './messages';

import { DepositTableItem } from './types';

interface DepositAssetTableProps {
  listData: DepositTableItem[];
  userId?: string;
  sortName: string;
  setSortName: (value: string) => void;
  sortDesc: boolean;
  setSortDesc: (value: boolean) => void;
}

export default function DepositsAssetsTable({
  listData,
  userId,
  sortName,
  setSortName,
  sortDesc,
  setSortDesc,
}: DepositAssetTableProps) {
  const columns = [
    {
      title: messages.asset,
    },
    {
      title: messages.yourWalletBalance,
    },
    {
      title: messages.APY,
      sortKey: 'liquidityRate',
    },
  ];

  return (
    <BasicAssetsTable
      sortName={sortName}
      setSortName={setSortName}
      sortDesc={sortDesc}
      setSortDesc={setSortDesc}
      columns={columns}
    >
      {listData.map((item, index) => (
        <DepositItem userId={userId} {...item} key={index} />
      ))}
    </BasicAssetsTable>
  );
}
