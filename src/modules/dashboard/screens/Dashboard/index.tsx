import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import { valueToBigNumber } from '@aave/math-utils';
import { API_ETH_MOCK_ADDRESS, InterestRate } from '@aave/contract-helpers';

import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { loanActionLinkComposer } from '../../../../helpers/loan-action-link-composer';
import { toggleUseAsCollateral } from '../../../../helpers/toggle-use-as-collateral';
import { toggleBorrowRateMode } from '../../../../helpers/toggle-borrow-rate-mode';
import Preloader from '../../../../components/basic/Preloader';
import DashboardTopPanel from '../../components/DashboardTopPanel';
import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import MainDashboardTable from '../../components/MainDashboardTable';
import IncentivesClaimPanel from '../../../../components/incentives/IncentivesClaimPanel';

import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';

import messages from './messages';
import staticStyles from './style';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';

export default function Dashboard() {
  const intl = useIntl();
  const navigate = useNavigate();
  const { networkConfig } = useProtocolDataContext();
  const { user, userId, reserves, loading } = useAppDataContext();

  const { currentTheme } = useThemeContext();

  const [isBorrow, setIsBorrow] = useState(false);

  if (loading) return <Preloader withText={true} />;

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
          .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
          .toFixed();

  const depositedPositions: DepositTableItem[] = [];
  const borrowedPositions: BorrowTableItem[] = [];

  user?.userReservesData.forEach((userReserve) => {
    const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);
    if (!poolReserve) {
      throw new Error('data is inconsistent pool reserve is not available');
    }

    const baseListData = {
      isActive: poolReserve.isActive,
      isFrozen: poolReserve.isFrozen,
      reserve: {
        ...userReserve.reserve,
        liquidityRate: poolReserve.supplyAPY,
        // this is a hack to repay with mainAsset instead of the wrappedpooltoken
        symbol:
          poolReserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? networkConfig.baseAsset
            : poolReserve.symbol,
        underlyingAsset:
          poolReserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? API_ETH_MOCK_ADDRESS
            : userReserve.reserve.underlyingAsset,
      },
    };

    depositedPositions.push({
      ...baseListData,
      usageAsCollateralEnabledOnUser: userReserve.usageAsCollateralEnabledOnUser,
      canBeEnabledAsCollateral:
        poolReserve.usageAsCollateralEnabled &&
        ((!poolReserve.isIsolated && !user.isInIsolationMode) ||
          user.isolatedReserve?.underlyingAsset === poolReserve.underlyingAsset ||
          (poolReserve.isIsolated && user.totalCollateralMarketReferenceCurrency === '0')),
      underlyingBalance: userReserve.underlyingBalance,
      underlyingBalanceUSD: userReserve.underlyingBalanceUSD,
      isIsolated: poolReserve.isIsolated,
      aIncentives: poolReserve.aIncentivesData ? poolReserve.aIncentivesData : [],
      onToggleSwitch: () =>
        toggleUseAsCollateral(
          navigate,
          !userReserve.usageAsCollateralEnabledOnUser,
          poolReserve.underlyingAsset
        ),
    });

    if (userReserve.variableBorrows !== '0') {
      borrowedPositions.push({
        ...baseListData,
        stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
        borrowingEnabled: poolReserve.borrowingEnabled,
        currentBorrows: userReserve.variableBorrows,
        currentBorrowsUSD: userReserve.variableBorrowsUSD,
        borrowRateMode: InterestRate.Variable,
        borrowRate: poolReserve.variableBorrowAPY,
        vIncentives: poolReserve.vIncentivesData ? poolReserve.vIncentivesData : [],
        sIncentives: poolReserve.sIncentivesData ? poolReserve.sIncentivesData : [],
        repayLink: loanActionLinkComposer(
          'repay',
          // this is a hack to repay with mainAsset instead of the wrappedpooltoken
          poolReserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? API_ETH_MOCK_ADDRESS.toLowerCase()
            : poolReserve.underlyingAsset,
          InterestRate.Variable
        ),
        borrowLink: loanActionLinkComposer(
          'borrow',
          // this is a hack to repay with mainAsset instead of the wrappedpooltoken
          poolReserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? API_ETH_MOCK_ADDRESS.toLowerCase()
            : poolReserve.underlyingAsset,
          InterestRate.Variable
        ),
        onSwitchToggle: () =>
          toggleBorrowRateMode(navigate, InterestRate.Variable, poolReserve.underlyingAsset),
      });
    }
    if (userReserve.stableBorrows !== '0') {
      borrowedPositions.push({
        ...baseListData,
        stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
        borrowingEnabled: poolReserve.borrowingEnabled && poolReserve.stableBorrowRateEnabled,
        currentBorrows: userReserve.stableBorrows,
        currentBorrowsUSD: userReserve.stableBorrowsUSD,
        borrowRateMode: InterestRate.Stable,
        borrowRate: userReserve.stableBorrowAPY,
        vIncentives: poolReserve.vIncentivesData ? poolReserve.vIncentivesData : [],
        sIncentives: poolReserve.sIncentivesData ? poolReserve.sIncentivesData : [],
        repayLink: loanActionLinkComposer(
          'repay',
          // this is a hack to repay with mainAsset instead of the wrappedpooltoken
          poolReserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? API_ETH_MOCK_ADDRESS.toLowerCase()
            : poolReserve.underlyingAsset,
          InterestRate.Stable
        ),
        borrowLink: loanActionLinkComposer(
          'borrow',
          // this is a hack to repay with mainAsset instead of the wrappedpooltoken
          poolReserve.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
            ? API_ETH_MOCK_ADDRESS.toLowerCase()
            : poolReserve.underlyingAsset,
          InterestRate.Stable
        ),
        onSwitchToggle: () =>
          toggleBorrowRateMode(navigate, InterestRate.Stable, poolReserve.underlyingAsset),
      });
    }
  });

  return (
    <div className={classNames('Dashboard', { Dashboard__fullHeight: !userId })}>
      <div className="Dashboard__top--line">
        <IncentivesClaimPanel />
      </div>

      <DashboardTopPanel
        user={user}
        userId={userId}
        collateralUsagePercent={collateralUsagePercent}
        loanToValue={loanToValue}
      />

      {userId && (
        <div className="Dashboard__switcher-inner">
          <LabeledSwitcher
            rightOption={intl.formatMessage(messages.switchRightOption)}
            leftOption={intl.formatMessage(messages.switchLeftOption)}
            value={isBorrow}
            onToggle={() => {
              setIsBorrow(!isBorrow);
            }}
            className="Dashboard__switcher"
            width={240}
            height={36}
            fontSize={14}
          />
        </div>
      )}

      {userId ? (
        <MainDashboardTable
          isUserInIsolationMode={user?.isInIsolationMode}
          borrowedPositions={borrowedPositions}
          depositedPositions={depositedPositions.filter((pos) => pos.underlyingBalance !== '0')}
          isBorrow={isBorrow}
        />
      ) : (
        <ContentWrapper withFullHeight={true}>
          <NoDataPanel
            title={intl.formatMessage(messages.connectWallet)}
            description={intl.formatMessage(messages.connectWalletDescription)}
            withConnectButton={true}
          />
        </ContentWrapper>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Dashboard {
          &__changeMarket--button {
            color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </div>
  );
}
