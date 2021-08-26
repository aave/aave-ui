import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';
import { useWeb3React } from '@web3-react/core';

export default function MainnetWarning() {
  const intl = useIntl();
  const { chainId } = useWeb3React();
  const { currentTheme } = useThemeContext();

  if (chainId === 1 || chainId === undefined) return null;

  return (
    <div className="MainnetWarning">
      <p>{intl.formatMessage(messages.mainnetOnly)}</p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MainnetWarning {
          p {
            color: ${currentTheme.textDarkBlue.hex};
            border: 1px solid ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
