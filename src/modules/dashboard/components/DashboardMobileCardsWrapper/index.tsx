import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import TableBottomText from '../DashboardTable/TableBottomText';

import staticStyles from './style';

interface DashboardMobileCardsWrapperProps {
  title?: string;
  withTopMargin?: boolean;
  withBottomText?: boolean;
  children: ReactNode;
}

export default function DashboardMobileCardsWrapper({
  title,
  withTopMargin,
  children,
  withBottomText,
}: DashboardMobileCardsWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('DashboardMobileCardsWrapper', {
        DashboardMobileCardsWrapper__withTopMargin: withTopMargin,
      })}
    >
      {title && (
        <div className="DashboardMobileCardsWrapper__title">
          <strong>{title}</strong>
        </div>
      )}

      {children}

      {withBottomText && <TableBottomText />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .DashboardMobileCardsWrapper {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
