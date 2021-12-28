import React from 'react';
import { useIntl } from 'react-intl';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import TableUsedAsCollateral from '../../../dashboard/components/DashboardTable/TableUsedAsCollateral';
import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import TableCol from '../../../dashboard/components/DashboardTable/TableCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';

import defaultMessages from '../../../../defaultMessages';

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
  isIsolated,
}: DepositTableItem) {
  const intl = useIntl();
  const { currentMarketData } = useProtocolDataContext();

  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  return (
    <TableItem tokenSymbol={symbol}>
      <TableValueCol
        userId={userId}
        symbol={symbol}
        value={Number(underlyingBalanceUSD)}
        subValue={Number(underlyingBalance)}
        tooltipId={`deposit-${symbol}__${id}`}
      />

      <TableAprCol value={Number(liquidityRate)} incentives={aIncentives} symbol={symbol} />

      <TableCol>
        <TableUsedAsCollateral
          isIsolated={isIsolated}
          canBeEnabledAsCollateral={canBeEnabledAsCollateral}
          usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
          onToggleSwitch={onToggleSwitch}
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
