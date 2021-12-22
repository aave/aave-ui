import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import DashboardTable from '../../../dashboard/components/DashboardTable';
import TableAvailableHeader from '../../../dashboard/components/DashboardTable/TableAvailableHeader';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { useLanguageContext } from '../../../../libs/language-provider';
import BorrowItem from './BorrowItem';
import BorrowMobileCard from './BorrowMobileCard';

import { BorrowTableItem as InternalBorrowTableItem } from './types';
import { BorrowTableItem } from '../BorrowDashboardTable/types';

import messages from './messages';

interface BorrowAssetTableProps {
  borrowedReserves: BorrowTableItem[];
}

export default function BorrowAssetTable({ borrowedReserves }: BorrowAssetTableProps) {
  const intl = useIntl();
  const { user, userId, reserves, marketReferencePriceInUsd } = useAppDataContext();
  const { currentLangSlug } = useLanguageContext();
  const { lg, sm } = useThemeContext();

  const availableBorrowsMarketReferenceCurrency = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  );

  const tokensToBorrow: InternalBorrowTableItem[] = reserves.map<InternalBorrowTableItem>(
    (reserve) => {
      const availableBorrows = availableBorrowsMarketReferenceCurrency.gt(0)
        ? BigNumber.min(
            // one percent margin to don't fail tx
            availableBorrowsMarketReferenceCurrency
              .div(reserve.priceInMarketReferenceCurrency)
              .multipliedBy(
                user && user.totalBorrowsMarketReferenceCurrency !== '0' ? '0.99' : '1'
              ),
            reserve.availableLiquidity
          ).toNumber()
        : 0;
      const availableBorrowsInUSD = valueToBigNumber(availableBorrows)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketReferencePriceInUsd)
        .shiftedBy(-USD_DECIMALS)
        .toFixed(2);

      return {
        ...reserve,
        currentBorrows:
          user?.userReservesData.find((userReserve) => userReserve.reserve.id === reserve.id)
            ?.totalBorrows || '0',
        currentBorrowsInUSD:
          user?.userReservesData.find((userReserve) => userReserve.reserve.id === reserve.id)
            ?.totalBorrowsUSD || '0',
        totalBorrows: reserve.totalDebt,
        availableBorrows,
        availableBorrowsInUSD,
        stableBorrowRate:
          reserve.stableBorrowRateEnabled && reserve.borrowingEnabled
            ? Number(reserve.stableBorrowAPY)
            : -1,
        variableBorrowRate: reserve.borrowingEnabled ? Number(reserve.variableBorrowAPY) : -1,
        interestHistory: [],
        aIncentives: reserve.aIncentivesData ? reserve.aIncentivesData : [],
        vIncentives: reserve.vIncentivesData ? reserve.vIncentivesData : [],
        sIncentives: reserve.sIncentivesData ? reserve.sIncentivesData : [],
      };
    }
  );

  const reserveAssets = borrowedReserves.map((reserve) => reserve.currentBorrows.toLowerCase());

  const filteredBorrowReserves = tokensToBorrow.filter(
    (reserve) =>
      reserveAssets.indexOf(reserve.currentBorrows.toString()) === -1 &&
      reserve.availableBorrowsInUSD !== '0'
  );

  const head = [
    intl.formatMessage(messages.borrowAssets),
    intl.formatMessage(messages.secondTableColumnTitle),
    intl.formatMessage(messages.variableAPY),
    intl.formatMessage(messages.stableAPY),
  ];
  const colWidth = [lg ? 250 : 160, '100%', '100%', '100%'];

  const Header = useCallback(() => {
    return <TableAvailableHeader head={head} colWidth={colWidth} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  return (
    <>
      {!sm ? (
        <>
          <Header />

          <DashboardTable>
            {filteredBorrowReserves.map((item) => (
              <BorrowItem {...item} key={item.id} userId={userId} />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper
          title={intl.formatMessage(messages.borrowAssets)}
          withTopMargin={true}
        >
          {filteredBorrowReserves.map((item) => (
            <BorrowMobileCard userId={userId} {...item} key={item.id} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  );
}
