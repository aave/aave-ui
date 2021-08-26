import React, { ReactNode } from 'react';

import ScreenWrapper from '../ScreenWrapper';
import ContentWrapper from '../ContentWrapper';

interface RepayWithdrawWrapperProps {
  pageTitle: string;
  children?: ReactNode;
}

export default function SwapConfirmationWrapper({
  pageTitle,
  children,
}: RepayWithdrawWrapperProps) {
  return (
    <ScreenWrapper pageTitle={pageTitle} isTitleOnDesktop={true}>
      <ContentWrapper withFullHeight={true} withBackButton={true}>
        {children}
      </ContentWrapper>
    </ScreenWrapper>
  );
}
