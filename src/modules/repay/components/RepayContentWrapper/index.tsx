import React, { ReactNode } from 'react';
import classNames from 'classnames';

import ContentWrapper from '../../../../components/wrappers/ContentWrapper';

import staticStyles from './style';

interface RepayContentWrapperProps {
  children: ReactNode;
  rightPanel?: ReactNode;
}

export default function RepayContentWrapper({ children, rightPanel }: RepayContentWrapperProps) {
  return (
    <div
      className={classNames('RepayContentWrapper', {
        RepayContentWrapper__withRightPanel: !!rightPanel,
      })}
    >
      <ContentWrapper
        className="RepayContentWrapper__content"
        withFullHeight={true}
        withBackButton={true}
      >
        {children}
      </ContentWrapper>

      {!!rightPanel && rightPanel}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
