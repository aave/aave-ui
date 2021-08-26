import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';
import staticStyles from './style';

export default function DelegationHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  return (
    <>
      <HelpModalWrapper
        text={text}
        iconSize={iconSize}
        className={classNames('DelegationHelpModal', className)}
        caption={intl.formatMessage(messages.caption)}
        description={
          <div className="DelegationHelpModal__content">
            <p>{intl.formatMessage(messages.descriptionFirst)}</p>
            <p>{intl.formatMessage(messages.descriptionSecond)}</p>
          </div>
        }
        color={color}
        lightWeight={lightWeight}
        onWhiteBackground={onWhiteBackground}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
