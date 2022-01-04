import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AssetSwapWrapper from './components/AssetSwapWrapper';
import AssetSwapMain from './screens/AssetSwapMain';
import AssetSwapConfirmation from './screens/AssetSwapConfirmation';

export default function CollateralSwap() {
  return (
    <AssetSwapWrapper>
      <Routes>
        <Route path="/" element={<AssetSwapMain />} />
        <Route path="confirmation" element={<AssetSwapConfirmation />} />
      </Routes>
    </AssetSwapWrapper>
  );
}
