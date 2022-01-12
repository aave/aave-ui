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
import TableCanBeCollateral from '../../../dashboard/components/DashboardTable/TableCanBeCollateral';

import { SupplyTableItem } from './types';

import defaultMessages from '../../../../defaultMessages';

export default function SupplyItem({
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
  usageAsCollateralEnabledOnUser,
}: SupplyTableItem) {
  const intl = useIntl();

  return (
    <TableItem tokenSymbol={symbol} data-cy={`supply${symbol.toUpperCase()}TableItem`}>
      <TableValueCol
        userId={userId}
        symbol={symbol}
        value={Number(walletBalance)}
        tooltipValue={Number(walletBalanceUSD)}
        subValue={Number(walletBalance)}
        tooltipId={`availableToDeposit__${underlyingAsset}`}
        nextToValue={
          <CapsHint
            capType={CapType.supplyCap}
            capAmount={supplyCap}
            totalAmount={totalLiquidity}
            tooltipId={`supplyCap__${underlyingAsset}`}
            withoutText={true}
          />
        }
      />

      <TableAprCol value={Number(liquidityRate)} incentives={aIncentives} symbol={symbol} />

      <TableCol>
        <TableCanBeCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabled={usageAsCollateralEnabledOnUser}
        />
      </TableCol>

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
          title={intl.formatMessage(defaultMessages.supply)}
          linkTo={`/supply/${underlyingAsset}`}
        />
        <TableButtonCol
          title={intl.formatMessage(defaultMessages.details)}
          linkTo={`/reserve-overview/${underlyingAsset}`}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
