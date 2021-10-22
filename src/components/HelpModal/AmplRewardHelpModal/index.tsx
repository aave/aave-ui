import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import HelpModalWrapper from '../HelpModalWrapper';
import Link from '../../basic/Link';
import { HelpModalProps } from '../types';

import messages from './messages';
import staticStyles from './style';

import linkIcon from './images/linkIcon.svg';

export default function AmplRewardHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <>
      <HelpModalWrapper
        text={text}
        iconSize={iconSize}
        className={classNames('AmplRewardHelpModal', className)}
        caption={intl.formatMessage(messages.caption)}
        description={
          <div className="AmplRewardHelpModal__content">
            <p>
              {intl.formatMessage(messages.descriptionFirst, {
                ampl: <strong>AMPL</strong>,
              })}
            </p>
            <p>
              {intl.formatMessage(messages.descriptionSecond, {
                link: (
                  <Link
                    to="https://geyser.ampleforth.org"
                    inNewWindow={true}
                    absolute={true}
                    color="secondary"
                    bold={true}
                  >
                    {intl.formatMessage(messages.geyserApp)}
                    <img src={linkIcon} alt="" />
                  </Link>
                ),
              })}
            </p>
            <span>{intl.formatMessage(messages.descriptionThird)}</span>
          </div>
        }
        color={color}
        lightWeight={lightWeight}
        onWhiteBackground={onWhiteBackground}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AmplRewardHelpModal {
          &__content {
            span {
              color: ${currentTheme.lightBlue.hex};
              border-top: 1px solid
                ${isCurrentThemeDark ? currentTheme.lightBlue.hex : currentTheme.mainBg.hex};
            }
          }
        }
      `}</style>
    </>
  );
}
