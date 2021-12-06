import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';

import { UserSummary } from '../../../../libs/pool-data-provider';
import toggleLocalStorageClick from '../../../../helpers/toggle-local-storage-click';
import TopPanelWrapper from '../../../../components/wrappers/TopPanelWrapper';
import GradientLine from '../../../../components/basic/GradientLine';
import NetWorth from './components/NetWorth';
import NetAPYSection from './components/NetAPYSection';
import SupplyBalanceSection from './components/SupplyBalanceSection';
import BorrowBalanceSection from './components/BorrowBalanceSection';

import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';

import messages from './messages';
import staticStyles from './style';

interface DashboardTopPanelProps {
  user?: UserSummary;
  depositedPositions: DepositTableItem[];
  borrowedPositions: BorrowTableItem[];
}

export default function DashboardTopPanel({
  user,
  depositedPositions,
  borrowedPositions,
}: DashboardTopPanelProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const localStorageName = 'dashboardTopPanel';
  const [isCollapse, setIsCollapse] = useState(localStorage.getItem(localStorageName) === 'true');

  const netWorthUSD = 2838.2187129919237727; // TODO: need data

  // EarnedAPY calculation (TODO: need check)
  const depositedAPYs = depositedPositions.length
    ? depositedPositions
        .filter((pos) => +pos.reserve.liquidityRate > 0)
        .map((pos) => +pos.reserve.liquidityRate)
    : [];
  const depositedAPYsSum = depositedAPYs.length ? depositedAPYs.reduce((a, b) => a + b) : 0;
  const earnedAPY = depositedPositions.length ? (depositedAPYsSum * 100) / depositedAPYs.length : 0;

  // DebtAPY calculation (TODO: need check)
  const borrowedAPYs = borrowedPositions.length
    ? borrowedPositions.filter((pos) => +pos.borrowRate > 0).map((pos) => +pos.borrowRate)
    : [];
  const borrowedAPYsSum = borrowedAPYs.length ? borrowedAPYs.reduce((a, b) => a + b) : 0;
  const debtAPY = borrowedPositions.length ? (borrowedAPYsSum * 100) / borrowedAPYs.length : 0;

  return (
    <TopPanelWrapper
      className="DashboardTopPanel"
      isCollapse={isCollapse}
      setIsCollapse={() => toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)}
      withoutCollapseButton={!user}
      minimizeMessage={messages.hideDetails}
      expandMessage={messages.showDetails}
    >
      <div className="DashboardTopPanel__wrapper">
        <div className="DashboardTopPanel__top--line">
          <div className="DashboardTopPanel__topContent">
            <p className="DashboardTopPanel__title">{intl.formatMessage(messages.overview)}</p>
            {!isCollapse && !sm && <NetWorth value={netWorthUSD} />}
            <div className="DashboardTopPanel__topHiddenDiv">
              <p>{intl.formatMessage(isCollapse ? messages.showDetails : messages.hideDetails)}</p>
            </div>
          </div>

          <GradientLine height={2} />
        </div>

        <div
          className={classNames('DashboardTopPanel__content', {
            DashboardTopPanel__contentCollapse: isCollapse,
          })}
        >
          <NetAPYSection
            earnedAPY={earnedAPY}
            debtAPY={debtAPY}
            netWorth={netWorthUSD}
            isCollapse={isCollapse}
          />

          <div className="DashboardTopPanel__sections">
            <SupplyBalanceSection
              isCollapse={isCollapse}
              balance={user && user.totalLiquidityUSD !== '0' ? user.totalLiquidityUSD : 0}
            />
            <BorrowBalanceSection
              isCollapse={isCollapse}
              balance={user && user.totalBorrowsUSD !== '0' ? user.totalBorrowsUSD : 0}
            />
            <BorrowBalanceSection
              isCollapse={isCollapse}
              balance={user && user.totalBorrowsUSD !== '0' ? user.totalBorrowsUSD : 0}
            />
          </div>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardTopPanel {
          color: ${currentTheme.white.hex};
        }
      `}</style>
    </TopPanelWrapper>
  );
}
