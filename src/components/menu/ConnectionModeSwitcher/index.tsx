import React from 'react';
import { useIntl } from 'react-intl';

import SwitcherWrapper from '../SwitcherWrapper';

import messages from './messages';
import { useConnectionStatusContext } from '../../../libs/connection-status-provider';

export default function ConnectionModeSwitcher() {
  const intl = useIntl();
  const { isRPCMandatory, isRPCActive, changePreferredConnectionMode } =
    useConnectionStatusContext();

  return (
    <SwitcherWrapper
      title={intl.formatMessage(messages.connectionMode)}
      value={isRPCActive}
      leftOption={intl.formatMessage(messages.normal)}
      rightOption={intl.formatMessage(messages.light)}
      onToggle={changePreferredConnectionMode}
      disabled={isRPCMandatory}
    />
  );
}
