import React from 'react';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { rgba, TokenIcon, useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import ValuePercent from '../../basic/ValuePercent';
import TribeRewardHelpModal from '../../HelpModal/TribeRewardHelpModal';
import AmplRewardHelpModal from '../../HelpModal/AmplRewardHelpModal';

import messages from './messages';
import staticStyles from './style';

import tribeIcon from '../../../images/tirbe.svg';
import amplIcon from '../../../images/ampl.png';

type ThirdPartyLMDatum = {
  rewardSymbol: string;
  icon: string;
}

type ThirdPartyLMData = {
  [key: string]: ThirdPartyLMDatum
};

interface LiquidityMiningAPYLineProps {
  symbol?: string;
  value: string | number;
  tooltipId?: string;
}

const THIRD_PARTY_LIQUIDITY_MINING:ThirdPartyLMData = {
  "FEI": {
    rewardSymbol: "TRIBE",
    icon: tribeIcon,
  },
  "AMPL": {
    rewardSymbol: "AMPL",
    icon: amplIcon,
  }
};

function ThirdPartyLiquidityMiningAPYLine(dt:ThirdPartyLMDatum, tooltipId:string|undefined) {
  const renderRewardModal = () => {
    switch(dt.rewardSymbol) {
      case "TRIBE": {
        return <TribeRewardHelpModal text="" />
        break;
      }
      case "AMPL": {
        return <AmplRewardHelpModal text="" />
        break;
      }
      default: {
        return;
      }
    }
  }
  return [
    <div className="LiquidityMiningAPYLine__tribe">
      <img src={dt.icon} alt="" />
      <strong className="LiquidityMiningAPYLine__titleTribe LiquidityMiningAPYLine__title">
        {dt.rewardSymbol}
      </strong>
    </div>,
    renderRewardModal()
  ]
}

function AAVELiquidityMiningAPYLine(value:string|number, tooltipId:string|undefined) {
  const { networkConfig } = useProtocolDataContext();
  const {xl} = useThemeContext()
  const intl = useIntl();

  return [
    <>
      <TokenIcon
        tokenSymbol={networkConfig.rewardTokenSymbol}
        width={xl ? 10 : 12}
        height={xl ? 10 : 12} />
      <ValuePercent value={value} maximumDecimals={2} minimumDecimals={2} />
    </>,
    <p className="LiquidityMiningAPYLine__title">{intl.formatMessage(messages.apr)}</p>,
    <ReactTooltip className="LiquidityMiningAPYLine__tooltip" id={tooltipId} effect="solid">
      <div className="LiquidityMiningAPYLine__tooltip--content">
        <p>
          {intl.formatMessage(messages.tooltipText, {
            token: networkConfig.rewardTokenSymbol,
          })}
        </p>
      </div>
    </ReactTooltip>
  ];
}

export default function LiquidityMiningAPYLine({
  symbol,
  value,
  tooltipId,
}: LiquidityMiningAPYLineProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();
  const borderColor = rgba(`${currentTheme.lightBlue.rgb}, 0.2`);
  const thirdPartyLMData = THIRD_PARTY_LIQUIDITY_MINING[symbol||""]

  return (
    <div
      className={classNames('LiquidityMiningAPYLine', {
        LiquidityMiningAPYLine__withTooltip: tooltipId,
      })}
      data-tip={true}
      data-for={tooltipId}
    >

      { thirdPartyLMData ?
        ThirdPartyLiquidityMiningAPYLine(thirdPartyLMData, tooltipId) :
        AAVELiquidityMiningAPYLine(value, tooltipId)}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LiquidityMiningAPYLine {
          color: ${currentTheme.lightBlue.hex};
          border: 1px solid ${borderColor};

          &__tribe {
            strong {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          .LiquidityMiningAPYLine__tooltip {
            background: ${isCurrentThemeDark
              ? currentTheme.mainBg.hex
              : currentTheme.darkBlue.hex} !important;
            &:after {
              border-top-color: ${isCurrentThemeDark
                ? currentTheme.mainBg.hex
                : currentTheme.darkBlue.hex} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
