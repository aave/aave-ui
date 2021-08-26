import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import DefaultButton from '../basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';

import errorImage from './images/errorImage.svg';
import mobileErrorImage from './images/mobileErrorImage.svg';
import backgroundDark from '../../images/backgroundDark.svg';
import background from '../../images/background.svg';

type ErrorPageProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  buttonType?: 'reload' | 'back';
  image?: boolean;
};

export default function ErrorPage({
  image,
  title,
  description,
  buttonType,
  children,
}: ErrorPageProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();

  return (
    <div className="ErrorPage">
      <div className="ErrorPage__content">
        {image && (
          <div className="ErrorPage__image-inner">
            <img src={sm ? mobileErrorImage : errorImage} alt="Error" />
          </div>
        )}

        {title && <h2 className="ErrorPage__title">{title}</h2>}

        {description && <p className="ErrorPage__description">{description}</p>}

        {children}

        <div className="ErrorPage__buttons-inner">
          {buttonType === 'reload' && (
            <DefaultButton
              title={intl.formatMessage(messages.buttonReload)}
              onClick={() => window.location.reload()}
              size="big"
            />
          )}
          {buttonType === 'back' && (
            <DefaultButton
              title={intl.formatMessage(messages.buttonBack)}
              onClick={history.goBack}
              size="big"
            />
          )}
        </div>
      </div>

      <img
        className="ErrorPage__background"
        src={isCurrentThemeDark ? backgroundDark : background}
        alt=""
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ErrorPage {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.mainBg.hex};
          &__title {
            color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </div>
  );
}
