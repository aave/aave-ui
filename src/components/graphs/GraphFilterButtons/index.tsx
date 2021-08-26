import React from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import classNames from 'classnames';

import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

import {
  ReservesRatesHistoryMode,
  ReservesRatesHistorySetMode,
} from '../../../libs/pool-data-provider/hooks/use-reserve-rates-history-with-subscription';

interface Button {
  title: MessageDescriptor;
  mode: ReservesRatesHistoryMode;
}

interface GraphFilterButtonsProps {
  onWhiteBackground?: boolean;
  withoutBorder?: boolean;
}

export default function GraphFilterButtons({
  onWhiteBackground,
  setMode,
  mode,
  withoutBorder,
}: GraphFilterButtonsProps & ReservesRatesHistorySetMode) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const activeBackground = rgba(`${currentTheme.white.rgb}, 0.1`);

  const buttons: Button[] = [
    {
      title: messages.day,
      mode: undefined,
    },
    {
      title: messages.week,
      mode: 'week',
    },
    {
      title: messages.month,
      mode: 'month',
    },
    {
      title: messages.allTime,
      mode: 'all-time',
    },
  ];

  return (
    <div
      className={classNames('GraphFilterButtons', {
        GraphFilterButtons__onWhiteBg: onWhiteBackground,
        GraphFilterButtons__withoutBorder: withoutBorder,
      })}
    >
      {buttons.map((button, index) => (
        <button
          className="GraphFilterButtons__button"
          onClick={() => setMode(button.mode)}
          type="button"
          disabled={mode === button.mode}
          key={index}
        >
          {intl.formatMessage(button.title)}
        </button>
      ))}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .GraphFilterButtons {
          &__button {
            color: ${currentTheme.white.hex};
            &:disabled,
            &:hover {
              background: ${activeBackground};
            }
          }

          &__onWhiteBg {
            .GraphFilterButtons__button {
              color: ${currentTheme.darkBlue.hex};
              &:disabled,
              &:hover {
                background: ${currentTheme.darkBlue.hex};
                color: ${currentTheme.white.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
