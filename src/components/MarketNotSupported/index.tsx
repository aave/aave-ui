import React from 'react';
import { useIntl } from 'react-intl';
import NoDataPanel from '../NoDataPanel';

import messages from './messages';

/**
 * Component used to highlight that a certain feature is not supported on the currently selected market
 */
export default function MarketNotSupported() {
  const intl = useIntl();

  return (
    <NoDataPanel
      title={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      linkTo="/dashboard"
      buttonTitle={intl.formatMessage(messages.buttonTitle)}
    />
  );
}
