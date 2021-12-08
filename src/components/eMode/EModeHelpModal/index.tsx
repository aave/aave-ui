import React from 'react';
import { useIntl } from 'react-intl';

import HelpModalWrapper, { HelpModalWrapperProps } from '../../HelpModal/HelpModalWrapper';
import messages from './messages';

interface EModeHelpModalProps
  extends Pick<
    HelpModalWrapperProps,
    'iconSize' | 'className' | 'color' | 'lightWeight' | 'onWhiteBackground'
  > {}

export default function EModeHelpModal({
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: EModeHelpModalProps) {
  const intl = useIntl();

  return (
    <HelpModalWrapper
      text={intl.formatMessage(messages.title)}
      iconSize={iconSize}
      className={className}
      caption={intl.formatMessage(messages.modalCaption)}
      description={intl.formatMessage(messages.modalDescription)}
      color={color}
      lightWeight={lightWeight}
      onWhiteBackground={onWhiteBackground}
    />
  );
}
