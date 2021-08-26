import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { gradient, rgba, useThemeContext, Button } from '@aave/aave-ui-kit';

export interface DefaultButtonProps {
  onClick?: (event: any) => void;
  title: string;
  type?: 'button' | 'submit';
  color?: 'primary' | 'secondary' | 'dark' | 'green' | 'red' | 'white' | 'gradient';
  size?: 'big' | 'medium' | 'normal' | 'small';
  transparent?: boolean;
  mobileBig?: boolean;
  iconComponent?: ReactElement | ReactElement[];
  disabled?: boolean;
  className?: string;
  onDarkBackground?: boolean;
}

export default function DefaultButton({
  onClick,
  title,
  type = 'button',
  color = 'primary',
  size = 'medium',
  transparent,
  mobileBig,
  iconComponent,
  disabled,
  className,
  onDarkBackground,
}: DefaultButtonProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const backgroundGradient = gradient(
    -90,
    `${currentTheme.primary.rgb}, 1`,
    0,
    `${currentTheme.secondary.rgb}, 1`,
    100
  );

  const disabledColor = rgba(`${currentTheme.textDarkBlue.rgb}, 0.2`);

  return (
    <>
      <Button
        className={classNames(
          `DefaultButton`,
          `DefaultButton__${color}`,
          {
            DefaultButton__mobileBig: mobileBig,
            DefaultButton__transparent: transparent,
            DefaultButton__onDarkBackground: isCurrentThemeDark && onDarkBackground,
          },
          className
        )}
        title={title}
        disabled={disabled}
        onClick={onClick}
        iconComponent={iconComponent}
        transparent={transparent}
        mobileBig={mobileBig}
        size={size}
        type={type}
      />

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .DefaultButton {
          color: ${currentTheme.white.hex};

          &__primary {
            background: ${currentTheme.primary.hex};
            border-color: ${currentTheme.primary.hex};
          }
          &__secondary {
            background: ${currentTheme.secondary.hex};
            border-color: ${currentTheme.secondary.hex};
          }
          &__dark {
            color: ${currentTheme.whiteElement.hex};
            background: ${currentTheme.textDarkBlue.hex};
            border-color: ${currentTheme.textDarkBlue.hex};
            &.DefaultButton__transparent {
              background: transparent;
              color: ${currentTheme.textDarkBlue.hex};
              &:hover {
                background: ${currentTheme.textDarkBlue.hex};
                color: ${currentTheme.whiteElement.hex};
              }
            }
          }
          &__green {
            background: ${currentTheme.green.hex};
            border-color: ${currentTheme.green.hex};
          }
          &__red {
            background: ${currentTheme.red.hex};
            border-color: ${currentTheme.red.hex};
          }
          &__white {
            background: ${currentTheme.white.hex};
            border-color: ${currentTheme.white.hex};
            color: ${currentTheme.darkBlue.hex};
            &.DefaultButton__transparent {
              background: transparent;
              color: ${currentTheme.white.hex};
              &:hover {
                background: ${currentTheme.white.hex};
                color: ${currentTheme.darkBlue.hex};
              }
            }
          }
          &__gradient {
            background: ${backgroundGradient};
            color: ${currentTheme.white.hex};
          }

          &:disabled {
            background: ${currentTheme.mainBg.hex} !important;
            border-color: ${currentTheme.mainBg.hex} !important;
            color: ${disabledColor} !important;
            @include respond-to(sm) {
              background: ${currentTheme.disabledGray.hex} !important;
              border-color: ${currentTheme.disabledGray.hex} !important;
            }
          }
        }

        .DefaultButton__onDarkBackground {
          &:disabled {
            background: ${currentTheme.disabledGray.hex} !important;
            border-color: ${currentTheme.disabledGray.hex} !important;
          }
        }
      `}</style>
    </>
  );
}
