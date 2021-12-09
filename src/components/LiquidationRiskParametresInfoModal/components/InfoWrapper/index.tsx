import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface InfoWrapperProps {
  topContent: ReactNode;
  topText: string;
  children: ReactNode;
  bottomText: string;
}

export default function InfoWrapper({
  topContent,
  topText,
  children,
  bottomText,
}: InfoWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="InfoWrapper">
      {topContent}
      <p className="InfoWrapper__text InfoWrapper__textTop">{topText}</p>
      <div className="InfoWrapper__content">{children}</div>
      <p className="InfoWrapper__text">{bottomText}</p>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .InfoWrapper {
          border: 1px solid ${currentTheme.darkBlue.hex};
          &__text {
            color: ${currentTheme.lightBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
