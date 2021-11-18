import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { BigNumber } from 'bignumber.js';

import Row from '../../basic/Row';
import CompositionBar from '../CompositionBar';
import { getAssetInfo, getAssetColor } from '../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';
import { UserSummary } from '../../../libs/pool-data-provider';

type DepositCompositionBarProps = {
  user: UserSummary;
};

export default function DepositCompositionBar({ user }: DepositCompositionBarProps) {
  const intl = useIntl();

  const userReserves = user.userReservesData
    .filter((userReserve) => userReserve.underlyingBalance !== '0')
    .map((userReserve) => ({
      value: userReserve.underlyingBalance,
      percentage: valueToBigNumber(userReserve.underlyingBalanceUSD)
        .div(user.totalLiquidityUSD)
        .multipliedBy(100)
        .precision(20, BigNumber.ROUND_UP)
        .toNumber(),
      title: getAssetInfo(userReserve.reserve.symbol).formattedName || '',
      color: getAssetColor(userReserve.reserve.symbol),
    }));

  return (
    <Row
      title={intl.formatMessage(messages.title)}
      className="DepositCompositionBar"
      weight="light"
      color="white"
      isColumn={true}
    >
      <CompositionBar dataset={userReserves} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
