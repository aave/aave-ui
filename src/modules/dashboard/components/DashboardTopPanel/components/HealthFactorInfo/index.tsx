import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import HealthFactor from '../../../../../../components/HealthFactor';

import staticStyles from './style';

interface HealthFactorInfoProps {
  healthFactor: string;
  isCollapse: boolean;
}

export default function HealthFactorInfo({ healthFactor, isCollapse }: HealthFactorInfoProps) {
  const { md, sm } = useThemeContext();

  return (
    <>
      <HealthFactor
        className={classNames('HealthFactorInfo', { HealthFactorInfo__collapsed: isCollapse })}
        value={healthFactor}
        isColumn={(md && isCollapse && !sm) || (!sm && !md)}
        helpIconSize={12}
        titleColor="white"
        titleLightWeight={true}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
