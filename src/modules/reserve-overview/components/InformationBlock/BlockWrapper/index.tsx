import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

export interface BlockWrapperProps {
  title?: string;
  titleComponent?: ReactNode;
  children: ReactNode;
}

export default function BlockWrapper({ title, titleComponent, children }: BlockWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="BlockWrapper">
      <div
        className={classNames('BlockWrapper__title-inner', {
          BlockWrapper__titleInnerWithComponent: !!titleComponent,
        })}
      >
        {title && <p>{title}</p>}
        {titleComponent && titleComponent}
      </div>
      <div className="BlockWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .BlockWrapper {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
