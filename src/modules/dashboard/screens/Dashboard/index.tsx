import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import { valueToBigNumber } from '@aave/math-utils';
import { InterestRate } from '@aave/contract-helpers';

import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { loanActionLinkComposer } from '../../../../helpers/loan-action-link-composer';
import { toggleUseAsCollateral } from '../../../../helpers/toggle-use-as-collateral';
import { toggleBorrowRateMode } from '../../../../helpers/toggle-borrow-rate-mode';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import Preloader from '../../../../components/basic/Preloader';
import DashboardTopPanel from '../../components/DashboardTopPanel';
import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import MainDashboardTable from '../../components/MainDashboardTable';
import IncentivesClaimPanel from '../../../../components/incentives/IncentivesClaimPanel';
import DashboardNoData from '../../components/DashboardNoData';
import BridgeBanner from '../../../../components/BridgeBanner';

import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import { getAssetColor } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

export default function Dashboard() {
  const intl = useIntl();
  const navigate = useNavigate();

  const { user, userId, reserves, loading, walletBalances } = useAppDataContext();
  const {
    networkConfig: { bridge, name },
  } = useProtocolDataContext();

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
      uiColor: getAssetColor(userReserve.reserve.symbol),
      isActive: poolReserve.isActive,
      isFrozen: poolReserve.isFrozen,
      stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
      reserve: {
        ...userReserve.reserve,
        liquidityRate: poolReserve.supplyAPY,
      },
    };

    const walletBalance = walletBalances[poolReserve.underlyingAsset]?.amount || '0';

    let availableToDeposit = valueToBigNumber(walletBalance);
    if (poolReserve.supplyCap !== '0') {
      availableToDeposit = BigNumber.min(
        availableToDeposit,
        new BigNumber(poolReserve.supplyCap).minus(poolReserve.totalLiquidity).multipliedBy('0.995')
      );
    }

    depositedPositions.push({
      ...baseListData,
      borrowingEnabled: poolReserve.borrowingEnabled,
      usageAsCollateralEnabledOnUser: userReserve.usageAsCollateralEnabledOnUser,
      canBeEnabledAsCollateral:
        poolReserve.usageAsCollateralEnabled &&
        ((!poolReserve.isIsolated && !user.isInIsolationMode) ||
          user.isolatedReserve?.underlyingAsset === poolReserve.underlyingAsset ||
          (poolReserve.isIsolated && user.totalCollateralMarketReferenceCurrency === '0')),
      underlyingBalance: userReserve.underlyingBalance,
      underlyingBalanceUSD: userReserve.underlyingBalanceUSD,
      isUserInIsolationMode: user?.isInIsolationMode,
      isIsolated: poolReserve.isIsolated,
      aIncentives: poolReserve.aIncentivesData ? poolReserve.aIncentivesData : [],
      availableToDeposit: availableToDeposit.toNumber() <= 0 ? '0' : availableToDeposit.toString(),
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
        borrowingEnabled: poolReserve.borrowingEnabled,
        currentBorrows: userReserve.variableBorrows,
        currentBorrowsUSD: userReserve.variableBorrowsUSD,
        borrowRateMode: InterestRate.Variable,
        borrowRate: poolReserve.variableBorrowAPY,
        vIncentives: poolReserve.vIncentivesData ? poolReserve.vIncentivesData : [],
        sIncentives: poolReserve.sIncentivesData ? poolReserve.sIncentivesData : [],
        repayLink: loanActionLinkComposer('repay', poolReserve.id, InterestRate.Variable),
        borrowLink: loanActionLinkComposer('borrow', poolReserve.id, InterestRate.Variable),
        onSwitchToggle: () =>
          toggleBorrowRateMode(navigate, InterestRate.Variable, poolReserve.underlyingAsset),
      });
    }
    if (userReserve.stableBorrows !== '0') {
      borrowedPositions.push({
        ...baseListData,
        borrowingEnabled: poolReserve.borrowingEnabled && poolReserve.stableBorrowRateEnabled,
        currentBorrows: userReserve.stableBorrows,
        currentBorrowsUSD: userReserve.stableBorrowsUSD,
        borrowRateMode: InterestRate.Stable,
        borrowRate: userReserve.stableBorrowAPY,
        vIncentives: poolReserve.vIncentivesData ? poolReserve.vIncentivesData : [],
        sIncentives: poolReserve.sIncentivesData ? poolReserve.sIncentivesData : [],
        repayLink: loanActionLinkComposer('repay', poolReserve.id, InterestRate.Stable),
        borrowLink: loanActionLinkComposer('borrow', poolReserve.id, InterestRate.Stable),
        onSwitchToggle: () =>
          toggleBorrowRateMode(navigate, InterestRate.Stable, poolReserve.underlyingAsset),
      });
    }
  });

  const isTableShow =
    !!depositedPositions.length && depositedPositions.some((pos) => pos.availableToDeposit !== '0');

  return (
    <div className={classNames('Dashboard', { Dashboard__fullHeight: !userId || !isTableShow })}>
      <div className="Dashboard__top--line">
        <IncentivesClaimPanel />
      </div>

      <DashboardTopPanel
        user={user}
        collateralUsagePercent={collateralUsagePercent}
        loanToValue={loanToValue}
      />

      {bridge && <BridgeBanner networkName={name} {...bridge} />}

      {userId && isTableShow && (
        <div className="Dashboard__switcher-inner">
          <LabeledSwitcher
            rightOption={intl.formatMessage(messages.switchRightOption)}
            leftOption={intl.formatMessage(messages.switchLeftOption)}
            value={isBorrow}
            onToggle={() => {
              setIsBorrow(!isBorrow);
            }}
            className="Dashboard__switcher"
          />
        </div>
      )}

      {userId ? (
        <>
          {isTableShow ? (
            <MainDashboardTable
              borrowedPositions={borrowedPositions}
              depositedPositions={depositedPositions.filter((pos) => pos.underlyingBalance !== '0')}
              isBorrow={isBorrow}
            />
          ) : (
            <DashboardNoData />
          )}
        </>
      ) : (
        <ContentWrapper withBackButton={true} withFullHeight={true}>
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
