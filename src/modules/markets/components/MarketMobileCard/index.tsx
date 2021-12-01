import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import Row from '../../../../components/basic/Row';
import FreezedWarning from '../../../../components/FreezedWarning';
import Value from '../../../../components/basic/Value';
import NoData from '../../../../components/basic/NoData';

import messages from './messages';
import staticStyles from './style';

import { MarketTableItemProps } from '../MarketTableItem';

export default function MarketMobileCard({
  id,
  currencySymbol,
  underlyingAsset,
  totalLiquidityInUSD,
  totalBorrowsInUSD,
  depositAPY,
  aincentivesAPR,
  vincentivesAPR,
  sincentivesAPR,
  stableBorrowRate,
  variableBorrowRate,
  borrowingEnabled,
  stableBorrowRateEnabled,
  isFreezed,
  isIsolated,
}: MarketTableItemProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();

  const cards = [
    {
      title: messages.deposit,
      value: depositAPY,
      liquidityMiningValue: aincentivesAPR,
      enabled: true,
      type: 'deposit',
    },
    {
      title: messages.borrow,
      subTitle: messages.variable,
      value: variableBorrowRate,
      liquidityMiningValue: vincentivesAPR,
      enabled: borrowingEnabled,
      type: 'borrow-variable',
    },
    {
      title: messages.borrow,
      subTitle: messages.stable,
      value: stableBorrowRate,
      liquidityMiningValue: sincentivesAPR,
      enabled: stableBorrowRateEnabled && borrowingEnabled,
      type: 'borrow-stable',
    },
  ];

  const handleClick = () => {
    history.push(`/reserve-overview/${underlyingAsset}-${id}`);
  };

  return (
    <MobileCardWrapper
      symbol={currencySymbol}
      isIsolated={isIsolated}
      onClick={handleClick}
      withGoToTop={true}
      className="MarketMobileCard"
      subSymbolComponent={
        <div className="MarketMobileCard__topRows">
          <Row title={intl.formatMessage(messages.marketSize)}>
            <Value
              value={totalLiquidityInUSD}
              symbol="USD"
              tokenIcon={true}
              compact={true}
              withoutSymbol={true}
              maximumValueDecimals={2}
            />
          </Row>
          <Row title={intl.formatMessage(messages.totalBorrowed)}>
            {borrowingEnabled ? (
              <>
                <Value
                  value={totalBorrowsInUSD}
                  symbol="USD"
                  tokenIcon={true}
                  compact={true}
                  maximumValueDecimals={2}
                  withoutSymbol={true}
                />
              </>
            ) : (
              <NoData color="dark" />
            )}
          </Row>
        </div>
      }
    >
      {!isFreezed && (
        <div className="MarketMobileCard__cards">
          {cards.map((card, index) => (
            <div className="MarketMobileCard__card" key={index}>
              <p className="MarketMobileCard__card--title">
                {intl.formatMessage(card.title)}{' '}
                {card.subTitle && <span>{intl.formatMessage(card.subTitle)}</span>}
              </p>

              {card.enabled ? (
                <LiquidityMiningCard
                  symbol={currencySymbol}
                  value={card.value}
                  liquidityMiningValue={card.liquidityMiningValue}
                  mobilePosition="left"
                  type={card.type}
                />
              ) : (
                <NoData color="dark" />
              )}
            </div>
          ))}
        </div>
      )}

      {isFreezed && (
        <div className="MarketMobileCard__isFreezed--inner">
          <FreezedWarning symbol={currencySymbol} />
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MarketMobileCard {
          &__card--title {
            color: ${currentTheme.textDarkBlue.hex};
            span {
              color: ${currentTheme.lightBlue.hex};
            }
          }
        }
      `}</style>
    </MobileCardWrapper>
  );
}
