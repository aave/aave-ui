import React from 'react';
import { useIntl } from 'react-intl';
import { ParentSize } from '@visx/responsive';
import Pie from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';
import { useThemeContext } from '@aave/aave-ui-kit';

import { getAssetInfo, TokenIcon } from '../../../../../helpers/markets/assets';

import messages from './messages';
import staticStyles from './style';
import { Arc } from '@visx/shape';

interface ReserveStatusGraphProps {
  symbol: string;
  totalBorrows: number | string;
  availableLiquidity: number | string;
}

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  slices: Slice[];
};

type Slice = { value: number; label: string; color: string };

const frequency = (d: Slice) => d.value;

function PieChart({ width, height, margin = defaultMargin, slices }: PieProps) {
  const { currentTheme, xl, lg, md, sm } = useThemeContext();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a: number, b: number) => b - a;

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <g key={`arc-bg`}>
          <Arc
            outerRadius={radius + 6}
            innerRadius={radius * 0.89 - 6}
            startAngle={0}
            endAngle={360}
          >
            {({ path }) => <path d={path(null) as any} fill={currentTheme.mainBg.hex} />}
          </Arc>
        </g>
        <Pie
          data={slices}
          pieValue={frequency}
          pieSortValues={pieSortValues}
          outerRadius={radius}
          innerRadius={radius * 0.89}
          padAngle={0.02}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { label, color: arcFill } = arc.data;
              const arcPath = pie.path(arc);
              return (
                <g key={`arc-${label}-${index}`}>
                  <path d={arcPath ? arcPath : undefined} fill={arcFill} />
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}

export default function ReserveStatusGraph({
  symbol,
  totalBorrows,
  availableLiquidity,
}: ReserveStatusGraphProps) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md, sm } = useThemeContext();

  const percentFromValue = (percent: number, value: number) => percent * (value / 100);

  const iconSize = xl && !lg ? 79 : lg && !md ? 60 : md && !sm ? 79 : 100;
  const symbolsLength = getAssetInfo(symbol).symbolsArray?.length || 0;
  const formattedIconSize =
    symbolsLength === 3
      ? percentFromValue(70, iconSize)
      : symbolsLength === 4
      ? percentFromValue(60, iconSize)
      : iconSize;

  return (
    <div className="ReserveStatusGraph">
      <div className="ReserveStatusGraph__inner">
        <ParentSize>
          {(parent) => (
            <PieChart
              width={parent.width}
              height={parent.height}
              slices={[
                {
                  value: +availableLiquidity,
                  label: 'available liquidity',
                  color: currentTheme.green.hex,
                },
                { value: +totalBorrows, label: 'total borrows', color: currentTheme.red.hex },
              ]}
            />
          )}
        </ParentSize>
        <TokenIcon
          className="ReserveStatusGraph__icon"
          tokenSymbol={symbol}
          height={formattedIconSize}
          width={formattedIconSize}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
