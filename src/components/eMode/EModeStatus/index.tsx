import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

export enum EmodeStatus {
  disabled = 'disabled',
  enabled = 'enabled',
}

interface EModeStatusProps {
  isEModeEnabled: boolean;
}

export default function EModeStatus({ isEModeEnabled }: EModeStatusProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const status = isEModeEnabled ? EmodeStatus.enabled : EmodeStatus.disabled;
  const statusText = isEModeEnabled ? messages.enabled : messages.disabled;

  return (
    <div className={classNames('EModeStatus', `EModeStatus__${status}`)}>
      <strong>{intl.formatMessage(statusText)}</strong>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .EModeStatus {
          &__disabled {
            color: ${currentTheme.lightBlue.hex};
            &:after {
              background: ${currentTheme.lightBlue.hex};
            }
          }
          &__enabled {
            color: ${currentTheme.green.hex};
            &:after {
              background: ${currentTheme.green.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
