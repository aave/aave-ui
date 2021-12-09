import React from 'react';

import TableItem from '../../../../components/BasicAssetsTable/TableItem';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import NoData from '../../../../components/basic/NoData';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import { BorrowTableItem } from './types';

export default function BorrowItem({
  id,
  symbol,
  underlyingAsset,
  availableBorrows,
  availableBorrowsInUSD,
  stableBorrowRate,
  variableBorrowRate,
  stableBorrowRateEnabled,
  userId,
  isFreezed,
  vIncentives,
  sIncentives,
  isIsolated,
}: BorrowTableItem) {
  const url = `/borrow/${underlyingAsset}-${id}`;

  return (
    <TableItem
      symbol={symbol}
      url={url}
      isFreezed={isFreezed}
      isBorrow={true}
      darkOnDarkMode={true}
      isIsolated={isIsolated}
    >
      <TableColumn>
        {!userId || Number(availableBorrows) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(availableBorrows)}
            subValue={availableBorrowsInUSD}
            subSymbol="USD"
            maximumSubValueDecimals={2}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
          />
        )}
      </TableColumn>

      {!isFreezed && (
        <TableColumn>
          <LiquidityMiningCard
            value={variableBorrowRate}
            liquidityMiningValues={vIncentives}
            symbol={symbol}
            type="borrow-variable"
          />
        </TableColumn>
      )}

      {!isFreezed && (
        <TableColumn>
          {stableBorrowRateEnabled ? (
            <LiquidityMiningCard
              value={stableBorrowRate}
              liquidityMiningValues={sIncentives}
              symbol={symbol}
              type="borrow-stable"
            />
          ) : (
            <NoData color="dark" />
          )}
        </TableColumn>
      )}
    </TableItem>
  );
}
