import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { CustomTooltip } from '@aave/aave-ui-kit';


import messages from './messages';

import TableItemWrapper from '../../../../components/BasicTable/TableItemWrapper';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import FreezedWarning from '../../../../components/FreezedWarning';
import NoData from '../../../../components/basic/NoData';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import IsolatedBadge from '../../../../components/isolationMode/IsolatedBadge';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';

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
  aincentivesAPR?: string;
  vincentivesAPR?: string;
  sincentivesAPR?: string;
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
  aincentivesAPR,
  vincentivesAPR,
  sincentivesAPR,
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
  const intl = useIntl();
  const asset = getAssetInfo(currencySymbol);

  const handleClick = () => {
    history.push(`/reserve-overview/${underlyingAsset}-${id}`);
  };

  const handleCapsHint = (capType:string, capAmount:string ) => {
    const cap = Number(capAmount);

    if(cap > 0 && capType==="supplyCap") {
      const percentageOfCap = totalLiquidity / cap;
      if(percentageOfCap >= 0.99) {
        return(<div className="MarketTableItem__tooltip" data-tip={true} data-for={"dd"}>
              <div className="MarketTableItem__message">{intl.formatMessage(messages.supplyCapTitle)}</div>
                  <Value
                    value={cap - totalLiquidity}
                    compact={true}
                    maximumValueDecimals={2}
                    withoutSymbol={true}
                    tooltipId={`market-size-${asset.symbol}`}
                    symbol={isPriceInUSD ? 'USD' : ''}
                    tokenIcon={isPriceInUSD}
                    className="MarketTableItem__hint"
                  />
              <CustomTooltip tooltipId={"dd"} text={intl.formatMessage(messages.supplyCapNearlyReached)} />
        </div>
        )
        ;
      }
    }
    if(cap > 0 && capType==="borrowCap") {
      const totalBorrowed = totalBorrowsInUSD;
      const percentageOfCap = totalBorrowed / cap;
      if(percentageOfCap >= 0.99) {
        return(
        <div className="MarketTableItem__tooltip" data-tip={true} data-for={"dd"}>
          <div className="MarketTableItem__message">{intl.formatMessage(messages.borrowCapTitle)}</div>
          <Value
            value={cap - totalBorrowed}
            compact={true}
            maximumValueDecimals={2}
            withoutSymbol={true}
            tooltipId={`market-size-${asset.symbol}`}
            symbol={isPriceInUSD ? 'USD' : ''}
            tokenIcon={isPriceInUSD}
            className="MarketTableItem__hint"
          />
          <CustomTooltip tooltipId={`MarketTableItem__tooltip${id}`} text={intl.formatMessage(messages.borrowCapNearlyReached)} />
        </div>
        )

      }
    }
    return null;
  }


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
        {handleCapsHint("supplyCap", supplyCapUSD)}
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
        {handleCapsHint("borrowCap", borrowCapUSD)}
      </TableColumn>

      {!isFreezed && (
        <>
          <TableColumn className="MarketTableItem__column">
            <LiquidityMiningCard
              value={depositAPY}
              liquidityMiningValue={aincentivesAPR}
              symbol={currencySymbol}
              type="deposit"
            />
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {borrowingEnabled && +variableBorrowRate >= 0 ? (
              <LiquidityMiningCard
                value={variableBorrowRate}
                liquidityMiningValue={vincentivesAPR}
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
                liquidityMiningValue={sincentivesAPR}
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
