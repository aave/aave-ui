import { useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useLanguageContext } from '../../../libs/language-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import BridgeBanner from '../../BridgeBanner';
import DesktopPageTitle from '../../DesktopPageTitle';
import { useHeaderTitle, useWithDesktopTitle } from '../ScreensWrapper';

import staticStyles from './style';

// Pages where the banners should be displayed
export const DISPLAY_BRIDGE_BANNER_PAGES = ['/deposit', '/repay'];

interface ScreenWrapperProps {
  pageTitle?: string;
  isTitleOnDesktop?: boolean;
  isTopLineSmall?: boolean;
  titleComponent?: ReactNode;
  className?: string;
  withMobileGrayBg?: boolean;
  subTitle?: string | ReactNode;
  children: ReactNode;
}

export default function ScreenWrapper({
  pageTitle,
  isTitleOnDesktop,
  isTopLineSmall,
  titleComponent,
  className,
  withMobileGrayBg,
  subTitle,
  children,
}: ScreenWrapperProps) {
  const { currentLangSlug } = useLanguageContext();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const {
    networkConfig: { bridge, name },
  } = useProtocolDataContext();
  const location = useLocation();
  const { setTitle } = useHeaderTitle();
  const { setTopPanelSmall } = useWithDesktopTitle();

  useEffect(() => {
    pageTitle && setTitle(pageTitle);
    // eslint-disable-next-line no-lone-blocks
    {
      if (isTitleOnDesktop || isTopLineSmall) {
        setTopPanelSmall(true);
        localStorage.setItem('isTopPanelSmall', 'true');
      } else {
        setTopPanelSmall(false);
        localStorage.setItem('isTopPanelSmall', 'false');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug, location.pathname]);

  return (
    <section
      className={classNames('ScreenWrapper', className, {
        ScreenWrapper__withDesktopTitle: isTitleOnDesktop,
      })}
    >
      {isTitleOnDesktop && (pageTitle || titleComponent) && (
        <DesktopPageTitle
          title={!!titleComponent ? titleComponent : pageTitle}
          subTitle={subTitle}
        />
      )}
      {subTitle && <div className="ScreenWrapper__mobileSubTitle">{subTitle}</div>}

      {DISPLAY_BRIDGE_BANNER_PAGES.includes(location.pathname) && bridge && (
        <>
          <div className="ScreenWrapper__bannerWrapper">
            <BridgeBanner networkName={name} {...bridge} />
          </div>
          <div className="ScreenWrapper__bannerSpacer" />
        </>
      )}

      {children}

      <div className="ScreenWrapper__mobile-bottomBorder">
        <p>i</p>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';
        .ScreenWrapper {
          @include respond-to(sm) {
            background: ${withMobileGrayBg
              ? currentTheme.mainBg.hex
              : isCurrentThemeDark
              ? currentTheme.mainBg.hex
              : currentTheme.white.hex};
          }

          &__mobileSubTitle {
            color: ${currentTheme.textDarkBlue.hex};
            background: ${currentTheme.whiteElement.hex};
          }
        }
      `}</style>
    </section>
  );
}
