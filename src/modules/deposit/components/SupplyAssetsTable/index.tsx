import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useLanguageContext } from '../../../../libs/language-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import SupplyItem from './SupplyItem';
import DashboardItemsWrapper from '../../../dashboard/components/DashboardItemsWrapper';
import TableHeader from '../../../dashboard/components/DashboardTable/TableHeader';
import SupplyItemMobileCard from './SupplyItemMobileCard';
import { ComputedReserveData, useAppDataContext } from '../../../../libs/pool-data-provider';
import Preloader from '../../../../components/basic/Preloader';
import InfoBanner from '../../../../components/InfoBanner';
import Link from '../../../../components/basic/Link';
import DashboardItemsTopPanel from '../../../dashboard/components/DashboardItemsTopPanel';

import messages from './messages';
import { API_ETH_MOCK_ADDRESS } from '@aave/contract-helpers';

export default function SupplyAssetTable() {
  const intl = useIntl();

  const { user, userId, walletBalances, reserves, marketReferencePriceInUsd } = useAppDataContext();
  const {
    networkConfig: {
      bridge,
      name: networkName,
      isTestnet,
      wrappedBaseAssetSymbol,
      baseAssetSymbol,
    },
  } = useProtocolDataContext();
  const { currentLangSlug } = useLanguageContext();
  const { sm } = useThemeContext();

  const localStorageName = 'showSupplyZeroAssets';
  const [isShowZeroAssets, setIsShowZeroAssets] = useState(
    localStorage.getItem(localStorageName) === 'true'
  );

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

  const wrappedAsset = tokensToSupply.find(
    (token) => token.symbol.toLowerCase() === wrappedBaseAssetSymbol?.toLowerCase()
  );
  if (wrappedAsset) {
    let availableToDeposit = valueToBigNumber(
      walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount
    );
    if (wrappedAsset.supplyCap !== '0') {
      availableToDeposit = BigNumber.min(
        availableToDeposit,
        new BigNumber(wrappedAsset.supplyCap)
          .minus(wrappedAsset.totalLiquidity)
          .multipliedBy('0.995')
      );
    }
    const availableToDepositUSD = valueToBigNumber(availableToDeposit)
      .multipliedBy(wrappedAsset.priceInMarketReferenceCurrency)
      .multipliedBy(marketReferencePriceInUsd)
      .shiftedBy(-USD_DECIMALS)
      .toString();
    tokensToSupply.push({
      ...wrappedAsset,
      underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
      symbol: baseAssetSymbol,
      walletBalance: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount,
      walletBalanceUSD: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amountUSD,
      availableToDeposit: availableToDeposit.toString(),
      availableToDepositUSD,
    });
  }

  const sortedSupplyReserves = tokensToSupply.sort((a, b) =>
    +a.walletBalanceUSD > +b.walletBalanceUSD ? -1 : 1
  );
  const filteredSupplyReserves = sortedSupplyReserves.filter(
    (reserve) => reserve.availableToDepositUSD !== '0'
  );

  const head = [
    intl.formatMessage(messages.walletBalance),
    intl.formatMessage(messages.APY),
    intl.formatMessage(messages.collateral),
  ];

  const Header = useCallback(() => {
    return <TableHeader head={head} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug]);

  if (!sortedSupplyReserves.length) return null;

  const supplyReserves = isShowZeroAssets
    ? sortedSupplyReserves
    : filteredSupplyReserves.length >= 1
    ? filteredSupplyReserves
    : sortedSupplyReserves;

  return (
    <DashboardItemsWrapper
      title={intl.formatMessage(messages.assetsToDeposit)}
      localStorageName="supplyAssetsDashboardTableCollapse"
      withBottomText={isTestnet}
      withTopMargin={true}
      subTitleComponent={
        <>
          {user?.isInIsolationMode && (
            <InfoBanner text={intl.formatMessage(messages.isolationText)} size="normal" />
          )}
          {filteredSupplyReserves.length === 0 && (
            <InfoBanner
              text={
                <span>
                  {intl.formatMessage(messages.zeroStateText, { networkName })}{' '}
                  {bridge &&
                    intl.formatMessage(messages.zeroStateBridgeText, {
                      link: (
                        <Link
                          to={bridge.url}
                          color="secondary"
                          absolute={true}
                          inNewWindow={true}
                          title={bridge.name}
                        />
                      ),
                    })}
                </span>
              }
              size="normal"
              withoutLink={true}
            />
          )}
          {filteredSupplyReserves.length >= 1 && (
            <DashboardItemsTopPanel
              value={isShowZeroAssets}
              onClick={setIsShowZeroAssets}
              localStorageName={localStorageName}
              bridge={bridge}
            />
          )}
        </>
      }
    >
      {!sm ? (
        <>
          <Header />
          {supplyReserves.map((item) => (
            <SupplyItem {...item} key={item.underlyingAsset} userId={userId} />
          ))}
        </>
      ) : (
        supplyReserves.map((item) => (
          <SupplyItemMobileCard userId={userId} {...item} key={item.underlyingAsset} />
        ))
      )}
    </DashboardItemsWrapper>
  );
}
