import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../../basic/Link';

import messages from './messages';
import staticStyles from './style';

import alert from '../../../images/alertCircleGray.svg';
import alertDark from '../../../images/alertCircleWhite.svg';

interface IsolationInfoBannerProps {
  text: string;
  size?: 'small' | 'normal';
  link?: string;
  withIcon?: boolean;
  withoutMargin?: boolean;
}

export default function IsolationInfoBanner({
  text,
  size = 'normal',
  link,
  withIcon,
  withoutMargin,
}: IsolationInfoBannerProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm } = useThemeContext();

  return (
    <div
      className={classNames('IsolationInfoBanner', `IsolationInfoBanner__${size}`, {
        IsolationInfoBanner__withoutMargin: withoutMargin,
      })}
    >
      {withIcon && <img src={isCurrentThemeDark || sm ? alertDark : alert} alt="" />}
      <p>
        {text}{' '}
        <Link
          to={link || 'https://docs.aave.com/faq/'} // TODO: maybe need change link
          title={intl.formatMessage(messages.learnMore)}
          color="secondary"
          absolute={true}
          inNewWindow={true}
        />
      </p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .IsolationInfoBanner {
          background: ${currentTheme.mainBg.hex};
          color: ${currentTheme.textDarkBlue.hex};

          @include respond-to(sm) {
            background: ${isCurrentThemeDark
              ? currentTheme.headerBg.hex
              : currentTheme.darkBlue.hex};
            color: ${currentTheme.white.hex};
          }

          &__small {
            @include respond-to(sm) {
              background: ${currentTheme.headerBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
