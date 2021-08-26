import React from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';

import reloadIcon from '../../images/reload.svg';
import reloadIconDark from '../../images/reloadDark.svg';
import messages from '../../messages';

export default function ReloadButton() {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <button
      className="ErrorBoundary__reload-button"
      type="button"
      onClick={() => window.location.reload()}
    >
      <img src={isCurrentThemeDark ? reloadIconDark : reloadIcon} alt="Reload" />
      <span>{intl.formatMessage(messages.reload)}</span>

      <style jsx={true}>{`
        .ErrorBoundary__reload-button {
          span {
            color: ${currentTheme.textDarkBlue.hex} !important;
          }
        }
      `}</style>
    </button>
  );
}
