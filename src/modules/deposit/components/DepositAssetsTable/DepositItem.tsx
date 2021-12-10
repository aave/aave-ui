import React from 'react';

import TableItem from '../../../../components/BasicAssetsTable/TableItem';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import NoData from '../../../../components/basic/NoData';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import CapsHint, { CapType } from '../../../../components/caps/CapsHint';

import { DepositTableItem } from './types';

export default function DepositItem({
  id,
  symbol,
  underlyingAsset,
  availableToDeposit,
  availableToDepositUSD,
  liquidityRate,
  userId,
  isFreezed,
  aincentivesAPR,
  isIsolated,
  totalLiquidity,
  supplyCap,
}: DepositTableItem) {
  const url = `/deposit/${underlyingAsset}-${id}`;

  return (
    <TableItem
      symbol={symbol}
      url={url}
      isFreezed={isFreezed}
      darkOnDarkMode={true}
      isIsolated={isIsolated}
    >
      <TableColumn>
        {!userId || Number(availableToDeposit) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <div className="TableItem__valueInner">
            <Value
              value={availableToDeposit}
              subValue={availableToDepositUSD}
              maximumSubValueDecimals={2}
              subSymbol="USD"
              maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
              minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            />
            <CapsHint
              capType={CapType.supplyCap}
              capAmount={supplyCap}
              totalAmount={totalLiquidity}
              tooltipId={`supplyCap__${id}`}
              withoutText={true}
            />
          </div>
        )}
      </TableColumn>

      {!isFreezed && (
        <TableColumn>
          <LiquidityMiningCard
            value={liquidityRate}
            liquidityMiningValue={aincentivesAPR}
            symbol={symbol}
            type="deposit"
          />
        </TableColumn>
      )}
    </TableItem>
  );
}
