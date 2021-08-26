import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';
import staticStyles from './style';

export default function NotHaveEnoughFundsToRepayHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <>
      <HelpModalWrapper
        text={text}
        iconSize={iconSize}
        className={classNames('NotHaveEnoughFundsToRepayHelpModal', className)}
        caption={intl.formatMessage(messages.caption)}
        description={
          <div className="NotHaveEnoughFundsToRepayHelpModal__content">
            <p>{intl.formatMessage(messages.descriptionFirst)}</p>
          </div>
        }
        color={color}
        lightWeight={lightWeight}
        onWhiteBackground={onWhiteBackground}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TextWithModal.NotHaveEnoughFundsToRepayHelpModal {
          .TextWithModal__text {
            color: ${currentTheme.darkOrange.hex} !important;
          }
        }
      `}</style>
    </>
  );
}
