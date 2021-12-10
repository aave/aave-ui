import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import TextWithModal from '../../TextWithModal';
import { CapType } from '../helper';
import Caption from '../../basic/Caption';

import messages from './messages';

interface AvailableCapsHelpModalProps {
  capType: CapType;
  className?: string;
  iconSize?: number;
  onWhiteBackground?: boolean;
}

export default function AvailableCapsHelpModal({
  capType,
  className,
  iconSize,
  onWhiteBackground,
}: AvailableCapsHelpModalProps) {
  const intl = useIntl();

  const title = capType === CapType.supplyCap ? messages.supplyCapTitle : messages.borrowCapTitle;
  const description =
    capType === CapType.supplyCap ? messages.supplyCapDescription : messages.borrowCapDescription;

  return (
    <TextWithModal
      className={classNames('AvailableCapsHelpModal', className)}
      text={intl.formatMessage(title)}
      withCloseButton={true}
      onWhiteBackground={onWhiteBackground}
      iconSize={iconSize}
    >
      <Caption
        title={intl.formatMessage(title)}
        description={intl.formatMessage(description)}
        onWhiteBackground={true}
      />
    </TextWithModal>
  );
}
