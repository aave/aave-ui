import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import SectionWrapper from '../SectionWrapper';
import Balance from '../Balance';

interface BalanceSectionWrapperProps {
  isCollapse: boolean;
  title: string;
  value: number | string;
  children?: ReactNode;
}

export default function BalanceSectionWrapper({
  isCollapse,
  title,
  value,
  children,
}: BalanceSectionWrapperProps) {
  const { sm } = useThemeContext();

  return (
    <SectionWrapper isCollapse={isCollapse}>
      <Balance title={title} value={value} isCollapse={isCollapse} />

      {!!children && !isCollapse && !sm && (
        <div className="BalanceSectionWrapper__content">{children}</div>
      )}
    </SectionWrapper>
  );
}
