import React from 'react';

import BasicAssetsTable from '../../../../components/BasicAssetsTable';
import FaucetItem from './FaucetItem';

import messages from './messages';
import staticStyles from './style';

import { FaucetTableItem } from './types';

interface FaucetAssetTableProps {
  listData: FaucetTableItem[];
  userId?: string;
}

export default function FaucetAssetTable({ listData, userId }: FaucetAssetTableProps) {
  const columns = [
    {
      title: messages.asset,
    },
    {
      title: messages.yourWalletBalance,
    },
  ];

  return (
    <BasicAssetsTable className="FaucetAssetTable" columns={columns}>
      {listData.map((item) => (
        <FaucetItem {...item} userId={userId} key={item.id} />
      ))}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </BasicAssetsTable>
  );
}
