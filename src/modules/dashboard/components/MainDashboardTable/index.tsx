import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import TableNoData from '../DashboardTable/TableNoData';
import BorrowDashboardTable from '../../../borrow/components/BorrowDashboardTable';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import DepositDashboardTable from '../../../deposit/components/DepositDashboardTable';
import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import SupplyAssetTable from '../../../deposit/components/SupplyAssetsTable';
import BorrowAssetTable from '../../../borrow/components/BorrowAssetTable';

import messages from './messages';
import staticStyles from './style';

interface MainDashboardTableProps {
  depositedPositions: DepositTableItem[];
  borrowedPositions: BorrowTableItem[];
  isBorrow: boolean;
}

export default function MainDashboardTable({
  depositedPositions,
  borrowedPositions,
  isBorrow,
}: MainDashboardTableProps) {
  const intl = useIntl();

  return (
    <div
      className={classNames('MainDashboardTable', {
        MainDashboardTable__onlyOne: isBorrow,
        MainDashboardTable__noBorrows: !borrowedPositions.length,
      })}
    >
      <div className="MainDashboardTable__left-inner">
        {!!depositedPositions.length ? (
          <DepositDashboardTable listData={depositedPositions} />
        ) : (
          <TableNoData
            caption={intl.formatMessage(messages.depositedAssets)}
            title={intl.formatMessage(messages.nothingDeposited)}
            description={intl.formatMessage(messages.nothingDepositedDescription)}
          />
        )}

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
