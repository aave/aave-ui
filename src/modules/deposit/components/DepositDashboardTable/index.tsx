import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { useLanguageContext } from '../../../../libs/language-provider';
import DashboardItemsWrapper from '../../../dashboard/components/DashboardItemsWrapper';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import DepositItem from './DepositItem';
import DepositMobileCard from './DepositMobileCard';
import CollateralHelpModal from '../../../../components/HelpModal/CollateralHelpModal';

import messages from './messages';

import { DepositTableItem } from './types';

interface DepositDashboardTableProps {
  listData: DepositTableItem[];
}

export default function DepositDashboardTable({ listData }: DepositDashboardTableProps) {
  const intl = useIntl();
  const { userId } = useAppDataContext();
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
    <DashboardItemsWrapper
      title={intl.formatMessage(messages.yourDeposits)}
      localStorageName="suppliedAssetsDashboardTableCollapse"
    >
      {!sm ? (
        <>
          <Header />
          {sortedListData.map((item) => (
            <DepositItem
              {...item}
              userId={userId}
              key={item.reserve.id}
              data-cy={`dashboardDespositListItem${item.reserve.symbol.toUpperCase()}`}
            />
          ))}
        </>
      ) : (
        sortedListData.map((item) => <DepositMobileCard {...item} key={item.reserve.id} />)
      )}
    </DashboardItemsWrapper>
  );
}
