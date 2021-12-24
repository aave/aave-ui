import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import TextWithModal from '../../TextWithModal';
import { CapType } from '../helper';
import Caption from '../../basic/Caption';

import messages from './messages';

interface AvailableCapsHelpModalProps {
  title?: string;
  shortTitle?: boolean;
  capType: CapType;
  className?: string;
  iconSize?: number;
  onWhiteBackground?: boolean;
  color?: 'white' | 'dark';
}

export default function AvailableCapsHelpModal({
  title,
  capType,
  className,
  iconSize,
  onWhiteBackground,
  color,
  shortTitle,
}: AvailableCapsHelpModalProps) {
  const intl = useIntl();

  const formattedTitle =
    capType === CapType.supplyCap ? messages.supplyCapTitle : messages.borrowCapTitle;
  const description =
    capType === CapType.supplyCap ? messages.supplyCapDescription : messages.borrowCapDescription;

  return (
    <TextWithModal
      className={classNames('AvailableCapsHelpModal', className)}
      text={title || intl.formatMessage(shortTitle ? messages.shortTitle : formattedTitle)}
      withCloseButton={true}
      onWhiteBackground={onWhiteBackground}
      iconSize={iconSize}
      color={color}
    >
      <Caption
        title={intl.formatMessage(formattedTitle)}
        description={intl.formatMessage(description)}
        onWhiteBackground={true}
      />
    </TextWithModal>
  );
}
