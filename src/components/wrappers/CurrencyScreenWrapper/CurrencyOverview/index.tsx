import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber } from '@aave/protocol-js';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import { useLanguageContext } from '../../../../libs/language-provider';
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
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { USD_DECIMALS } from '@aave/math-utils';
import IsolationModeBadge from '../../../isolationMode/IsolationModeBadge';

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
  const { marketReferencePriceInUsd } = useStaticPoolDataContext();
  const asset = getAssetInfo(currencySymbol);

  // const { mode, setMode } = useReservesRateHistoryHelper({
  //   poolReserveId: poolReserve.id,
  // }); TODO: uncomment when filters are added to history graphs

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
    baseLTVasCollateral: Number(poolReserve.baseLTVasCollateral),
    liquidationThreshold: Number(poolReserve.reserveLiquidationThreshold),
    liquidationBonus: Number(poolReserve.reserveLiquidationBonus),
    borrowingEnabled: poolReserve.borrowingEnabled,
    isIsolated: poolReserve.isIsolated,
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

        {isDeposit ? (
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
                    <IsolationModeBadge isIsolated={overviewData.isIsolated} />
                  )}
                </>
              ) : (
                <IsolationModeBadge isIsolated={overviewData.isIsolated} />
              )}
            </Row>
          </>
        ) : (
          <>
            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={intl.formatMessage(messages.assetPrice)}
                color="white"
                weight="light"
                isColumn={isCollapse}
              >
                <Value
                  tokenIcon={true}
                  symbol="USD"
                  value={overviewData.priceInUsd}
                  maximumValueDecimals={2}
                  color="white"
                />
              </Row>
            )}
          </>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCollapse,
    isUserInIsolationMode,
    overviewData.availableLiquidity,
    overviewData.borrowingEnabled,
    overviewData.depositApy,
    overviewData.priceInUsd,
    overviewData.usageAsCollateralEnabled,
    overviewData.isIsolated,
    currentLangSlug,
  ]);

  const RightInformation = useCallback(() => {
    return (
      <>
        {isDeposit ? (
          <>
            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={intl.formatMessage(messages.assetPrice)}
                color="white"
                weight="light"
                isColumn={isCollapse}
              >
                <Value
                  tokenIcon={true}
                  symbol="USD"
                  value={overviewData.priceInUsd}
                  maximumValueDecimals={2}
                  color="white"
                />
              </Row>
            )}

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
                        <ValuePercent value={overviewData.baseLTVasCollateral} color="white" />
                      ) : (
                        <span className="CurrencyOverview__no-data">—</span>
                      )}
                    </>
                  ) : (
                    <ValuePercent value={overviewData.baseLTVasCollateral} color="white" />
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

        {isCollapse && (
          <Row
            className="CurrencyOverview__row"
            title={intl.formatMessage(messages.assetPrice)}
            color="white"
            weight="light"
            isColumn={isCollapse}
          >
            <Value
              tokenIcon={true}
              symbol="USD"
              value={overviewData.priceInUsd}
              maximumValueDecimals={2}
              color="white"
            />
          </Row>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCollapse,
    overviewData.priceInUsd,
    overviewData.baseLTVasCollateral,
    overviewData.liquidationThreshold,
    overviewData.liquidationBonus,
    overviewData.stableBorrowRateEnabled,
    overviewData.stableRate,
    overviewData.variableRate,
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
          to={`/reserve-overview/${poolReserve.underlyingAsset}${poolReserve.id}`}
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

        {/*<div className="CurrencyOverview__mobileFilterButtons">*/}
        {/*  <GraphFilterButtons setMode={setMode} mode={mode} />*/}
        {/*</div> TODO: uncomment when filters are added to history graphs */}

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
