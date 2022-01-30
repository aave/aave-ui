import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
//import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
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

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/blueLinkIcon.svg';
import { getLPTokenPoolLink } from '../../../../helpers/lp-tokens';
import { ComputedReserveData } from '../../../../libs/pool-data-provider';
import styled from 'styled-components';
import { ConvertToLocaleString } from '../../../../helpers/convertvalues';

interface ReserveInformationProps {
  symbol: string;
  poolReserve: ComputedReserveData;
  marketRefPriceInUsd: string;
}
const ContentWrapper = styled.div`
  padding: 30px 35px;
  border-radius: 5px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: solid 1px rgba(255, 255, 255, 0.68);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) -6%,
    rgba(255, 255, 255, 0.79) 59%
  );
`;

const TotalValueText = styled.p`
  font-family: Montserrat;
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
  margin-top: 20px;
`;

const TotalSubValueText = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #7f7f7f;
  margin-top: 17px;
`;

const IndicatedTitle = ({ text, indicatorColor }: { text: string; indicatorColor: string }) => {
  const Indicator = styled.div<{ bg: string }>`
    width: 12px;
    height: 12px;
    margin-right: 10px;
    border-radius: 2px;
    background-color: ${(props) => props.bg};
  `;
  const Text = styled.p`
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000;
  `;
  return (
    <div className="flex-row centered-align">
      <Indicator bg={indicatorColor} />
      <Text>{text}</Text>
    </div>
  );
};

export default function ReserveInformation({
  symbol,
  poolReserve,
  marketRefPriceInUsd,
}: ReserveInformationProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const totalLiquidityInUsd = valueToBigNumber(poolReserve.totalLiquidity)
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd)
    .toString();
  const totalBorrowsInUsd = valueToBigNumber(poolReserve.totalDebt)
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd)
    .toString();
  const availableLiquidityInUsd = valueToBigNumber(poolReserve.availableLiquidity)
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd)
    .toString();

  const reserveOverviewData = {
    totalLiquidityInUsd,
    totalBorrowsInUsd,
    availableLiquidityInUsd,
    totalLiquidity: poolReserve.totalLiquidity,
    totalBorrows: poolReserve.totalDebt,
    availableLiquidity: poolReserve.availableLiquidity,
    supplyAPY: Number(poolReserve.supplyAPY),
    supplyAPR: Number(poolReserve.supplyAPR),
    avg30DaysLiquidityRate: Number(poolReserve.avg30DaysLiquidityRate),
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
    avg30DaysVariableRate: Number(poolReserve.avg30DaysVariableBorrowRate),
    utilizationRate: Number(poolReserve.utilizationRate),
    baseLTVasCollateral: Number(poolReserve.baseLTVasCollateral),
    liquidationThreshold: Number(poolReserve.reserveLiquidationThreshold),
    liquidationBonus: Number(poolReserve.reserveLiquidationBonus),
    usageAsCollateralEnabled: poolReserve.usageAsCollateralEnabled,
    stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
    borrowingEnabled: poolReserve.borrowingEnabled,
  };

  const poolLink = getLPTokenPoolLink({
    symbol,
    underlyingAsset: poolReserve.underlyingAsset,
  });

  const totalValueStr = ConvertToLocaleString(reserveOverviewData.totalBorrows, 2);
  const totalBorrowStr = ConvertToLocaleString(reserveOverviewData.availableLiquidity, 2);
  return (
    <div className="ReserveInformation">
      <div className="ReserveInformation__inner">
        <h3 className="ReserveInformation__title-custom">{intl.formatMessage(messages.caption)}</h3>

        <ContentWrapper>
          {/* {poolLink && (
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
          )} */}

          <div className="ReserveInformation__top-info">
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
          </div>

          <div className="flex-row between">
            <div className="flex-column columnBox">
              <IndicatedTitle
                indicatorColor="#7159ff"
                text={intl.formatMessage(messages.totalBorrowed)}
              />
              <TotalValueText>{totalValueStr}</TotalValueText>
              <TotalSubValueText>
                ${Number(reserveOverviewData.totalBorrowsInUsd).toFixed(2)}
              </TotalSubValueText>
            </div>
            {/* <TotalValue
              color="red"
              title={intl.formatMessage(messages.totalBorrowed)}
              value={reserveOverviewData.totalBorrows}
              subValue={reserveOverviewData.totalBorrowsInUsd}
              borrowingEnabled={reserveOverviewData.borrowingEnabled}
            /> */}
            <div className="flex-column columnBox">
              <IndicatedTitle
                indicatorColor="#7159ff"
                text={intl.formatMessage(messages.availableLiquidity)}
              />
              <TotalValueText>{totalBorrowStr}</TotalValueText>
              <TotalSubValueText>
                ${Number(reserveOverviewData.availableLiquidityInUsd).toFixed(2)}
              </TotalSubValueText>
            </div>
            {/* <TotalValue
              title={intl.formatMessage(messages.availableLiquidity)}
              value={reserveOverviewData.availableLiquidity}
              subValue={reserveOverviewData.availableLiquidityInUsd}
              borrowingEnabled={reserveOverviewData.borrowingEnabled}
            /> */}
            <ReserveStatusGraph
              symbol={symbol}
              totalBorrows={reserveOverviewData.totalBorrows}
              availableLiquidity={reserveOverviewData.availableLiquidity}
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
              titleComponent={<MaxLTVHelpModal text={intl.formatMessage(messages.maximumLTV)} />}
            />
            <PercentBlock
              value={
                reserveOverviewData.liquidationBonus <= 0
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
            <TextBlock
              condition={reserveOverviewData.usageAsCollateralEnabled}
              title={intl.formatMessage(messages.usedAsCollateral)}
            />
            <TextBlock
              condition={reserveOverviewData.stableBorrowRateEnabled}
              title={intl.formatMessage(messages.stableBorrowing)}
            />
          </div>
        </ContentWrapper>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .columnBox {
          width: 30%;
        }
        .ReserveInformation__title-custom {
          font-family: Montserrat;
          font-size: 18px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #131313;
          margin-bottom: 10px;
        }
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
