import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { getLPTokenPoolLink } from '../../../../helpers/lp-tokens';
import { ComputedReserveData } from '../../../../libs/pool-data-provider';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import MaxLTVHelpModal from '../../../../components/HelpModal/MaxLTVHelpModal';
import Value from '../../../../components/basic/Value';
import LiquidationThresholdHelpModal from '../../../../components/HelpModal/LiquidationThresholdHelpModal';
import LiquidationBonusHelpModal from '../../../../components/HelpModal/LiquidationBonusHelpModal';
import ReserveStatusGraph from '../Graphs/ReserveStatus';
import TotalValue from '../TotalValue';
import PercentBlock from '../InformationBlock/PercentBlock';
import TextBlock from '../InformationBlock/TextBlock';
import APYCard from '../APYCard';
import APYLine from '../APYLine';
import Link from '../../../../components/basic/Link';
import IsolationModeBadge from '../../../../components/isolationMode/IsolationModeBadge';
import BlockWrapper from '../InformationBlock/BlockWrapper';
import EModeCategoryHelpModal from '../../../../components/eMode/EModeCategoryHelpModal';
import EmodeCategoryLabel from '../../../../components/eMode/EmodeCategoryLabel';
import DebtCeilingInfo from '../DebtCeilingInfo';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/blueLinkIcon.svg';

interface ReserveInformationProps {
  symbol: string;
  poolReserve: ComputedReserveData;
  userIsInIsolationMode: boolean;
  userEmodeCategoryId: number;
}

