import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import { FormatUserSummaryAndIncentivesResponse } from '@aave/math-utils';

import toggleLocalStorageClick from '../../../../helpers/toggle-local-storage-click';
import TopPanelWrapper from '../../../../components/wrappers/TopPanelWrapper';
import GradientLine from '../../../../components/basic/GradientLine';
import NetWorth from './components/NetWorth';
import NetAPYSection from './components/NetAPYSection';
import DepositBalanceSection from './components/DepositBalanceSection';
import BorrowBalanceSection from './components/BorrowBalanceSection';
import HealthFactorSection from './components/HealthFactorSection';

import messages from './messages';
import staticStyles from './style';

interface DashboardTopPanelProps {
  user?: FormatUserSummaryAndIncentivesResponse & { earnedAPY: number; debtAPY: number };
  userId?: string;
  collateralUsagePercent: string;
  loanToValue: string;
}

export default function DashboardTopPanel({
  user,
  userId,
  collateralUsagePercent,
  loanToValue,
}: DashboardTopPanelProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const localStorageName = 'dashboardTopPanel';
  const [isCollapse, setIsCollapse] = useState<boolean>(
    localStorage.getItem(localStorageName) === 'true' || true
  );

  const netWorthUSD = Number(user?.netWorthUSD || 0);

  const collapsed = !userId || !user || !isCollapse || !netWorthUSD;

  return (
    <TopPanelWrapper
      className="DashboardTopPanel"
      isCollapse={collapsed}
      setIsCollapse={() => toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)}
      withoutCollapseButton={!userId || !user || !netWorthUSD}
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
          {userId && user && !!netWorthUSD && (
            <NetAPYSection
              earnedAPY={user?.earnedAPY || 0}
              debtAPY={user?.debtAPY || 0}
              netWorth={netWorthUSD}
              isCollapse={collapsed}
            />
          )}

          <div className="DashboardTopPanel__sections">
            <DepositBalanceSection
              isCollapse={collapsed}
              balance={user && user.totalLiquidityUSD !== '0' ? user.totalLiquidityUSD : 0}
              collateralUSD={
                user && user?.totalCollateralUSD !== '0' ? user?.totalCollateralUSD : 0
              }
              isUserInIsolationMode={user?.isInIsolationMode}
              userId={userId}
            />
            <BorrowBalanceSection
              isCollapse={collapsed}
              balance={user && user.totalBorrowsUSD !== '0' ? user.totalBorrowsUSD : 0}
              userId={userId}
            />

            {userId && user && !!netWorthUSD && (
              <HealthFactorSection
                isCollapse={collapsed}
                healthFactor={user?.healthFactor || '-1'}
                collateralUsagePercent={collateralUsagePercent}
                loanToValue={loanToValue}
                currentLoanToValue={user?.currentLoanToValue || '0'}
                currentLiquidationThreshold={user?.currentLiquidationThreshold || '0'}
              />
            )}
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
