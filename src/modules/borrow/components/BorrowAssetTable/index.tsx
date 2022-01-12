import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { getMaxAmountAvailalbeToBorrow } from '../../utils';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import DashboardItemsWrapper from '../../../dashboard/components/DashboardItemsWrapper';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { useLanguageContext } from '../../../../libs/language-provider';
import BorrowItem from './BorrowItem';
import BorrowMobileCard from './BorrowMobileCard';
import InfoBanner from '../../../../components/InfoBanner';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { CapType } from '../../../../components/caps/helper';
import NoDataPanel from '../../../../components/NoDataPanel';

import { BorrowTableItem as InternalBorrowTableItem } from './types';
import { BorrowTableItem } from '../BorrowDashboardTable/types';

import messages from './messages';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { API_ETH_MOCK_ADDRESS } from '@aave/contract-helpers';

interface BorrowAssetTableProps {
  borrowedReserves: BorrowTableItem[];
}

export default function BorrowAssetTable({ borrowedReserves }: BorrowAssetTableProps) {
  const intl = useIntl();
  const { user, userId, reserves, marketReferencePriceInUsd, userEmodeCategoryId } =
    useAppDataContext();
  const { networkConfig } = useProtocolDataContext();
  const { currentLangSlug } = useLanguageContext();
  const { sm } = useThemeContext();

  const tokensToBorrow: InternalBorrowTableItem[] = reserves.map<InternalBorrowTableItem>(
    (reserve) => {
      const availableBorrows = user ? getMaxAmountAvailalbeToBorrow(reserve, user).toNumber() : 0;

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
        symbol:
          reserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? networkConfig.baseAssetSymbol
            : reserve.symbol,
        underlyingAsset:
          reserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? API_ETH_MOCK_ADDRESS.toLowerCase()
            : reserve.underlyingAsset,
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
    <AvailableCapsHelpModal capType={CapType.borrowCap} shortTitle={true} iconSize={12} />,
    intl.formatMessage(messages.APYVariable),
    intl.formatMessage(messages.APYStable),
  ];

  const Header = useCallback(() => {
    return <TableHeader head={head} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const borrowReserves =
    user?.totalCollateralMarketReferenceCurrency === '0' || +collateralUsagePercent >= 0.98
      ? filteredBorrowReserves
      : filteredBorrowReserves.filter(
          ({ availableBorrowsInUSD, totalLiquidityUSD }) =>
            availableBorrowsInUSD !== '0.00' && totalLiquidityUSD !== '0'
        );

  return (
    <>
      {!borrowedReserves.length && (
        <DashboardItemsWrapper
          title={intl.formatMessage(messages.yourBorrows)}
          localStorageName="borrowAssetsDashboardTableCollapse"
          noData={true}
        >
          <NoDataPanel title={intl.formatMessage(messages.nothingBorrowed)} />
        </DashboardItemsWrapper>
      )}

      <DashboardItemsWrapper
        title={intl.formatMessage(messages.assetsToBorrow)}
        localStorageName="borrowAssetsDashboardTableCollapse"
        subTitleComponent={
          <>
            {(user?.isInIsolationMode || user?.totalCollateralMarketReferenceCurrency === '0') && (
              <InfoBanner
                text={intl.formatMessage(
                  user?.isInIsolationMode ? messages.isolationText : messages.noCollateralText
                )}
                size="normal"
              />
            )}
            {+collateralUsagePercent >= 0.98 && (
              <InfoBanner
                text={intl.formatMessage(messages.liquidationText)}
                size="normal"
                withoutLink={true}
              />
            )}
          </>
        }
        withTopMargin={true}
      >
        {!sm ? (
          <>
            <Header />
            {borrowReserves.map((item) => (
              <BorrowItem {...item} key={item.id} userId={userId} />
            ))}
          </>
        ) : (
          borrowReserves.map((item) => <BorrowMobileCard userId={userId} {...item} key={item.id} />)
        )}
      </DashboardItemsWrapper>
    </>
  );
}
