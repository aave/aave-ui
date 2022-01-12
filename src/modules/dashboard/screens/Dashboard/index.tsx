import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { valueToBigNumber, InterestRate } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';

import { useIncentivesDataContext } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { loanActionLinkComposer } from '../../../../helpers/loan-action-link-composer';
import { toggleUseAsCollateral } from '../../../../helpers/toggle-use-as-collateral';
import { toggleBorrowRateMode } from '../../../../helpers/toggle-borrow-rate-mode';
import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import MaxLTVHelpModal from '../../../../components/HelpModal/MaxLTVHelpModal';
import ValuePercent from '../../../../components/basic/ValuePercent';
import HealthFactor from '../../../../components/HealthFactor';
import DefaultButton from '../../../../components/basic/DefaultButton';
import NoData from '../../../../components/basic/NoData';
import DepositCompositionBar from '../../../../components/compositionBars/DepositCompositionBar';
import CollateralCompositionBar from '../../../../components/compositionBars/CollateralCompositionBar';
import BorrowCompositionBar from '../../../../components/compositionBars/BorrowCompositionBar';
import LTVInfoModal from '../../../../components/LTVInfoModal';
import MainDashboardTable from '../../components/MainDashboardTable';
import MobileTopPanelWrapper from '../../components/MobileTopPanelWrapper';
import DepositBorrowTopPanel from '../../../../components/DepositBorrowTopPanel';
import ApproximateBalanceHelpModal from '../../../../components/HelpModal/ApproximateBalanceHelpModal';
import IncentiveWrapper from '../../../../components/wrappers/IncentiveWrapper';
import DashboardNoData from '../../components/DashboardNoData';

import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import { DashboardLeftTopLine } from '../../../../ui-config';
import { getAssetColor } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';
import { ChainId } from '@aave/contract-helpers';

