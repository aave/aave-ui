import React, { ReactNode } from 'react';
import classNames from 'classnames';

import ContentWrapper from '../../../../components/wrappers/ContentWrapper';

import staticStyles from './style';

interface AssetSwapContentWrapperProps {
  children: ReactNode;
  rightPanel?: ReactNode;
}

export default function AssetSwapContentWrapper({
  children,
  rightPanel,
}: AssetSwapContentWrapperProps) {
  return (
    <div
      className={classNames('AssetSwapContentWrapper', {
        AssetSwapContentWrapper__withRightPanel: !!rightPanel,
      })}
    >
      <ContentWrapper
        className="AssetSwapContentWrapper__content"
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
