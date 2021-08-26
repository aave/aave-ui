import React from 'react';
import { useIntl } from 'react-intl';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';

export default function LiquidationBonusHelpModal({
  text,
  iconSize,
  className,
  caption,
  description,
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
      caption={caption ? caption : intl.formatMessage(messages.caption)}
      description={description ? description : intl.formatMessage(messages.description)}
      color={color}
      lightWeight={lightWeight}
      onWhiteBackground={onWhiteBackground}
    />
  );
}
