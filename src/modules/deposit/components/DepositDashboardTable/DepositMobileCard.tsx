import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { isFeatureEnabled } from '../../../../helpers/markets/markets-data';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import NoData from '../../../../components/basic/NoData';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import CollateralHelpModal from '../../../../components/HelpModal/CollateralHelpModal';
import AMPLWarning from '../../../../components/AMPLWarning';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { DepositTableItem } from './types';

export default function DepositMobileCard({
  reserve: { symbol, liquidityRate, id, underlyingAsset },
  usageAsCollateralEnabledOnUser,
  usageAsCollateralEnabledOnThePool,
  underlyingBalance,
  underlyingBalanceUSD,
  onToggleSwitch,
  isActive,
  isFrozen,
  avg30DaysLiquidityRate,
  borrowingEnabled,
  aIncentivesAPY,
}: DepositTableItem) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const swiperWidth = 50;
  const swiperHeight = 24;

  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  return (
    <>
      <MobileCardWrapper symbol={symbol}>
        <Row title={intl.formatMessage(messages.secondTableColumnTitle)} withMargin={true}>
          <Value
            value={Number(underlyingBalance)}
            subValue={Number(underlyingBalanceUSD)}
            subSymbol="USD"
          />
        </Row>

        <Row title={intl.formatMessage(messages.apyRowTitle)} withMargin={true}>
          {borrowingEnabled || aIncentivesAPY !== '0' ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={borrowingEnabled ? Number(liquidityRate) : 0}
              thirtyDaysValue={avg30DaysLiquidityRate}
              liquidityMiningValue={aIncentivesAPY}
              type="deposit"
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>

        <Row
          title={
            <CollateralHelpModal
              text={intl.formatMessage(messages.useAsCollateralRowTitle)}
              iconSize={12}
            />
          }
          withMargin={true}
          className="Row__center"
        >
          <CustomSwitch
            value={usageAsCollateralEnabledOnUser && usageAsCollateralEnabledOnThePool}
            offLabel={intl.formatMessage(messages.offLabel)}
            onLabel={intl.formatMessage(messages.onLabel)}
            onColor={currentTheme.green.hex}
            offColor={currentTheme.red.hex}
            onSwitch={onToggleSwitch}
            disabled={!usageAsCollateralEnabledOnThePool}
            swiperHeight={swiperHeight}
            swiperWidth={swiperWidth}
          />
        </Row>

        {!isSwapButton && (
          <Row
            title={intl.formatMessage(messages.depositMore)}
            withMargin={true}
            className="Row__center"
          >
            <Link
              to={`/deposit/${underlyingAsset}-${id}`}
              className="ButtonLink"
              disabled={!isActive || isFrozen}
            >
              <DefaultButton
                title={intl.formatMessage(defaultMessages.deposit)}
                color="dark"
                disabled={!isActive || isFrozen}
              />
            </Link>
          </Row>
        )}

        <Row
          title={intl.formatMessage(messages.withdrawYourDeposit)}
          withMargin={isSwapButton}
          className="Row__center"
        >
          <Link
            to={`/withdraw/${underlyingAsset}-${id}`}
            className="ButtonLink"
            disabled={!isActive || isFrozen}
          >
            <DefaultButton
              title={intl.formatMessage(defaultMessages.withdraw)}
              color="dark"
              transparent={!isSwapButton}
              disabled={!isActive || isFrozen}
            />
          </Link>
        </Row>

        {isSwapButton && (
          <Row title={intl.formatMessage(messages.swapYourDeposit)} className="Row__center">
            <Link
              to={`/asset-swap?asset=${underlyingAsset}`}
              className="ButtonLink"
              disabled={
                !isActive ||
                isFrozen ||
                symbol.toUpperCase() === 'XSUSHI' ||
                symbol.toUpperCase() === 'GUSD' ||
                symbol.toUpperCase() === 'BUSD' ||
                symbol.toUpperCase() === 'SUSD' ||
                symbol.toUpperCase() === 'BAL' ||
                symbol.toUpperCase() === 'KNC' ||
                symbol.toUpperCase() === 'ZRX'
              }
            >
              <DefaultButton
                title={intl.formatMessage(defaultMessages.swap)}
                color="dark"
                transparent={true}
                disabled={
                  !isActive ||
                  isFrozen ||
                  symbol.toUpperCase() === 'XSUSHI' ||
                  symbol.toUpperCase() === 'GUSD' ||
                  symbol.toUpperCase() === 'BUSD' ||
                  symbol.toUpperCase() === 'SUSD' ||
                  symbol.toUpperCase() === 'BAL' ||
                  symbol.toUpperCase() === 'KNC' ||
                  symbol.toUpperCase() === 'ZRX'
                }
              />
            </Link>
          </Row>
        )}
      </MobileCardWrapper>

      {symbol === 'AMPL' && <AMPLWarning />}
    </>
  );
}
