import React from 'react';

import DashboardIsolatedBadge from '../../DashboardIsolatedBadge';
import NoData from '../../../../../components/basic/NoData';

import staticStyles from './style';

import yesIcon from './images/yesIcon.svg';

interface TableCanBeCollateralProps {
  isIsolated: boolean;
  usageAsCollateralEnabled: boolean;
}

export default function TableCanBeCollateral({
  isIsolated,
  usageAsCollateralEnabled,
}: TableCanBeCollateralProps) {
  const CollateralStates = () => {
    if (usageAsCollateralEnabled) {
      return (
        <div className="TableCanBeCollateral__imageInner">
          <img className="TableCanBeCollateral__image" src={yesIcon} alt="" />
        </div>
      );
    } else {
      return <NoData color="dark" />;
    }
  };

  return (
    <div className="TableCanBeCollateralWrapper">
      {!isIsolated ? (
        <div className="TableCanBeCollateral">
          <CollateralStates />
        </div>
      ) : (
        <DashboardIsolatedBadge>
          <CollateralStates />
        </DashboardIsolatedBadge>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
