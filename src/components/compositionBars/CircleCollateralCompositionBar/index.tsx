import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import CircleCompositionBar from '../CircleCompositionBar';
import { getAssetInfo, getAssetColor } from '../../../helpers/markets/assets';

import messages from './messages';

export default function CircleCollateralCompositionBar() {
  const intl = useIntl();
  const { user, reserves } = useDynamicPoolDataContext();

  if (!user) {
    return null;
  }

  const { reservesData, totalCollateralETH } = user;

  const collateralComposition = reservesData
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
        valueToBigNumber(userReserve.underlyingBalanceETH)
          .dividedBy(totalCollateralETH)
          .multipliedBy(100)
          .toNumber(),
        { maximumFractionDigits: 2 }
      )}%`,
      value: Number(userReserve.underlyingBalanceETH),
      color: getAssetColor(userReserve.reserve.symbol),
    }));

  return (
    <CircleCompositionBar
      title={intl.formatMessage(messages.collateralComposition)}
      totalValue={Number(totalCollateralETH || 0)}
      data={collateralComposition}
    />
  );
}
