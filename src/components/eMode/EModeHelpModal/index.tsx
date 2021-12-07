import React from 'react';

import HelpModalWrapper from '../../HelpModal/HelpModalWrapper';
import { HelpModalProps } from '../../HelpModal/types';

export default function EModeHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: HelpModalProps) {
  return (
    <HelpModalWrapper
      text={text}
      iconSize={iconSize}
      className={className}
      caption="TODO: need text" // TODO: need text
      description="TODO: need text"
      color={color}
      lightWeight={lightWeight}
      onWhiteBackground={onWhiteBackground}
    />
  );
}
