import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import SupplyItem from './SupplyItem';
import DashboardTable from '../../../dashboard/components/DashboardTable';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import SupplyItemMobileCard from './SupplyItemMobileCard';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { CapType } from '../../../../components/caps/helper';
import { SupplyTableItem } from './types';
import { ComputedReserveData, useAppDataContext } from '../../../../libs/pool-data-provider';
import { DepositTableItem } from '../DepositDashboardTable/types';
import Preloader from '../../../../components/basic/Preloader';
import { useLanguageContext } from '../../../../libs/language-provider';

import messages from './messages';

interface SupplyAssetTableProps {
  suppliedReserves: DepositTableItem[];
}

export default function SupplyAssetTable({ suppliedReserves }: SupplyAssetTableProps) {
  const intl = useIntl();
  const { user, userId, walletBalances, reserves, marketReferencePriceInUsd } = useAppDataContext();
  const { currentLangSlug } = useLanguageContext();
  const { sm } = useThemeContext();

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
        isUserInIsolationMode: user?.isInIsolationMode,
      };
    }
  );

  const reserveAssets = suppliedReserves.map((reserve) =>
    reserve.reserve.underlyingAsset.toLowerCase()
  );

  const filteredSupplyReserves = tokensToSupply.filter(
    (reserve) =>
      reserveAssets.indexOf(reserve.underlyingAsset.toLowerCase()) === -1 &&
      reserve.availableToDepositUSD !== '0'
  );

  const head = [
    intl.formatMessage(messages.maxAmount),
    intl.formatMessage(messages.APY),
    intl.formatMessage(messages.collateral),
  ];

  const Header = useCallback(() => {
    return <TableHeader head={head} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  return filteredSupplyReserves.length ? (
    <>
      {!sm ? (
        <>
          <DashboardTable
            title={
              <AvailableCapsHelpModal
                title={intl.formatMessage(messages.availableToDeposit)}
                capType={CapType.supplyCap}
              />
            }
            withBottomText={true}
            localStorageName="supplyAssetsDashboardTableCollapse"
          >
            <Header />
            {filteredSupplyReserves.map((item) => (
              <SupplyItem {...item} key={item.id} userId={userId} />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper
          title={
            <AvailableCapsHelpModal
              title={intl.formatMessage(messages.availableToDeposit)}
              capType={CapType.supplyCap}
            />
          }
          withTopMargin={true}
          withBottomText={true}
        >
          {filteredSupplyReserves.map((item) => (
            <SupplyItemMobileCard userId={userId} {...item} key={item.id} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  ) : (
    <></>
  );
}
