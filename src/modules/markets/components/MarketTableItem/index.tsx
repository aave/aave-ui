import React from 'react';
import { useHistory } from 'react-router-dom';

import TableItemWrapper from '../../../../components/BasicTable/TableItemWrapper';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import FreezedWarning from '../../../../components/FreezedWarning';
import NoData from '../../../../components/basic/NoData';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import IsolatedBadge from '../../../../components/isolationMode/IsolatedBadge';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';

import staticStyles from './style';
import { ReserveIncentive } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';

export interface MarketTableItemProps {
  id: string;
  underlyingAsset: string;
  currencySymbol: string;
  totalLiquidity: number;
  totalLiquidityInUSD: number;
  totalBorrows: number;
  totalBorrowsInUSD: number;
  depositAPY: number;
  aIncentives?: ReserveIncentive[];
  vIncentives?: ReserveIncentive[];
  sIncentives?: ReserveIncentive[];
  stableBorrowRate: number;
  variableBorrowRate: number;
  borrowingEnabled?: boolean;
  stableBorrowRateEnabled?: boolean;
  isFreezed?: boolean;
  isPriceInUSD?: boolean;
  borrowCap: string;
  borrowCapUSD: string;
  supplyCap: string;
  supplyCapUSD: string;
  isIsolated: boolean;
}

export default function MarketTableItem({
  id,
  underlyingAsset,
  currencySymbol,
  totalLiquidity,
  totalLiquidityInUSD,
  totalBorrows,
  totalBorrowsInUSD,
  depositAPY,
  aIncentives,
  vIncentives,
  sIncentives,
  stableBorrowRate,
  variableBorrowRate,
  borrowingEnabled,
  stableBorrowRateEnabled,
  isFreezed,
  isPriceInUSD,
  borrowCap,
  borrowCapUSD,
  supplyCap,
  supplyCapUSD,
  isIsolated,
}: MarketTableItemProps) {
  const history = useHistory();

  const asset = getAssetInfo(currencySymbol);

  const handleClick = () => {
    history.push(`/reserve-overview/${underlyingAsset}-${id}`);
  };

  return (
    <TableItemWrapper onClick={handleClick} className="MarketTableItem" withGoToTop={true}>
      <TableColumn className="MarketTableItem__column">
        <TokenIcon
          tokenSymbol={currencySymbol}
          height={35}
          width={35}
          tokenFullName={asset.name}
          className="MarketTableItem__token"
        />
        {isIsolated && <IsolatedBadge />}
      </TableColumn>
      <TableColumn className="MarketTableItem__column">
        <Value
          value={isPriceInUSD ? totalLiquidityInUSD : totalLiquidity}
          compact={true}
          maximumValueDecimals={2}
          withoutSymbol={true}
          tooltipId={`market-size-${asset.symbol}`}
          symbol={isPriceInUSD ? 'USD' : ''}
          tokenIcon={isPriceInUSD}
          className="MarketTableItem__value"
        />
        {
          supplyCap !== '0' ? (isPriceInUSD ? supplyCapUSD : supplyCap) : undefined // TODO: design
        }
      </TableColumn>
      <TableColumn className="MarketTableItem__column">
        {borrowingEnabled ? (
          <Value
            value={isPriceInUSD ? totalBorrowsInUSD : totalBorrows}
            compact={true}
            maximumValueDecimals={2}
            className="MarketTableItem__value"
            withoutSymbol={true}
            symbol={isPriceInUSD ? 'USD' : ''}
            tokenIcon={isPriceInUSD}
            tooltipId={`borrows-size-${asset.symbol}`}
          />
        ) : (
          <NoData color="dark" />
        )}
        {
          borrowCap !== '0' ? (isPriceInUSD ? borrowCapUSD : borrowCap) : undefined // TODO: design
        }
      </TableColumn>

      {!isFreezed && (
        <>
          <TableColumn className="MarketTableItem__column">
            <LiquidityMiningCard
              value={depositAPY}
              liquidityMiningValues={aIncentives}
              symbol={currencySymbol}
              type="deposit"
            />
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {borrowingEnabled && +variableBorrowRate >= 0 ? (
              <LiquidityMiningCard
                value={variableBorrowRate}
                liquidityMiningValues={vIncentives}
                symbol={currencySymbol}
                type="borrow-variable"
              />
            ) : (
              <NoData color="dark" />
            )}
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {stableBorrowRateEnabled && borrowingEnabled && stableBorrowRate >= 0 ? (
              <LiquidityMiningCard
                value={stableBorrowRate}
                liquidityMiningValues={sIncentives}
                symbol={currencySymbol}
                type="borrow-stable"
              />
            ) : (
              <NoData color="dark" />
            )}
          </TableColumn>
        </>
      )}

      {isFreezed && (
        <>
          <div />
          <div className="MarketTableItem__isFreezed-inner">
            <FreezedWarning symbol={currencySymbol} />
          </div>
        </>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableItemWrapper>
  );
}
