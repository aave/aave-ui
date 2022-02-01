import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useLanguageContext } from '../../../../libs/language-provider';
import DashboardTable from '../../../dashboard/components/DashboardTable';
//import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import DepositItem from './DepositItem';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import DepositMobileCard from './DepositMobileCard';

import messages from './messages';

import { DepositTableItem } from './types';
import styled from 'styled-components';

interface DepositDashboardTableProps {
  listData: DepositTableItem[];
}

const TableHeader = styled.div`
  padding: 15px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #131313;
  margin-top: 46px;
  p {
    text-align: right;
  }
`;

const Header = () => {
  return (
    <TableHeader className="flex-row">
      <p style={{ fontWeight: 'bold', width: 120, textAlign: 'left' }}>Your deposits</p>
      <p style={{ width: 100 }}>Current balance</p>
      <p style={{ width: 85 }}>APY</p>
      <p style={{ width: 75 }}>Collateral</p>
    </TableHeader>
  );
};

export default function DepositDashboardTable({ listData }: DepositDashboardTableProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { lg, sm } = useThemeContext();

  const head = [
    intl.formatMessage(messages.yourDeposits),
    intl.formatMessage(messages.secondTableColumnTitle),
    intl.formatMessage(messages.apyRowTitle),
    intl.formatMessage(messages.collateral),
  ];
  const colWidth = [lg ? 250 : 160, '100%', '100%', 180];

  /* const Header = useCallback(() => {
    return <TableHeader head={head} colWidth={colWidth} isDeposit={true} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]); */

  return (
    <>
      {!sm ? (
        <>
          <Header />

          <DashboardTable>
            {listData.map((item, index) => (
              <DepositItem
                {...item}
                index={index}
                key={index}
                data-cy={`dashboardDespositListItem${item.reserve.symbol}`}
              />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper>
          {listData.map((item, index) => (
            <DepositMobileCard {...item} key={index} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  );
}
