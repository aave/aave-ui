import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useLanguageContext } from '../../../../libs/language-provider';
import DashboardTable from '../../../dashboard/components/DashboardTable';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import BorrowItem from './BorrowItem';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import BorrowMobileCard from './BorrowMobileCard';
import BorrowInterestHelpModal from '../../../../components/HelpModal/BorrowInterestHelpModal';

import messages from './messages';

import { BorrowTableItem } from './types';

interface BorrowDashboardTableProps {
  listData: BorrowTableItem[];
}

export default function BorrowDashboardTable({ listData }: BorrowDashboardTableProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { sm } = useThemeContext();

  const head = [
    intl.formatMessage(messages.balance),
    intl.formatMessage(messages.apyRowTitle),
    <BorrowInterestHelpModal text={intl.formatMessage(messages.APYType)} iconSize={12} />,
  ];

  const Header = useCallback(() => {
    return <TableHeader head={head} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  return (
    <>
      {!sm ? (
        <>
          <DashboardTable
            title={intl.formatMessage(messages.yourBorrows)}
            localStorageName="borrowedAssetsDashboardTableCollapse"
          >
            <Header />
            {listData.map((item, index) => (
              <BorrowItem
                {...item}
                index={index}
                key={index}
                data-cy={`dashboardBorrowListItem_${item.reserve.symbol.toUpperCase()}`}
              />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper title={intl.formatMessage(messages.yourBorrows)}>
          {listData.map((item, index) => (
            <BorrowMobileCard {...item} key={index} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  );
}
