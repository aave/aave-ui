import React from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface NoDataProps {
  color?: 'dark' | 'white' | 'lightBlue';
  className?: string;
  onWhiteBackground?: boolean;
}

export default function NoData({ color = 'white', className, onWhiteBackground }: NoDataProps) {
  const { currentTheme } = useThemeContext();

  return (
    <span className={classNames('NoData', `NoData__${color}`, className)}>
      —<style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .NoData {
          &__dark {
            color: ${onWhiteBackground ? currentTheme.darkBlue.hex : currentTheme.textDarkBlue.hex};
          }
          &__white {
            color: ${currentTheme.white.hex};
          }
          &__lightBlue {
            color: ${currentTheme.lightBlue.hex};
          }
        }
      `}</style>
    </span>
  );
}
