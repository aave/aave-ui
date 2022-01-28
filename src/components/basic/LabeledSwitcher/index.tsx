import React from 'react';
import classNames from 'classnames';
import { gradient, useThemeContext, LabeledSwitch } from '@aave/aave-ui-kit';

type LabeledSwitcherProps = {
  value: boolean;
  leftOption: string;
  rightOption: string;
  onToggle: (value: boolean) => void;
  className?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  disabled?: boolean;
  white?: boolean;
  darkOnDarkMode?: boolean;
};

export default function LabeledSwitcher({
  value,
  leftOption,
  rightOption,
  onToggle,
  className,
  width,
  height,
  fontSize,
  disabled,
  white,
  darkOnDarkMode,
}: LabeledSwitcherProps) {
  const { currentTheme, xl, lg, md, isCurrentThemeDark } = useThemeContext();

  const gradientText = gradient(90, `${[0, 0, 0]}, 1`, 0, `${[0, 0, 1]}, 1`, 100);

  const baseWidth = xl && !md ? 160 : 240;
  const baseHeight = xl && !md ? (lg ? 26 : 32) : 36;
  const baseFontSize = xl && !md ? (lg ? 10 : 11) : 14;

  return (
    <>
      <LabeledSwitch
        value={value}
        leftOption={leftOption}
        rightOption={rightOption}
        onToggle={onToggle}
        disabled={disabled}
        className={classNames({ LabeledSwitch__white: white }, className)}
        width={width || baseWidth}
        height={height || baseHeight}
        fontSize={fontSize || baseFontSize}
      />

      <style jsx={true} global={true}>{`
        .LabeledSwitch {
          &__pointer {
            span {
              background: ${currentTheme.white.hex};
            }
          }
          &__pointer {
            padding: 2px 1px !important;
          }

          &__inner {
            background: #7159ff;
            border-color: #7159ff;
            border-radius: 4px;
          }

          button {
            span {
              background: ${currentTheme.white.hex};
            }
          }

          button.LabeledSwitch__buttonActive {
            span {
              background-image: ${gradientText};
            }
          }
        }

        .LabeledSwitch__white {
          .LabeledSwitch__inner {
            background: ${currentTheme.textDarkBlue.hex};
            border-color: ${currentTheme.textDarkBlue.hex};
          }

          .LabeledSwitch__pointer {
            span {
              background: ${currentTheme.whiteElement.hex};
            }
          }

          button {
            span {
              background: ${currentTheme.whiteElement.hex};
            }
          }
        }

        .LabeledSwitchDisabled {
          .LabeledSwitch__inner {
            background: ${currentTheme.disabledGray.hex};
            border-color: ${currentTheme.disabledGray.hex};
          }
        }
      `}</style>
    </>
  );
}
