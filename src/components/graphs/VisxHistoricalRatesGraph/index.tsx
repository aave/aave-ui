import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSwipeable } from 'react-swipeable';

import { Line, Bar, LinePath } from '@visx/shape';
import { GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, TooltipWithBounds } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@visx/event';
import { AxisBottom, AxisLeft } from '@visx/axis';

import { max, min, extent, bisector } from 'd3-array';
import dayjs from 'dayjs';
import { useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../basic/ValuePercent';

import staticStyles from './style';

import { GraphPoint } from '../types';

interface AreaProps {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  graphHeight: number;
  data: GraphPoint[];
  secondData?: GraphPoint[];
  colors: string[];
  tooltipName: string[];
  withAxisLeft?: boolean;
  withAxisBottom?: boolean;
  maxYaxis?: number;
}

interface TooltipData {
  date: number;
  values: { name: string; value: number }[];
}

export default withTooltip<AreaProps, TooltipData>(
  ({
    width,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    graphHeight,
    data,
    secondData,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    colors,
    tooltipName,
    withAxisLeft,
    withAxisBottom,
    maxYaxis,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    const intl = useIntl();
    const { currentTheme, sm } = useThemeContext();

    const getSeriesDate = (d: GraphPoint) => new Date(dayjs.unix(+d[0]).format());
    const getSeriesValue = (d: GraphPoint) => d[1];
    const bisectDate = bisector<GraphPoint, Date>((d) => new Date(dayjs.unix(+d[0]).format())).left;

    // bounds
    const formatWidth = width - margin.left - margin.right - 20;
    const innerWidth = formatWidth > 0 ? formatWidth : 0;
    const axisLeftPosition = withAxisLeft ? 40 : 20;
    const formattedWidth = withAxisLeft ? innerWidth - axisLeftPosition - 5 : innerWidth - 5;
    const finalWidth = formattedWidth > 0 ? formattedWidth : 0;

    const axisBottomPosition = 20;
    const innerHeight = graphHeight - margin.top - margin.bottom;
    const formattedHeight = withAxisBottom ? innerHeight - axisBottomPosition : innerHeight;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, finalWidth + margin.left],
          domain: !!data.length ? (extent(data, getSeriesDate) as [Date, Date]) : [],
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [finalWidth, margin.left]
    );
    const valueScale = useMemo(
      () =>
        scaleLinear({
          range: [formattedHeight + margin.top, margin.top],
          domain: !!data.length
            ? [
                (min(data, getSeriesValue) || 0) - formattedHeight / 2.5 < 0
                  ? 0
                  : (min(data, getSeriesValue) || 0) - formattedHeight / 2.5,
                ((max(data, getSeriesValue) || 0) === 0 ? 1 : max(data, getSeriesValue) || 0) *
                  1.05,
              ]
            : [],
          nice: true,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [margin.top, formattedHeight]
    );
    const valueScaleWithMax = useMemo(
      () =>
        scaleLinear({
          range: [formattedHeight + margin.top, margin.top],
          domain: !!data.length
            ? [
                (min(data, getSeriesValue) || 0) - formattedHeight / 2.5 < 0
                  ? 0
                  : (min(data, getSeriesValue) || 0) - formattedHeight / 2.5,
                (max(data, getSeriesValue) || 0) > (maxYaxis || 0)
                  ? maxYaxis || 0
                  : (max(data, getSeriesValue) || 0) === 0
                  ? 1
                  : max(data, getSeriesValue) || 0,
              ]
            : [],
          nice: true,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [margin.top, formattedHeight]
    );

    const axisBottomScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, (withAxisLeft ? finalWidth : finalWidth - 40) + margin.left],
          domain: !!data.length ? (extent(data, getSeriesDate) as [Date, Date]) : [],
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [finalWidth, margin.left]
    );

    // tooltip handler
    const tooltipDataCalculation = (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>,
      data: GraphPoint[],
      secondData?: GraphPoint[],
      second?: boolean
    ) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = dateScale.invert(withAxisLeft ? x - axisLeftPosition : x);
      const index = bisectDate(data, x0, 1);
      const d = data[index - 1];
      const d1 = secondData ? secondData[index - 1] : [];

      showTooltip({
        tooltipData: {
          date: +d[0],
          values: second
            ? [
                { name: tooltipName[0], value: +d[1] },
                { name: tooltipName[1], value: +d1[1] },
              ]
            : [{ name: tooltipName[0], value: +d[1] }],
        },
        tooltipLeft: x,
        tooltipTop: maxYaxis ? valueScaleWithMax(getSeriesValue(d)) : valueScale(getSeriesValue(d)),
      });
    };

    const handleTooltip = useCallback(
      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        tooltipDataCalculation(event, data);
        if (secondData) {
          tooltipDataCalculation(event, data, secondData, true);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [showTooltip, valueScale, valueScaleWithMax, dateScale]
    );

    const yScale = maxYaxis ? valueScaleWithMax : valueScale;

    const handlers = useSwipeable({
      onSwipedLeft: (e) => e.event.stopPropagation(),
    });

    return (
      <div {...handlers} className="VisxHistoricalRatesGraph">
        <svg width={width} height={innerHeight + 8}>
          {withAxisLeft && (
            <AxisLeft
              left={axisLeftPosition}
              stroke={currentTheme.white.hex}
              tickStroke={currentTheme.white.hex}
              scale={maxYaxis ? valueScaleWithMax : valueScale}
              hideTicks={true}
              tickComponent={(tickRendererProps) => (
                <text
                  x={tickRendererProps.x - 20}
                  y={tickRendererProps.y}
                  className="VisxHistoricalRatesGraph__axisLeft--tick"
                >
                  {intl.formatNumber(+(tickRendererProps.formattedValue || 0), {
                    maximumFractionDigits: 2,
                  })}
                  %
                </text>
              )}
              tickLabelProps={() => ({
                fontFamily: 'roboto-font',
              })}
              numTicks={5}
            />
          )}

          {withAxisBottom && (
            <AxisBottom
              top={formattedHeight}
              left={axisLeftPosition}
              scale={axisBottomScale}
              stroke={currentTheme.white.hex}
              tickStroke={currentTheme.white.hex}
              tickLabelProps={() => ({
                fontFamily: 'roboto-font',
                fill: currentTheme.white.hex,
                fontSize: 10,
                textAnchor: 'middle',
              })}
              hideZero={true}
              numTicks={sm ? 3 : 4}
            />
          )}

          <Group left={withAxisLeft ? axisLeftPosition : 0}>
            <GridRows
              left={margin.left}
              scale={maxYaxis ? valueScaleWithMax : valueScale}
              width={formattedWidth}
              stroke={currentTheme.white.hex}
              strokeOpacity={0.2}
              pointerEvents="none"
            />

            <LinePath
              stroke={colors[0]}
              strokeWidth={2}
              data={data}
              x={(d) => dateScale(getSeriesDate(d)) ?? 0}
              y={(d) => yScale(getSeriesValue(d)) ?? 0}
            />

            {secondData && (
              <LinePath
                stroke={colors[1]}
                strokeWidth={2}
                data={secondData}
                x={(d) => dateScale(getSeriesDate(d)) ?? 0}
                y={(d) => yScale(getSeriesValue(d)) ?? 0}
              />
            )}
            <Bar
              x={margin.left}
              y={margin.top}
              width={finalWidth}
              height={formattedHeight}
              fill="transparent"
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />
          </Group>

          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{
                  x: tooltipLeft,
                  y: withAxisLeft ? formattedHeight + margin.top + 5 : formattedHeight + margin.top,
                }}
                stroke={currentTheme.white.hex}
                strokeWidth={1}
                strokeOpacity={0.5}
                pointerEvents="none"
                strokeDasharray="4"
              />
              {tooltipData.values.map((value, index) => (
                <React.Fragment key={index}>
                  <circle
                    cx={tooltipLeft}
                    cy={yScale(value.value)}
                    r={3}
                    fill="black"
                    fillOpacity={0.1}
                    stroke="black"
                    strokeOpacity={0.1}
                    strokeWidth={2}
                    pointerEvents="none"
                  />
                  <circle
                    cx={tooltipLeft}
                    cy={yScale(value.value)}
                    r={3}
                    fill={colors[index]}
                    stroke="white"
                    strokeWidth={1}
                    pointerEvents="none"
                  />
                </React.Fragment>
              ))}
            </g>
          )}
        </svg>

        {tooltipData && (
          <>
            <TooltipWithBounds
              className="VisxHistoricalRatesGraph__valueTooltipInner"
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
            >
              <div className="VisxHistoricalRatesGraph__tooltipDate">
                {dayjs.unix(tooltipData.date).format('DD MMM')}
              </div>

              <div className="VisxHistoricalRatesGraph__tooltipValues">
                {tooltipData.values.map((value, index) => (
                  <div className="VisxHistoricalRatesGraph__tooltipValue" key={index}>
                    <div className="VisxHistoricalRatesGraph__tooltipValue--text">
                      <div
                        className="VisxHistoricalRatesGraph__tooltipValue-dot"
                        style={{
                          background: `${colors[index]}`,
                        }}
                      />
                      <p className="VisxHistoricalRatesGraph__tooltipValue-name">{value.name}:</p>
                    </div>

                    <ValuePercent value={value.value / 100} color="secondary" />
                  </div>
                ))}
              </div>
            </TooltipWithBounds>
          </>
        )}

        <style jsx={true} global={true}>
          {staticStyles}
        </style>
        <style jsx={true} global={true}>{`
          .VisxHistoricalRatesGraph {
            &__axisLeft--tick {
              fill: ${currentTheme.white.hex};
            }

            &__valueTooltipInner {
              color: ${currentTheme.darkBlue.hex};
            }
            &__tooltipDate {
              border-bottom: 1px solid ${currentTheme.lightBlue.hex};
            }
            &__tooltipValues {
              .ValuePercent .ValuePercent__value {
                color: ${currentTheme.darkBlue.hex} !important;
                span {
                  color: ${currentTheme.darkBlue.hex} !important;
                }
              }
            }
          }
        `}</style>
      </div>
    );
  }
);
