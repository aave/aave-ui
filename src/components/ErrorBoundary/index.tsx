import React from 'react';
import * as Sentry from '@sentry/browser';
import { injectIntl, WithIntlProps } from 'react-intl';

import ErrorPage from '../ErrorPage';
import DefaultButton from '../basic/DefaultButton';
import ReloadButton from './components/ReloadButton';

import messages from './messages';
import staticStyles from './style';

interface ErrorBoundaryState {
  error: Error | null | undefined;
  eventId: string;
}

// @ts-ignore
class ErrorBoundary extends React.Component<WithIntlProps> {
  state: ErrorBoundaryState = { error: null, eventId: '' };

  componentDidCatch(error: Error | null, errorInfo: any) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    const { intl } = this.props;
    const { error, eventId } = this.state;

    if (error) {
      return (
        <ErrorPage
          title={intl.formatMessage(messages.title)}
          description={intl.formatMessage(messages.description)}
        >
          <div className="ErrorBoundary">
            <div className="ErrorBoundary__button-inner">
              <DefaultButton
                title={intl.formatMessage(messages.buttonTitle)}
                onClick={() => Sentry.showReportDialog({ eventId })}
                size="big"
              />
            </div>

            <div className="ErrorBoundary__reload-inner">
              <ReloadButton />
            </div>

            <style jsx={true} global={true}>
              {staticStyles}
            </style>
          </div>
        </ErrorPage>
      );
    }
    return this.props.children;
  }
}

export default injectIntl(ErrorBoundary);
