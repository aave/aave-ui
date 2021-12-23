import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { FormatUserSummaryAndIncentivesResponse } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import TableNoData from '../DashboardTable/TableNoData';
import BorrowDashboardTable from '../../../borrow/components/BorrowDashboardTable';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import DepositDashboardTable from '../../../deposit/components/DepositDashboardTable';
import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import SupplyAssetTable from '../../../deposit/components/SupplyAssetsTable';
import BorrowAssetTable from '../../../borrow/components/BorrowAssetTable';
import IsolationInfoBanner from '../../../../components/isolationMode/IsolationInfoBanner';

import messages from './messages';
import staticStyles from './style';

interface MainDashboardTableProps {
  depositedPositions: DepositTableItem[];
  borrowedPositions: BorrowTableItem[];
  isBorrow: boolean;
  user?: FormatUserSummaryAndIncentivesResponse;
}

export default function MainDashboardTable({
  depositedPositions,
  borrowedPositions,
  isBorrow,
  user,
}: MainDashboardTableProps) {
  const intl = useIntl();
  const { sm } = useThemeContext();

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

        <SupplyAssetTable suppliedReserves={depositedPositions} />
      </div>

      <div className="MainDashboardTable__right-inner">
        {!!borrowedPositions.length ? (
          <BorrowDashboardTable listData={borrowedPositions} />
        ) : (
          <TableNoData
            caption={intl.formatMessage(messages.borrowedAssets)}
            title={intl.formatMessage(messages.nothingBorrowed)}
            description={intl.formatMessage(messages.nothingBorrowedDescription)}
          />
        )}

        {user?.isInIsolationMode && (
          <IsolationInfoBanner
            text={intl.formatMessage(messages.isolationText)}
            size="normal"
            withoutMargin={!sm}
            withIcon={!sm}
          />
        )}

        <BorrowAssetTable borrowedReserves={borrowedPositions} />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
