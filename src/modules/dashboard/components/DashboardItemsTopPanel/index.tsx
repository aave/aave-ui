import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import toggleLocalStorageClick from '../../../../helpers/toggle-local-storage-click';
import CheckBoxField from '../../../../components/fields/CheckBoxField';
import Link from '../../../../components/basic/Link';
import { NetworkConfig } from '../../../../helpers/config/types';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/linkIcon.svg';

interface DashboardItemsTopPanelProps extends Pick<NetworkConfig, 'bridge'> {
  value: boolean;
  onClick: (value: boolean) => void;
  localStorageName: string;
}

export default function DashboardItemsTopPanel({
  value,
  onClick,
  localStorageName,
  bridge,
}: DashboardItemsTopPanelProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="DashboardItemsTopPanel">
      <CheckBoxField
        value={value}
        name={localStorageName}
        onChange={() => toggleLocalStorageClick(value, onClick, localStorageName)}
        title={intl.formatMessage(messages.showAssets)}
      />

      {bridge && (
        <Link
          className="DashboardItemsTopPanel__bridgeLink"
          to={bridge.url}
          color="dark"
          absolute={true}
          inNewWindow={true}
        >
          <span>{bridge.name}</span> <img src={linkIcon} alt="" />
        </Link>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardItemsTopPanel {
          .CheckBoxField,
          .DashboardItemsTopPanel__bridgeLink {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
