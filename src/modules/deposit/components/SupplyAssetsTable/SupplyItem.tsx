import React from 'react';
import { useIntl } from 'react-intl';

import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableCol from '../../../dashboard/components/DashboardTable/TableCol';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import TableUsageAsCollateral from '../../../dashboard/components/DashboardTable/TableUsageAsCollateral';

import { SupplyTableItem } from './types';

import defaultMessages from '../../../../defaultMessages';

export default function SupplyItem({
  id,
  symbol,
  underlyingAsset,
  walletBalance,
  walletBalanceUSD,
  liquidityRate,
  userId,
  isFreezed,
  aIncentives,
  isIsolated,
  totalLiquidity,
  supplyCap,
  isActive,
  usageAsCollateralEnabled,
  isUserInIsolationMode,
}: SupplyTableItem) {
  const intl = useIntl();

  return (
    <TableItem tokenSymbol={symbol} isIsolated={false}>
      <TableValueCol
        userId={userId}
        symbol={symbol}
        value={Number(walletBalanceUSD)}
        subValue={Number(walletBalance)}
        tooltipId={`availableToDeposit__${id}`}
        nextToValue={
          <CapsHint
            capType={CapType.supplyCap}
            capAmount={supplyCap}
            totalAmount={totalLiquidity}
            tooltipId={`supplyCap__${id}`}
            withoutText={true}
          />
        }
      />

      <TableAprCol value={Number(liquidityRate)} incentives={aIncentives} symbol={symbol} />

      <TableCol>
        <TableUsageAsCollateral
          isUserInIsolationMode={isUserInIsolationMode}
          isIsolated={isIsolated}
          usageAsCollateralEnabled={usageAsCollateralEnabled}
        />
      </TableCol>

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={!isActive || isFreezed}
          title={intl.formatMessage(defaultMessages.deposit)}
          linkTo={`/deposit/${underlyingAsset}-${id}`}
        />
        <TableButtonCol
          title={intl.formatMessage(defaultMessages.details)}
          linkTo={`/reserve-overview/${underlyingAsset}-${id}`}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
