import React, { ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import toggleLocalStorageClick from '../../../../helpers/toggle-local-storage-click';
import DashboardItemsBottomText from '../DashboardItemsBottomText';

import messages from './messages';
import staticStyles from './style';

interface DashboardItemsWrapperProps {
  title: string | ReactNode;
  localStorageName?: string;
  subTitleComponent?: ReactNode;
  children: ReactNode;
  withBottomText?: boolean;
  withTopMargin?: boolean;
}

export default function DashboardItemsWrapper({
  title,
  localStorageName,
  subTitleComponent,
  children,
  withBottomText,
  withTopMargin,
}: DashboardItemsWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const [isCollapse, setIsCollapse] = useState(
    localStorageName ? localStorage.getItem(localStorageName) === 'true' : false
  );

  return (
    <div
      className={classNames('DashboardItemsWrapper', {
        DashboardItemsWrapper__collapsed: !!localStorageName && isCollapse,
        DashboardItemsWrapper__withTopMargin: withTopMargin,
      })}
    >
      <div
        className={classNames('DashboardItemsWrapper__title--inner', {
          DashboardItemsWrapper__titleWithClick: !!localStorageName,
        })}
        onClick={() =>
          !!localStorageName
            ? toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)
            : undefined
        }
      >
        <div className="DashboardItemsWrapper__title">{title}</div>

        {!!localStorageName && (
          <div className="DashboardItemsWrapper__collapseButton">
            <p>{intl.formatMessage(isCollapse ? messages.show : messages.hide)}</p>
            <span />
          </div>
        )}
      </div>

      <div className="DashboardItemsWrapper__subTitle--inner">{subTitleComponent}</div>
      <div className="DashboardItemsWrapper__content">{children}</div>

      {withBottomText && !isCollapse && <DashboardItemsBottomText />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .DashboardItemsWrapper {
          background: ${currentTheme.whiteElement.hex};
          @include respond-to(sm) {
            background: unset;
          }

          &__collapsed {
            @include respond-to(sm) {
              background: ${currentTheme.whiteElement.hex};
            }
          }

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
