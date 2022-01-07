import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { isAssetStable } from '../../../../helpers/config/assets-config';
import DashboardItemsWrapper from '../../../dashboard/components/DashboardItemsWrapper';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { useLanguageContext } from '../../../../libs/language-provider';
import BorrowItem from './BorrowItem';
import BorrowMobileCard from './BorrowMobileCard';
import InfoBanner from '../../../../components/InfoBanner';
import TableNoData from '../../../dashboard/components/DashboardTable/TableNoData';

import { BorrowTableItem as InternalBorrowTableItem } from './types';
import { BorrowTableItem } from '../BorrowDashboardTable/types';

import messages from './messages';

interface BorrowAssetTableProps {
  borrowedReserves: BorrowTableItem[];
}

export default function BorrowAssetTable({ borrowedReserves }: BorrowAssetTableProps) {
  const intl = useIntl();
  const { user, userId, reserves, marketReferencePriceInUsd, userEmodeCategoryId } =
    useAppDataContext();
  const { currentLangSlug } = useLanguageContext();
  const { sm } = useThemeContext();

  let availableBorrowsMarketReferenceCurrency = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  );
  /**
   * When a user is in isolation mode it's no longer only relevant how much is available to be borrowed.
   * When others debt accrues to available goes down. Therefore we add a 1% margin so the ceiling isn't surpassed.
   */
  if (
    availableBorrowsMarketReferenceCurrency.gt(0) &&
    user?.isInIsolationMode &&
    user.isolatedReserve?.isolationModeTotalDebt !== '0'
  ) {
    availableBorrowsMarketReferenceCurrency =
      availableBorrowsMarketReferenceCurrency.multipliedBy(0.99);
  }

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

  const isEModeActive = userEmodeCategoryId !== 0;

  const filteredBorrowReserves = tokensToBorrow
    .filter(({ symbol, borrowingEnabled, isActive, borrowableInIsolation, eModeCategoryId }) => {
      if (!isEModeActive) {
        return (
          (borrowingEnabled && isActive && !user?.isInIsolationMode) ||
          (user?.isInIsolationMode && borrowableInIsolation && isAssetStable(symbol))
        );
      } else {
        return (
          (eModeCategoryId === userEmodeCategoryId &&
            borrowingEnabled &&
            isActive &&
            !user?.isInIsolationMode) ||
          (eModeCategoryId === userEmodeCategoryId &&
            user?.isInIsolationMode &&
            borrowableInIsolation &&
            isAssetStable(symbol))
        );
      }
    })
    .sort((a, b) => (+a.availableBorrowsInUSD > +b.availableBorrowsInUSD ? -1 : 0));

  const head = [
    intl.formatMessage(messages.maxAmount),
    intl.formatMessage(messages.APYVariable),
    intl.formatMessage(messages.APYStable),
  ];

  const Header = useCallback(() => {
    return <TableHeader head={head} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  return filteredBorrowReserves.length ? (
    <>
      {!borrowedReserves.length && (
        <TableNoData
          caption={intl.formatMessage(messages.yourBorrows)}
          title={intl.formatMessage(messages.nothingBorrowed)}
        />
      )}

      <DashboardItemsWrapper
        title={intl.formatMessage(messages.assetsToBorrow)}
        localStorageName="borrowAssetsDashboardTableCollapse"
        subTitleComponent={
          (user?.isInIsolationMode || user?.totalCollateralMarketReferenceCurrency === '0') && (
            <InfoBanner
              text={intl.formatMessage(
                user?.isInIsolationMode ? messages.isolationText : messages.noCollateralText
              )}
              size="normal"
            />
          )
        }
        withBottomText={true}
        withTopMargin={true}
      >
        {!sm ? (
          <>
            <Header />
            {user?.totalCollateralMarketReferenceCurrency === '0'
              ? filteredBorrowReserves.map((item) => (
                  <BorrowItem {...item} key={item.id} userId={userId} />
                ))
              : filteredBorrowReserves
                  .filter(
                    ({ availableBorrowsInUSD, totalLiquidityUSD }) =>
                      availableBorrowsInUSD !== '0.00' && totalLiquidityUSD !== '0'
                  )
                  .map((item) => <BorrowItem {...item} key={item.id} userId={userId} />)}
          </>
        ) : user?.totalCollateralMarketReferenceCurrency === '0' ? (
          filteredBorrowReserves.map((item) => (
            <BorrowMobileCard userId={userId} {...item} key={item.id} />
          ))
        ) : (
          filteredBorrowReserves
            .filter(
              ({ availableBorrowsInUSD, totalLiquidityUSD }) =>
                availableBorrowsInUSD !== '0.00' && totalLiquidityUSD !== '0'
            )
            .map((item) => <BorrowMobileCard userId={userId} {...item} key={item.id} />)
        )}
      </DashboardItemsWrapper>
    </>
  ) : (
    <TableNoData
      caption={intl.formatMessage(messages.assetsToBorrow)}
      title={intl.formatMessage(messages.noDataCaption)}
      description={intl.formatMessage(messages.noDataDescription)}
    />
  );
}
