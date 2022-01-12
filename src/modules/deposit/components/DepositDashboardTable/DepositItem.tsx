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
  reserve: { symbol, liquidityRate, underlyingAsset },
  usageAsCollateralEnabledOnUser,
  underlyingBalance,
  underlyingBalanceUSD,
  onToggleSwitch,
  isActive,
  isFrozen,
  aIncentives,
  canBeEnabledAsCollateral,
  isIsolated,
  swapLink,
  depositLink,
  withdrawLink,
  ...rest
}: DepositTableItem) {
  const intl = useIntl();
  const { currentMarketData } = useProtocolDataContext();

  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  return (
    <TableItem tokenSymbol={symbol} {...rest}>
      <TableValueCol
        userId={userId}
        symbol={symbol}
        value={Number(underlyingBalance)}
        withSubValue={true}
        subValue={Number(underlyingBalanceUSD)}
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
          linkTo={withdrawLink}
        />

        {!isSwapButton && (
          <TableButtonCol
            disabled={!isActive || isFrozen}
            title={intl.formatMessage(defaultMessages.supply)}
            linkTo={depositLink}
            withoutBorder={!isSwapButton}
          />
        )}

        {isSwapButton && (
          <TableButtonCol
            disabled={!isActive || isFrozen}
            title={intl.formatMessage(defaultMessages.swap)}
            linkTo={swapLink}
            withoutBorder={true}
          />
        )}
      </TableButtonsWrapper>
    </TableItem>
  );
}
