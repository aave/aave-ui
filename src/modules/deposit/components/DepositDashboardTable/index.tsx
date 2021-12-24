import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useLanguageContext } from '../../../../libs/language-provider';
import DashboardTable from '../../../dashboard/components/DashboardTable';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import DepositItem from './DepositItem';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import DepositMobileCard from './DepositMobileCard';
import CollateralHelpModal from '../../../../components/HelpModal/CollateralHelpModal';

import messages from './messages';

import { DepositTableItem } from './types';

interface DepositDashboardTableProps {
  listData: DepositTableItem[];
}

export default function DepositDashboardTable({ listData }: DepositDashboardTableProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { sm } = useThemeContext();

  const head = [
    intl.formatMessage(messages.balance),
    intl.formatMessage(messages.apyRowTitle),
    <CollateralHelpModal text={intl.formatMessage(messages.collateral)} iconSize={12} />,
  ];

  const Header = useCallback(() => {
    return <TableHeader head={head} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  const sortedListData = listData.some((item) => item.isUserInIsolationMode && item.isIsolated)
    ? listData.sort((a, b) =>
        a.isIsolated === b.isIsolated && b.usageAsCollateralEnabledOnUser
          ? 0
          : a.isIsolated && a.usageAsCollateralEnabledOnUser
          ? -1
          : 1
      )
    : listData;

  return (
    <>
      {!sm ? (
        <>
          <DashboardTable title={intl.formatMessage(messages.yourDeposits)}>
            <Header />
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
        <DashboardMobileCardsWrapper title={intl.formatMessage(messages.yourDeposits)}>
          {sortedListData.map((item) => (
            <DepositMobileCard {...item} key={item.reserve.id} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  );
}
