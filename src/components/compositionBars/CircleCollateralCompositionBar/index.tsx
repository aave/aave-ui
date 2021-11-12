import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import CircleCompositionBar from '../CircleCompositionBar';
import { getAssetInfo, getAssetColor } from '../../../helpers/config/assets-config';

import messages from './messages';

export default function CircleCollateralCompositionBar() {
  const intl = useIntl();
  const { user, reserves } = useDynamicPoolDataContext();

  if (!user) {
    return null;
  }

  const { userReservesData, totalCollateralMarketReferenceCurrency } = user;

  const collateralComposition = userReservesData
    .filter((userReserve) => {
      const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);
      return (
        userReserve.usageAsCollateralEnabledOnUser &&
        poolReserve &&
        poolReserve.usageAsCollateralEnabled &&
        userReserve.underlyingBalance !== '0'
      );
    })
    .map((userReserve) => ({
      label: `${getAssetInfo(userReserve.reserve.symbol).formattedName}  ${intl.formatNumber(
        valueToBigNumber(userReserve.underlyingBalanceMarketReferenceCurrency)
          .dividedBy(totalCollateralMarketReferenceCurrency)
          .multipliedBy(100)
          .toNumber(),
        { maximumFractionDigits: 2 }
      )}%`,
      value: Number(userReserve.underlyingBalanceMarketReferenceCurrency),
      color: getAssetColor(userReserve.reserve.symbol),
    }));

  return (
    <CircleCompositionBar
      title={intl.formatMessage(messages.collateralComposition)}
      totalValue={Number(totalCollateralMarketReferenceCurrency || 0)}
      data={collateralComposition}
    />
  );
}
