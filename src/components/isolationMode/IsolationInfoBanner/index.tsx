import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../../basic/Link';

import messages from './messages';
import staticStyles from './style';

import alert from '../../../images/alertCircleGray.svg';
import alertDark from '../../../images/alertCircleWhite.svg';
import warning from '../../../images/warningTransparentDarkBlue.svg';
import warningDark from '../../../images/warningTransparentWhite.svg';

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
      {size === 'normal' && <img src={isCurrentThemeDark ? warningDark : warning} alt="" />}
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
          color: ${currentTheme.textDarkBlue.hex};

          &__normal {
            border: 1px solid ${currentTheme.textDarkBlue.hex};
          }

          &__small {
            @include respond-to(sm) {
              background: ${currentTheme.headerBg.hex};
              color: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
