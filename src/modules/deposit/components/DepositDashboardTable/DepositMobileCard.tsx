import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import NoData from '../../../../components/basic/NoData';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import CollateralHelpModal from '../../../../components/HelpModal/CollateralHelpModal';
import AMPLWarning from '../../../../components/AMPLWarning';
import IsolationModeBadge from '../../../../components/isolationMode/IsolationModeBadge';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { DepositTableItem } from './types';

export default function DepositMobileCard({
  reserve: { symbol, liquidityRate, id, underlyingAsset },
  usageAsCollateralEnabledOnUser,
  underlyingBalance,
  underlyingBalanceUSD,
  onToggleSwitch,
  isActive,
  isFrozen,
  borrowingEnabled,
  aIncentives,
  canBeEnabledAsCollateral,
  isUserInIsolationMode,
  isIsolated,
}: DepositTableItem) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const swiperWidth = 50;
  const swiperHeight = 24;

  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  return (
    <>
      <MobileCardWrapper
        symbol={symbol}
        isIsolated={
          isUserInIsolationMode &&
          usageAsCollateralEnabledOnUser &&
          canBeEnabledAsCollateral &&
          isIsolated
        }
      >
        <Row title={intl.formatMessage(messages.balance)} withMargin={true}>
          <Value
            value={Number(underlyingBalance)}
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 7}
            subValue={Number(underlyingBalanceUSD)}
            maximumSubValueDecimals={2}
            subSymbol="USD"
          />
        </Row>

        <Row title={intl.formatMessage(messages.apyRowTitle)} withMargin={true}>
          {borrowingEnabled || aIncentives.length > 0 ? (
            <IncentivesCard
              symbol={symbol}
              value={borrowingEnabled ? Number(liquidityRate) : 0}
              incentives={aIncentives}
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
            value={usageAsCollateralEnabledOnUser && canBeEnabledAsCollateral}
            offLabel={
              isUserInIsolationMode && !canBeEnabledAsCollateral ? (
                <IsolationModeBadge isIsolated={false} disabled={true} />
              ) : (
                intl.formatMessage(messages.offLabel)
              )
            }
            onLabel={intl.formatMessage(messages.onLabel)}
            onColor={currentTheme.green.hex}
            offColor={!canBeEnabledAsCollateral ? currentTheme.lightBlue.hex : currentTheme.red.hex}
            onSwitch={onToggleSwitch}
            disabled={!canBeEnabledAsCollateral}
            swiperHeight={swiperHeight}
            swiperWidth={swiperWidth}
          />
        </Row>

        <TableButtonsWrapper>
          <Link
            to={`/withdraw/${underlyingAsset}-${id}`}
            className="ButtonLink"
            disabled={!isActive}
          >
            <DefaultButton
              title={intl.formatMessage(defaultMessages.withdraw)}
              color="dark"
              disabled={!isActive}
            />
          </Link>

          {!isSwapButton ? (
            <Link
              to={`/deposit/${underlyingAsset}-${id}`}
              className="ButtonLink"
              disabled={!isActive || isFrozen}
            >
              <DefaultButton
                title={intl.formatMessage(defaultMessages.deposit)}
                color="dark"
                disabled={!isActive || isFrozen}
                transparent={!isSwapButton}
              />
            </Link>
          ) : (
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
          )}
        </TableButtonsWrapper>
      </MobileCardWrapper>

      {symbol === 'AMPL' && <AMPLWarning />}
    </>
  );
}
