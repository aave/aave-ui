import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
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
  avg30DaysVariableRate,
  stableBorrowRateEnabled,
  userId,
  isFreezed,
  vincentivesAPR,
  sincentivesAPR,
}: BorrowTableItem) {
  const intl = useIntl();
  const history = useHistory();

  const url = `/borrow/${underlyingAsset}-${id}`;

  return (
    <MobileCardWrapper
      onClick={() => history.push(url)}
      symbol={symbol}
      withGoToTop={true}
      disabled={isFreezed}
    >
      <Row title={intl.formatMessage(messages.availableToBorrow)} withMargin={true}>
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
          />
        )}
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.variableAPY)} withMargin={true}>
          <LiquidityMiningCard
            symbol={symbol}
            value={variableBorrowRate}
            thirtyDaysValue={avg30DaysVariableRate}
            liquidityMiningValue={vincentivesAPR}
            type="borrow-variable"
          />
        </Row>
      )}

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.stableAPY)} withMargin={true}>
          {stableBorrowRateEnabled ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={stableBorrowRate}
              liquidityMiningValue={sincentivesAPR}
              type="borrow-stable"
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}
    </MobileCardWrapper>
  );
}
