import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../basic/Link';

import messages from './messages';
import staticStyles from './style';

import alert from '../../images/alertCircleGray.svg';
import alertDark from '../../images/alertCircleWhite.svg';
import warning from '../../images/warningTransparentDarkBlue.svg';
import warningDark from '../../images/warningTransparentWhite.svg';

interface InfoBannerProps {
  text: string | ReactNode;
  size?: 'small' | 'normal';
  link?: string;
  withIcon?: boolean;
  withoutMargin?: boolean;
  withoutLink?: boolean;
}

export default function InfoBanner({
  text,
  size = 'normal',
  link,
  withIcon,
  withoutMargin,
  withoutLink,
}: InfoBannerProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm } = useThemeContext();

  return (
    <div
      className={classNames('InfoBanner', `InfoBanner__${size}`, {
        InfoBanner__withoutMargin: withoutMargin,
      })}
    >
      {withIcon && <img src={isCurrentThemeDark || sm ? alertDark : alert} alt="" />}
      {size === 'normal' && <img src={isCurrentThemeDark ? warningDark : warning} alt="" />}
      <p>
        {text}{' '}
        {!withoutLink && (
          <Link
            to={link || 'https://docs.aave.com/faq/'} // TODO: maybe need change link
            title={intl.formatMessage(messages.learnMore)}
            color="secondary"
            absolute={true}
            inNewWindow={true}
          />
        )}
      </p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .InfoBanner {
          background: ${currentTheme.mainBg.hex};
          color: ${currentTheme.textDarkBlue.hex};

          &__normal {
            @include respond-to(sm) {
              border: 1px solid ${currentTheme.textDarkBlue.hex};
            }
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
