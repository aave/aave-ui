import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import TextWithModal from '../../TextWithModal';
import Caption from '../../basic/Caption';
import Link from '../../basic/Link';

import messages from './messages';
import staticStyles from './style';

interface IsolationModeBadgeProps {
  isIsolated: boolean;
  color?: 'dark' | 'white';
  disabled?: boolean;
}

export default function IsolationModeBadge({
  isIsolated,
  color = 'dark',
  disabled,
}: IsolationModeBadgeProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <>
      <TextWithModal
        className={classNames('IsolationModeBadge', `IsolationModeBadge__${color}`, {
          IsolationModeBadge__disabled: disabled,
        })}
        text={intl.formatMessage(isIsolated ? messages.isolationMode : messages.nA)}
        withCloseButton={true}
      >
        <div className="IsolationModeBadge__modal--content">
          {isIsolated ? (
            <>
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
            </>
          ) : (
            <>
              <p>TODO: need text</p>
            </>
          )}
        </div>
      </TextWithModal>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .IsolationModeBadge {
          .TextWithModal__text {
            color: ${currentTheme.textDarkBlue.hex} !important;
          }
          &__modal--text {
            color: ${currentTheme.darkBlue.hex};
          }

          &__white {
            .TextWithModal__text {
              color: ${currentTheme.white.hex} !important;
            }
          }
        }
      `}</style>
    </>
  );
}
