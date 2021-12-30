import React, { ReactNode } from 'react';
import classNames from 'classnames';

import SectionWrapper from '../SectionWrapper';
import Balance from '../Balance';

import staticStyles from './style';

interface BalanceSectionWrapperProps {
  isCollapse: boolean;
  title: string;
  value: number | string;
  children?: ReactNode;
  className?: string;
  type?: 'deposit' | 'borrow';
  zeroState?: boolean;
}

export default function BalanceSectionWrapper({
  isCollapse,
  title,
  value,
  children,
  className,
  type,
  zeroState,
}: BalanceSectionWrapperProps) {
  return (
    <SectionWrapper
      className={classNames('BalanceSectionWrapper', className, {
        BalanceSectionWrapper__zeroState: zeroState,
      })}
      isCollapse={isCollapse}
    >
      <Balance title={title} value={value} isCollapse={isCollapse} type={type} />

      {!!children && <div className="BalanceSectionWrapper__content">{children}</div>}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </SectionWrapper>
  );
}
