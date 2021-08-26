import React, { ReactNode } from 'react';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface DelegationFieldInnerProps {
  title: string;
  children: ReactNode;
}

export default function DelegationFieldInner({ title, children }: DelegationFieldInnerProps) {
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();

  const hoverBackground = rgba(
    `${currentTheme.darkBlue.rgb}, ${isCurrentThemeDark ? '0.25' : '0.1'}`
  );

  return (
    <div className="DelegationFieldInner">
      <p className="DelegationFieldInner__title">{title}</p>
      {children}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DelegationFieldInner {
          &__title {
            color: ${currentTheme.textDarkBlue.hex};
          }

          .Delegation__select {
            .SelectField__select {
              border: 1px solid
                ${isCurrentThemeDark
                  ? sm
                    ? currentTheme.white.hex
                    : currentTheme.whiteItem.hex
                  : currentTheme.textDarkBlue.hex};
            }
          }

          .Delegation__select-item {
            color: ${currentTheme.darkBlue.hex};
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
            &:hover,
            &:disabled {
              background: ${hoverBackground};
            }
          }
        }
      `}</style>
    </div>
  );
}
