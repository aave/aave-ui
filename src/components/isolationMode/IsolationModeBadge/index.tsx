import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import TextWithModal from '../../TextWithModal';
import Caption from '../../basic/Caption';
import Link from '../../basic/Link';

import messages from './messages';
import staticStyles from './style';

interface IsolationModeBadgeProps {
  isIsolated: boolean;
}

export default function IsolationModeBadge({ isIsolated }: IsolationModeBadgeProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <>
      <TextWithModal
        className="IsolationModeBadge"
        text={intl.formatMessage(isIsolated ? messages.isolationMode : messages.nA)}
        withCloseButton={true}
      >
        <div className="IsolationModeBadge__modal--content">
          <Caption
            title={intl.formatMessage(messages.modalCaption)}
            description={intl.formatMessage(messages.modalDescription)}
            onWhiteBackground={true}
          />
          <p className="IsolationModeBadge__modal--text">
            {intl.formatMessage(messages.learnMore, {
              link: (
                <Link
                  to="https://docs.aave.com/faq/" // TODO: maybe need change link
                  title={intl.formatMessage(messages.faqGuide)}
                  color="secondary"
                  absolute={true}
                  inNewWindow={true}
                />
              ),
            })}
          </p>
        </div>
      </TextWithModal>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .IsolationModeBadge {
          .TextWithModal__text {
            color: ${currentTheme.orange.hex} !important;
          }
          &__modal--text {
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </>
  );
}
