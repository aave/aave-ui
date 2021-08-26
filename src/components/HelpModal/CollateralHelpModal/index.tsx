import React from 'react';
import { useIntl } from 'react-intl';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';

export default function CollateralHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  return (
    <HelpModalWrapper
      text={text}
      iconSize={iconSize}
      className={className}
      color={color}
      lightWeight={lightWeight}
      caption={intl.formatMessage(messages.caption)}
      description={intl.formatMessage(messages.description)}
      onWhiteBackground={onWhiteBackground}
    />
  );
}
