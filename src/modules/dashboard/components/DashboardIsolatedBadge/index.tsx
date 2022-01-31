import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import IsolatedBadge from '../../../../components/isolationMode/IsolatedBadge';

import staticStyles from './style';

interface DashboardIsolatedBadgeProps {
  children: ReactNode;
}

export default function DashboardIsolatedBadge({ children }: DashboardIsolatedBadgeProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="DashboardIsolatedBadge">
      {children}

      <IsolatedBadge isLightBlueIcon={true} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardIsolatedBadge {
          .IsolatedBadge {
            .IsolatedBadge__text {
              color: ${currentTheme.lightBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
