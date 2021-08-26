import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';

import defaultMessages from '../../../../defaultMessages';
import staticStyles from './style';

interface AssetSwapWrapperProps {
  children: ReactNode;
}

export default function AssetSwapWrapper({ children }: AssetSwapWrapperProps) {
  const intl = useIntl();

  return (
    <ScreenWrapper pageTitle={intl.formatMessage(defaultMessages.swap)} isTitleOnDesktop={true}>
      <ContentWrapper
        className="AssetSwapWrapper__content"
        withFullHeight={true}
        withBackButton={true}
      >
        {children}
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
}
