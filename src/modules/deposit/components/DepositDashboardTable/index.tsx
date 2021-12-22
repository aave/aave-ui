import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useLanguageContext } from '../../../../libs/language-provider';
import DashboardTable from '../../../dashboard/components/DashboardTable';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import DepositItem from './DepositItem';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import DepositMobileCard from './DepositMobileCard';

import messages from './messages';

import { DepositTableItem } from './types';

interface DepositDashboardTableProps {
  listData: DepositTableItem[];
}

export default function DepositDashboardTable({ listData }: DepositDashboardTableProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { lg, sm } = useThemeContext();

  const head = [
    intl.formatMessage(messages.depositedAssets),
    intl.formatMessage(messages.secondTableColumnTitle),
    intl.formatMessage(messages.apyRowTitle),
    intl.formatMessage(messages.collateral),
  ];
  const colWidth = [lg ? 250 : 160, '100%', '100%', 180];

  const Header = useCallback(() => {
    return <TableHeader head={head} colWidth={colWidth} isDeposit={true} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  const sortedListData = listData.some((item) => item.isUserInIsolationMode && item.isIsolated)
    ? listData.sort((a, b) => (a.isIsolated === b.isIsolated ? 0 : a.isIsolated ? -1 : 1))
    : listData;

  return (
    <>
      {!sm ? (
        <>
          <Header />

          <DashboardTable>
            {sortedListData.map((item) => (
              <DepositItem
                {...item}
                key={item.reserve.id}
                data-cy={`dashboardDespositListItem${item.reserve.symbol.toUpperCase()}`}
              />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper title={intl.formatMessage(messages.depositedAssets)}>
          {sortedListData.map((item) => (
            <DepositMobileCard {...item} key={item.reserve.id} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  );
}
