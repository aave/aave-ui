import React, { ReactNode } from 'react';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import ContentWrapperWithTopLine from '../ContentWrapperWithTopLine';

import staticStyles from './style';

interface RightPanelWrapperProps {
  title: string;
  children: ReactNode;
}

export default function RightPanelWrapper({ title, children }: RightPanelWrapperProps) {
  const { currentTheme } = useThemeContext();

  const rowBorderColor = rgba(`${currentTheme.lightBlue.rgb}, 0.1`);

  return (
    <ContentWrapperWithTopLine title={title} className="RightPanelWrapper">
      {children}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .RightPanelWrapper {
          .Row {
            border-bottom: 1px solid ${rowBorderColor};
          }

          .HealthFactor__no-value {
            color: ${currentTheme.textDarkBlue.hex} !important;
          }
          .ValuePercent__secondary {
            span {
              color: ${currentTheme.secondary.hex} !important;
            }
          }
        }
      `}</style>
    </ContentWrapperWithTopLine>
  );
}
