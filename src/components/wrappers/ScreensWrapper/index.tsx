import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import Snowfall from 'react-snowfall';
import { SecurityWidget } from '@reputation.link/vyps-kit';

import Footer from '../../Footer';
import Menu from '../../menu/Menu';
import { BottomDisclaimer, TopDisclaimer } from '../../../ui-config';

import messages from './messages';
import staticStyles from './style';

import background from '../../../images/background.svg';
import backgroundDark from '../../../images/backgroundDark.svg';

export interface ScreensWrapperProps {
  children: ReactNode;
}

export const TitleContext = createContext({
  title: '',
  setTitle: (title: string) => {},
});

export function useHeaderTitle() {
  const { title, setTitle } = useContext(TitleContext);
  return { title, setTitle };
}

export const TopPanelSmallContext = createContext({
  isTopPanelSmall: false,
  setTopPanelSmall: (isSmallTopLine: boolean) => {},
});

export function useWithDesktopTitle() {
  const { isTopPanelSmall, setTopPanelSmall } = useContext(TopPanelSmallContext);
  return { isTopPanelSmall, setTopPanelSmall };
}

export default function ScreensWrapper({ children }: ScreensWrapperProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm } = useThemeContext();

  const [title, setTitle] = useState(intl.formatMessage(messages.pageTitle));
  const [isTopPanelSmall, setTopPanelSmall] = useState(
    localStorage.getItem('isTopPanelSmall') === 'true' || false
  );

  return (
    <div
      className={classNames('ScreensWrapper', {
        ScreensWrapper__topPanelSmall: isTopPanelSmall,
      })}
    >
      {!sm && (
        <Snowfall
          color="#fff"
          radius={[0.5, 4]}
          snowflakeCount={50}
          speed={[0.5, 1]}
          wind={[-1, 1]}
        />
      )}

      <SecurityWidget
        inset={[5, 5]}
        style={{ zIndex: 1000 }}
        left
        variant="md"
        as="div"
        url="https://reputation.link/protocols/aave?network=Eth_Mainnet"
      />

      <BottomDisclaimer />

      <TopDisclaimer />
      <Menu title={title} />

      <main className="ScreensWrapper__content" id="ScreensWrapper__content-wrapper">
        <div className="ScreensWrapper__top-contentWrapper" />

        <TitleContext.Provider value={{ title, setTitle }}>
          <TopPanelSmallContext.Provider value={{ isTopPanelSmall, setTopPanelSmall }}>
            {children}
          </TopPanelSmallContext.Provider>
        </TitleContext.Provider>
      </main>

      <Footer inside={true} />

      <img
        className="ScreensWrapper__background"
        src={isCurrentThemeDark ? backgroundDark : background}
        alt=""
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .ScreensWrapper {
          background: ${currentTheme.mainBg.hex};

          &__top-contentWrapper {
            background: ${currentTheme.headerBg.hex};
            &:after {
              background: ${currentTheme.headerBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
