import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

export default function DashboardItemsBottomText() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="DashboardItemsBottomText">
      <p>
        {intl.formatMessage(messages.description, {
          link: <Link to="/faucet" title={intl.formatMessage(messages.faucet)} color="secondary" />,
        })}
      </p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .DashboardItemsBottomText {
          color: ${currentTheme.textDarkBlue.hex};
          border-top: 1px solid ${currentTheme.mainBg.hex};
        }
      `}</style>
    </div>
  );
}
