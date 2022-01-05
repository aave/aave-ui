import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useLanguageContext } from '../../../../libs/language-provider';
import DashboardTable from '../../../dashboard/components/DashboardTable';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import BorrowItem from './BorrowItem';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import BorrowMobileCard from './BorrowMobileCard';

import messages from './messages';

import { BorrowTableItem } from './types';

interface BorrowDashboardTableProps {
  listData: BorrowTableItem[];
}

export default function BorrowDashboardTable({ listData }: BorrowDashboardTableProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { lg, sm } = useThemeContext();

  const head = [
    intl.formatMessage(messages.yourBorrows),
    intl.formatMessage(messages.secondTableColumnTitle),
    intl.formatMessage(messages.apyRowTitle),
    intl.formatMessage(messages.fourthTableColumnTitle),
  ];
  const colWidth = [lg ? 250 : 160, '100%', '100%', 180];

  const Header = useCallback(() => {
    return <TableHeader head={head} colWidth={colWidth} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  return (
    <>
      {!sm ? (
        <>
          <Header />

          <DashboardTable>
            {listData.map((item, index) => (
              <BorrowItem
                {...item}
                index={index}
                key={index}
                data-cy={`dashboardBorrowListItem_${item.reserve.symbol}`}
              />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper>
          {listData.map((item, index) => (
            <BorrowMobileCard {...item} key={index} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  );
}
