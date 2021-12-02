import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import Caption from '../../../../components/basic/Caption';
import DefaultButton from '../../../../components/basic/DefaultButton';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

import image from './images/isolationImage.svg';
import imageDark from './images/isolationImageDark.svg';

interface IsolationModeScreenProps {
  onClick: () => void;
}

export default function IsolationModeScreen({ onClick }: IsolationModeScreenProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div className="IsolationModeScreen">
      <img
        className="IsolationModeScreen__image"
        src={isCurrentThemeDark ? imageDark : image}
        alt=""
      />

      <Caption
        title={intl.formatMessage(messages.caption)}
        description={intl.formatMessage(messages.description)}
        marginBottom={24}
      />

      <p className="IsolationModeScreen__text">
        {intl.formatMessage(messages.learnMore, {
          link: (
            <Link
              to="https://docs.aave.com/faq/" // TODO: maybe need change link
              title={intl.formatMessage(messages.FAQGuide)}
              color="secondary"
              absolute={true}
              inNewWindow={true}
            />
          ),
        })}
      </p>

      <DefaultButton title={intl.formatMessage(messages.buttonTitle)} onClick={onClick} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .IsolationModeScreen {
          &__text {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
