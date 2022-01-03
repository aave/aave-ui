import React from 'react';
import { useIntl } from 'react-intl';

import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';

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
    <TableItem tokenSymbol={symbol}>
      <TableValueCol
        userId={userId}
        symbol={symbol}
        value={Number(availableBorrows)}
        tooltipValue={Number(availableBorrowsInUSD)}
        subValue={Number(availableBorrows)}
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

      <TableAprCol value={Number(variableBorrowRate)} incentives={vIncentives} symbol={symbol} />
      <TableAprCol value={Number(stableBorrowRate)} incentives={sIncentives} symbol={symbol} />

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={isFreezed || Number(availableBorrows) <= 0}
          title={intl.formatMessage(defaultMessages.borrow)}
          linkTo={`/borrow/${id}`}
        />
        <TableButtonCol
          title={intl.formatMessage(defaultMessages.details)}
          linkTo={`/reserve-overview/${id}`}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
