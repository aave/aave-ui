import React from 'react';
import { useIntl } from 'react-intl';

import Link from '../../basic/Link';
import Row from '../../basic/Row';

import HelpModalWrapper, { HelpModalWrapperProps } from '../../HelpModal/HelpModalWrapper';
import messages from './messages';

interface EModeHelpModalProps
  extends Pick<
    HelpModalWrapperProps,
    'iconSize' | 'className' | 'color' | 'lightWeight' | 'onWhiteBackground'
  > {}

export default function EModeHelpModal({
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: EModeHelpModalProps) {
  const intl = useIntl();

  return (
    <HelpModalWrapper
      text={intl.formatMessage(messages.title)}
      iconSize={iconSize}
      className={className}
      caption={intl.formatMessage(messages.modalCaption)}
      description={
        <div>
          <p>{intl.formatMessage(messages.modalDescription)}</p>
          <p>
            {intl.formatMessage(messages.callToAction, {
              link: (
                <Link
                  to="https://docs.aave.com/faq/" // TODO: maybe need change link
                  absolute={true}
                  inNewWindow={true}
                  title={intl.formatMessage(messages.FAQGuide)}
                  color="secondary"
                />
              ),
            })}
          </p>
        </div>
      }
      color={color}
      lightWeight={lightWeight}
      onWhiteBackground={onWhiteBackground}
    />
  );
}
