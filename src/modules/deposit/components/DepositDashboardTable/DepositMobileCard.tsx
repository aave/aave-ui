import React from 'react';
import { useIntl } from 'react-intl';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import TableUsedAsCollateral from '../../../dashboard/components/DashboardTable/TableUsedAsCollateral';
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
  aIncentives,
  canBeEnabledAsCollateral,
  isIsolated,
}: DepositTableItem) {
  const intl = useIntl();
  const { currentMarketData } = useProtocolDataContext();

  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  return (
    <>
      <MobileCardWrapper symbol={symbol} isIsolated={isIsolated}>
        <Row title={intl.formatMessage(messages.balance)} withMargin={true}>
          <Value
            value={Number(underlyingBalance)}
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 7}
            symbol={symbol}
            subValue={Number(underlyingBalanceUSD)}
            maximumSubValueDecimals={2}
            subSymbol="USD"
          />
        </Row>

        <Row title={intl.formatMessage(messages.apyRowTitle)} withMargin={true}>
          {aIncentives.length > 0 ? (
            <IncentivesCard
              symbol={symbol}
              value={Number(liquidityRate || 0)}
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
          <TableUsedAsCollateral
            isIsolated={isIsolated}
            usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
            canBeEnabledAsCollateral={canBeEnabledAsCollateral}
            onToggleSwitch={onToggleSwitch}
          />
        </Row>

        <TableButtonsWrapper>
          <Link to={`/withdraw/${underlyingAsset}`} className="ButtonLink" disabled={!isActive}>
            <DefaultButton
              title={intl.formatMessage(defaultMessages.withdraw)}
              color="dark"
              disabled={!isActive}
            />
          </Link>

          {!isSwapButton ? (
            <Link
              to={`/supply/${underlyingAsset}`}
              className="ButtonLink"
              disabled={!isActive || isFrozen}
            >
              <DefaultButton
                title={intl.formatMessage(defaultMessages.supply)}
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