export default function Dashboard() {
  const intl = useIntl();
  const history = useHistory();
  const { chainId } = useProtocolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { reserveIncentives } = useIncentivesDataContext();
  const { currentTheme, sm } = useThemeContext();

  const [isLTVModalVisible, setLTVModalVisible] = useState(false);
  const [isBorrow, setIsBorrow] = useState(false);
  const [isDepositMobileInfoVisible, setDepositMobileInfoVisible] = useState(false);
  const [isBorrowMobileInfoVisible, setBorrowMobileInfoVisible] = useState(false);

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '1'
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

    const reserveIncentiveData =
      reserveIncentives[userReserve.reserve.underlyingAsset.toLowerCase()];
    if (userReserve.underlyingBalance !== '0' || userReserve.totalBorrows !== '0') {
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
      if (userReserve.underlyingBalance !== '0') {
        depositedPositions.push({
          ...baseListData,
          borrowingEnabled: poolReserve.borrowingEnabled,
          avg30DaysLiquidityRate: poolReserve.avg30DaysLiquidityRate,
          usageAsCollateralEnabledOnThePool: poolReserve.usageAsCollateralEnabled,
          usageAsCollateralEnabledOnUser: userReserve.usageAsCollateralEnabledOnUser,
          underlyingBalance: userReserve.underlyingBalance,
          underlyingBalanceUSD: userReserve.underlyingBalanceUSD,
          aincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.aIncentives.incentiveAPR
            : '0',
          onToggleSwitch: () =>
            toggleUseAsCollateral(
              history,
              poolReserve.id,
              !userReserve.usageAsCollateralEnabledOnUser,
              poolReserve.underlyingAsset
            ),
        });
      }

      if (userReserve.variableBorrows !== '0') {
        borrowedPositions.push({
          ...baseListData,
          borrowingEnabled: poolReserve.borrowingEnabled,
          currentBorrows: userReserve.variableBorrows,
          currentBorrowsUSD: userReserve.variableBorrowsUSD,
          borrowRateMode: InterestRate.Variable,
          borrowRate: poolReserve.variableBorrowAPY,
          vincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.vIncentives.incentiveAPR
            : '0',
          sincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.sIncentives.incentiveAPR
            : '0',
          avg30DaysVariableRate: poolReserve.avg30DaysVariableBorrowRate,
          repayLink: loanActionLinkComposer(
            'repay',
            poolReserve.id,
            InterestRate.Variable,
            poolReserve.underlyingAsset
          ),
          borrowLink: loanActionLinkComposer(
            'borrow',
            poolReserve.id,
            InterestRate.Variable,
            poolReserve.underlyingAsset
          ),
          onSwitchToggle: () =>
            toggleBorrowRateMode(
              history,
              poolReserve.id,
              InterestRate.Variable,
              poolReserve.underlyingAsset
            ),
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
          vincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.vIncentives.incentiveAPR
            : '0',
          sincentivesAPR: reserveIncentiveData
            ? reserveIncentiveData.sIncentives.incentiveAPR
            : '0',
          repayLink: loanActionLinkComposer(
            'repay',
            poolReserve.id,
            InterestRate.Stable,
            poolReserve.underlyingAsset
          ),
          borrowLink: loanActionLinkComposer(
            'borrow',
            poolReserve.id,
            InterestRate.Stable,
            poolReserve.underlyingAsset
          ),
          onSwitchToggle: () =>
            toggleBorrowRateMode(
              history,
              poolReserve.id,
              InterestRate.Stable,
              poolReserve.underlyingAsset
            ),
        });
      }
    }
  });

  return (
    <div className="Dashboard">
      <div
        className={classNames('Dashboard__mobileMigrate--inner', {
          Dashboard__mobileMigrateWithoutContent:
            chainId !== ChainId.mainnet && !depositedPositions.length,
        })}
      >
        <DashboardLeftTopLine intl={intl} chainId={chainId} onMobile={true} />
      </div>

      {user && !!depositedPositions.length && (
        <div className="Dashboard__switcher-inner">
          <LabeledSwitcher
            rightOption={intl.formatMessage(messages.switchRightOption)}
            leftOption={intl.formatMessage(messages.switchLeftOption)}
            value={isBorrow}
            onToggle={() => {
              setIsBorrow(!isBorrow);
              setDepositMobileInfoVisible(false);
              setBorrowMobileInfoVisible(false);
            }}
            className="Dashboard__switcher"
          />
        </div>
      )}

      <div className="Dashboard__top--line">
        <div className="ButtonLink">
          <DashboardLeftTopLine intl={intl} chainId={chainId} />
        </div>
        <IncentiveWrapper />
      </div>

      <DepositBorrowTopPanel />

      {user && !!depositedPositions.length && !isBorrow && (
        <MobileTopPanelWrapper
          visible={isDepositMobileInfoVisible}
          setVisible={setDepositMobileInfoVisible}
          buttonComponent={
            <Row
              title={
                <ApproximateBalanceHelpModal
                  text={intl.formatMessage(messages.approximateBalance)}
                  color="white"
                  lightWeight={true}
                />
              }
              color="white"
              weight="light"
            >
              {user && user.totalLiquidityUSD !== '0' ? (
                <Value
                  value={user.totalLiquidityUSD}
                  symbol="USD"
                  tokenIcon={true}
                  withSmallDecimals={true}
                  subValue={user.totalLiquidityMarketReferenceCurrency}
                  maximumSubValueDecimals={18}
                  subSymbol="ETH"
                  color="white"
                />
              ) : (
                <NoData />
              )}
            </Row>
          }
        >
          <DepositCompositionBar user={user} />
        </MobileTopPanelWrapper>
      )}

      {user && !!borrowedPositions.length && isBorrow && (
        <MobileTopPanelWrapper
          visible={isBorrowMobileInfoVisible}
          setVisible={setBorrowMobileInfoVisible}
          buttonComponent={
            <>
              <Row
                title={intl.formatMessage(messages.youBorrowed)}
                color="white"
                weight="light"
                withMargin={!isBorrowMobileInfoVisible}
              >
                {user && user.totalBorrowsUSD !== '0' ? (
                  <Value
                    value={user.totalBorrowsUSD}
                    symbol="USD"
                    tokenIcon={true}
                    minimumValueDecimals={2}
                    maximumValueDecimals={2}
                    subValue={user.totalBorrowsMarketReferenceCurrency}
                    subSymbol="ETH"
                    color="white"
                  />
                ) : (
                  <NoData />
                )}
              </Row>
              {!isBorrowMobileInfoVisible && (
                <HealthFactor
                  value={user?.healthFactor || '-1'}
                  titleColor="white"
                  titleLightWeight={true}
                  withHALLink={true}
                />
              )}
            </>
          }
        >
          <Row
            title={intl.formatMessage(messages.yourCollateral)}
            color="white"
            weight="light"
            withMargin={true}
          >
            {user && user.totalCollateralUSD !== '0' ? (
              <Value
                value={user.totalCollateralUSD}
                symbol="USD"
                tokenIcon={true}
                minimumValueDecimals={2}
                maximumValueDecimals={2}
                subValue={user.totalCollateralMarketReferenceCurrency}
                subSymbol="ETH"
                color="white"
              />
            ) : (
              <NoData />
            )}
          </Row>

          <HealthFactor
            value={user?.healthFactor || '-1'}
            titleColor="white"
            titleLightWeight={true}
            withHALLink={true}
          />

          <Row
            title={
              <MaxLTVHelpModal
                text={intl.formatMessage(messages.currentLTV)}
                color="white"
                lightWeight={true}
              />
            }
            color="white"
            weight="light"
            withMargin={true}
            className="Dashboard__mobileRow-center"
          >
            {user && loanToValue !== '0' ? (
              <div className="Dashboard__mobileRow-content">
                <ValuePercent value={loanToValue} color="white" />
                <DefaultButton
                  title={intl.formatMessage(messages.details)}
                  color="white"
                  transparent={true}
                  className="Dashboard__mobileButton"
                  size="small"
                  onClick={() => setLTVModalVisible(true)}
                />
              </div>
            ) : (
              <NoData />
            )}
          </Row>

          <Row
            title={intl.formatMessage(messages.borrowingPowerUsed)}
            color="white"
            weight="light"
            withMargin={true}
          >
            {user && collateralUsagePercent !== '0' ? (
              <ValuePercent value={collateralUsagePercent} color="white" />
            ) : (
              <NoData />
            )}
          </Row>

          <BorrowCompositionBar />
          <CollateralCompositionBar />
        </MobileTopPanelWrapper>
      )}

      {sm && <IncentiveWrapper />}

      {user ? (
        <>
          {!!depositedPositions.length ? (
            <MainDashboardTable
              borrowedPositions={borrowedPositions}
              depositedPositions={depositedPositions}
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

      {loanToValue !== '0' && (
        <LTVInfoModal visible={isLTVModalVisible} setVisible={setLTVModalVisible} />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Dashboard {
          &__mobileMigrate--inner {
            background: ${currentTheme.whiteElement.hex};
          }
          &__mobileMigrateWithoutContent {
            background: ${currentTheme.mainBg.hex};
          }

          &__changeMarket--button {
            color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </div>
  );
}
