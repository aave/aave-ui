import React from 'react';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext, BasicModal } from '@aave/aave-ui-kit';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from '../../libs/pool-data-provider';
import Row from '../basic/Row';
import Value from '../basic/Value';
import ValuePercent from '../basic/ValuePercent';
import MaxLTVHelpModal from '../HelpModal/MaxLTVHelpModal';
import Caption from '../basic/Caption';
import { getAssetColor, isAssetStable, TokenIcon } from '../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

interface LTVInfoModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function LTVInfoModal({ visible, setVisible }: LTVInfoModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();

  let liquidationPrice = '0';
  let unitPrice = '0';
  let currency = '';

  if (!user) {
    return null;
  }

  const {
    userReservesData,
    currentLoanToValue,
    currentLiquidationThreshold,
    totalBorrowsMarketReferenceCurrency,
    totalCollateralMarketReferenceCurrency,
  } = user;

  const loanToValue = valueToBigNumber(totalBorrowsMarketReferenceCurrency)
    .dividedBy(totalCollateralMarketReferenceCurrency || '1')
    .toFixed();

  const collateralComposition = userReservesData
    .filter((userReserve) => {
      const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);
      return (
        userReserve.usageAsCollateralEnabledOnUser &&
        poolReserve &&
        poolReserve.usageAsCollateralEnabled &&
        userReserve.underlyingBalance !== '0'
      );
    })
    .map((userReserve) => ({
      title: userReserve.reserve.symbol,
      color: getAssetColor(userReserve.reserve.symbol),
      value: userReserve.underlyingBalance,
      currentunderlyingBalanceMarketReferenceCurrency:
        userReserve.underlyingBalanceMarketReferenceCurrency,
      unitPriceInUsd: userReserve.underlyingBalanceUSD,
    }));

  const borrowedReserves = user?.userReservesData
    .filter((reserve) => reserve.totalBorrows !== '0')
    .map((reserve) => ({
      ...reserve,
      title: reserve.reserve.symbol,
      unitPriceInUsd: reserve.totalBorrowsUSD,
      unitPriceInEth: reserve.totalBorrowsMarketReferenceCurrency,
    }));

  const hasOneCollateralAndOneReserve =
    collateralComposition.length === 1 && borrowedReserves.length === 1;

  const collateralIsStable = hasOneCollateralAndOneReserve
    ? isAssetStable(collateralComposition[0].title)
    : false;
  const borrowIsStable = hasOneCollateralAndOneReserve
    ? isAssetStable(borrowedReserves[0].reserve.symbol)
    : false;

  const conditions =
    hasOneCollateralAndOneReserve &&
    ((collateralIsStable && !borrowIsStable) || (!collateralIsStable && borrowIsStable));

  if (conditions) {
    // Calculate the liquidation price of the borrower asset if not stablecoin
    if (!borrowIsStable) {
      currency = borrowedReserves[0].title;
      unitPrice = borrowedReserves[0].unitPriceInEth.toString();
      liquidationPrice = new BigNumber(
        collateralComposition[0].currentunderlyingBalanceMarketReferenceCurrency
      )
        .dividedBy(currentLiquidationThreshold)
        .dividedBy(borrowedReserves[0].totalBorrows)
        .toString();
      // Calculate the liquidation price of the collateral asset if not stablecoin
    } else if (!collateralIsStable) {
      currency = collateralComposition[0].title;
      unitPrice =
        collateralComposition[0].currentunderlyingBalanceMarketReferenceCurrency.toString();
      liquidationPrice = valueToBigNumber(borrowedReserves[0].totalBorrowsMarketReferenceCurrency)
        .dividedBy(currentLiquidationThreshold)
        .dividedBy(collateralComposition[0].value)
        .toString();
    }
  }

  const liquidationPriceUSD = new BigNumber(liquidationPrice)
    .multipliedBy(marketRefPriceInUsd)
    .toString();
  const unitPriceUsd = new BigNumber(unitPrice).multipliedBy(marketRefPriceInUsd).toString();

  return (
    <BasicModal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      withCloseButton={true}
      className="LTVInfoModal__wrapper"
    >
      <div className="LTVInfoModal">
        <Caption
          title={intl.formatMessage(messages.liquidationOverview)}
          description={intl.formatMessage(messages.liquidationOverviewDescription)}
          onWhiteBackground={true}
        />

        <div className="LTVInfoModal__content">
          <Row
            title={
              <MaxLTVHelpModal
                text={intl.formatMessage(messages.currentLTV)}
                onWhiteBackground={true}
              />
            }
            withMargin={true}
          >
            <ValuePercent value={loanToValue} onWhiteBackground={true} />
          </Row>

          <Row
            title={intl.formatMessage(messages.maximumLTV)}
            withMargin={true}
            onWhiteBackground={true}
          >
            <ValuePercent value={currentLoanToValue} onWhiteBackground={true} />
          </Row>

          <Row
            title={intl.formatMessage(messages.liquidationThreshold)}
            withMargin={conditions}
            onWhiteBackground={true}
          >
            <ValuePercent value={currentLiquidationThreshold} onWhiteBackground={true} />
          </Row>

          {conditions && (
            <>
              <Row
                title={
                  <div className="LTVInfoModal__title">
                    {intl.formatMessage(messages.currentAssetPrice)}
                    <TokenIcon tokenSymbol={currency} width={17} height={17} />
                  </div>
                }
                withMargin={true}
                onWhiteBackground={true}
              >
                <Value
                  symbol="ETH"
                  subSymbol="USD"
                  value={unitPrice}
                  subValue={unitPriceUsd}
                  onWhiteBackground={true}
                />
              </Row>

              <Row
                title={
                  <div className="LTVInfoModal__title">
                    {intl.formatMessage(messages.assetLiquidationPrice)}
                    <TokenIcon tokenSymbol={currency} width={17} height={17} />
                  </div>
                }
                subTitle={
                  <p className="LTVInfoModal__subTitle">
                    {intl.formatMessage(!borrowIsStable ? messages.borrow : messages.collateral)}
                  </p>
                }
                onWhiteBackground={true}
              >
                <Value
                  symbol="ETH"
                  subSymbol="USD"
                  value={liquidationPrice}
                  subValue={liquidationPriceUSD}
                  onWhiteBackground={true}
                />
              </Row>
            </>
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LTVInfoModal {
          &__content {
            border: 1px solid ${currentTheme.darkBlue.hex};
          }
          &__subTitle {
            color: ${currentTheme.secondary.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
