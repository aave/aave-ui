import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
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
  const { currentTheme } = useThemeContext();

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
          <div className="MainDashboardTable__noData--wrapper">
            <strong className="MainDashboardTable__noData--title">
              {intl.formatMessage(messages.depositedAssets)}
            </strong>
            <ContentWrapper withFullHeight={true}>
              <NoDataPanel
                title={intl.formatMessage(messages.nothingDeposited)}
                description={intl.formatMessage(messages.nothingDepositedDescription)}
              />
            </ContentWrapper>
          </div>
        )}

        <SupplyAssetTable suppliedReserves={depositedPositions} />
      </div>

      <div className="MainDashboardTable__right-inner">
        {!!borrowedPositions.length ? (
          <BorrowDashboardTable listData={borrowedPositions} />
        ) : (
          <div className="MainDashboardTable__noData--wrapper">
            <strong className="MainDashboardTable__noData--title">
              {intl.formatMessage(messages.borrowedAssets)}
            </strong>
            <ContentWrapper withFullHeight={true}>
              <NoDataPanel
                title={intl.formatMessage(messages.nothingBorrowed)}
                description={intl.formatMessage(messages.nothingBorrowedDescription)}
              />
            </ContentWrapper>
          </div>
        )}

        <BorrowAssetTable borrowedReserves={borrowedPositions} />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .MainDashboardTable__noData--title {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
