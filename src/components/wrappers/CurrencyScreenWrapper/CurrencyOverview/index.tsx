import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import { useLanguageContext } from '../../../../libs/language-provider';
import { useAppDataContext } from '../../../../libs/pool-data-provider';
import Row from '../../../basic/Row';
import ValuePercent from '../../../basic/ValuePercent';
import Value from '../../../basic/Value';
import Link from '../../../basic/Link';
import GradientLine from '../../../basic/GradientLine';
import MaxLTVHelpModal from '../../../HelpModal/MaxLTVHelpModal';
import LiquidationThresholdHelpModal from '../../../HelpModal/LiquidationThresholdHelpModal';
import LiquidationBonusHelpModal from '../../../HelpModal/LiquidationBonusHelpModal';
import { ValidationWrapperComponentProps } from '../../../RouteParamsValidationWrapper';
import { InterestRateSeries } from '../../../graphs/types';
import { GraphLegendDot } from '../../../graphs/GraphLegend';
import GraphInner from '../GraphInner';
import IsolationModeBadge from '../../../isolationMode/IsolationModeBadge';
import EModeIconWithTooltip from '../../../eMode/EModeIconWithTooltip';
import CapsHelpModal from '../../../caps/CapsHelpModal';
import { CapType } from '../../../caps/helper';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

interface CurrencyOverviewProps
  extends Pick<ValidationWrapperComponentProps, 'poolReserve' | 'currencySymbol'> {
  title?: string;
  type: 'deposit' | 'borrow';
  showGraphCondition: boolean;
  dots?: GraphLegendDot[];
  series: InterestRateSeries[];
  isCollapse?: boolean;
  isUserInIsolationMode?: boolean;
}

