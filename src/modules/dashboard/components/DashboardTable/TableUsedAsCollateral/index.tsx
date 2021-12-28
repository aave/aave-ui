import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import CustomSwitch from '../../../../../components/basic/CustomSwitch';
import DashboardIsolatedBadge from '../../DashboardIsolatedBadge';

import staticStyles from './style';

import isolatedOn from './images/isolatedOn.svg';
import isolatedOff from './images/isolatedOff.svg';
import isolatedDisabled from './images/isolatedDisabled.svg';

interface TableUsedAsCollateralProps {
  isIsolated: boolean;
  usageAsCollateralEnabledOnUser: boolean;
  canBeEnabledAsCollateral: boolean;
  onToggleSwitch: () => void;
}

export default function TableUsedAsCollateral({
  isIsolated,
  usageAsCollateralEnabledOnUser,
  canBeEnabledAsCollateral,
  onToggleSwitch,
}: TableUsedAsCollateralProps) {
  const { currentTheme, xl, lg, md, sm } = useThemeContext();

  const swiperWidth = xl && !lg ? 30 : md && !sm ? 30 : sm ? 50 : 40;
  const swiperHeight = xl && !lg ? 16 : md && !sm ? 16 : sm ? 24 : 20;

  const isEnabled = usageAsCollateralEnabledOnUser && canBeEnabledAsCollateral;

  return (
    <div className="TableUsedAsCollateral">
      {!isIsolated ? (
        <CustomSwitch
          value={isEnabled}
          onColor={currentTheme.green.hex}
          offColor={!canBeEnabledAsCollateral ? currentTheme.lightBlue.hex : currentTheme.red.hex}
          onSwitch={onToggleSwitch}
          disabled={!canBeEnabledAsCollateral}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
        />
      ) : (
        <DashboardIsolatedBadge>
          <div className="TableUsedAsCollateral__isolatedInner">
            {!isEnabled && (
              <img
                className="TableUsedAsCollateral__isolatedIcon TableUsedAsCollateral__isolatedIconLeft"
                src={!canBeEnabledAsCollateral ? isolatedDisabled : isolatedOff}
                alt=""
              />
            )}
            <CustomSwitch
              value={isEnabled}
              onColor={currentTheme.green.hex}
              offColor={
                !canBeEnabledAsCollateral ? currentTheme.lightBlue.hex : currentTheme.red.hex
              }
              onSwitch={onToggleSwitch}
              disabled={!canBeEnabledAsCollateral}
              swiperHeight={swiperHeight}
              swiperWidth={swiperWidth}
            />
            {isEnabled && (
              <img
                className="TableUsedAsCollateral__isolatedIcon TableUsedAsCollateral__isolatedIconRight"
                src={isolatedOn}
                alt=""
              />
            )}
          </div>
        </DashboardIsolatedBadge>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
