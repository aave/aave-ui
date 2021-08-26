import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import HelpModalWrapper from '../HelpModalWrapper';
import Link from '../../basic/Link';
import { HelpModalProps } from '../types';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../images/blueLinkIcon.svg';

export default function ThresholdHelpModal({
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
        className={classNames('ThresholdHelpModal', className)}
        caption={intl.formatMessage(messages.caption)}
        description={
          <div className="ThresholdHelpModal__content">
            <p>{intl.formatMessage(messages.descriptionFirst)}</p>
            <p>{intl.formatMessage(messages.descriptionSecond)}</p>
            <Link
              to="https://docs.aave.com/faq/governance#what-is-the-voting-threshold"
              absolute={true}
              inNewWindow={true}
              color="secondary"
            >
              <span>{intl.formatMessage(messages.moreInformation)}</span>
              <img src={linkIcon} alt="" />
            </Link>
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
