import React from 'react';
import { useHistory } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import { TokenIcon } from '@aave/aave-ui-kit';

import TableItemWrapper from '../../../../components/BasicTable/TableItemWrapper';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import FreezedWarning from '../../../../components/FreezedWarning';
import NoData from '../../../../components/basic/NoData';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import { getAssetInfo } from '../../../../helpers/markets/markets-data';

import staticStyles from './style';

export interface MarketTableItemProps {
  id: string;
  underlyingAsset: string;
  currencySymbol: string;
  totalLiquidity: number;
  totalLiquidityInUSD: number;
  totalBorrows: number;
  totalBorrowsInUSD: number;
  depositAPY: number;
  aIncentivesAPY?: string;
  vIncentivesAPY?: string;
  sIncentivesAPY?: string;
  avg30DaysLiquidityRate: number;
  stableBorrowRate: number;
  variableBorrowRate: number;
  avg30DaysVariableRate: number;
  borrowingEnabled?: boolean;
  stableBorrowRateEnabled?: boolean;
  isFreezed?: boolean;
  isPriceInUSD?: boolean;
}

export default function MarketTableItem({
  id,
  currencySymbol,
  totalLiquidity,
  totalLiquidityInUSD,
  totalBorrows,
  totalBorrowsInUSD,
  depositAPY,
  aIncentivesAPY,
  vIncentivesAPY,
  sIncentivesAPY,
  avg30DaysLiquidityRate,
  stableBorrowRate,
  variableBorrowRate,
  avg30DaysVariableRate,
  borrowingEnabled,
  stableBorrowRateEnabled,
  isFreezed,
  isPriceInUSD,
}: MarketTableItemProps) {
  const history = useHistory();

  const asset = getAssetInfo(currencySymbol);

  const width = useWindowWidth();
  const mobileTokenTitle = width < 860;

  const handleClick = () => {
    history.push(`/reserve-overview/${currencySymbol}-${id}`);
  };

  return (
    <TableItemWrapper onClick={handleClick} className="MarketTableItem" withGoToTop={true}>
      <TableColumn className="MarketTableItem__column">
        <TokenIcon
          tokenSymbol={currencySymbol}
          height={35}
          width={35}
          tokenFullName={
            asset && mobileTokenTitle
              ? !!asset.formattedSymbol
                ? asset.formattedSymbol
                : asset.symbol
              : asset.name
          }
          withTokenSymbol={!mobileTokenTitle}
          className="MarketTableItem__token"
        />
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
      </TableColumn>

      {!isFreezed && (
        <>
          <TableColumn className="MarketTableItem__column">
            <LiquidityMiningCard
              value={depositAPY}
              thirtyDaysValue={avg30DaysLiquidityRate}
              liquidityMiningValue={aIncentivesAPY}
              symbol={currencySymbol}
              type="deposit"
            />
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {borrowingEnabled && +variableBorrowRate >= 0 ? (
              <LiquidityMiningCard
                value={variableBorrowRate}
                thirtyDaysValue={avg30DaysVariableRate}
                liquidityMiningValue={vIncentivesAPY}
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
                liquidityMiningValue={sIncentivesAPY}
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
