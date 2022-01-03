import React from 'react';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { BorrowTableItem } from './types';

export default function BorrowMobileCard({
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
  const intl = useIntl();

  return (
    <MobileCardWrapper symbol={symbol} disabled={isFreezed} isIsolated={false}>
      <Row title={intl.formatMessage(messages.maxAmount)} withMargin={true}>
        {!userId || Number(availableBorrows) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(availableBorrows)}
            symbol={symbol}
            subValue={availableBorrowsInUSD}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 7}
            maximumSubValueDecimals={2}
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
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.APYVariable)} withMargin={true}>
          <IncentivesCard symbol={symbol} value={variableBorrowRate} incentives={vIncentives} />
        </Row>
      )}

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.APYStable)} withMargin={true}>
          {stableBorrowRateEnabled ? (
            <IncentivesCard symbol={symbol} value={stableBorrowRate} incentives={sIncentives} />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}

      <TableButtonsWrapper>
        <Link
          to={`/borrow/${underlyingAsset}`}
          className="ButtonLink"
          disabled={isFreezed || Number(availableBorrows) <= 0}
        >
          <DefaultButton
            title={intl.formatMessage(defaultMessages.borrow)}
            color="dark"
            disabled={isFreezed || Number(availableBorrows) <= 0}
          />
        </Link>
        <Link to={`/reserve-overview/${underlyingAsset}`} className="ButtonLink">
          <DefaultButton
            title={intl.formatMessage(defaultMessages.details)}
            color="dark"
            transparent={true}
          />
        </Link>
      </TableButtonsWrapper>
    </MobileCardWrapper>
  );
}
