import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

export default function TableBottomText() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="TableBottomText">
      <p>
        {intl.formatMessage(messages.explore, {
          link: (
            <Link
              to="/markets"
              title={intl.formatMessage(messages.marketStats)}
              color="secondary"
            />
          ),
        })}
      </p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .TableBottomText {
          color: ${currentTheme.textDarkBlue.hex};
          border-top: 1px solid ${currentTheme.mainBg.hex};
        }
      `}</style>
    </div>
  );
}
