import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import TextWithModal from '../../TextWithModal';
import { CapType } from '../helper';
import Caption from '../../basic/Caption';

import messages from './messages';

interface AvailableCapsHelpModalProps {
  shortTitle?: boolean;
  capType: CapType;
  className?: string;
  iconSize?: number;
  onWhiteBackground?: boolean;
  color?: 'white' | 'dark';
}

export default function AvailableCapsHelpModal({
  capType,
  className,
  iconSize,
  onWhiteBackground,
  color,
  shortTitle,
}: AvailableCapsHelpModalProps) {
  const intl = useIntl();

  const title = capType === CapType.supplyCap ? messages.supplyCapTitle : messages.borrowCapTitle;
  const description =
    capType === CapType.supplyCap ? messages.supplyCapDescription : messages.borrowCapDescription;

  return (
    <TextWithModal
      className={classNames('AvailableCapsHelpModal', className)}
      text={intl.formatMessage(shortTitle ? messages.shortTitle : title)}
      withCloseButton={true}
      onWhiteBackground={onWhiteBackground}
      iconSize={iconSize}
      color={color}
    >
      <Caption
        title={intl.formatMessage(title)}
        description={intl.formatMessage(description)}
        onWhiteBackground={true}
      />
    </TextWithModal>
  );
}
