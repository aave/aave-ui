import React from 'react';
import classNames from 'classnames';

import BorrowDashboardTable from '../../../borrow/components/BorrowDashboardTable';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import DepositDashboardTable from '../../../deposit/components/DepositDashboardTable';
import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import SupplyAssetTable from '../../../deposit/components/SupplyAssetsTable';
import BorrowAssetTable from '../../../borrow/components/BorrowAssetTable';

import staticStyles from './style';

interface MainDashboardTableProps {
  depositedPositions: DepositTableItem[];
  borrowedPositions: BorrowTableItem[];
  isBorrow: boolean;
  isUserInIsolationMode?: boolean;
}

export default function MainDashboardTable({
  depositedPositions,
  borrowedPositions,
  isBorrow,
  isUserInIsolationMode,
}: MainDashboardTableProps) {
  return (
    <div
      className={classNames('MainDashboardTable', {
        MainDashboardTable__onlyOne: isBorrow,
        MainDashboardTable__noBorrows: !borrowedPositions.length,
      })}
    >
      <div className="MainDashboardTable__left-inner">
        <DepositDashboardTable
          listData={depositedPositions}
          isUserInIsolationMode={isUserInIsolationMode}
        />

        <SupplyAssetTable />
      </div>

      <div className="MainDashboardTable__right-inner">
        {!!borrowedPositions.length && <BorrowDashboardTable listData={borrowedPositions} />}

        <BorrowAssetTable borrowedReserves={borrowedPositions} />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
