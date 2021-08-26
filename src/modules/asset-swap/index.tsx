import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AssetSwapWrapper from './components/AssetSwapWrapper';
import AssetSwapMain from './screens/AssetSwapMain';
import AssetSwapConfirmation from './screens/AssetSwapConfirmation';

export default function CollateralSwap() {
  return (
    <AssetSwapWrapper>
      <Switch>
        <Route exact={true} path="/asset-swap" component={AssetSwapMain} />
        <Route exact={true} path="/asset-swap/confirmation" component={AssetSwapConfirmation} />
      </Switch>
    </AssetSwapWrapper>
  );
}
