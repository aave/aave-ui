import React from 'react';
import { useIntl } from 'react-intl';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';

export default function BorrowRatesHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  const { networkConfig } = useProtocolDataContext();
  return (
    <HelpModalWrapper
      text={text}
      iconSize={iconSize}
      className={className}
      color={color}
      lightWeight={lightWeight}
      caption={intl.formatMessage(messages.caption)}
      description={intl.formatMessage(messages.description, {
        token: networkConfig.rewardTokenSymbol,
      })}
      onWhiteBackground={onWhiteBackground}
      withGrayIcon={true}
    />
  );
}
