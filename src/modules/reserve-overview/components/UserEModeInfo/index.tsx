import React from 'react';
import { useIntl } from 'react-intl';

import { getEmodeMessage } from '../../../../ui-config/branding/DashboardLeftTopLine';

import messages from './messages';
import staticStyles from './style';

interface UserEModeInfoProps {
  userEmodeCategoryId: number;
}

export default function UserEModeInfo({ userEmodeCategoryId }: UserEModeInfoProps) {
  const intl = useIntl();

  return (
    <div className="UserEModeInfo">
      <p>{intl.formatMessage(messages.unavailable)}</p>
      <p>
        {intl.formatMessage(messages.for, {
          eModeCategory: getEmodeMessage(userEmodeCategoryId, intl),
        })}
      </p>

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
