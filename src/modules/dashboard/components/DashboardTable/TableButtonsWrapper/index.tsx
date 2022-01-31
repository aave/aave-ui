import React, { ReactNode, Children } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

type TableButtonsWrapperProps = {
  children: ReactNode;
};

export default function TableButtonsWrapper({ children }: TableButtonsWrapperProps) {
  const { currentTheme } = useThemeContext();

  const countChildren = Children.toArray(children).length;

  return (
    <div
      className={classNames('TableButtonsWrapper', {
        TableButtonsWrapper__onlyOne: countChildren === 1,
      })}
    >
      {children}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';
        .TableButtonsWrapper {
          @include respond-to(sm) {
            &:after {
              background: ${currentTheme.mainBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
