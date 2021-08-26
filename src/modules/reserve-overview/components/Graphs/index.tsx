import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import GradientLine from '../../../../components/basic/GradientLine';
import GradientPlusButton from '../../../../components/basic/GradientPlusButton';
import GraphLegend, { GraphLegendDot } from '../../../../components/graphs/GraphLegend';
import { InterestRateGraphProps } from '../../../../components/graphs/types';
import VisxHistoricalRatesGraph from '../../../../components/graphs/VisxHistoricalRatesGraph';
import NoDataGraph from '../../../../components/graphs/NoDataGraph';

import messages from './messages';
import staticStyles from './style';

import stableVariableAPRGraphImage from './images/stableVariableAPR.svg';
import depositAPYGraphImage from './images/depositAPY.svg';
import utilizationRateGraphImage from './images/utilizationRate.svg';

interface GraphInnerProps {
  title: string;
  withLegend?: boolean;
  dots?: GraphLegendDot[];
  borrowingEnabled?: boolean;
  color: string[];
  type: 'depositAPY' | 'stableVariableAPR' | 'utilizationRate';
  maxYaxis?: number;
}

export default function GraphInner({
  title,
  withLegend,
  seriesData,
  dots,
  borrowingEnabled,
  color,
  type,
  maxYaxis,
}: GraphInnerProps & InterestRateGraphProps) {
  const intl = useIntl();
  const { currentTheme, lg, md, sm } = useThemeContext();

  const [contentVisible, setContentVisibility] = useState(false);
  const toggleContent = () => setContentVisibility(!contentVisible);

  useEffect(() => {
    if (contentVisible && !sm) {
      setContentVisibility(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm]);

  const secondData =
    !!seriesData.length && seriesData[1] && !!seriesData[1].data.length
      ? seriesData[1].data
      : undefined;

  const graphHeight = lg && !md ? 130 : md ? 150 : 150;

  return (
    <div
      className={classNames('ReserveGraphInner', {
        ReserveGraphInner__active: contentVisible,
      })}
    >
      <div className="ReserveGraphInner__top-inner">
        <button
          className="ReserveGraphInner__top-line"
          onClick={() => toggleContent()}
          disabled={!sm}
        >
          {!withLegend ? <p>{title}</p> : <GraphLegend title={title} dots={dots} />}
          {sm && (
            <>
              <img
                className="ReserveGraphInner__image"
                src={
                  !withLegend
                    ? type === 'depositAPY'
                      ? depositAPYGraphImage
                      : utilizationRateGraphImage
                    : stableVariableAPRGraphImage
                }
                alt=""
              />
              <GradientPlusButton
                active={!contentVisible}
                positionVertical={contentVisible ? 'top' : 'bottom'}
                positionHorizontal="right"
              />
            </>
          )}
        </button>

        {(!sm || contentVisible) && <GradientLine />}
      </div>

      {(contentVisible || !sm) && (
        <div className="ReserveGraphInner__graph">
          {borrowingEnabled ? (
            <>
              {!!seriesData.length && seriesData[0].data && !!seriesData[0].data.length ? (
                <ParentSize>
                  {({ width, height }) => (
                    <VisxHistoricalRatesGraph
                      width={width}
                      height={height}
                      data={seriesData[0].data}
                      secondData={secondData}
                      tooltipName={[seriesData[0].name, seriesData[1] && seriesData[1].name]}
                      withAxisLeft={true}
                      withAxisBottom={true}
                      graphHeight={graphHeight - 10}
                      colors={color}
                      maxYaxis={maxYaxis}
                    />
                  )}
                </ParentSize>
              ) : (
                <NoDataGraph withoutTitle={true} />
              )}
            </>
          ) : (
            <div className="ReserveGraphInner__noData">
              <p>{intl.formatMessage(messages.noData)}</p>
            </div>
          )}
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .ReserveGraphInner {
          background: ${currentTheme.darkBlue.hex};

          &__top-line {
            p {
              color: ${currentTheme.white.hex};
            }
          }

          &__arrows {
            border-color: ${currentTheme.secondary.hex};
            &:after,
            &:before {
              background: ${currentTheme.secondary.hex};
            }
          }

          &__noData {
            p {
              color: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
