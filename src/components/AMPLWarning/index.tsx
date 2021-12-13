import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../basic/Link';
import InfoPanel from '../InfoPanel';

import messages from './messages';
import staticStyles from './style';

interface AMPLWarningProps {
  withInfoPanel?: boolean;
}

export default function AMPLWarning({ withInfoPanel }: AMPLWarningProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const text = () => (
    <p className={classNames('AMPLWarning', { AMPLWarning__text: !withInfoPanel })}>
      {intl.formatMessage(messages.amplWarning, {
        asset: <b>Ampleforth</b>,
        link1: (
          <Link
            to="https://docs.aave.com/developers/guides/ampl-asset-listing"
            absolute={true}
            inNewWindow={true}
            color="secondary"
          >
            {intl.formatMessage(messages.documentation)}
          </Link>
        ),
        link2: (
          <Link
            to="https://faq.ampleforth.org/lending_and_borrowing"
            absolute={true}
            inNewWindow={true}
            color="secondary"
          >
            {intl.formatMessage(messages.amplFaq)}
          </Link>
        ),
      })}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .AMPLWarning__text {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </p>
  );

  return <>{withInfoPanel ? <InfoPanel>{text()}</InfoPanel> : text()}</>;
}
