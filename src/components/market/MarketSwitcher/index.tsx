import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, DropdownWrapper } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import GradientText from '../../basic/GradientText';
import avrora from '../../../images/avrora.png';
import arrowDown from '../../../images/arrow-down.svg';
import messages from './messages';
import staticStyles from './style';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
  CustomMarket,
} from '../../../helpers/config/markets-and-network-config';

interface MarketSwitcherProps {
  toTop?: boolean;
  className?: string;
  textButton?: boolean;
}

export default function MarketSwitcher({ toTop, className, textButton }: MarketSwitcherProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { currentMarket, setCurrentMarket, currentMarketData, networkConfig } =
    useProtocolDataContext();

  const [visible, setVisible] = useState(false);
  const [isFirstMarketButtonClick, setFirstMarketClick] = useState(
    !localStorage.getItem('firstMarketButtonClick')
  );
  const firstMarketButtonClick = () => {
    setFirstMarketClick(false);
    localStorage.setItem('firstMarketButtonClick', 'false');
  };

  const toggleVisible = () => {
    if (isFirstMarketButtonClick) {
      firstMarketButtonClick();
    }
    setVisible(!visible);
  };

  const handleSetCurrentMarket = (market: CustomMarket) => {
    setCurrentMarket(market);
    setVisible(false);
  };
  const data = availableMarkets.slice(0); // TODO: dirty hack!
  const transparentDarkColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);
  const selectedMarketTestnetMark = networkConfig.isFork
    ? 'F'
    : networkConfig.isTestnet
    ? networkConfig.name.charAt(0).toUpperCase()
    : undefined;

  return (
    <DropdownWrapper
      className={classNames('MarketSwitcher', className)}
      horizontalPosition={sm ? 'center' : 'right'}
      verticalPosition={toTop ? 'top' : 'bottom'}
      visible={visible}
      setVisible={setVisible}
      buttonComponent={
        textButton ? (
          <button className="MarketSwitcher__text-button" onClick={toggleVisible} type="button">
            {intl.formatMessage(messages.changeMarket)}
          </button>
        ) : (
          <button
            className={classNames('MarketSwitcher__button', {
              MarketSwitcher__buttonActive: visible,
              MarketSwitcher__firstClickButton: isFirstMarketButtonClick,
            })}
            onClick={toggleVisible}
            type="button"
          >
            <div className="MarketSwitcher__button-content">
              <div className="MarketSwitcher__button-text">
                <div className="market_switcher_box">
                  <img src={avrora} alt="avrora logo" />
                  <div
                    className={classNames('MarketSwitcher__buttonLogo-inner', {
                      MarketSwitcher__buttonLogoInnerWithSubLogo: !!currentMarketData.subLogo,
                    })}
                  >
                    {/* <img
                    src={
                      !!currentMarketData.activeLogo
                        ? currentMarketData.activeLogo
                        : currentMarketData.logo
                    }
                    alt=""
                  /> */}
                    <p className="aurora">Aurora</p>
                    <p className="market">{intl.formatMessage(messages.market)}</p>
                  </div>
                  {selectedMarketTestnetMark && (
                    <span className="MarketSwitcher__kovan">{selectedMarketTestnetMark}</span>
                  )}
                  <img src={arrowDown} alt="arrow" />
                </div>
              </div>

              {/* {!!currentMarketData.subLogo && (
                <img
                  className="MarketSwitcher__button-subLogo"
                  src={currentMarketData.subLogo}
                  alt=""
                />
              )} */}
            </div>
          </button>
        )
      }
    >
      <div className="MarketSwitcher__content">
        {/* <p className="MarketSwitcher__title">ff{intl.formatMessage(messages.changeMarket)}</p> */}
        {data.map((market) => {
          const marketData = marketsData[market];
          const config = getNetworkConfig(marketData.chainId);
          const testnetMark = config.isFork
            ? 'F'
            : config.isTestnet
            ? config.name.charAt(0).toUpperCase()
            : undefined;
          return (
            <button
              onClick={() => handleSetCurrentMarket(market)}
              className={classNames('MarketSwitcher__market', {
                MarketSwitcher__marketActive: currentMarket === market,
              })}
              type="button"
              disabled={currentMarket === market}
              key={market}
            >
              <div className="MarketSwitcher__button-content">
                <div className="MarketSwitcher__button-text">
                  <div className="market_switcher_box market_switcher_box_dropdown">
                    <img src={avrora} alt="avrora logo" />
                    <div
                      className={classNames('MarketSwitcher__buttonLogo-inner', {
                        MarketSwitcher__buttonLogoInnerWithSubLogo: !!currentMarketData.subLogo,
                      })}
                    >
                      <p className="aurora aurora_dark">Aurora</p>
                      <p className="market market_dark">{intl.formatMessage(messages.market)}</p>
                    </div>
                    {selectedMarketTestnetMark && (
                      <span className="MarketSwitcher__kovan">{selectedMarketTestnetMark}</span>
                    )}
                    <img src={arrowDown} alt="arrow" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DropdownWrapper {
          position: relative;
          z-index: 2;
        }

        .DropdownWrapper__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          position: absolute;
          height: 0;
          left: 0;
          min-width: 167px;
          overflow: hidden;
          opacity: 0;
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          transition-property: opacity, -webkit-transform;
          transition-property: transform, opacity;
          transition-property: transform, opacity, -webkit-transform;
          transition-duration: 0.3s;
          transition-timing-function: ease;
          border-radius: 2px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
        }
        .DropdownWrapper__contentVisible {
          height: auto;
          min-width: 167px;
          opacity: 1;
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }

        .market_switcher_box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 0 25px;
        }
        .market_switcher_box_dropdown {
          padding: 0;
        }
        .market {
          opacity: 0.5;
          font-family: Montserrat;
          font-size: 10px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #fff;
        }
        .market_dark {
          color: #131313;
        }
        .aurora {
          font-family: Montserrat;
          text-align: center;
          margin: 0 auto;
          font-size: 12px;
          font-weight: bold !important;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #fff;
        }
        .aurora_dark {
          color: #131313;
        }
        .MarketSwitcher {
          &__text-button {
            color: ${currentTheme.primary.hex};
          }

          &__button-content {
            color: ${currentTheme.white.hex};
            width: 100%;
            background: transparent;
            &:hover {
              background-color: #ffffff10;
              border-radius: 2px;
            }
          }
          &__buttonActive {
            .MarketSwitcher__button-content {
              border: none;
              background-color: #ffffff10;
              border-radius: 2px;
            }
          }
          &__firstClickButton {
            &:before {
              background: linear-gradient(
                to right,
                ${currentTheme.secondary.hex},
                ${currentTheme.primary.hex},
                ${currentTheme.secondary.hex},
                ${currentTheme.primary.hex}
              );
            }
          }

          &__title {
            color: ${currentTheme.darkBlue.hex};
            border-bottom: 1px solid ${currentTheme.darkBlue.hex};
          }

          &__market {
            position: relative;
            border-bottom: 1px solid ${transparentDarkColor};
            &:hover {
              background: white;
            }
          }

          &__logo-inner {
            span {
              color: ${currentTheme.darkBlue.hex};
            }
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