export default function ReserveInformation({
  symbol,
  poolReserve,
  userIsInIsolationMode,
  userEmodeCategoryId,
}: ReserveInformationProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const totalLiquidityInUsd = poolReserve.totalLiquidityUSD;
  const totalBorrowsInUsd = poolReserve.totalDebtUSD;
  const availableLiquidityInUsd = poolReserve.availableLiquidityUSD;

  const userIsInEMode = userEmodeCategoryId !== 0;

  const reserveOverviewData = {
    totalLiquidityInUsd,
    totalBorrowsInUsd,
    availableLiquidityInUsd,
    totalLiquidity: poolReserve.totalLiquidity,
    totalBorrows: poolReserve.totalDebt,
    availableLiquidity: poolReserve.availableLiquidity,
    supplyAPY: Number(poolReserve.supplyAPY),
    supplyAPR: Number(poolReserve.supplyAPR),
    stableAPY: Number(poolReserve.stableBorrowAPY),
    stableAPR: Number(poolReserve.stableBorrowAPR),
    variableAPY: Number(poolReserve.variableBorrowAPY),
    variableAPR: Number(poolReserve.variableBorrowAPR),
    stableOverTotal: valueToBigNumber(poolReserve.totalStableDebt)
      .dividedBy(poolReserve.totalDebt)
      .toNumber(),
    variableOverTotal: valueToBigNumber(poolReserve.totalVariableDebt)
      .dividedBy(poolReserve.totalDebt)
      .toNumber(),
    utilizationRate: Number(poolReserve.utilizationRate),
    baseLTVasCollateral:
      userIsInEMode && poolReserve.eModeCategoryId === userEmodeCategoryId
        ? Number(poolReserve.eModeLtv)
        : Number(poolReserve.baseLTVasCollateral),
    liquidationThreshold:
      userIsInEMode && poolReserve.eModeCategoryId === userEmodeCategoryId
        ? Number(poolReserve.eModeLiquidationThreshold)
        : Number(poolReserve.reserveLiquidationThreshold),
    liquidationBonus:
      userIsInEMode && poolReserve.eModeCategoryId === userEmodeCategoryId
        ? Number(poolReserve.eModeLiquidationBonus)
        : Number(poolReserve.reserveLiquidationBonus),
    usageAsCollateralEnabled: poolReserve.usageAsCollateralEnabled,
    stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
    borrowingEnabled: poolReserve.borrowingEnabled,
    debtCeilingUSD: poolReserve.debtCeiling,
    totalDebtUSD: poolReserve.totalDebtUSD,
    isIsolated: poolReserve.isIsolated,
    supplyCap: poolReserve.supplyCap,
    supplyCapUSD: poolReserve.supplyCapUSD,
    borrowCap: poolReserve.borrowCap,
    borrowCapUSD: poolReserve.borrowCapUSD,
  };

  const poolLink = getLPTokenPoolLink({
    symbol,
    underlyingAsset: poolReserve.underlyingAsset,
  });

  return (
    <div className="ReserveInformation">
      <div className="ReserveInformation__inner">
        <h3 className="ReserveInformation__title">{intl.formatMessage(messages.caption)}</h3>

        <ContentWrapper className="ReserveInformation__content">
          {poolLink && (
            <div className="ReserveInformation__poolLink-inner">
              <p>
                {intl.formatMessage(messages.provideLiquidity, {
                  here: (
                    <Link
                      to={poolLink}
                      title={intl.formatMessage(messages.here)}
                      absolute={true}
                      inNewWindow={true}
                      bold={true}
                      color="secondary"
                    />
                  ),
                })}
              </p>
              <img src={linkIcon} alt="" />
            </div>
          )}

          <div className="ReserveInformation__graph-inner">
            <TotalValue
              symbol={symbol}
              color="red"
              title={intl.formatMessage(messages.totalBorrowed)}
              value={reserveOverviewData.totalBorrows}
              subValue={reserveOverviewData.totalBorrowsInUsd}
              borrowingEnabled={reserveOverviewData.borrowingEnabled}
              capValue={reserveOverviewData.borrowCap}
              capValueUSD={reserveOverviewData.borrowCapUSD}
            />
            <ReserveStatusGraph
              symbol={symbol}
              totalBorrows={reserveOverviewData.totalBorrows}
              availableLiquidity={reserveOverviewData.availableLiquidity}
            />
            <TotalValue
              symbol={symbol}
              title={intl.formatMessage(messages.availableLiquidity)}
              value={reserveOverviewData.availableLiquidity}
              subValue={reserveOverviewData.availableLiquidityInUsd}
              borrowingEnabled={reserveOverviewData.borrowingEnabled}
              capValue={reserveOverviewData.supplyCap}
              capValueUSD={reserveOverviewData.supplyCapUSD}
            />
          </div>

          <div className="ReserveInformation__middle-info">
            <div className="ReserveInformation__line">
              <p>{intl.formatMessage(messages.reserveSize)}</p>
              <strong>
                <Value
                  value={Number(reserveOverviewData.totalLiquidityInUsd)}
                  maximumValueDecimals={2}
                  minimumValueDecimals={2}
                  symbol="USD"
                  tokenIcon={true}
                  withoutSymbol={true}
                />
              </strong>
            </div>
            <div className="ReserveInformation__line">
              <PercentBlock
                value={
                  reserveOverviewData.borrowingEnabled ? reserveOverviewData.utilizationRate : 0
                }
                title={intl.formatMessage(messages.utilisationRate)}
              />
            </div>
            {reserveOverviewData.usageAsCollateralEnabled && reserveOverviewData.isIsolated && (
              <div className="ReserveInformation__line">
                <DebtCeilingInfo debtCeilingUSD={reserveOverviewData.debtCeilingUSD} />
              </div>
            )}
          </div>

          <div className="ReserveInformation__APY-info">
            <APYCard title={intl.formatMessage(defaultMessages.deposit)}>
              <APYLine
                title={intl.formatMessage(messages.depositAPY)}
                value={reserveOverviewData.supplyAPY}
                condition={reserveOverviewData.borrowingEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.depositAPR)}
                value={reserveOverviewData.supplyAPR}
                condition={reserveOverviewData.borrowingEnabled}
              />
            </APYCard>

            <APYCard title={intl.formatMessage(messages.stableBorrowing)} color="primary">
              <APYLine
                title={intl.formatMessage(messages.borrowAPY)}
                value={reserveOverviewData.stableAPY}
                condition={
                  reserveOverviewData.borrowingEnabled &&
                  reserveOverviewData.stableBorrowRateEnabled
                }
              />
              <APYLine
                title={intl.formatMessage(messages.borrowAPR)}
                value={reserveOverviewData.stableAPR}
                condition={
                  reserveOverviewData.borrowingEnabled &&
                  reserveOverviewData.stableBorrowRateEnabled
                }
              />
              <APYLine
                title={intl.formatMessage(messages.overTotal)}
                value={reserveOverviewData.stableOverTotal}
                condition={
                  reserveOverviewData.borrowingEnabled &&
                  reserveOverviewData.stableBorrowRateEnabled
                }
              />
            </APYCard>

            <APYCard title={intl.formatMessage(messages.variableBorrowing)} color="secondary">
              <APYLine
                title={intl.formatMessage(messages.borrowAPY)}
                value={reserveOverviewData.variableAPY}
                condition={reserveOverviewData.borrowingEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.borrowAPR)}
                value={reserveOverviewData.variableAPR}
                condition={reserveOverviewData.borrowingEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.overTotal)}
                value={reserveOverviewData.variableOverTotal}
                condition={reserveOverviewData.borrowingEnabled}
              />
            </APYCard>
          </div>

          <div className="ReserveInformation__bottom-info">
            <PercentBlock
              value={reserveOverviewData.baseLTVasCollateral}
              withEModeIcon={
                userEmodeCategoryId !== 0 && userEmodeCategoryId === poolReserve.eModeCategoryId
              }
              titleComponent={<MaxLTVHelpModal text={intl.formatMessage(messages.maximumLTV)} />}
              eModeCategoryId={userEmodeCategoryId}
            />
            <PercentBlock
              value={
                reserveOverviewData.liquidationThreshold <= 0
                  ? 0
                  : reserveOverviewData.liquidationThreshold
              }
              titleComponent={
                <LiquidationThresholdHelpModal
                  text={intl.formatMessage(messages.liquidationThreshold)}
                />
              }
            />
            <PercentBlock
              value={reserveOverviewData.liquidationBonus}
              titleComponent={
                <LiquidationBonusHelpModal text={intl.formatMessage(messages.liquidationPenalty)} />
              }
            />
            {!userIsInIsolationMode ? (
              <>
                {!reserveOverviewData.isIsolated ? (
                  <TextBlock
                    condition={reserveOverviewData.usageAsCollateralEnabled}
                    title={intl.formatMessage(messages.usedAsCollateral)}
                  />
                ) : (
                  <BlockWrapper title={intl.formatMessage(messages.usedAsCollateral)}>
                    <IsolationModeBadge isIsolated={reserveOverviewData.isIsolated} />
                  </BlockWrapper>
                )}
              </>
            ) : (
              <BlockWrapper title={intl.formatMessage(messages.usedAsCollateral)}>
                <IsolationModeBadge isIsolated={reserveOverviewData.isIsolated} />
              </BlockWrapper>
            )}

            <TextBlock
              condition={reserveOverviewData.stableBorrowRateEnabled}
              title={intl.formatMessage(messages.stableBorrowing)}
            />

            {!!poolReserve.eModeCategoryId && (
              <BlockWrapper titleComponent={<EModeCategoryHelpModal />}>
                <EmodeCategoryLabel categoryId={poolReserve.eModeCategoryId} />
              </BlockWrapper>
            )}
          </div>
        </ContentWrapper>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .ReserveInformation {
          &__title {
            color: ${currentTheme.textDarkBlue.hex};
          }

          &__line {
            color: ${currentTheme.textDarkBlue.hex};
            border: 1px solid ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
