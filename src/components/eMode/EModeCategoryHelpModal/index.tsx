import React from 'react';
import { useIntl } from 'react-intl';

import HelpModalWrapper from '../../HelpModal/HelpModalWrapper';
import { HelpModalProps } from '../../HelpModal/types';

import messages from './messages';

interface EModeCategoryHelpModalProps
  extends Pick<HelpModalProps, 'iconSize' | 'className' | 'onWhiteBackground'> {}

export default function EModeCategoryHelpModal({
  iconSize,
  className,
  onWhiteBackground,
}: EModeCategoryHelpModalProps) {
  const intl = useIntl();

  return (
    <HelpModalWrapper
      text={intl.formatMessage(messages.title)}
      iconSize={iconSize}
      className={className}
      caption="TODO: need text"
      onWhiteBackground={onWhiteBackground}
      description={<>TODO: need text</>}
    />
  );
}
