import React from 'react';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
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
            subValue={availableBorrowsInUSD}
            subSymbol="USD"
            maximumSubValueDecimals={2}
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 7}
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

      <Row
        title={intl.formatMessage(defaultMessages.borrow)}
        className="Row__center"
        withMargin={true}
      >
        <Link to={`/borrow/${underlyingAsset}-${id}`} className="ButtonLink" disabled={isFreezed}>
          <DefaultButton
            title={intl.formatMessage(defaultMessages.borrow)}
            color="dark"
            disabled={isFreezed}
          />
        </Link>
      </Row>

      <Row title={intl.formatMessage(messages.showDetails)} className="Row__center">
        <Link to={`/reserve-overview/${underlyingAsset}-${id}`} className="ButtonLink">
          <DefaultButton
            title={intl.formatMessage(defaultMessages.details)}
            color="dark"
            transparent={true}
          />
        </Link>
      </Row>
    </MobileCardWrapper>
  );
}
