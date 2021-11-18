import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { gradient, rgba, useThemeContext } from '@aave/aave-ui-kit';

import GradientText from '../../basic/GradientText';

import messages from './messages';
import staticStyles from './style';
import { ChainId } from '@aave/contract-helpers';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';

interface MarketSelectButtonProps {
  onClick: () => void;
  logo: string;
  subLogo?: string;
  logoText?: string;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  hoverColored?: boolean;
  chainId: ChainId;
  isDark?: boolean;
}

export default function MarketSelectButton({
  onClick,
  logo,
  subLogo,
  logoText,
  className,
  disabled,
  active,
  hoverColored,
  chainId,
  isDark,
}: MarketSelectButtonProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const config = getNetworkConfig(chainId);

  const hoverColor = rgba(`${currentTheme.primary.rgb}, 0.7`);
  const testnetMark = config.isFork
    ? 'F'
    : config.isTestnet
    ? config.name.charAt(0).toUpperCase()
    : undefined;
  const gradientBorder = gradient(
    252,
    `${currentTheme.primary.rgb}, 1`,
    70,
    `${currentTheme.secondary.rgb}, 1`,
    100
  );

  return (
    <button
      onClick={onClick}
      className={classNames('MarketSelectButton', className, {
        MarketSelectButton__active: active,
        MarketSelectButton__hoverColored: hoverColored,
        MarketSelectButton__dark: isDark,
      })}
      type="button"
      disabled={disabled}
    >
      {(disabled || active) && <span className="MarketSelectButton__border" />}

      <div className="MarketSelectButton__inner">
        <div className="MarketSelectButton__innerLeft">
          <div className="MarketSelectButton__logo-inner">
            <img src={logo} alt="" />
            {!!logoText && !subLogo && <span>{logoText}</span>}
          </div>

          <GradientText
            className="MarketSelectButton__marketText"
            colorStart={isDark ? currentTheme.white.rgb : currentTheme.secondary.rgb}
            colorEnd={isDark ? currentTheme.white.rgb : currentTheme.primary.rgb}
            title={intl.formatMessage(messages.market)}
          />
        </div>

        {subLogo && <img className="MarketSelectButton__subLogo" src={subLogo} alt="" />}
      </div>

      {testnetMark && <span className="MarketSelectButton__kovan">{testnetMark}</span>}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .MarketSelectButton {
          &:hover {
            .MarketSelectButton__inner {
              box-shadow: 0 1px 8px 0 ${currentTheme.white.hex};
            }
          }
          &.MarketSelectButton__active,
          &:disabled {
            .MarketSelectButton__inner {
              border: 2px solid ${currentTheme.darkBlue.hex} !important;
            }
          }

          &__logo-inner {
            color: ${currentTheme.darkBlue.hex};
          }

          &__inner {
            background: ${currentTheme.white.hex};
          }

          &.MarketSelectButton__hoverColored {
            &:hover {
              .MarketSelectButton__inner {
                border-color: ${hoverColor};
                box-shadow: 0 1px 8px 0 ${hoverColor};
              }
            }
          }

          &__border {
            background: ${currentTheme.white.hex};
          }

          &__dark {
            &.MarketSelectButton__active,
            &:disabled {
              .MarketSelectButton__inner {
                border: 2px solid ${currentTheme.white.hex} !important;
              }
            }

            .MarketSelectButton__inner {
              background: ${currentTheme.darkBlue.hex};
            }
            .MarketSelectButton__logo-inner {
              color: ${currentTheme.white.hex};
            }
            .MarketSelectButton__border {
              background: ${gradientBorder};
            }
          }
        }
      `}</style>
    </button>
  );
}
