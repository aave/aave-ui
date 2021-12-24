import React, { ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import toggleLocalStorageClick from '../../../../helpers/toggle-local-storage-click';
import TableBottomText from './TableBottomText';

import messages from './messages';
import staticStyles from './style';

interface DashboardTableProps {
  title: string | ReactNode;
  localStorageName?: string;
  subTitleComponent?: ReactNode;
  children: ReactNode;
  withBottomText?: boolean;
}

export default function DashboardTable({
  title,
  localStorageName,
  subTitleComponent,
  children,
  withBottomText,
}: DashboardTableProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const [isCollapse, setIsCollapse] = useState(
    localStorageName ? localStorage.getItem(localStorageName) === 'true' : false
  );

  return (
    <div
      className={classNames('DashboardTable', {
        DashboardTable__collapsed: !!localStorageName && isCollapse,
      })}
    >
      <div className="DashboardTable__title--inner">
        <div className="DashboardTable__title">{title}</div>

        {!!localStorageName && (
          <button
            className="DashboardTable__collapseButton"
            onClick={() => toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)}
            type="button"
          >
            <p>{intl.formatMessage(isCollapse ? messages.show : messages.hide)}</p>
            <span />
          </button>
        )}
      </div>

      <div className="DashboardTable__subTitle--inner">{subTitleComponent}</div>
      <div className="DashboardTable__content">{children}</div>

      {withBottomText && !isCollapse && <TableBottomText />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardTable {
          background: ${currentTheme.whiteElement.hex};

          &__title {
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__collapseButton {
            color: ${currentTheme.secondary.hex};
            span,
            span:after {
              background: ${currentTheme.secondary.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
