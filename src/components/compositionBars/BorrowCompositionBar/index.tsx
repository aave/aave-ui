import React from 'react';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import Row from '../../basic/Row';
import CompositionBar from '../CompositionBar';

import { getAssetColor, getAssetInfo } from '../../../helpers/markets/assets';

import messages from './messages';
import staticStyles from './style';

export default function BorrowCompositionBar() {
  const intl = useIntl();
  const { user } = useDynamicPoolDataContext();

  if (!user) {
    return null;
  }

  const { totalBorrowsETH, availableBorrowsETH, reservesData } = user;
  const maxBorrowAmount = new BigNumber(totalBorrowsETH).plus(availableBorrowsETH);
  const borrowComposition = reservesData
    .filter((reserve) => reserve.totalBorrows !== '0')
    .map((userReserve) => ({
      title: getAssetInfo(userReserve.reserve.symbol).formattedName || '',
      value: userReserve.totalBorrows,
      percentage: new BigNumber(userReserve.totalBorrowsETH)
        .div(maxBorrowAmount)
        .multipliedBy(100)
        .precision(20, BigNumber.ROUND_UP)
        .toNumber(),
      color: getAssetColor(userReserve.reserve.symbol),
    }));

  return (
    <Row
      title={intl.formatMessage(messages.title)}
      className="BorrowCompositionBar"
      weight="light"
      color="white"
      isColumn={true}
    >
      <CompositionBar dataset={borrowComposition} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
