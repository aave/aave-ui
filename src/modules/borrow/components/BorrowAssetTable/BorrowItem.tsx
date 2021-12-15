import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import TableItem from '../../../../components/BasicAssetsTable/TableItem';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import NoData from '../../../../components/basic/NoData';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
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
  borrowCap,
  totalBorrows,
}: BorrowTableItem) {
  const { md } = useThemeContext();

  const url = `/borrow/${underlyingAsset}-${id}`;

  return (
    <TableItem
      symbol={symbol}
      url={url}
      isFreezed={isFreezed}
      isBorrow={true}
      darkOnDarkMode={true}
      isIsolated={false}
    >
      <TableColumn minWidth={md ? 180 : undefined}>
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
            nextToValue={
              <CapsHint
                capType={CapType.borrowCap}
                capAmount={borrowCap}
                totalAmount={totalBorrows}
                tooltipId={`borrowCap__${id}`}
                withoutText={true}
              />
            }
          />
        )}
      </TableColumn>

      {!isFreezed && (
        <TableColumn>
          <IncentivesCard value={variableBorrowRate} incentives={vIncentives} symbol={symbol} />
        </TableColumn>
      )}

      {!isFreezed && (
        <TableColumn>
          {stableBorrowRateEnabled ? (
            <IncentivesCard value={stableBorrowRate} incentives={sIncentives} symbol={symbol} />
          ) : (
            <NoData color="dark" />
          )}
        </TableColumn>
      )}
    </TableItem>
  );
}
