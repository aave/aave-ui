import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AssetSwapWrapper from './components/AssetSwapWrapper';
import AssetSwapMain from './screens/AssetSwapMain';
import AssetSwapConfirmation from './screens/AssetSwapConfirmation';

export default function CollateralSwap() {
  return (
    <AssetSwapWrapper>
      <Routes>
        <Route path="/asset-swap" element={<AssetSwapMain />} />
        <Route path="/asset-swap/confirmation" element={<AssetSwapConfirmation />} />
      </Routes>
    </AssetSwapWrapper>
  );
}
