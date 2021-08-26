import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { StaticPoolDataProvider } from '../../libs/pool-data-provider';
import Preloader from '../basic/Preloader';
import ErrorPage from '../ErrorPage';

import messages from './messages';

interface StaticPoolDataProviderWrapperProps {
  children: ReactNode;
}

export default function StaticPoolDataProviderWrapper({
  children,
}: StaticPoolDataProviderWrapperProps) {
  const intl = useIntl();
  return (
    <StaticPoolDataProvider
      loader={<Preloader withBackground={true} />}
      errorPage={
        <ErrorPage
          title={intl.formatMessage(messages.errorTitle)}
          description={intl.formatMessage(messages.errorDescription)}
          buttonType="reload"
        />
      }
    >
      {children}
    </StaticPoolDataProvider>
  );
}
