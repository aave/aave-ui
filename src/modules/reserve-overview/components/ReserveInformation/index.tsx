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
  color: white;
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

const MiddleInfoTitle = styled.p`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
`;
const MiddleInfoValue = styled.p`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
  margin-top: 12px;
`;
const APYBlockTitle = styled.h3`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
  margin-bottom: 12px;
`;
const APYItemTitle = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
`;
const APYItemValue = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000;
`;
const PercentBoxTitle = styled.h3`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #131313;
`;
const PercentBoxValue = styled.p`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #131313;
  margin-top: 20px;
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
    color: white;
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
  const utilValue = reserveOverviewData.borrowingEnabled
    ? Number(reserveOverviewData.utilizationRate).toFixed(2)
    : 0;

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
                indicatorColor="#aceed9"
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
          <div className="flex-row w100">
            <div className="flex-column columnBox">
              <MiddleInfoTitle>{intl.formatMessage(messages.reserveSize)}</MiddleInfoTitle>
              <MiddleInfoValue>
                ${ConvertToLocaleString(reserveOverviewData.totalLiquidityInUsd, 2)}
              </MiddleInfoValue>
            </div>
            <div className="flex-column columnBox">
              <MiddleInfoTitle>{intl.formatMessage(messages.utilisationRate)}</MiddleInfoTitle>
              <MiddleInfoValue>{utilValue}%</MiddleInfoValue>
            </div>
          </div>

          {/* <div className="ReserveInformation__middle-info">
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
          </div> */}

          <div style={{ marginTop: 35 }} className="flex-row between w100">
            <div className="flex-column columnBox border">
              <APYBlockTitle>{intl.formatMessage(defaultMessages.deposit)}</APYBlockTitle>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.depositAPY)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.supplyAPY * 100).toFixed(2)} %
                </APYItemValue>
              </div>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.depositAPR)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.supplyAPR * 100).toFixed(2)} %
                </APYItemValue>
              </div>
            </div>

            <div className="flex-column columnBox border">
              <APYBlockTitle>{intl.formatMessage(messages.stableBorrowing)}</APYBlockTitle>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.borrowAPY)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.stableAPY * 100).toFixed(2)} %
                </APYItemValue>
              </div>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.borrowAPR)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.stableAPR * 100).toFixed(2)} %
                </APYItemValue>
              </div>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.overTotal)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.stableOverTotal * 100).toFixed(2)} %
                </APYItemValue>
              </div>
            </div>

            <div className="flex-column columnBox">
              <APYBlockTitle>{intl.formatMessage(messages.borrowAPR)}</APYBlockTitle>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.borrowAPY)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.variableAPY * 100).toFixed(2)} %
                </APYItemValue>
              </div>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.borrowAPR)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.variableAPR * 100).toFixed(2)} %
                </APYItemValue>
              </div>
              <div style={{ marginBottom: 10 }} className="flex-row between">
                <APYItemTitle>{intl.formatMessage(messages.overTotal)}</APYItemTitle>
                <APYItemValue>
                  {Number(reserveOverviewData.variableOverTotal * 100).toFixed(2)} %
                </APYItemValue>
              </div>
            </div>
          </div>

          {/* <div className="ReserveInformation__APY-info">
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
          </div> */}

          <div
            style={{
              borderTop: '2px solid #e2e2e2',
              marginTop: 20,
              padding: '20px 0',
            }}
            className="flex-row between w100"
          >
            <div className="flex-column percentBox">
              <PercentBoxTitle>{intl.formatMessage(messages.maximumLTV)}</PercentBoxTitle>
              <PercentBoxValue>
                {Number(reserveOverviewData.baseLTVasCollateral * 100).toFixed(2)}%
              </PercentBoxValue>
            </div>
            <div className="flex-column percentBox">
              <PercentBoxTitle>{intl.formatMessage(messages.liquidationThreshold)}</PercentBoxTitle>
              <PercentBoxValue>
                {Number(
                  (reserveOverviewData.liquidationBonus <= 0
                    ? 0
                    : reserveOverviewData.liquidationThreshold) * 100
                ).toFixed(2)}
                %
              </PercentBoxValue>
            </div>
            <div className="flex-column percentBox">
              <PercentBoxTitle>{intl.formatMessage(messages.liquidationPenalty)}</PercentBoxTitle>
              <PercentBoxValue>
                {Number(reserveOverviewData.liquidationBonus * 100).toFixed(2)}%
              </PercentBoxValue>
            </div>
            <div className="flex-column percentBox">
              <PercentBoxTitle>{intl.formatMessage(messages.usedAsCollateral)}</PercentBoxTitle>
              <PercentBoxValue>
                {intl.formatMessage(
                  reserveOverviewData.usageAsCollateralEnabled ? messages.yes : messages.no
                )}
              </PercentBoxValue>
            </div>
            <div className="flex-column percentBox">
              <PercentBoxTitle>{intl.formatMessage(messages.stableBorrowing)}</PercentBoxTitle>
              <PercentBoxValue>
                {intl.formatMessage(
                  reserveOverviewData.stableBorrowRateEnabled ? messages.yes : messages.no
                )}
              </PercentBoxValue>
            </div>
          </div>

          {/* <div className="ReserveInformation__bottom-info">
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
          </div> */}
        </ContentWrapper>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .percentBox {
          max-width: 100px;
          justify-content: space-between;
        }
        .columnBox {
          width: 30%;
          padding-right: 20px;
        }
        .border {
          border-right: 2px solid #e2e2e2;
        }
        .ReserveInformation__title-custom {
          font-family: Montserrat;
          font-size: 18px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: white;
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
