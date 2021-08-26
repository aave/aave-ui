import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';

import messages from './messages';
import staticStyles from './style';

type DashboardWrapperProps = {
  children: ReactNode;
};

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const intl = useIntl();

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      className="DashboardWrapper"
      withMobileGrayBg={true}
    >
      <div className="DashboardWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
}
