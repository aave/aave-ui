import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useReserveRatesHistory } from '../../../../../libs/pool-data-provider/hooks/use-reserve-rates-history';
import { useLanguageContext } from '../../../../../libs/language-provider';
import { useThemeContext } from '@aave/aave-ui-kit';
import GraphInner from '../index';
import { GraphPoint, InterestRateSeries } from '../../../../../components/graphs/types';

import messages from './messages';

interface UtilisationRateProps {
  poolReserveId: string;
  borrowingEnabled: boolean;
}

export default function UtilisationRate({ poolReserveId, borrowingEnabled }: UtilisationRateProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentLangSlug } = useLanguageContext();
  const { data: interestRatesHistory } = useReserveRatesHistory(poolReserveId);
  const [series, setSeries] = useState<InterestRateSeries[]>([]);

  const utilizationRateHistoryData = interestRatesHistory.map<GraphPoint>((item) => [
    item.timestamp,
    Number((Number(item.utilizationRate) * 100).toFixed(2)),
  ]);

  useEffect(() => {
    setSeries([
      {
        name: intl.formatMessage(messages.graphDotName),
        data: utilizationRateHistoryData,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utilizationRateHistoryData.length, currentLangSlug]);

  return (
    <GraphInner
      title={intl.formatMessage(messages.title)}
      seriesData={series}
      borrowingEnabled={borrowingEnabled}
      color={[currentTheme.white.hex]}
      type="utilizationRate"
      maxYaxis={100}
    />
  );
}
