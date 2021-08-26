import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import BorrowDashboardTable from '../../../borrow/components/BorrowDashboardTable';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import DepositDashboardTable from '../../../deposit/components/DepositDashboardTable';
import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';

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
        {!!depositedPositions.length && <DepositDashboardTable listData={depositedPositions} />}
      </div>

      <div className="MainDashboardTable__right-inner">
        {!!borrowedPositions.length ? (
          <BorrowDashboardTable listData={borrowedPositions} />
        ) : (
          <ContentWrapper withFullHeight={true}>
            <NoDataPanel
              title={intl.formatMessage(messages.nothingBorrowed)}
              description={intl.formatMessage(messages.nothingBorrowedDescription)}
              buttonTitle={intl.formatMessage(messages.borrowNow)}
              linkTo="/borrow"
            />
          </ContentWrapper>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
