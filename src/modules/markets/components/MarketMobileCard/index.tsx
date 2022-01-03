import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import Row from '../../../../components/basic/Row';
import FreezedWarning from '../../../../components/FreezedWarning';
import Value from '../../../../components/basic/Value';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import NoData from '../../../../components/basic/NoData';

import defaultMessages from '../../../../defaultMessages';
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
  aIncentives,
  vIncentives,
  sIncentives,
  stableBorrowRate,
  variableBorrowRate,
  borrowingEnabled,
  stableBorrowRateEnabled,
  isFreezed,
  isIsolated,
  supplyCapUSD,
  borrowCapUSD,
}: MarketTableItemProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const { currentTheme } = useThemeContext();

  const cards = [
    {
      title: defaultMessages.deposit,
      value: depositAPY,
      incentives: aIncentives,
      enabled: true,
    },
    {
      title: defaultMessages.borrow,
      subTitle: messages.variable,
      value: variableBorrowRate,
      incentives: vIncentives,
      enabled: borrowingEnabled,
    },
    {
      title: defaultMessages.borrow,
      subTitle: messages.stable,
      value: stableBorrowRate,
      incentives: sIncentives,
      enabled: stableBorrowRateEnabled && borrowingEnabled,
    },
  ];

  const handleClick = () => {
    navigate(`/reserve-overview/${id}`);
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
          <Row title={intl.formatMessage(messages.totalDeposited)}>
            <div className="MarketMobileCard__valueInner">
              <Value
                value={totalLiquidityInUSD}
                symbol="USD"
                tokenIcon={true}
                compact={true}
                withoutSymbol={true}
                maximumValueDecimals={2}
              />
              <CapsHint
                capType={CapType.supplyCap}
                capAmount={supplyCapUSD}
                totalAmount={totalLiquidityInUSD}
                tooltipId={`supplyCap__${id}`}
                isUSD={true}
              />
            </div>
          </Row>
          <Row title={intl.formatMessage(messages.totalBorrowed)}>
            {borrowingEnabled ? (
              <div className="MarketMobileCard__valueInner">
                <Value
                  value={totalBorrowsInUSD}
                  symbol="USD"
                  tokenIcon={true}
                  compact={true}
                  maximumValueDecimals={2}
                  withoutSymbol={true}
                />
                <CapsHint
                  capType={CapType.borrowCap}
                  capAmount={borrowCapUSD}
                  totalAmount={totalBorrowsInUSD}
                  tooltipId={`borrowCap__${id}`}
                  isUSD={true}
                />
              </div>
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
                <IncentivesCard
                  symbol={currencySymbol}
                  value={card.value}
                  incentives={card.incentives}
                  mobilePosition="left"
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
