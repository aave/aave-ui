import React from 'react';
import { useIntl } from 'react-intl';

import TableAvailablePosition from '../../../dashboard/components/DashboardTable/TableAvailablePosition';
import TableCol from '../../../dashboard/components/DashboardTable/TableCol';
import Value from '../../../../components/basic/Value';
import NoData from '../../../../components/basic/NoData';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import TableUsageAsCollateral from '../../../dashboard/components/DashboardTable/TableUsageAsCollateral';

import { SupplyTableItem } from './types';

import messages from './messages';

export default function SupplyItem({
  id,
  symbol,
  underlyingAsset,
  availableToDeposit,
  availableToDepositUSD,
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
    <TableAvailablePosition tokenSymbol={symbol} isIsolated={isIsolated}>
      <TableCol>
        {!userId || Number(availableToDeposit) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={availableToDeposit}
            subValue={availableToDepositUSD}
            maximumSubValueDecimals={2}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            className="TableValueCol__value"
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
        )}
      </TableCol>

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
          title={intl.formatMessage(messages.supply)}
          linkTo={`/deposit/${underlyingAsset}-${id}`}
        />
        <TableButtonCol
          disabled={!isActive || isFreezed}
          title={intl.formatMessage(messages.details)}
          linkTo={`/reserve-overview/${underlyingAsset}-${id}`}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableAvailablePosition>
  );
}
