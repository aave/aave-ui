import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { FormattedReserveHistoryItem } from '../../../../../libs/pool-data-provider/hooks/use-reserve-rates-history';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useLanguageContext } from '../../../../../libs/language-provider';
import GraphInner from '../index';
import { GraphPoint, InterestRateSeries } from '../../../../../components/graphs/types';

import messages from './messages';

interface BorrowAPRProps {
  data: FormattedReserveHistoryItem[];
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
}

export default function BorrowAPR({
  data,
  borrowingEnabled,
  stableBorrowRateEnabled,
}: BorrowAPRProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { currentTheme } = useThemeContext();

  const [series, setSeries] = useState<InterestRateSeries[]>([]);

  const stableRateHistoryData = [] as GraphPoint[];
  const variableRateHistoryData = [] as GraphPoint[];
  data.forEach((item) => {
    stableRateHistoryData.push([
      item.timestamp,
      Number((Number(item.stableBorrowRate) * 100).toFixed(2)),
    ]);
    variableRateHistoryData.push([
      item.timestamp,
      Number((Number(item.variableBorrowRate) * 100).toFixed(2)),
    ]);
  });

  useEffect(() => {
    const series = [];
    if (stableBorrowRateEnabled) {
      series.push({
        name: intl.formatMessage(messages.graphDotStable),
        data: stableRateHistoryData,
      });
    }
    series.push({
      name: intl.formatMessage(messages.graphDotVariable),
      data: variableRateHistoryData,
    });
    setSeries(series);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, currentLangSlug]);

  return (
    <GraphInner
      title={
        stableBorrowRateEnabled
          ? intl.formatMessage(messages.title)
          : intl.formatMessage(messages.shortTitle)
      }
      seriesData={series}
      borrowingEnabled={borrowingEnabled}
      dots={
        stableBorrowRateEnabled
          ? [
              {
                name: intl.formatMessage(messages.graphDotStable),
                color: currentTheme.primary.hex,
              },
              {
                name: intl.formatMessage(messages.graphDotVariable),
                color: currentTheme.secondary.hex,
              },
            ]
          : []
      }
      withLegend={true}
      color={
        stableBorrowRateEnabled
          ? [currentTheme.primary.hex, currentTheme.secondary.hex]
          : [currentTheme.secondary.hex]
      }
      type="stableVariableAPR"
    />
  );
}
