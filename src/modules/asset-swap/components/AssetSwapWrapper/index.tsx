import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';

import defaultMessages from '../../../../defaultMessages';

interface AssetSwapWrapperProps {
  children: ReactNode;
}

export default function AssetSwapWrapper({ children }: AssetSwapWrapperProps) {
  const intl = useIntl();

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(defaultMessages.swap)}
      isTitleOnDesktop={true}
      withMobileGrayBg={true}
    >
      {children}
    </ScreenWrapper>
  );
}
