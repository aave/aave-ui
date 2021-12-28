import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import TableCol from '../../../dashboard/components/DashboardTable/TableCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import IsolationModeBadge from '../../../../components/isolationMode/IsolationModeBadge';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { DepositTableItem } from './types';

export default function DepositItem({
  userId,
  reserve: { symbol, liquidityRate, id, underlyingAsset },
  usageAsCollateralEnabledOnUser,
  underlyingBalance,
  underlyingBalanceUSD,
  onToggleSwitch,
  isActive,
  isFrozen,
  aIncentives,
  canBeEnabledAsCollateral,
  isUserInIsolationMode,
  isIsolated,
}: DepositTableItem) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const swiperWidth = xl && !lg ? 30 : md ? 30 : 40;
  const swiperHeight = xl && !lg ? 16 : md ? 16 : 20;

  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  return (
    <TableItem
      tokenSymbol={symbol}
      isIsolated={
        isUserInIsolationMode &&
        usageAsCollateralEnabledOnUser &&
        canBeEnabledAsCollateral &&
        isIsolated
      }
    >
      <TableValueCol
        userId={userId}
        symbol={symbol}
        value={Number(underlyingBalanceUSD)}
        subValue={Number(underlyingBalance)}
        tooltipId={`deposit-${symbol}__${id}`}
      />

      <TableAprCol value={Number(liquidityRate)} incentives={aIncentives} symbol={symbol} />

      <TableCol>
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
      </TableCol>

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={!isActive}
          title={intl.formatMessage(defaultMessages.withdraw)}
          linkTo={`/withdraw/${underlyingAsset}-${id}`}
        />

        {!isSwapButton && (
          <TableButtonCol
            disabled={!isActive || isFrozen}
            title={intl.formatMessage(defaultMessages.deposit)}
            linkTo={`/deposit/${underlyingAsset}-${id}`}
            withoutBorder={!isSwapButton}
          />
        )}

        {isSwapButton && (
          <TableButtonCol
            disabled={!isActive || isFrozen}
            title={intl.formatMessage(defaultMessages.swap)}
            linkTo={`/asset-swap?asset=${underlyingAsset}`}
            withoutBorder={true}
          />
        )}
      </TableButtonsWrapper>
    </TableItem>
  );
}
