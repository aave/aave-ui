import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext, Switcher } from '@aave/aave-ui-kit';

type CustomSwitchProps = {
  onSwitch: (value: boolean) => void;
  offLabel?: string | ReactNode;
  onLabel?: string | ReactNode;
  onColor?: string;
  offColor?: string;
  value: boolean | undefined;
  disabled?: boolean;
  swiperHeight: number;
  swiperWidth: number;
  withOutDelay?: boolean;
  className?: string;
  classNameSwiper?: string;
};

export default function CustomSwitch({
  onSwitch,
  onLabel,
  offLabel,
  value = false,
  onColor,
  offColor,
  disabled,
  swiperHeight,
  swiperWidth,
  withOutDelay,
  className,
  classNameSwiper,
}: CustomSwitchProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <Switcher
        className={classNames(`CustomSwitch`, className)}
        onSwitch={onSwitch}
        onLabel={onLabel}
        offLabel={offLabel}
        value={value}
        onColor={onColor}
        offColor={offColor}
        disabled={disabled}
        swiperHeight={swiperHeight}
        swiperWidth={swiperWidth}
        withOutDelay={withOutDelay}
        classNameSwiper={classNameSwiper}
      />

      <style jsx={true} global={true}>{`
        .CustomSwitch {
          .Switcher__swiperDisabled {
            .react-switch-bg {
              background: ${currentTheme.lightBlue.hex} !important;
            }
          }
        }
      `}</style>
    </>
  );
}
