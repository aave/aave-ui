import React, { ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useReserveRatesHistory } from '../../../../libs/pool-data-provider/hooks/use-reserve-rates-history';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useLanguageContext } from '../../../../libs/language-provider';
import CurrencyScreenWrapper from '../../../../components/wrappers/CurrencyScreenWrapper';

import messages from './messages';

import { ValidationWrapperComponentProps } from '../../../../components/RouteParamsValidationWrapper';
import { GraphPoint, InterestRateSeries } from '../../../../components/graphs/types';
import { RATES_HISTORY_ENDPOINT } from '../../../../helpers/config/misc-config';
import { getAssetInfo } from '../../../../helpers/config/assets-config';

interface BorrowCurrencyWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  goBack?: () => void;
  children: ReactNode;
}

export default function BorrowCurrencyWrapper({
  userReserve,
  poolReserve,
  user,
  currencySymbol,
  children,
  goBack,
}: BorrowCurrencyWrapperProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { currentTheme } = useThemeContext();
  const { data: borrowRatesHistory } = useReserveRatesHistory(poolReserve.id);
  const [series, setSeries] = useState<InterestRateSeries[]>([]);

  const asset = getAssetInfo(currencySymbol);

  const stableRateHistoryData = [] as GraphPoint[];
  const variableRateHistoryData = [] as GraphPoint[];
  borrowRatesHistory.forEach((item) => {
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
    if (poolReserve.stableBorrowRateEnabled) {
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
  }, [borrowRatesHistory.length, currentLangSlug]);

  return (
    <CurrencyScreenWrapper
      title={intl.formatMessage(messages.pageTitle, {
        currencySymbol: asset.formattedName,
      })}
      isCollapseLocalStorageName="borrowCurrencyTopPanelIsCollapse"
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      userReserve={userReserve}
      user={user}
      type="borrow"
      showGraphCondition={borrowRatesHistory.length > 1 && !!RATES_HISTORY_ENDPOINT}
      dots={
        poolReserve.stableBorrowRateEnabled
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
      series={series}
      goBack={goBack}
    >
      {children}
    </CurrencyScreenWrapper>
  );
}
