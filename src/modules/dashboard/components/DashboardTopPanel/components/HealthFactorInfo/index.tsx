import React, { useState } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import HealthFactor from '../../../../../../components/HealthFactor';
import LiquidationRiskParametresInfoModal from '../../../../../../components/LiquidationRiskParametresInfoModal';

import staticStyles from './style';

interface HealthFactorInfoProps {
  healthFactor: string;
  loanToValue: string;
  isCollapse: boolean;
  currentLoanToValue: string;
  currentLiquidationThreshold: string;
}

export default function HealthFactorInfo({
  healthFactor,
  loanToValue,
  isCollapse,
  currentLoanToValue,
  currentLiquidationThreshold,
}: HealthFactorInfoProps) {
  const { md, sm } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <HealthFactor
        className={classNames('HealthFactorInfo', { HealthFactorInfo__collapsed: isCollapse })}
        value={healthFactor}
        isColumn={(md && isCollapse && !sm) || (!sm && !md)}
        helpIconSize={12}
        titleColor="white"
        titleLightWeight={true}
        withIcon={true}
        withDetailsModal={true}
        onDetailsClick={() => setIsVisible(true)}
      />

      <LiquidationRiskParametresInfoModal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        healthFactor={healthFactor}
        loanToValue={loanToValue}
        currentLoanToValue={currentLoanToValue}
        currentLiquidationThreshold={currentLiquidationThreshold}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
