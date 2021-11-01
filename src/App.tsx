import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import css from 'styled-jsx/css';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from './libs/pool-data-provider';
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
} from './modules';
import SwapBorrowRateModeConfirmation from './modules/swap/SwapBorrowRateModeConfirmation';
import SwapUsageAsCollateralModeConfirmation from './modules/swap/SwapUsageAsCollateralModeConfirmation';
import { RewardConfirm } from './modules/reward/screens/RewardConfirm';
import { governanceConfig, stakeConfig } from './ui-config';
import { useProtocolDataContext } from './libs/protocol-data-provider';
import { isFeatureEnabled } from './helpers/config/markets-and-network-config';

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
  const { isUserHasDeposits, userId } = useStaticPoolDataContext();
  const { currentMarketData } = useProtocolDataContext();

  return (
    <ScreensWrapper>
      <Switch>
        <Route path="/markets" component={Markets} />
        <Route path="/dashboard" component={Dashboard} />

        <Route path="/deposit" component={Deposit} />
        <Route path={`/withdraw/${CURRENCY_ROUTE_PARAMS}`} component={Withdraw} />

        <Route path="/borrow" component={Borrow} />
        <Route path={`/repay/${CURRENCY_ROUTE_PARAMS}`} component={Repay} />

        <Route
          exact={true}
          path={`/interest-swap/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          component={SwapBorrowRateModeConfirmation}
        />

        <Route
          exact={true}
          path={`/usage-as-collateral/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          component={SwapUsageAsCollateralModeConfirmation}
        />

        <Route
          exact={true}
          path={`/reserve-overview/${CURRENCY_ROUTE_PARAMS}`}
          component={ReserveOverview}
        />

        {!!governanceConfig && [
          <Route path="/governance" component={Governance} key="Governance" />,
        ]}
        {!!stakeConfig && [<Route path="/staking" component={Staking} key="Staking" />]}

        <Route path="/asset-swap" component={AssetSwap} key="AssetSwap" />
        <Route
          path="/rewards/confirm/:incentivesControllerAddress"
          component={RewardConfirm}
          key="Reward confirm"
        />

        {userId && [<Route exact={true} path="/history" component={History} key="History" />]}

        {isFeatureEnabled.faucet(currentMarketData) && [
          <Route path="/faucet" component={Faucet} key="Faucet" />,
        ]}

        <Redirect to={isUserHasDeposits ? '/dashboard' : '/markets'} />
      </Switch>
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
        <Switch>
          <Route component={ModulesWithMenu} />
        </Switch>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
};

export default App;
