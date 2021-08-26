import React from 'react';
import classNames from 'classnames';

import { rgba, useThemeContext, Switcher } from '@aave/aave-ui-kit';

type CustomSwitchProps = {
  onSwitch: (value: boolean) => void;
  offLabel?: string;
  onLabel?: string;
  onColor?: string;
  offColor?: string;
  value: boolean | undefined;
  disabled?: boolean;
  swiperHeight: number;
  swiperWidth: number;
  withOutDelay?: boolean;
  className?: string;
  classNameSwiper?: string;
  onDarkBackground?: boolean;
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
  onDarkBackground,
}: CustomSwitchProps) {
  const { currentTheme } = useThemeContext();

  const disabledBackground = rgba(
    `${onDarkBackground ? currentTheme.lightGray.rgb : currentTheme.textDarkBlue.rgb}, 0.3`
  );

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
              background: ${disabledBackground} !important;
            }
          }
        }
      `}</style>
    </>
  );
}
