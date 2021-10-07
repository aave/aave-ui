import React, { ReactNode } from 'react';

import HelpItem from '../../HelpItem';
import TextWithModal from '../../TextWithModal';

export interface HelpModalWrapperProps {
  text: string;
  iconSize?: number;
  className?: string;
  caption: string;
  description: string | ReactNode;
  color?: 'dark' | 'white';
  lightWeight?: boolean;
  onWhiteBackground?: boolean;
  modalClassName?: string;
  clickOnText?: boolean;
  withGrayIcon?: boolean;
  captionColor?: 'primary' | 'secondary' | 'dark';
}

export default function HelpModalWrapper({
  text,
  iconSize,
  className,
  caption,
  description,
  color,
  lightWeight,
  onWhiteBackground,
  modalClassName,
  clickOnText,
  withGrayIcon,
  captionColor,
}: HelpModalWrapperProps) {
  return (
    <TextWithModal
      text={text}
      iconSize={iconSize}
      className={className}
      color={color}
      lightWeight={lightWeight}
      onWhiteBackground={onWhiteBackground}
      modalClassName={modalClassName}
      clickOnText={clickOnText}
      withGrayIcon={withGrayIcon}
    >
      <HelpItem
        caption={caption}
        description={description}
        onWhiteBackground={onWhiteBackground}
        captionColor={captionColor}
      />
    </TextWithModal>
  );
}
