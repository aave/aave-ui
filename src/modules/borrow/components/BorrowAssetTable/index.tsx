import React from 'react';

import BasicAssetsTable from '../../../../components/BasicAssetsTable';
import BorrowItem from './BorrowItem';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { CapType } from '../../../../components/caps/helper';

import messages from './messages';

import { BorrowTableItem } from './types';

interface BorrowAssetTableProps {
  listData: BorrowTableItem[];
  userId?: string;
  sortName: string;
  setSortName: (value: string) => void;
  sortDesc: boolean;
  setSortDesc: (value: boolean) => void;
}

export default function BorrowAssetTable({
  listData,
  userId,
  sortName,
  setSortName,
  sortDesc,
  setSortDesc,
}: BorrowAssetTableProps) {
  const columns = [
    {
      title: messages.asset,
    },
    {
      titleComponent: <AvailableCapsHelpModal capType={CapType.borrowCap} />,
      sortKey: 'availableBorrowsInUSD',
    },
    {
      title: messages.variableAPY,
      sortKey: 'variableBorrowRate',
    },
    {
      title: messages.stableAPY,
      sortKey: 'stableBorrowRate',
    },
  ];

  return (
    <BasicAssetsTable
      columns={columns}
      sortName={sortName}
      setSortName={setSortName}
      sortDesc={sortDesc}
      setSortDesc={setSortDesc}
      className="BorrowAssetTable"
    >
      {listData.map((item, index) => (
        <BorrowItem {...item} key={index} userId={userId} />
      ))}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .BorrowAssetTable {
          .TableHeaderWrapper {
            .TableColumn {
              &:nth-of-type(2) {
                @include respond-to(md) {
                  min-width: 180px;
                }
              }
            }
          }
        }
      `}</style>
    </BasicAssetsTable>
  );
}
