import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { FormattedReserveHistoryItem } from '../../../../../libs/pool-data-provider/hooks/use-reserve-rates-history';
import { useLanguageContext } from '../../../../../libs/language-provider';
import { useThemeContext } from '@aave/aave-ui-kit';
import GraphInner from '../index';
import { GraphPoint, InterestRateSeries } from '../../../../../components/graphs/types';

import messages from './messages';

interface UtilisationRateProps {
  data: FormattedReserveHistoryItem[];
  borrowingEnabled: boolean;
}

export default function UtilisationRate({ data, borrowingEnabled }: UtilisationRateProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentLangSlug } = useLanguageContext();
  const [series, setSeries] = useState<InterestRateSeries[]>([]);

  const utilizationRateHistoryData = data.map<GraphPoint>((item) => [
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
