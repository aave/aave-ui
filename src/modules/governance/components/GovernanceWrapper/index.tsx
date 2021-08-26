import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import MainnetWarning from '../../../../components/MainnetWarning';

import messages from './messages';

interface GovernanceWrapperProps {
  children: ReactNode;
  className?: string;
  withMobileGrayBg?: boolean;
}

export default function GovernanceWrapper({
  children,
  className,
  withMobileGrayBg = true,
}: GovernanceWrapperProps) {
  const intl = useIntl();

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTitleOnDesktop={true}
      className={className}
      withMobileGrayBg={withMobileGrayBg}
    >
      <MainnetWarning />
      {children}
    </ScreenWrapper>
  );
}
