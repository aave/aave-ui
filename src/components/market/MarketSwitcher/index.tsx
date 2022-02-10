import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, DropdownWrapper } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import GradientText from '../../basic/GradientText';

import messages from './messages';
import staticStyles from './style';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
  CustomMarket,
} from '../../../helpers/config/markets-and-network-config';
import green_logo from '../../../images/green_t.png';
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
                <div
                  className={classNames('MarketSwitcher__buttonLogo-inner', {
                    MarketSwitcher__buttonLogoInnerWithSubLogo: !!currentMarketData.subLogo,
                  })}
                >
                  <img src={green_logo} alt="" />
                </div>
                <div className="">
                  <span>Aurora</span>
                  <p>{intl.formatMessage(messages.market)}</p>
                </div>
              </div>

              {!!currentMarketData.subLogo && (
                <img
                  className="MarketSwitcher__button-subLogo"
                  src={currentMarketData.subLogo}
                  alt=""
                />
              )}
              {!visible ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5">
                  <path
                    d="m1.033.381 4.526 4.526L10.085.381"
                    stroke="#FFF"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                  />
                </svg>
              ) : (
                <svg
                  transform=" rotate(180 0 0)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="5"
                  viewBox="0 0 11 5"
                >
                  <path
                    d="m1.033.381 4.526 4.526L10.085.381"
                    stroke="#FFF"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                  />
                </svg>
              )}
            </div>

            {selectedMarketTestnetMark && (
              <span className="MarketSwitcher__kovan">{selectedMarketTestnetMark}</span>
            )}
          </button>
        )
      }
    >
      <div className="MarketSwitcher__content">
        {availableMarkets.map((market) => {
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
              <div className="MarketSwitcher__market-content">
                <div className="MarketSwitcher__button-text">
                  <div
                    className={classNames('MarketSwitcher__buttonLogo-inner', {
                      MarketSwitcher__buttonLogoInnerWithSubLogo: !!currentMarketData.subLogo,
                    })}
                  >
                    <img src={green_logo} alt="" />
                  </div>
                  <div className="logo_name">
                    <span>Aurora</span>
                    <p>{intl.formatMessage(messages.market)}</p>
                  </div>
                </div>
              </div>

              {testnetMark && <span className="MarketSwitcher__kovan">{testnetMark}</span>}
            </button>
          );
        })}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MarketSwitcher {
          &__text-button {
            color: ${currentTheme.primary.hex};
          }

          &__button-content {
            color: ${currentTheme.white.hex};

            &:hover {
              background-color: #2b2b2b;
            }
          }
          &__buttonActive {
            .MarketSwitcher__button-content {
              background-color: #2b2b2b;
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
              background: ${transparentDarkColor};
            }
          }
          &__marketActive {
            background: ${transparentDarkColor};
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
