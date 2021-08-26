import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface TailArrowProps {
  className?: string;
  type?: 'left' | 'right';
  color?: 'primary' | 'secondary' | 'green' | 'red' | 'dark' | 'white';
  onWhiteBackground?: boolean;
}

export default function TailArrow({
  className,
  type = 'left',
  color,
  onWhiteBackground,
}: TailArrowProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <i
        className={classNames('TailArrow', `TailArrow__${type}`, `TailArrow__${color}`, className)}
      />
      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TailArrow {
          &__primary {
            color: ${currentTheme.primary.hex};
            &:after,
            &:before {
              background: ${currentTheme.primary.hex};
            }
          }
          &__secondary {
            color: ${currentTheme.secondary.hex};
            &:after,
            &:before {
              background: ${currentTheme.secondary.hex};
            }
          }
          &__red {
            color: ${currentTheme.red.hex};
            &:after,
            &:before {
              background: ${currentTheme.red.hex};
            }
          }
          &__green {
            color: ${currentTheme.green.hex};
            &:after,
            &:before {
              background: ${currentTheme.green.hex};
            }
          }
          &__dark {
            color: ${onWhiteBackground ? currentTheme.darkBlue.hex : currentTheme.textDarkBlue.hex};
            &:after,
            &:before {
              background: ${onWhiteBackground
                ? currentTheme.darkBlue.hex
                : currentTheme.textDarkBlue.hex};
            }
          }
          &__white {
            color: ${currentTheme.white.hex};
            &:after,
            &:before {
              background: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </>
  );
}
