import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';
import { PERMISSION } from '@aave/contract-helpers';

import {
  ComputedReserveData,
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import NoDataPanel from '../../../../components/NoDataPanel';
import AssetsFilterPanel from '../../../../components/AssetsFilterPanel';
import BorrowAssetTable from '../../components/BorrowAssetTable';
import BorrowMobileCard from '../../components/BorrowAssetTable/BorrowMobileCard';
import DepositBorrowMainWrapper from '../../../../components/wrappers/DepositBorrowMainWrapper';
import Card from '../../../../components/wrappers/DepositBorrowMainWrapper/components/Card';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { BorrowTableItem } from '../../components/BorrowAssetTable/types';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import { useIncentivesDataContext } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';

export default function BorrowMain() {
  const intl = useIntl();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { reserves, user } = useDynamicPoolDataContext();
  const { reserveIncentives } = useIncentivesDataContext();
  const { sm } = useThemeContext();

  const [searchValue, setSearchValue] = useState('');
  const [showOnlyStableCoins, setShowOnlyStableCoins] = useState(false);

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  const availableBorrowsMarketReferenceCurrency = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  );

  const filteredReserves = reserves.filter(
    ({ symbol, borrowingEnabled, isActive }) =>
      symbol.toLowerCase().includes(searchValue.toLowerCase()) &&
      borrowingEnabled &&
      isActive &&
      (!showOnlyStableCoins || isAssetStable(symbol))
  );

  const listData = (withFilter: boolean) => {
    const data = (reserves: ComputedReserveData[]) =>
      reserves.map<BorrowTableItem>((reserve) => {
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
          .multipliedBy(marketRefPriceInUsd)
          .toString();
        const reserveIncentiveData = reserveIncentives[reserve.underlyingAsset.toLowerCase()];
        return {
          ...reserve,
          currentBorrows:
            user?.userReservesData.find((userReserve) => userReserve.reserve.id === reserve.id)
              ?.totalBorrows || '0',
          currentBorrowsInUSD:
            user?.userReservesData.find((userReserve) => userReserve.reserve.id === reserve.id)
              ?.totalBorrowsUSD || '0',
          availableBorrows,
          availableBorrowsInUSD,
          stableBorrowRate:
            reserve.stableBorrowRateEnabled && reserve.borrowingEnabled
              ? Number(reserve.stableBorrowAPY)
              : -1,
          variableBorrowRate: reserve.borrowingEnabled ? Number(reserve.variableBorrowAPY) : -1,
          avg30DaysVariableRate: Number(reserve.avg30DaysVariableBorrowRate),
          interestHistory: [],
          aincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.aIncentives.incentiveAPR
            : '0',
          vincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.vIncentives.incentiveAPR
            : '0',
          sincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.sIncentives.incentiveAPR
            : '0',
        };
      });

    if (withFilter) {
      if (sortDesc) {
        // @ts-ignore
        return data(filteredReserves).sort((a, b) => a[sortName] - b[sortName]);
      } else {
        // @ts-ignore
        return data(filteredReserves).sort((a, b) => b[sortName] - a[sortName]);
      }
    } else {
      return data(reserves);
    }
  };

  const isShowRightPanel = listData(false).some((item) => item.currentBorrows.toString() > '0');

  return (
    <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
      <ScreenWrapper
        pageTitle={intl.formatMessage(defaultMessages.borrow)}
        isTitleOnDesktop={true}
        withMobileGrayBg={true}
      >
        {sm && (
          <AssetsFilterPanel
            optionTitleLeft={intl.formatMessage(messages.optionTitleLeft)}
            optionTitleRight={intl.formatMessage(messages.optionTitleRight)}
            switchOnToggle={setShowOnlyStableCoins}
            switchValue={showOnlyStableCoins}
            searchValue={searchValue}
            searchOnChange={setSearchValue}
          />
        )}

        <DepositBorrowMainWrapper
          contentTitle={intl.formatMessage(messages.availableToBorrow)}
          itemsTitle={intl.formatMessage(messages.myBorrows)}
          items={listData(false).map((item, index) => (
            <React.Fragment key={index}>
              {item.currentBorrows.toString() > '0' && (
                <Card
                  link={`/borrow/${item.underlyingAsset}-${item.id}`}
                  symbol={item.symbol}
                  id={item.id}
                  value={item.currentBorrows.toString()}
                  underlyingAsset={item.underlyingAsset}
                />
              )}
            </React.Fragment>
          ))}
          isShowRightPanel={isShowRightPanel}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showOnlyStableCoins={showOnlyStableCoins}
          setShowOnlyStableCoins={setShowOnlyStableCoins}
          withSwitchMarket={true}
          totalValue={listData(false).reduce((a, b) => a + (+b['currentBorrowsInUSD'] || 0), 0)}
        >
          {!!listData(true).length ? (
            <>
              {!sm ? (
                <BorrowAssetTable
                  listData={listData(true)}
                  userId={user?.id}
                  sortName={sortName}
                  setSortName={setSortName}
                  sortDesc={sortDesc}
                  setSortDesc={setSortDesc}
                />
              ) : (
                <>
                  {listData(true).map((item, index) => (
                    <BorrowMobileCard userId={user?.id} {...item} key={index} />
                  ))}
                </>
              )}
            </>
          ) : (
            <NoDataPanel title={intl.formatMessage(messages.noDataText)} />
          )}
        </DepositBorrowMainWrapper>
      </ScreenWrapper>
    </PermissionWarning>
  );
}
