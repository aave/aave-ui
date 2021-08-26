import React from 'react';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { rgba, TokenIcon, useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import ValuePercent from '../../basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';
import classNames from 'classnames';

interface LiquidityMiningAPYLineProps {
  value: string | number;
  tooltipId?: string;
}

export default function LiquidityMiningAPYLine({ value, tooltipId }: LiquidityMiningAPYLineProps) {
  const intl = useIntl();
  const { currentTheme, xl, isCurrentThemeDark } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();

  const borderColor = rgba(`${currentTheme.lightBlue.rgb}, 0.2`);

  return (
    <div
      className={classNames('LiquidityMiningAPYLine', {
        LiquidityMiningAPYLine__withTooltip: tooltipId,
      })}
      data-tip={true}
      data-for={tooltipId}
    >
      <TokenIcon
        tokenSymbol={networkConfig.rewardTokenSymbol}
        width={xl ? 10 : 12}
        height={xl ? 10 : 12}
      />
      <ValuePercent value={value} maximumDecimals={2} minimumDecimals={2} />
      <p className="LiquidityMiningAPYLine__title">{intl.formatMessage(messages.apr)}</p>

      {!!tooltipId && (
        <ReactTooltip className="LiquidityMiningAPYLine__tooltip" id={tooltipId} effect="solid">
          <div className="LiquidityMiningAPYLine__tooltip--content">
            <p>
              {intl.formatMessage(messages.tooltipText, { token: networkConfig.rewardTokenSymbol })}
            </p>
          </div>
        </ReactTooltip>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LiquidityMiningAPYLine {
          color: ${currentTheme.lightBlue.hex};
          border: 1px solid ${borderColor};

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
