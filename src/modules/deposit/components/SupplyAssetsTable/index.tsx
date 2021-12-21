import React from 'react';

import BasicAssetsTable from '../../../../components/BasicAssetsTable';
import SupplyItem from './SupplyItem';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { CapType } from '../../../../components/caps/helper';

import messages from './messages';

import { SupplyTableItem } from './types';
import { ComputedReserveData, useAppDataContext } from '../../../../libs/pool-data-provider';
import { DepositTableItem } from '../DepositDashboardTable/types';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import BigNumber from 'bignumber.js';

interface SupplyAssetTableProps {
  suppliedReserves: DepositTableItem[];
}

export default function SupplyAssetTable({ suppliedReserves }: SupplyAssetTableProps) {
  const { user, userId, walletBalances, reserves, marketReferencePriceInUsd } = useAppDataContext();

  const tokensToSupply: SupplyTableItem[] = reserves.map<SupplyTableItem>(
    (reserve: ComputedReserveData) => {
      const userReserve = user?.userReservesData.find(
        (userRes) => userRes.reserve.symbol === reserve.symbol
      );
      const walletBalance = walletBalances[reserve.underlyingAsset]?.amount || '0';

      let availableToDeposit = valueToBigNumber(walletBalance);
      if (reserve.supplyCap !== '0') {
        availableToDeposit = BigNumber.min(
          availableToDeposit,
          new BigNumber(reserve.supplyCap).minus(reserve.totalLiquidity).multipliedBy('0.995')
        );
      }
      const availableToDepositUSD = valueToBigNumber(availableToDeposit)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketReferencePriceInUsd)
        .shiftedBy(-USD_DECIMALS)
        .toString();

      return {
        ...reserve,
        walletBalance,
        availableToDeposit:
          availableToDeposit.toNumber() <= 0 ? '0' : availableToDeposit.toString(),
        availableToDepositUSD:
          Number(availableToDepositUSD) <= 0 ? '0' : availableToDepositUSD.toString(),
        underlyingBalance: userReserve ? userReserve.underlyingBalance : '0',
        underlyingBalanceInUSD: userReserve ? userReserve.underlyingBalanceUSD : '0',
        liquidityRate: reserve.supplyAPY,
        borrowingEnabled: reserve.borrowingEnabled,
        interestHistory: [],
        aIncentives: reserve.aIncentivesData ? reserve.aIncentivesData : [],
        vIncentives: reserve.vIncentivesData ? reserve.vIncentivesData : [],
        sIncentives: reserve.sIncentivesData ? reserve.sIncentivesData : [],
      };
    }
  );

  const filteredSupplyReserves = tokensToSupply.filter((reserve) => {
    if (reserve.availableToDepositUSD != '0') return true;
    return false;
  });

  const columns = [
    {
      title: messages.asset,
    },
    {
      titleComponent: <AvailableCapsHelpModal capType={CapType.supplyCap} />,
      sortKey: 'availableToDepositUSD',
    },
    {
      title: messages.APY,
      sortKey: 'liquidityRate',
    },
  ];

  return (
    <BasicAssetsTable columns={columns}>
      {filteredSupplyReserves.map((item, index) => (
        <SupplyItem userId={userId} {...item} key={index} />
      ))}
      <style jsx={true} global={true}>{`
        .BasicTable__content-inner .TableItem__content {
          flex: 2;
        }
      `}</style>
    </BasicAssetsTable>
  );
}