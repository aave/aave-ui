import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface SectionWrapperProps {
  isCollapse: boolean;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ isCollapse, children, className }: SectionWrapperProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div
      className={classNames('SectionWrapper', className, { SectionWrapper__collapse: isCollapse })}
    >
      {children}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';

        .SectionWrapper {
          border-right: 1px solid
            ${isCurrentThemeDark ? currentTheme.mainBg.hex : currentTheme.headerBg.hex};

          &.SectionWrapper__collapse {
            @include respond-to(md) {
              border-right: 1px solid
                ${isCurrentThemeDark ? currentTheme.mainBg.hex : currentTheme.headerBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
