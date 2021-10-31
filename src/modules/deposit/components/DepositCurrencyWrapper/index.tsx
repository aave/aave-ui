import React, { ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useReserveRatesHistory } from '../../../../libs/pool-data-provider/hooks/use-reserve-rates-history';
import { useLanguageContext } from '../../../../libs/language-provider';
import CurrencyScreenWrapper from '../../../../components/wrappers/CurrencyScreenWrapper';
import { RATES_HISTORY_ENDPOINT } from '../../../../helpers/config/misc-config';

import messages from './messages';

import { ValidationWrapperComponentProps } from '../../../../components/RouteParamsValidationWrapper';
import { GraphPoint, InterestRateSeries } from '../../../../components/graphs/types';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { getAssetInfo } from '../../../../helpers/config/assets-config';

interface DepositCurrencyWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol' | 'walletBalance'
  > {
  children: ReactNode;
}

export default function DepositCurrencyWrapper({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  walletBalance,
  children,
}: DepositCurrencyWrapperProps) {
  const intl = useIntl();
  const { currentLangSlug } = useLanguageContext();
  const { data: interestRatesHistory } = useReserveRatesHistory(poolReserve.id);
  const { networkConfig } = useProtocolDataContext();
  const [series, setSeries] = useState<InterestRateSeries[]>([]);
  const asset = getAssetInfo(currencySymbol);

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  if (maxAmountToDeposit.gt(0) && poolReserve.symbol.toUpperCase() === networkConfig.baseAsset) {
    // keep it for tx gas cost
    maxAmountToDeposit = maxAmountToDeposit.minus('0.004');
  }
  if (maxAmountToDeposit.lte(0)) {
    maxAmountToDeposit = valueToBigNumber('0');
  }

  const liquidityRateHistoryData = interestRatesHistory.map<GraphPoint>((item) => [
    item.timestamp,
    Number((Number(item.liquidityRate) * 100).toFixed(2)),
  ]);

  useEffect(() => {
    setSeries([
      {
        name: intl.formatMessage(messages.graphDotName),
        data: liquidityRateHistoryData,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liquidityRateHistoryData.length, currentLangSlug]);

  return (
    <CurrencyScreenWrapper
      title={intl.formatMessage(messages.pageTitle, {
        currencySymbol: asset.formattedName,
      })}
      isCollapseLocalStorageName="depositCurrencyTopPanelIsCollapse"
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      userReserve={userReserve}
      user={user}
      walletBalance={maxAmountToDeposit.toString()}
      type="deposit"
      showGraphCondition={liquidityRateHistoryData.length > 1 && !!RATES_HISTORY_ENDPOINT}
      dots={[{ name: intl.formatMessage(messages.graphDotName) }]}
      series={series}
    >
      {children}
    </CurrencyScreenWrapper>
  );
}
