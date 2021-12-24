import React from 'react';
import { useIntl } from 'react-intl';

import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableCol from '../../../dashboard/components/DashboardTable/TableCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import Value from '../../../../components/basic/Value';
import NoData from '../../../../components/basic/NoData';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import { BorrowTableItem } from './types';

import defaultMessages from '../../../../defaultMessages';

export default function BorrowItem({
  id,
  symbol,
  availableBorrows,
  availableBorrowsInUSD,
  stableBorrowRate,
  variableBorrowRate,
  userId,
  vIncentives,
  underlyingAsset,
  isFreezed,
  sIncentives,
  borrowCap,
  totalBorrows,
}: BorrowTableItem) {
  const intl = useIntl();

  return (
    <TableItem tokenSymbol={symbol} isIsolated={false}>
      <TableCol>
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
            className="TableValueCol__value"
            tooltipId={`availableBorrows__${id}`}
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
      </TableCol>

      <TableAprCol value={Number(variableBorrowRate)} incentives={vIncentives} symbol={symbol} />
      <TableAprCol value={Number(stableBorrowRate)} incentives={sIncentives} symbol={symbol} />

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={isFreezed}
          title={intl.formatMessage(defaultMessages.borrow)}
          linkTo={`/borrow/${underlyingAsset}-${id}`}
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
