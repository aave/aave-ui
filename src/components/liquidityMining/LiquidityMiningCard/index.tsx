import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../basic/ValuePercent';
import NoData from '../../basic/NoData';
import LiquidityMiningAPYLine from '../LiquidityMiningAPYLine';

import staticStyles from './style';
import { ReserveIncentive } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';

interface LiquidityMiningCardProps {
  symbol?: string;
  type?: string;
  value: string | number;
  liquidityMiningValues?: ReserveIncentive[];
  className?: string;
  mobilePosition?: 'left' | 'right';
}

export default function LiquidityMiningCard({
  symbol,
  type,
  value,
  liquidityMiningValues,
  className,
  mobilePosition = 'right',
}: LiquidityMiningCardProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  console.log(liquidityMiningValues);
  const helpLiquidityAPYTooltipId =
    symbol && type ? `help-liquidity-apy-${type}-${symbol}` : undefined;
  return (
    <div
      className={classNames(
        'LiquidityMiningCard',
        `LiquidityMiningCard__${mobilePosition}`,
        className
      )}
    >
      <div data-tip={!!symbol}>
        {value.toString() !== '-1' ? (
          <ValuePercent maximumDecimals={2} minimumDecimals={2} value={value} />
        ) : (
          <NoData color="dark" />
        )}
      </div>

      {liquidityMiningValues && liquidityMiningValues.length > 1 ? (
        liquidityMiningValues.map((incentive) => (
          <LiquidityMiningAPYLine
            symbol={incentive.rewardTokenSymbol}
            value={incentive.incentiveAPR || 0}
            tooltipId={helpLiquidityAPYTooltipId}
            key={incentive.rewardTokenSymbol}
          />
        ))
      ) : (
        <></>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LiquidityMiningCard__tooltip {
          background: ${isCurrentThemeDark
            ? currentTheme.mainBg.hex
            : currentTheme.darkBlue.hex} !important;
          &:after {
            border-top-color: ${isCurrentThemeDark
              ? currentTheme.mainBg.hex
              : currentTheme.darkBlue.hex} !important;
          }
        }
      `}</style>
    </div>
  );
}
