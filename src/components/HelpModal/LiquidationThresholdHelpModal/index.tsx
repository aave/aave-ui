import React from 'react';
import { useIntl } from 'react-intl';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';

export default function LiquidationThresholdHelpModal({
  text,
  iconSize,
  className,
  caption,
  description,
  lightWeight,
  color,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  return (
    <HelpModalWrapper
      text={text}
      iconSize={iconSize}
      className={className}
      caption={caption ? caption : intl.formatMessage(messages.caption)}
      description={description ? description : intl.formatMessage(messages.description)}
      lightWeight={lightWeight}
      color={color}
      onWhiteBackground={onWhiteBackground}
    />
  );
}