export default function CurrencyOverview({
  title,
  poolReserve,
  currencySymbol,
  type,
  showGraphCondition,
  dots,
  series,
  isCollapse,
  isUserInIsolationMode,
}: CurrencyOverviewProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { currentLangSlug } = useLanguageContext();
  const { marketReferencePriceInUsd, userEmodeCategoryId } = useAppDataContext();
  const asset = getAssetInfo(currencySymbol);

  const userIsInEMode = userEmodeCategoryId !== 0;

  const overviewData = {
    utilizationRate: Number(poolReserve.utilizationRate),
    availableLiquidity: poolReserve.availableLiquidity,
    priceInUsd: valueToBigNumber(poolReserve.priceInMarketReferenceCurrency)
      .multipliedBy(marketReferencePriceInUsd)
      .shiftedBy(-USD_DECIMALS)
      .toNumber(),
    depositApy: Number(poolReserve.supplyAPY),
    stableRate: Number(poolReserve.stableBorrowAPY),
    variableRate: Number(poolReserve.variableBorrowAPY),
    usageAsCollateralEnabled: poolReserve.usageAsCollateralEnabled,
    stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
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
    borrowingEnabled: poolReserve.borrowingEnabled,
    isIsolated: poolReserve.isIsolated,
    supplyCap: poolReserve.supplyCap,
    supplyCapUSD: poolReserve.supplyCapUSD,
    borrowCap: poolReserve.borrowCap,
    borrowCapUSD: poolReserve.borrowCapUSD,
  };

  const graphBorder = rgba(`${currentTheme.white.rgb}, 0.5`);

  const isDeposit = type === 'deposit';

  const LeftInformation = useCallback(() => {
    return (
      <>
        <Row
          className="CurrencyOverview__row"
          title={intl.formatMessage(messages.utilizationRate)}
          color="white"
          weight="light"
          isColumn={isCollapse}
        >
          {overviewData.borrowingEnabled ? (
            <ValuePercent
              value={overviewData.utilizationRate ? overviewData.utilizationRate : '0'}
              color="white"
            />
          ) : (
            <span className="CurrencyOverview__noData">—</span>
          )}
        </Row>

        <Row
          className="CurrencyOverview__row"
          title={intl.formatMessage(messages.availableLiquidity)}
          color="white"
          weight="light"
          isColumn={isCollapse}
        >
          <Value symbol={currencySymbol} value={overviewData.availableLiquidity} color="white" />
        </Row>

        {isDeposit && (
          <>
            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.depositAPY)}
              color="white"
              weight="light"
              isColumn={isCollapse}
            >
              <div className="CurrencyOverview__rowWithDoubleValue">
                {overviewData.borrowingEnabled ? (
                  <ValuePercent value={overviewData.depositApy} color="white" />
                ) : (
                  <span className="CurrencyOverview__no-data">—</span>
                )}
              </div>
            </Row>

            <Row
              className="CurrencyOverview__row"
              title={<CapsHelpModal capType={CapType.supplyCap} color="white" />}
              color="white"
              weight="light"
              isColumn={isCollapse}
            >
              {overviewData.supplyCap !== '0' ? (
                <Value
                  value={overviewData.supplyCap}
                  subValue={!isCollapse ? overviewData.supplyCapUSD : undefined}
                  subSymbol="USD"
                  symbol={currencySymbol}
                  color="white"
                />
              ) : (
                <span className="CurrencyOverview__no-data">—</span>
              )}
            </Row>
          </>
        )}

        {!isDeposit && (
          <Row
            className="CurrencyOverview__row"
            title={<CapsHelpModal capType={CapType.borrowCap} color="white" />}
            color="white"
            weight="light"
            isColumn={isCollapse}
          >
            {overviewData.borrowCap !== '0' ? (
              <Value
                value={overviewData.borrowCap}
                subValue={!isCollapse ? overviewData.borrowCapUSD : undefined}
                subSymbol="USD"
                symbol={currencySymbol}
                color="white"
              />
            ) : (
              <span className="CurrencyOverview__no-data">—</span>
            )}
          </Row>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCollapse,
    overviewData.borrowingEnabled,
    overviewData.depositApy,
    overviewData.priceInUsd,
    overviewData.usageAsCollateralEnabled,

    currentLangSlug,
  ]);

  const RightInformation = useCallback(() => {
    return (
      <>
        {isDeposit ? (
          <>
            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.canBeUsedAsCollateral)}
              color="white"
              weight="light"
              isColumn={isCollapse}
            >
              {!isUserInIsolationMode ? (
                <>
                  {!overviewData.isIsolated ? (
                    <p
                      className={classNames('CurrencyOverview__usageAsCollateral', {
                        CurrencyOverview__usageAsCollateralDisabled:
                          !overviewData.usageAsCollateralEnabled,
                      })}
                    >
                      {intl.formatMessage(
                        overviewData.usageAsCollateralEnabled ? messages.yes : messages.no
                      )}
                    </p>
                  ) : (
                    <IsolationModeBadge isIsolated={overviewData.isIsolated} color="white" />
                  )}
                </>
              ) : (
                <IsolationModeBadge isIsolated={overviewData.isIsolated} color="white" />
              )}
            </Row>

            <Row
              className="CurrencyOverview__row"
              title={
                <MaxLTVHelpModal
                  text={intl.formatMessage(messages.maximumLTV)}
                  color="white"
                  lightWeight={true}
                />
              }
              color="white"
              weight="light"
              isColumn={isCollapse}
            >
              {overviewData.baseLTVasCollateral === 0 ? (
                <span className="CurrencyOverview__no-data">—</span>
              ) : (
                <>
                  {isUserInIsolationMode ? (
                    <>
                      {overviewData.isIsolated ? (
                        <div className="CurrencyOverview__percentContent">
                          {userIsInEMode && userEmodeCategoryId === poolReserve.eModeCategoryId && (
                            <EModeIconWithTooltip
                              tooltipId={poolReserve.id}
                              eModeCategoryId={userEmodeCategoryId}
                            />
                          )}
                          <ValuePercent value={overviewData.baseLTVasCollateral} color="white" />
                        </div>
                      ) : (
                        <span className="CurrencyOverview__no-data">—</span>
                      )}
                    </>
                  ) : (
                    <div className="CurrencyOverview__percentContent">
                      {userIsInEMode && userEmodeCategoryId === poolReserve.eModeCategoryId && (
                        <EModeIconWithTooltip
                          tooltipId={poolReserve.id}
                          eModeCategoryId={userEmodeCategoryId}
                        />
                      )}
                      <ValuePercent value={overviewData.baseLTVasCollateral} color="white" />
                    </div>
                  )}
                </>
              )}
            </Row>

            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={
                  <LiquidationThresholdHelpModal
                    text={intl.formatMessage(messages.liquidationThreshold)}
                    color="white"
                    lightWeight={true}
                  />
                }
                color="white"
                weight="light"
                isColumn={isCollapse}
              >
                {overviewData.liquidationThreshold <= 0 ? (
                  <span className="CurrencyOverview__no-data">—</span>
                ) : (
                  <>
                    {isUserInIsolationMode ? (
                      <>
                        {overviewData.isIsolated ? (
                          <ValuePercent value={overviewData.liquidationThreshold} color="white" />
                        ) : (
                          <span className="CurrencyOverview__no-data">—</span>
                        )}
                      </>
                    ) : (
                      <ValuePercent value={overviewData.liquidationThreshold} color="white" />
                    )}
                  </>
                )}
              </Row>
            )}

            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={
                  <LiquidationBonusHelpModal
                    text={intl.formatMessage(messages.liquidationPenalty)}
                    color="white"
                    lightWeight={true}
                  />
                }
                color="white"
                weight="light"
                isColumn={isCollapse}
              >
                {overviewData.liquidationBonus <= 0 ? (
                  <span className="CurrencyOverview__no-data">—</span>
                ) : (
                  <>
                    {isUserInIsolationMode ? (
                      <>
                        {overviewData.isIsolated ? (
                          <ValuePercent value={overviewData.liquidationBonus} color="white" />
                        ) : (
                          <span className="CurrencyOverview__no-data">—</span>
                        )}
                      </>
                    ) : (
                      <ValuePercent value={overviewData.liquidationBonus} color="white" />
                    )}
                  </>
                )}
              </Row>
            )}
          </>
        ) : (
          <>
            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.stableAPY)}
              color="white"
              weight="light"
              isColumn={isCollapse}
            >
              {overviewData.stableBorrowRateEnabled ? (
                <ValuePercent value={overviewData.stableRate} color="white" />
              ) : (
                <span className="CurrencyOverview__no-data">—</span>
              )}
            </Row>
            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.variableAPY)}
              color="white"
              weight="light"
              isColumn={isCollapse}
            >
              <div className="CurrencyOverview__rowWithDoubleValue">
                <ValuePercent value={overviewData.variableRate} color="white" />
              </div>
            </Row>
          </>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCollapse,
    isUserInIsolationMode,
    overviewData.baseLTVasCollateral,
    overviewData.liquidationThreshold,
    overviewData.liquidationBonus,
    overviewData.stableBorrowRateEnabled,
    overviewData.stableRate,
    overviewData.variableRate,
    overviewData.isIsolated,
    currentLangSlug,
  ]);

  return (
    <div
      className={classNames('CurrencyOverview', {
        CurrencyOverview__borrow: !isDeposit,
        CurrencyOverview__collapsed: isCollapse,
      })}
    >
      <div className="CurrencyOverview__caption">
        {title && <p className="CurrencyOverview__caption-title">{title}</p>}
        <Link
          to={`/reserve-overview/${poolReserve.id}`}
          className="CurrencyOverview__captionLink"
          color="white"
        >
          <TokenIcon tokenSymbol={currencySymbol} height={sm ? 30 : 20} width={sm ? 30 : 20} />
          <p>{intl.formatMessage(messages.caption, { symbol: asset && asset.name })}</p>
        </Link>
        {title && <p className="CurrencyOverview__caption-title" />}
      </div>

      <GradientLine height={sm ? 1 : 2} />

      <div className="CurrencyOverview__content">
        <div className="CurrencyOverview__content-left">
          {isCollapse || sm ? (
            <LeftInformation />
          ) : (
            <div className="CurrencyOverview__inner">
              <LeftInformation />
            </div>
          )}

          {isCollapse || sm ? (
            <RightInformation />
          ) : (
            <div className="CurrencyOverview__inner">
              <RightInformation />
            </div>
          )}
        </div>

        {!isCollapse && (
          <div
            className={classNames('CurrencyOverview__content-right', {
              CurrencyOverview__contentNoBorder: !(
                showGraphCondition && poolReserve.borrowingEnabled
              ),
            })}
          >
            <GraphInner
              showGraph={showGraphCondition && poolReserve.borrowingEnabled}
              dots={dots}
              seriesData={series}
              type={type}
              poolReserveId={poolReserve.id}
            />
          </div>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .CurrencyOverview {
          color: ${currentTheme.white.hex};

          .CurrencyOverview__caption {
            .GradientLine {
              @include respond-to(sm) {
                background: ${currentTheme.white.hex};
              }
            }
          }

          .ValuePercent.ValuePercent__darkOrange,
          .ValuePercent.ValuePercent__primary,
          .ValuePercent.ValuePercent__secondary {
            .ValuePercent__value.ValuePercent__value {
              span {
                color: ${currentTheme.white.hex};
              }
            }
          }

          &__usageAsCollateral {
            color: ${currentTheme.green.hex};
          }
          &__usageAsCollateralDisabled {
            color: ${currentTheme.red.hex};
          }

          &__content-right {
            border: 1px solid ${graphBorder};
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
