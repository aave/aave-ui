import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import css from 'styled-jsx/css';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useMenuContext } from './libs/menu';
import { CURRENCY_ROUTE_PARAMS } from './helpers/router-types';
import ScreensWrapper from './components/wrappers/ScreensWrapper';

import {
  Markets,
  ReserveOverview,
  History,
  Deposit,
  Withdraw,
  Borrow,
  Repay,
  Faucet,
  Dashboard,
  Governance,
  Staking,
  AssetSwap,
  Reward,
} from './modules';
import SwapBorrowRateModeConfirmation from './modules/swap/SwapBorrowRateModeConfirmation';
import SwapUsageAsCollateralModeConfirmation from './modules/swap/SwapUsageAsCollateralModeConfirmation';
import { EModeConfirm } from './modules/emode/screens/EModeConfirm';
import { governanceConfig, stakeConfig } from './ui-config';
import { useProtocolDataContext } from './libs/protocol-data-provider';
import { isFeatureEnabled } from './helpers/config/markets-and-network-config';
import { useUserWalletDataContext } from './libs/web3-data-provider';

const staticStyles = css.global`
  .App {
    display: flex;
    flex-direction: column;
    flex: auto;
    overflow: hidden;
    height: 1px;
    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      position: relative;
    }
  }
`;

function ModulesWithMenu() {
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  return (
    <ScreensWrapper>
      <Routes>
        <Route path="/markets" element={<Markets />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/deposit/*" element={<Deposit />} />
        <Route path={`/withdraw/${CURRENCY_ROUTE_PARAMS}/*`} element={<Withdraw />} />

        <Route path="/borrow/*" element={<Borrow />} />
        <Route path={`/repay/${CURRENCY_ROUTE_PARAMS}/*`} element={<Repay />} />

        <Route
          path={`/interest-swap/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          element={<SwapBorrowRateModeConfirmation />}
        />

        <Route
          path={`/usage-as-collateral/${CURRENCY_ROUTE_PARAMS}/confirmation/*`}
          element={<SwapUsageAsCollateralModeConfirmation />}
        />

        <Route
          path={`/reserve-overview/${CURRENCY_ROUTE_PARAMS}/*`}
          element={<ReserveOverview />}
        />

        {!!governanceConfig && (
          <Route path="/governance/*" key="Governance" element={<Governance />} />
        )}
        {!!stakeConfig && <Route path="/staking/*" key="Staking" element={<Staking />} />}

        <Route path="/asset-swap/*" key="AssetSwap" element={<AssetSwap />} />
        <Route path="/rewards/*" key="Rewards" element={<Reward />} />
        <Route path="/emode/confirm/:newmode" key="E-Mode Confirm" element={<EModeConfirm />} />

        {currentAccount && <Route path="/history" key="History" element={<History />} />}

        {isFeatureEnabled.faucet(currentMarketData) && (
          <Route path="/faucet/*" key="Faucet" element={<Faucet />} />
        )}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ScreensWrapper>
  );
}

const App: React.FC = () => {
  const { md } = useThemeContext();
  const { openMobileMenu } = useMenuContext();

  const handlers = useSwipeable({
    onSwipedLeft: () => (md ? openMobileMenu() : null),
  });

  return (
    <div className="App">
      <div {...handlers} className="App__content">
        <ModulesWithMenu />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
};

export default App;
