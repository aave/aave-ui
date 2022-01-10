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

  const userIsInEMode = userEmodeCategoryId !== 0;

  const reserveOverviewData = {
    stableOverTotal: valueToBigNumber(poolReserve.totalStableDebt)
      .dividedBy(poolReserve.totalDebt)
      .toNumber(),
    variableOverTotal: valueToBigNumber(poolReserve.totalVariableDebt)
      .dividedBy(poolReserve.totalDebt)
      .toNumber(),
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
  };

  const poolLink = getLPTokenPoolLink({
    symbol,
    underlyingAsset: poolReserve.underlyingAsset,
  });

  return (
    <div className="ReserveInformation">
      <div className="ReserveInformation__inner">
        <h3 className="ReserveInformation__title">{intl.formatMessage(messages.caption)}</h3>

        <ContentWrapper className="ReserveInformation__content" withBackButton={true}>
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
              value={poolReserve.totalDebt}
              subValue={poolReserve.totalDebtUSD}
              borrowingEnabled={poolReserve.borrowingEnabled}
              capValue={poolReserve.borrowCap}
              capValueUSD={poolReserve.borrowCapUSD}
            />
            <ReserveStatusGraph
              symbol={symbol}
              totalBorrows={poolReserve.totalDebt}
              availableLiquidity={poolReserve.availableLiquidity}
            />
            <TotalValue
              symbol={symbol}
              title={intl.formatMessage(messages.availableLiquidity)}
              value={poolReserve.availableLiquidity}
              subValue={poolReserve.availableLiquidityUSD}
              borrowingEnabled={poolReserve.borrowingEnabled}
              capValue={poolReserve.supplyCap}
              capValueUSD={poolReserve.supplyCapUSD}
            />
          </div>

          <div className="ReserveInformation__middle-info">
            <div className="ReserveInformation__line">
              <p>{intl.formatMessage(messages.reserveSize)}</p>
              <strong>
                <Value
                  value={poolReserve.totalLiquidityUSD}
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
                value={poolReserve.borrowingEnabled ? Number(poolReserve.utilizationRate) : 0}
                title={intl.formatMessage(messages.utilisationRate)}
              />
            </div>
            {poolReserve.usageAsCollateralEnabled && poolReserve.isIsolated && (
              <div className="ReserveInformation__line">
                <DebtCeilingInfo
                  debtCeilingUSD={poolReserve.debtCeiling}
                  isolationModeTotalDebt={poolReserve.isolationModeTotalDebt}
                />
              </div>
            )}
          </div>

          <div className="ReserveInformation__APY-info">
            <APYCard title={intl.formatMessage(defaultMessages.supply)}>
              <APYLine
                title={intl.formatMessage(messages.depositAPY)}
                value={Number(poolReserve.supplyAPY)}
                condition={poolReserve.borrowingEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.depositAPR)}
                value={Number(poolReserve.supplyAPR)}
                condition={poolReserve.borrowingEnabled}
              />
            </APYCard>

            <APYCard title={intl.formatMessage(messages.stableBorrowing)} color="primary">
              <APYLine
                title={intl.formatMessage(messages.borrowAPY)}
                value={Number(poolReserve.stableBorrowAPY)}
                condition={poolReserve.borrowingEnabled && poolReserve.stableBorrowRateEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.borrowAPR)}
                value={Number(poolReserve.stableBorrowAPR)}
                condition={poolReserve.borrowingEnabled && poolReserve.stableBorrowRateEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.overTotal)}
                value={reserveOverviewData.stableOverTotal}
                condition={poolReserve.borrowingEnabled && poolReserve.stableBorrowRateEnabled}
              />
            </APYCard>

            <APYCard title={intl.formatMessage(messages.variableBorrowing)} color="secondary">
              <APYLine
                title={intl.formatMessage(messages.borrowAPY)}
                value={Number(poolReserve.variableBorrowAPY)}
                condition={poolReserve.borrowingEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.borrowAPR)}
                value={Number(poolReserve.variableBorrowAPR)}
                condition={poolReserve.borrowingEnabled}
              />
              <APYLine
                title={intl.formatMessage(messages.overTotal)}
                value={reserveOverviewData.variableOverTotal}
                condition={poolReserve.borrowingEnabled}
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
                {!poolReserve.isIsolated ? (
                  <TextBlock
                    condition={poolReserve.usageAsCollateralEnabled}
                    title={intl.formatMessage(messages.usedAsCollateral)}
                  />
                ) : (
                  <BlockWrapper title={intl.formatMessage(messages.usedAsCollateral)}>
                    <IsolationModeBadge isIsolated={poolReserve.isIsolated} />
                  </BlockWrapper>
                )}
              </>
            ) : (
              <BlockWrapper title={intl.formatMessage(messages.usedAsCollateral)}>
                <IsolationModeBadge isIsolated={poolReserve.isIsolated} />
              </BlockWrapper>
            )}

            <TextBlock
              condition={poolReserve.stableBorrowRateEnabled}
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
