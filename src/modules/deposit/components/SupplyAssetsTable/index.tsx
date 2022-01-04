import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import SupplyItem from './SupplyItem';
import DashboardItemsWrapper from '../../../dashboard/components/DashboardItemsWrapper';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import SupplyItemMobileCard from './SupplyItemMobileCard';
import { ComputedReserveData, useAppDataContext } from '../../../../libs/pool-data-provider';
import Preloader from '../../../../components/basic/Preloader';
import InfoBanner from '../../../../components/InfoBanner';
import { useLanguageContext } from '../../../../libs/language-provider';

import messages from './messages';

export default function SupplyAssetTable() {
  const intl = useIntl();
  const { user, userId, walletBalances, reserves, marketReferencePriceInUsd } = useAppDataContext();
  const { currentLangSlug } = useLanguageContext();
  const { sm } = useThemeContext();

  if (!walletBalances) {
    return <Preloader withText={true} />;
  }

  const tokensToSupply = reserves.map((reserve: ComputedReserveData) => {
    const userReserve = user?.userReservesData.find(
      (userRes) => userRes.reserve.symbol === reserve.symbol
    );
    const walletBalance = walletBalances[reserve.underlyingAsset]?.amount;
    const walletBalanceUSD = walletBalances[reserve.underlyingAsset]?.amountUSD;

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

    const isIsolated = reserve.isIsolated;
    const hasDifferentCollateral = user?.userReservesData.find(
      (userRes) => userRes.usageAsCollateralEnabledOnUser && userRes.reserve.id !== reserve.id
    );

    const usageAsCollateralEnabledOnUser = !user?.isInIsolationMode
      ? reserve.usageAsCollateralEnabled && (!isIsolated || (isIsolated && !hasDifferentCollateral))
      : !isIsolated
      ? false
      : !hasDifferentCollateral;

    return {
      ...reserve,
      walletBalance,
      walletBalanceUSD,
      availableToDeposit: availableToDeposit.toNumber() <= 0 ? '0' : availableToDeposit.toString(),
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
      usageAsCollateralEnabledOnUser,
      priceInMarketReferenceCurrency: reserve.priceInMarketReferenceCurrency,
    };
  });

  // const wrappedAsset = tokensToSupply.find(
  //   (token) => token.underlyingAsset === networkConfig.baseAssetWrappedAddress
  // );
  // if (wrappedAsset) {
  //   let availableToDeposit = valueToBigNumber(
  //     walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount
  //   );
  //   if (wrappedAsset.supplyCap !== '0') {
  //     availableToDeposit = BigNumber.min(
  //       availableToDeposit,
  //       new BigNumber(wrappedAsset.supplyCap)
  //         .minus(wrappedAsset.totalLiquidity)
  //         .multipliedBy('0.995')
  //     );
  //   }
  //   const availableToDepositUSD = valueToBigNumber(availableToDeposit)
  //     .multipliedBy(wrappedAsset.priceInMarketReferenceCurrency)
  //     .multipliedBy(marketReferencePriceInUsd)
  //     .shiftedBy(-USD_DECIMALS)
  //     .toString();
  //   tokensToSupply.push({
  //     ...wrappedAsset,
  //     underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
  //     symbol: networkConfig.baseAsset,
  //     walletBalance: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount,
  //     walletBalanceUSD: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amountUSD,
  //     availableToDeposit: availableToDeposit.toString(),
  //     availableToDepositUSD,
  //   });
  // }

  const filteredSupplyReserves = tokensToSupply
    .filter((reserve) => reserve.availableToDepositUSD !== '0')
    .sort((a, b) => (+a.walletBalanceUSD > +b.walletBalanceUSD ? -1 : 1));

  const head = [
    intl.formatMessage(messages.walletBalance),
    intl.formatMessage(messages.APY),
    intl.formatMessage(messages.collateral),
  ];

  const Header = useCallback(() => {
    return <TableHeader head={head} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  if (!filteredSupplyReserves.length) return null;
  return (
    <DashboardItemsWrapper
      title={intl.formatMessage(messages.assetsToDeposit)}
      localStorageName="supplyAssetsDashboardTableCollapse"
      withBottomText={true}
      withTopMargin={true}
      subTitleComponent={
        user?.isInIsolationMode && (
          <InfoBanner text={intl.formatMessage(messages.isolationText)} size="normal" />
        )
      }
    >
      {!sm ? (
        <>
          <Header />
          {filteredSupplyReserves.map((item) => (
            <SupplyItem {...item} key={item.underlyingAsset} userId={userId} />
          ))}
        </>
      ) : (
        filteredSupplyReserves.map((item) => (
          <SupplyItemMobileCard userId={userId} {...item} key={item.underlyingAsset} />
        ))
      )}
    </DashboardItemsWrapper>
  );
}
