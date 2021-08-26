import React from 'react';
import { useIntl } from 'react-intl';

import { rgba, useThemeContext } from '@aave/aave-ui-kit';
import Link from '../../../../components/basic/Link';
import TailArrow from '../../../../components/basic/TailArrow';

import messages from './messages';
import staticStyles from './style';

import { faqLink } from '../../index';

export default function TextFAQLink() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const background = rgba(`${currentTheme.textDarkBlue.rgb}, 0.03`);

  return (
    <div className="TextFAQLink">
      <Link
        to={faqLink}
        className="TextFAQLink__link ButtonLink"
        absolute={true}
        inNewWindow={true}
        color="dark"
      >
        <span>{intl.formatMessage(messages.title)}</span>
        <TailArrow className="TextFAQLink__arrow" type="left" color="dark" />
      </Link>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TextFAQLink {
          .TextFAQLink__link {
            background: ${background};
          }
        }
      `}</style>
    </div>
  );
}
