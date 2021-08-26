import React from 'react';
import { useIntl } from 'react-intl';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { useThemeContext } from '@aave/aave-ui-kit';

import GraphLegend, { GraphLegendDot } from '../../../graphs/GraphLegend';
import VisxHistoricalRatesGraph from '../../../graphs/VisxHistoricalRatesGraph';
import NoDataGraph from '../../../graphs/NoDataGraph';

import messages from './messages';

import { InterestRateGraphProps } from '../../../graphs/types';

interface GraphInnerProps {
  showGraph: boolean;
  dots?: GraphLegendDot[];
  type: 'deposit' | 'borrow';
  poolReserveId: string;
}

export default function GraphInner({
  showGraph,
  seriesData,
  dots,
  type,
  poolReserveId,
}: GraphInnerProps & InterestRateGraphProps) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md, sm } = useThemeContext();

  const graphHeight = xl && !lg ? 82 : lg && !md ? 72 : 112;

  const secondData = seriesData[1] && !!seriesData[1].data.length ? seriesData[1].data : undefined;

  const colors =
    type === 'deposit'
      ? [currentTheme.darkOrange.hex]
      : type === 'borrow' && !secondData
      ? [currentTheme.secondary.hex]
      : [currentTheme.primary.hex, currentTheme.secondary.hex];

  const tooltipName =
    type === 'deposit'
      ? [intl.formatMessage(messages.apy)]
      : type === 'borrow' && !secondData
      ? [intl.formatMessage(messages.variable)]
      : [intl.formatMessage(messages.stable), intl.formatMessage(messages.variable)];

  if (!showGraph) {
    return null;
  }

  return (
    <>
      <GraphLegend
        title={intl.formatMessage(messages.graphLegendTitle)}
        dots={dots}
        withFilterButtons={!sm}
        poolReserveId={poolReserveId}
      />

      {seriesData[0].data && !!seriesData[0].data.length ? (
        <ParentSize>
          {({ width, height }) => (
            <VisxHistoricalRatesGraph
              width={width}
              height={height}
              graphHeight={graphHeight}
              data={seriesData[0].data}
              secondData={secondData}
              colors={colors}
              tooltipName={tooltipName}
              withAxisBottom={true}
            />
          )}
        </ParentSize>
      ) : (
        <NoDataGraph withoutTitle={true} />
      )}
    </>
  );
}
