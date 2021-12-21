import React, { useCallback } from 'react';

import SupplyItem from './SupplyItem';

import messages from './messages';

import { SupplyTableItem } from './types';
import { ComputedReserveData, useAppDataContext } from '../../../../libs/pool-data-provider';
import { DepositTableItem } from '../DepositDashboardTable/types';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import BigNumber from 'bignumber.js';
import Preloader from '../../../../components/basic/Preloader';
import { useLanguageContext } from '../../../../libs/language-provider';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useIntl } from 'react-intl';
import DashboardTable from '../../../dashboard/components/DashboardTable';
import SupplyTableHeader from '../../../dashboard/components/DashboardTable/SupplyTableHeader ';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import SupplyItemMobileCard from './SupplyItemMobileCard';

interface SupplyAssetTableProps {
  suppliedReserves: DepositTableItem[];
}

export default function SupplyAssetTable({ suppliedReserves }: SupplyAssetTableProps) {
  const intl = useIntl();
  const { user, userId, walletBalances, reserves, marketReferencePriceInUsd } = useAppDataContext();
  const { currentLangSlug } = useLanguageContext();
  const { lg, sm } = useThemeContext();

  if (!walletBalances) {
    return <Preloader withText={true} />;
  }

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

  // const reserveAssets = suppliedReserves.map((reserve) =>
  //   reserve.reserve.underlyingAsset.toLowerCase()
  // );
  //TODO: use this array once all is beeing rendered correctly
  // const filteredSupplyReserves = tokensToSupply.filter(
  //   (reserve) =>
  //     reserveAssets.indexOf(reserve.underlyingAsset.toLowerCase()) === -1 &&
  //     reserve.availableToDepositUSD !== '0'
  // );

  const head = [
    intl.formatMessage(messages.supplyAssets),
    intl.formatMessage(messages.secondTableColumnTitle),
    intl.formatMessage(messages.apyRowTitle),
  ];
  const colWidth = [lg ? 250 : 160, '100%', '100%', 180];

  const Header = useCallback(() => {
    return <SupplyTableHeader head={head} colWidth={colWidth} isDeposit={true} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  return (
    <>
      {!sm ? (
        <>
          <Header />

          <DashboardTable>
            {tokensToSupply.map((item) => (
              <SupplyItem {...item} key={item.id} userId={userId} />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper>
          {tokensToSupply.map((item) => (
            <SupplyItemMobileCard userId={userId} {...item} key={item.id} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  );
}
