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

export default function TribeRewardHelpModal({
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
        className={classNames('TribeRewardHelpModal', className)}
        caption={intl.formatMessage(messages.caption)}
        description={
          <div className="TribeRewardHelpModal__content">
            <p>
              {intl.formatMessage(messages.descriptionFirst, {
                tribe: <strong>TRIBE</strong>,
                fei: <strong>FEI</strong>,
                link: (
                  <Link
                    to="https://www.withtally.com/governance/fei/proposal/20"
                    inNewWindow={true}
                    absolute={true}
                    color="secondary"
                    bold={true}
                  >
                    {intl.formatMessage(messages.thisProposal)}
                    <img src={linkIcon} alt="" />
                  </Link>
                ),
              })}
            </p>
            <p>
              {intl.formatMessage(messages.descriptionSecond, {
                link: (
                  <Link
                    to="https://app.fei.money/farm"
                    inNewWindow={true}
                    absolute={true}
                    color="secondary"
                    bold={true}
                  >
                    {intl.formatMessage(messages.feiProtocolApp)}
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
        .TribeRewardHelpModal {
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
