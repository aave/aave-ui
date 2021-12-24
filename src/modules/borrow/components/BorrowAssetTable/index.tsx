import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { isAssetStable } from '../../../../helpers/config/assets-config';
import DashboardTable from '../../../dashboard/components/DashboardTable';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import DashboardMobileCardsWrapper from '../../../dashboard/components/DashboardMobileCardsWrapper';
import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { useLanguageContext } from '../../../../libs/language-provider';
import BorrowItem from './BorrowItem';
import BorrowMobileCard from './BorrowMobileCard';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { CapType } from '../../../../components/caps/helper';
import IsolationInfoBanner from '../../../../components/isolationMode/IsolationInfoBanner';
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

  const reserveAssets = borrowedReserves.map((reserve) =>
    reserve.reserve.underlyingAsset.toLowerCase()
  );

  const isEModeActive = userEmodeCategoryId !== 0;

  const filteredBorrowReserves = tokensToBorrow.filter(
    ({
      symbol,
      borrowingEnabled,
      isActive,
      borrowableInIsolation,
      underlyingAsset,
      availableBorrowsInUSD,
      totalLiquidityUSD,
      eModeCategoryId,
    }) => {
      const defaultFilter =
        reserveAssets.indexOf(underlyingAsset.toString()) === -1 &&
        availableBorrowsInUSD !== '0.00' &&
        totalLiquidityUSD !== '0';

      if (!isEModeActive) {
        return (
          (defaultFilter && borrowingEnabled && isActive && !user?.isInIsolationMode) ||
          (defaultFilter &&
            user?.isInIsolationMode &&
            borrowableInIsolation &&
            isAssetStable(symbol))
        );
      } else {
        return (
          (eModeCategoryId === userEmodeCategoryId &&
            defaultFilter &&
            borrowingEnabled &&
            isActive &&
            !user?.isInIsolationMode) ||
          (eModeCategoryId === userEmodeCategoryId &&
            defaultFilter &&
            user?.isInIsolationMode &&
            borrowableInIsolation &&
            isAssetStable(symbol))
        );
      }
    }
  );

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
          description={intl.formatMessage(messages.nothingBorrowedDescription)}
        />
      )}

      {user?.isInIsolationMode && sm && (
        <IsolationInfoBanner
          text={intl.formatMessage(messages.isolationText)}
          size="normal"
          withoutMargin={!sm}
        />
      )}

      {!sm ? (
        <>
          <DashboardTable
            title={
              <AvailableCapsHelpModal
                title={intl.formatMessage(messages.availableToBorrow)}
                capType={CapType.borrowCap}
              />
            }
            localStorageName="borrowDashboardTableCollapse"
            subTitleComponent={
              user?.isInIsolationMode && (
                <IsolationInfoBanner
                  text={intl.formatMessage(messages.isolationText)}
                  size="normal"
                />
              )
            }
            withBottomText={true}
          >
            <Header />
            {filteredBorrowReserves.map((item) => (
              <BorrowItem {...item} key={item.id} userId={userId} />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper
          title={
            <AvailableCapsHelpModal
              title={intl.formatMessage(messages.availableToBorrow)}
              capType={CapType.borrowCap}
            />
          }
          withTopMargin={true}
          withBottomText={true}
        >
          {filteredBorrowReserves.map((item) => (
            <BorrowMobileCard userId={userId} {...item} key={item.id} />
          ))}
        </DashboardMobileCardsWrapper>
      )}
    </>
  ) : (
    <TableNoData
      caption={
        <AvailableCapsHelpModal
          title={intl.formatMessage(messages.availableToBorrow)}
          capType={CapType.borrowCap}
        />
      }
      title={intl.formatMessage(messages.noDataCaption)}
      description={intl.formatMessage(messages.noDataDescription)}
    />
  );
}
