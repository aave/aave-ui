import React from 'react';
import { useNavigate } from 'react-router-dom';
import TableItemWrapper from '../../../../components/BasicTable/TableItemWrapper';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import FreezedWarning from '../../../../components/FreezedWarning';
import NoData from '../../../../components/basic/NoData';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import IsolatedBadge from '../../../../components/isolationMode/IsolatedBadge';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';

import staticStyles from './style';
import { ReserveIncentiveResponse } from '../../../../libs/pool-data-provider/hooks/use-incentives-data';

export interface MarketTableItemProps {
  id: string;
  underlyingAsset: string;
  currencySymbol: string;
  totalLiquidity: number;
  totalLiquidityInUSD: number;
  totalBorrows: number;
  totalBorrowsInUSD: number;
  depositAPY: number;
  aIncentives?: ReserveIncentiveResponse[];
  vIncentives?: ReserveIncentiveResponse[];
  sIncentives?: ReserveIncentiveResponse[];
  stableBorrowRate: number;
  variableBorrowRate: number;
  borrowingEnabled?: boolean;
  stableBorrowRateEnabled?: boolean;
  isFreezed?: boolean;
  isPriceInUSD?: boolean;
  borrowCap: string;
  borrowCapUSD: string;
  supplyCapUSD: string;
  supplyCap: string;
  isIsolated: boolean;
  usageAsCollateralEnabled: boolean;
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
  supplyCapUSD,
  supplyCap,
  isIsolated,
  usageAsCollateralEnabled,
}: MarketTableItemProps) {
  const navigate = useNavigate();
  const asset = getAssetInfo(currencySymbol);

  const handleClick = () => {
    navigate(`/reserve-overview/${id}`);
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
        {usageAsCollateralEnabled && isIsolated && <IsolatedBadge />}
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
        <CapsHint
          capType={CapType.supplyCap}
          capAmount={isPriceInUSD ? supplyCapUSD : supplyCap}
          totalAmount={isPriceInUSD ? totalLiquidityInUSD : totalLiquidity}
          tooltipId={`supplyCap__${id}`}
          isUSD={isPriceInUSD}
        />
      </TableColumn>

      <TableColumn className="MarketTableItem__column">
        <IncentivesCard
          value={isFreezed ? '-1' : depositAPY}
          incentives={aIncentives}
          symbol={currencySymbol}
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
        <CapsHint
          capType={CapType.borrowCap}
          capAmount={isPriceInUSD ? borrowCapUSD : borrowCap}
          totalAmount={isPriceInUSD ? totalBorrowsInUSD : totalBorrows}
          tooltipId={`borrowCap__${id}`}
          isUSD={isPriceInUSD}
        />
      </TableColumn>

      {!isFreezed && (
        <>
          <TableColumn className="MarketTableItem__column">
            {borrowingEnabled && +variableBorrowRate >= 0 ? (
              <IncentivesCard
                value={variableBorrowRate}
                incentives={vIncentives}
                symbol={currencySymbol}
              />
            ) : (
              <NoData color="dark" />
            )}
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {stableBorrowRateEnabled && borrowingEnabled && stableBorrowRate >= 0 ? (
              <IncentivesCard
                value={stableBorrowRate}
                incentives={sIncentives}
                symbol={currencySymbol}
              />
            ) : (
              <NoData color="dark" />
            )}
          </TableColumn>
        </>
      )}

      {isFreezed && (
        <>
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
