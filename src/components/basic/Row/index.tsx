import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

export interface RowProps {
  children?: ReactNode;
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
  className?: string;
  isColumn?: boolean;
  withMargin?: boolean;
  color?: 'dark' | 'lightBlue' | 'white';
  weight?: 'normal' | 'light';
  onWhiteBackground?: boolean;
}

export default function Row({
  children,
  title,
  subTitle,
  className,
  isColumn,
  withMargin,
  color = 'dark',
  weight = 'normal',
  onWhiteBackground,
}: RowProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('Row', className, `Row__${color}`, `Row__${weight}`, {
        Row__column: isColumn,
        Row__withMargin: withMargin,
      })}
    >
      {title && (
        <div className="Row__title-inner">
          <div className="Row__title">{title}</div>
          {subTitle && <span className="Row__subtitle">{subTitle}</span>}
        </div>
      )}

      {children && <div className="Row__content">{children}</div>}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .Row {
          &__dark {
            color: ${onWhiteBackground ? currentTheme.darkBlue.hex : currentTheme.textDarkBlue.hex};
          }
          &__lightBlue {
            color: ${currentTheme.lightBlue.hex};
          }
          &__white {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
