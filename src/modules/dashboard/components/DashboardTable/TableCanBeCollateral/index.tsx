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
      return <img className="TableCanBeCollateral__image" src={yesIcon} alt="" />;
    } else {
      return <NoData color="dark" />;
    }
  };

  return (
    <div className="TableCanBeCollateralWrapper">
      {!isIsolated ? (
        <p className="TableCanBeCollateral">
          <CollateralStates />
        </p>
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
