import React from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import HelpItem from '../../HelpItem';
import TextWithModal from '../../TextWithModal';

import messages from './messages';

import { HelpModalProps } from '../types';

export default function BorrowInterestHelpModal({
  text,
  iconSize,
  className,
  lightWeight,
  color,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <TextWithModal
      text={text}
      iconSize={iconSize}
      className={className}
      color={color}
      lightWeight={lightWeight}
      onWhiteBackground={onWhiteBackground}
    >
      <HelpItem
        caption={intl.formatMessage(messages.firstHelpItemCaption)}
        description={
          <p className="BorrowInterestHelpModal__text">
            {intl.formatMessage(messages.firstHelpItemDescription, {
              stay: (
                <span style={{ color: `${currentTheme.primary.hex}` }}>
                  {intl.formatMessage(messages.stayTheSame)}
                </span>
              ),
            })}
          </p>
        }
        captionColor="primary"
      />
      <HelpItem
        caption={intl.formatMessage(messages.secondHelpItemCaption)}
        description={intl.formatMessage(messages.secondHelpItemDescription, {
          fluctuate: (
            <span style={{ color: `${currentTheme.secondary.hex}` }}>
              {intl.formatMessage(messages.fluctuate)}
            </span>
          ),
        })}
        captionColor="secondary"
      />
    </TextWithModal>
  );
}
