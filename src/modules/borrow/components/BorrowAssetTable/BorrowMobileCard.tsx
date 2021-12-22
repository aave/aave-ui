import React from 'react';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import { isAssetStable } from '../../../../helpers/config/assets-config';

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
      <Row title={<AvailableCapsHelpModal capType={CapType.borrowCap} />} withMargin={true}>
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
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.variableAPY)} withMargin={true}>
          <IncentivesCard symbol={symbol} value={variableBorrowRate} incentives={vIncentives} />
        </Row>
      )}

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.stableAPY)} withMargin={true}>
          {stableBorrowRateEnabled ? (
            <IncentivesCard symbol={symbol} value={stableBorrowRate} incentives={sIncentives} />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}

      <Row title={intl.formatMessage(messages.borrow)} className="Row__center" withMargin={true}>
        <Link to={`/borrow/${underlyingAsset}-${id}`} className="ButtonLink" disabled={isFreezed}>
          <DefaultButton
            title={intl.formatMessage(messages.borrow)}
            color="dark"
            disabled={isFreezed}
          />
        </Link>
      </Row>

      <Row title={intl.formatMessage(messages.showDetails)} className="Row__center">
        <Link to={`/reserve-overview/${underlyingAsset}-${id}`} className="ButtonLink">
          <DefaultButton
            title={intl.formatMessage(messages.details)}
            color="dark"
            transparent={true}
          />
        </Link>
      </Row>
    </MobileCardWrapper>
  );
}
