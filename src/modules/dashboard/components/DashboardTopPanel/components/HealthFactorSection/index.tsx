import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import SectionWrapper from '../SectionWrapper';
import HealthFactorInfo from '../HealthFactorInfo';
import BorrowPowerUsedLine from '../BorrowPowerUsedLine';

import staticStyles from './style';

interface HealthFactorSectionProps {
  isCollapse: boolean;
  healthFactor: string;
  collateralUsagePercent: string;
}

export default function HealthFactorSection({
  isCollapse,
  healthFactor,
  collateralUsagePercent,
}: HealthFactorSectionProps) {
  const { md, sm } = useThemeContext();

  return (
    <SectionWrapper className="HealthFactorSection" isCollapse={isCollapse}>
      <HealthFactorInfo healthFactor={healthFactor} isCollapse={isCollapse} />

      {(!isCollapse || (md && !sm && !isCollapse)) && (
        <div className="HealthFactorSection__content">
          <BorrowPowerUsedLine collateralUsagePercent={collateralUsagePercent} />
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </SectionWrapper>
  );
}
