import React from 'react';
import { useIntl } from 'react-intl';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';

export default function CooldownUnstakeHelpModal({
  text,
  iconSize,
  className,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  return (
    <HelpModalWrapper
      text={text}
      iconSize={iconSize}
      className={className}
      caption={intl.formatMessage(messages.caption)}
      onWhiteBackground={onWhiteBackground}
      description={
        <>
          <span style={{ display: 'inline-block', marginBottom: 15 }}>
            {intl.formatMessage(messages.descriptionFirst)}
          </span>
          <span style={{ display: 'inline-block', marginBottom: 15 }}>
            {intl.formatMessage(messages.descriptionSecond)}
          </span>
          <span style={{ display: 'inline-block' }}>
            {intl.formatMessage(messages.descriptionThird)}
          </span>
        </>
      }
      lightWeight={true}
    />
  );
}
