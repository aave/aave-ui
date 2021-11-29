import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';
import { PERMISSION } from '@aave/contract-helpers';

import {
  ComputedReserveData,
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import { useIncentivesDataContext } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import Preloader from '../../../../components/basic/Preloader';
import AssetsFilterPanel from '../../../../components/AssetsFilterPanel';
import NoDataPanel from '../../../../components/NoDataPanel';
import DepositAssetsTable from '../../components/DepositAssetsTable';
import DepositMobileCard from '../../components/DepositAssetsTable/DepositMobileCard';
import DepositBorrowMainWrapper from '../../../../components/wrappers/DepositBorrowMainWrapper';
import Card from '../../../../components/wrappers/DepositBorrowMainWrapper/components/Card';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { DepositTableItem } from '../../components/DepositAssetsTable/types';

export default function DepositsMain() {
  const intl = useIntl();
  const { walletData } = useStaticPoolDataContext();
  const { reserves, user } = useDynamicPoolDataContext();
  const { reserveIncentives } = useIncentivesDataContext();
  const { sm } = useThemeContext();

  const [searchValue, setSearchValue] = useState('');
  const [showOnlyStableCoins, setShowOnlyStableCoins] = useState(false);

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  if (!walletData) {
    return <Preloader withText={true} />;
  }

  const filteredReserves = reserves.filter(
    (reserve) =>
      reserve.symbol.toLowerCase().includes(searchValue.toLowerCase()) &&
      reserve.isActive &&
      (!showOnlyStableCoins || isAssetStable(reserve.symbol))
  );

  if (sortDesc) {
    // @ts-ignore
    filteredReserves.sort((a, b) => a[sortName] - b[sortName]);
  } else {
    // @ts-ignore
    filteredReserves.sort((a, b) => b[sortName] - a[sortName]);
  }

  const listData = (withFilter: boolean) => {
    const data = (reserves: ComputedReserveData[]) =>
      reserves.map<DepositTableItem>((reserve) => {
        const userReserve = user?.userReservesData.find(
          (userRes) => userRes.reserve.symbol === reserve.symbol
        );
        const walletBalance = walletData[reserve.underlyingAsset]?.amount || '0';
        const walletBalanceInUSD = walletData[reserve.underlyingAsset]?.amountUSD || '0';
        const reserveIncentiveData = reserveIncentives[reserve.underlyingAsset.toLowerCase()];
        return {
          ...reserve,
          walletBalance,
          walletBalanceInUSD,
          underlyingBalance: userReserve ? userReserve.underlyingBalance : '0',
          underlyingBalanceInUSD: userReserve ? userReserve.underlyingBalanceUSD : '0',
          liquidityRate: reserve.supplyAPY,
          avg30DaysLiquidityRate: Number(reserve.avg30DaysLiquidityRate),
          borrowingEnabled: reserve.borrowingEnabled,
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
        return (
          data(filteredReserves)
            .sort((a, b) => +b.walletBalanceInUSD - +a.walletBalanceInUSD)
            // @ts-ignore
            .sort((a, b) => a[sortName] - b[sortName])
        );
      } else {
        return (
          data(filteredReserves)
            .sort((a, b) => +b.walletBalanceInUSD - +a.walletBalanceInUSD)
            // @ts-ignore
            .sort((a, b) => b[sortName] - a[sortName])
        );
      }
    } else {
      return data(reserves);
    }
  };

  const isShowRightPanel = listData(false).some((item) => item.underlyingBalance.toString() > '0');

  return (
    <PermissionWarning requiredPermission={PERMISSION.DEPOSITOR}>
      <ScreenWrapper
        pageTitle={intl.formatMessage(defaultMessages.deposit)}
        isTitleOnDesktop={true}
        withMobileGrayBg={true}
      >
        {sm && (
          <AssetsFilterPanel
            optionTitleLeft={intl.formatMessage(messages.optionTitleLeft)}
            optionTitleRight={intl.formatMessage(messages.optionTitleRight)}
            switchValue={showOnlyStableCoins}
            switchOnToggle={setShowOnlyStableCoins}
            searchValue={searchValue}
            searchOnChange={setSearchValue}
          />
        )}

        <DepositBorrowMainWrapper
          contentTitle={intl.formatMessage(messages.availableToDeposit)}
          itemsTitle={intl.formatMessage(messages.myDeposits)}
          items={listData(false).map((item, index) => (
            <React.Fragment key={index}>
              {item.underlyingBalance.toString() > '0' && (
                <Card
                  link={`/deposit/${item.underlyingAsset}-${item.id}`}
                  symbol={item.symbol}
                  id={item.id}
                  value={item.underlyingBalance.toString()}
                  underlyingAsset={item.underlyingAsset}
                  isIsolated={item.isIsolated}
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
          totalValue={listData(false).reduce((a, b) => a + (+b['underlyingBalanceInUSD'] || 0), 0)}
        >
          {!!listData(true).length ? (
            <>
              {!sm ? (
                <DepositAssetsTable
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
                    <DepositMobileCard userId={user?.id} {...item} key={index} />
                  ))}
                </>
              )}
            </>
          ) : (
            <NoDataPanel title={intl.formatMessage(messages.noDataTitle)} />
          )}
        </DepositBorrowMainWrapper>
      </ScreenWrapper>
    </PermissionWarning>
  );
}
