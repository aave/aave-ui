import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useAppDataContext } from '../../../../libs/pool-data-provider';
import toggleLocalStorageClick from '../../../../helpers/toggle-local-storage-click';
import TopPanelWrapper from '../../../../components/wrappers/TopPanelWrapper';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import SelectMarketPanel from '../../components/SelectMarketPanel';
import MarketTable from '../../components/MarketTable';
import MarketTableItem from '../../components/MarketTableItem';
import TotalMarketsSize from '../../components/TotalMarketsSize';
import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import MarketMobileCard from '../../components/MarketMobileCard';

import messages from './messages';
import staticStyles from './style';
import Preloader from '../../../../components/basic/Preloader';

export default function Markets() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { reserves, loading } = useAppDataContext();
  const [isPriceInUSD, setIsPriceInUSD] = useState(
    localStorage.getItem('marketsIsPriceInUSD') === 'true'
  );
  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  if (loading && !reserves.length) return <Preloader withText />;
  let totalLockedInUsd = valueToBigNumber('0');
  let sortedData = reserves
    .filter((res) => res.isActive && !res.isFrozen)
    .map((reserve) => {
      totalLockedInUsd = totalLockedInUsd.plus(reserve.totalLiquidityUSD);

      const totalLiquidity = Number(reserve.totalLiquidity);
      const totalLiquidityInUSD = Number(reserve.totalLiquidityUSD);

      const totalBorrows = Number(reserve.totalDebt);
      const totalBorrowsInUSD = Number(reserve.totalDebtUSD);
      return {
        totalLiquidity,
        totalLiquidityInUSD,
        totalBorrows: reserve.borrowingEnabled ? totalBorrows : -1,
        totalBorrowsInUSD: reserve.borrowingEnabled ? totalBorrowsInUSD : -1,
        id: reserve.id,
        underlyingAsset: reserve.underlyingAsset,
        currencySymbol: reserve.symbol,
        depositAPY: reserve.borrowingEnabled ? Number(reserve.supplyAPY) : -1,
        stableBorrowRate:
          reserve.stableBorrowRateEnabled && reserve.borrowingEnabled
            ? Number(reserve.stableBorrowAPY)
            : -1,
        variableBorrowRate: reserve.borrowingEnabled ? Number(reserve.variableBorrowAPY) : -1,
        borrowingEnabled: reserve.borrowingEnabled,
        stableBorrowRateEnabled: reserve.stableBorrowRateEnabled,
        isFreezed: reserve.isFrozen,
        aIncentives: reserve.aIncentivesData ? reserve.aIncentivesData : [],
        vIncentives: reserve.vIncentivesData ? reserve.vIncentivesData : [],
        sIncentives: reserve.sIncentivesData ? reserve.sIncentivesData : [],
        borrowCap: reserve.borrowCap,
        borrowCapUSD: reserve.borrowCapUSD,
        supplyCap: reserve.supplyCap,
        supplyCapUSD: reserve.supplyCapUSD,
        isIsolated: reserve.isIsolated,
      };
    });

  if (sortDesc) {
    if (sortName === 'currencySymbol') {
      sortedData.sort((a, b) =>
        b.currencySymbol.toUpperCase() < a.currencySymbol.toUpperCase() ? -1 : 0
      );
    } else {
      // @ts-ignore
      sortedData.sort((a, b) => a[sortName] - b[sortName]);
    }
  } else {
    if (sortName === 'currencySymbol') {
      sortedData.sort((a, b) =>
        a.currencySymbol.toUpperCase() < b.currencySymbol.toUpperCase() ? -1 : 0
      );
    } else {
      // @ts-ignore
      sortedData.sort((a, b) => b[sortName] - a[sortName]);
    }
  }

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      className="Markets"
      withMobileGrayBg={true}
    >
      <TopPanelWrapper isCollapse={true} withoutCollapseButton={true}>
        <div className="Markets__top-content">
          <TotalMarketsSize value={totalLockedInUsd.toNumber()} />
          <SelectMarketPanel />
        </div>
      </TopPanelWrapper>

      <div className="Markets__size">
        <TotalMarketsSize value={totalLockedInUsd.toNumber()} />
      </div>

      <div className="Markets__price-switcher">
        <LabeledSwitcher
          value={!isPriceInUSD}
          leftOption="USD"
          rightOption={intl.formatMessage(messages.native)}
          onToggle={() =>
            toggleLocalStorageClick(isPriceInUSD, setIsPriceInUSD, 'marketsIsPriceInUSD')
          }
        />
      </div>

      <div className="Markets__market-switcher">
        <p className="Markets__marketSwitcher--title">
          {intl.formatMessage(messages.selectMarket)}
        </p>
        <SelectMarketPanel />
      </div>

      <MarketTable
        sortName={sortName}
        setSortName={setSortName}
        sortDesc={sortDesc}
        setSortDesc={setSortDesc}
      >
        {sortedData.map((item, index) => (
          <MarketTableItem {...item} isPriceInUSD={isPriceInUSD} key={index} />
        ))}
      </MarketTable>

      <div className="Markets__mobile--cards">
        {sortedData.map((item, index) => (
          <MarketMobileCard {...item} key={index} />
        ))}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Markets {
          &__top-content {
            color: ${currentTheme.white.hex};
          }
          &__marketSwitcher--title {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </ScreenWrapper>
  );
}
