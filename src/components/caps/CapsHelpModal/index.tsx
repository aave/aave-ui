import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import TextWithModal from '../../TextWithModal';
import { CapType } from '../helper';
import Caption from '../../basic/Caption';

import messages from './messages';

interface CapsHelpModalProps {
  capType: CapType;
  className?: string;
  iconSize?: number;
  onWhiteBackground?: boolean;
  color?: 'dark' | 'white';
  lightWeight?: boolean;
}

export default function CapsHelpModal({
  capType,
  className,
  iconSize,
  onWhiteBackground,
  color,
  lightWeight,
}: CapsHelpModalProps) {
  const intl = useIntl();

  const title = capType === CapType.supplyCap ? messages.supplyCapTitle : messages.borrowCapTitle;
  const description =
    capType === CapType.supplyCap ? messages.supplyCapDescription : messages.borrowCapDescription;

  return (
    <TextWithModal
      className={classNames('CapsHelpModal', className)}
      text={intl.formatMessage(title)}
      withCloseButton={true}
      onWhiteBackground={onWhiteBackground}
      iconSize={iconSize}
      color={color}
      lightWeight={lightWeight}
    >
      <Caption
        title={intl.formatMessage(title)}
        description={intl.formatMessage(description)}
        onWhiteBackground={true}
      />
    </TextWithModal>
  );
}
