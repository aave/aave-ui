import React from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import { TxStatusType } from '../../../helpers/send-ethereum-tx';
import DefaultButton from '../../basic/DefaultButton';
import Link from '../../basic/Link';

import messages from './messages';
import staticStyles from './style';

interface TextStatusProps {
  txStatus?: TxStatusType;
  goToAfterSuccess?: string;
  successButtonTitle?: string;
  submitted?: boolean;
  numberOfSteps?: number;
}

export default function TextStatus({
  txStatus,
  goToAfterSuccess,
  successButtonTitle,
  submitted,
  numberOfSteps,
}: TextStatusProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  let statusTitle: MessageDescriptor | undefined = undefined;
  if (txStatus === 'confirmed') {
    statusTitle = messages.confirmed;
  } else if (txStatus === 'error') {
    statusTitle = messages.failed;
  } else if (submitted) {
    statusTitle = messages.pending;
  }

  const step = (numberOfSteps || 1) + 1;

  return (
    <div className={classNames('TextStatus', `TextStatus__${txStatus}`)}>
      {statusTitle && (
        <p className="TextStatus__text">
          {txStatus === 'confirmed'
            ? `${step}/${step} ${intl.formatMessage(statusTitle)}`
            : intl.formatMessage(statusTitle)}
        </p>
      )}

      {txStatus === 'confirmed' && (
        <Link to={goToAfterSuccess || '/dashboard'} className="ButtonLink">
          <DefaultButton
            className="TextStatus__button"
            title={successButtonTitle || intl.formatMessage(messages.dashboard)}
          />
        </Link>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TextStatus {
          color: ${currentTheme.orange.hex};
          &__submitted {
            .TextStatus__text {
              color: ${currentTheme.orange.hex};
            }
          }
          &__error {
            .TextStatus__text {
              color: ${currentTheme.red.hex};
            }
          }
          &__confirmed {
            .TextStatus__text {
              color: ${currentTheme.green.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
