import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import goToTop from '../../../helpers/goToTop';

import staticStyles from './style';

interface TableItemWrapperProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  withGoToTop?: boolean;
  darkOnDarkMode?: boolean;
}

export default function TableItemWrapper({
  onClick,
  disabled,
  className,
  children,
  withGoToTop,
  darkOnDarkMode,
}: TableItemWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames(
        'TableItemWrapper',
        { TableItemWrapper__disabled: disabled },
        className
      )}
      onClick={() => {
        !disabled && onClick();
        withGoToTop && goToTop();
      }}
    >
      {children}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TableItemWrapper {
          background: ${darkOnDarkMode
            ? currentTheme.whiteItem.hex
            : currentTheme.whiteElement.hex};
          color: ${currentTheme.darkBlue.hex};
          &:hover {
            box-shadow: 0 0 9px 0 ${currentTheme.primary.hex};
          }
          &:active {
            border-color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </div>
  );
}
