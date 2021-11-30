import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../../basic/Link';

import messages from './messages';
import staticStyles from './style';

import infoIcon from '../../../images/infoGray.svg';
import infoIconDark from '../../../images/infoGrayDark.svg';

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
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div
      className={classNames('IsolationInfoBanner', `IsolationInfoBanner__${size}`, {
        IsolationInfoBanner__withoutMargin: withoutMargin,
      })}
    >
      {withIcon && <img src={isCurrentThemeDark ? infoIconDark : infoIcon} alt="" />}
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
        }
      `}</style>
    </div>
  );
}
