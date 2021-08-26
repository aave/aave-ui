import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DashboardWrapper from './components/DashboardWrapper';
import DashboardMain from './screens/Dashboard';

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <Switch>
        <Route path="/dashboard" component={DashboardMain} key="Dashboard" />
        <Redirect to="/dashboard" />
      </Switch>
    </DashboardWrapper>
  );
}
