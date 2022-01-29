import React from 'react';
import styled from 'styled-components';
import { ChainId } from '@aave/contract-helpers';
import {
  aurora_white,
  aurora_black,
  radiant_white,
  radiant_black,
} from '../../../ui-config/markets/images';

const MarketButton = styled.button<{ active?: boolean }>`
  padding: 15px 10px 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#7159ff' : 'transparent')};
  :hover {
    background-color: #e2e2e2;
  }
`;

const MarketSpan = styled.p<{ active?: boolean }>`
  opacity: 0.6;
  font-family: Montserrat;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => (props.active ? '#ffffff' : '#000000')};
`;

const TestnetIndicator = styled.p<{ active?: boolean }>`
  width: 15px;
  height: 15px;
  margin: 3px 0 7px 11px;
  padding: 4px;
  background-color: ${(props) => (!props.active ? '#7159ff' : 'white')};
  color: ${(props) => (props.active ? '#7159ff' : 'white')};
  border-radius: 50%;
`;

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
  testnet?: boolean;
  localnet?: boolean;
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
  testnet,
  localnet,
}: MarketSelectButtonProps) {
  // const intl = useIntl();
  // const { currentTheme } = useThemeContext();
  //const config = getNetworkConfig(chainId);
  //console.log(testnet, localnet);

  //const hoverColor = rgba(`${currentTheme.primary.rgb}, 0.7`);
  /* const testnetMark = config.isFork
    ? 'F'
    : config.isTestnet
    ? config.name.charAt(0).toUpperCase()
    : undefined; */
  let testnetMark = '';
  if (testnet) {
    testnetMark = 'T';
  }
  if (localnet) {
    testnetMark = 'L';
  }
  /* const gradientBorder = gradient(
    252,
    `${currentTheme.primary.rgb}, 1`,
    70,
    `${currentTheme.secondary.rgb}, 1`,
    100
  ); */

  const isMainnet = !testnet && !localnet;

  return (
    <MarketButton
      active={disabled}
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="flex-row between"
    >
      <img src={disabled ? aurora_white : aurora_black} alt="au" />
      <div className="flex-column" style={{ margin: '0 10px' }}>
        <img width={61} height={8} src={disabled ? radiant_white : radiant_black} alt="" />
        <MarketSpan active={disabled}>market</MarketSpan>
      </div>
      {!isMainnet && (
        <TestnetIndicator active={disabled} className="flex-row centered">
          {testnetMark}
        </TestnetIndicator>
      )}
      {/* {(disabled || active) && <span className="MarketSelectButton__border" />}

      <div className="MarketSelectButton__inner">
        <div className="MarketSelectButton__innerLeft">
          <div className="MarketSelectButton__logo-inner">
            <img width={61} height={8} src={disabled ? radiant_white : radiant_black} alt="" />
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

      {!isMainnet && <span className="MarketSelectButton__kovan">{testnetMark}</span>}

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
              background: #7159ff;
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
      `}</style> */}
    </MarketButton>
  );
}
