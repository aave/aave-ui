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
import SectionWrapper from './components/SectionWrapper';

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

  const netWorthUSD = 0; // TODO: need data

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

  const collapsed = !user || !depositedPositions.length || isCollapse;

  return (
    <TopPanelWrapper
      className="DashboardTopPanel"
      isCollapse={collapsed}
      setIsCollapse={() => toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)}
      withoutCollapseButton={!user || !depositedPositions.length}
      minimizeMessage={messages.hideDetails}
      expandMessage={messages.showDetails}
    >
      <div className="DashboardTopPanel__wrapper">
        <div className="DashboardTopPanel__top--line">
          <div className="DashboardTopPanel__topContent">
            <p className="DashboardTopPanel__title">{intl.formatMessage(messages.overview)}</p>
            {!collapsed && !sm && <NetWorth value={netWorthUSD} />}
            <div className="DashboardTopPanel__topHiddenDiv">
              <p>{intl.formatMessage(collapsed ? messages.showDetails : messages.hideDetails)}</p>
            </div>
          </div>

          <GradientLine height={2} />
        </div>

        <div
          className={classNames('DashboardTopPanel__content', {
            DashboardTopPanel__contentCollapse: collapsed,
          })}
        >
          <NetAPYSection
            earnedAPY={earnedAPY}
            debtAPY={debtAPY}
            netWorth={netWorthUSD}
            isCollapse={collapsed}
          />

          <div className="DashboardTopPanel__sections">
            <SupplyBalanceSection
              isCollapse={collapsed}
              balance={user && user.totalLiquidityUSD !== '0' ? user.totalLiquidityUSD : 0}
              collateralUSD={
                user && user?.totalCollateralUSD !== '0' ? user?.totalCollateralUSD : 0
              }
              isUserInIsolationMode={user?.isInIsolationMode}
            />
            <BorrowBalanceSection
              isCollapse={collapsed}
              balance={user && user.totalBorrowsUSD !== '0' ? user.totalBorrowsUSD : 0}
              userId={user?.id}
            />
            <SectionWrapper isCollapse={collapsed}>
              <h1>TODO: HF</h1>
            </SectionWrapper>
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
