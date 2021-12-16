import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';
import { PERMISSION } from '@aave/contract-helpers';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import { USD_DECIMALS } from '@aave/math-utils';

import { ComputedReserveData, useAppDataContext } from '../../../../libs/pool-data-provider';
import { isAssetStable } from '../../../../helpers/config/assets-config';
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
  const { walletBalances, reserves, user, userId, marketReferencePriceInUsd } = useAppDataContext();
  const { sm } = useThemeContext();

  const [searchValue, setSearchValue] = useState('');
  const [showOnlyStableCoins, setShowOnlyStableCoins] = useState(false);

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  if (!walletBalances) {
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
      });

    if (withFilter) {
      if (sortDesc) {
        return (
          data(filteredReserves)
            .sort((a, b) => +b.availableToDepositUSD - +a.availableToDepositUSD)
            // @ts-ignore
            .sort((a, b) => a[sortName] - b[sortName])
        );
      } else {
        return (
          data(filteredReserves)
            .sort((a, b) => +b.availableToDepositUSD - +a.availableToDepositUSD)
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
            isolationText={
              user?.isInIsolationMode ? intl.formatMessage(messages.isolationText) : undefined
            }
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
          isolationText={
            user?.isInIsolationMode ? intl.formatMessage(messages.isolationText) : undefined
          }
        >
          {!!listData(true).length ? (
            <>
              {!sm ? (
                <DepositAssetsTable
                  listData={listData(true)}
                  userId={userId}
                  sortName={sortName}
                  setSortName={setSortName}
                  sortDesc={sortDesc}
                  setSortDesc={setSortDesc}
                />
              ) : (
                <>
                  {listData(true).map((item, index) => (
                    <DepositMobileCard userId={userId} {...item} key={index} />
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
