import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import { isAssetStable } from '../../../../helpers/markets/assets';

import messages from './messages';

import { BorrowTableItem } from './types';

export default function BorrowMobileCard({
  id,
  symbol,
  availableBorrows,
  availableBorrowsInUSD,
  stableBorrowRate,
  variableBorrowRate,
  avg30DaysVariableRate,
  stableBorrowRateEnabled,
  userId,
  isFreezed,
  vIncentivesAPY,
  sIncentivesAPY,
}: BorrowTableItem) {
  const intl = useIntl();
  const history = useHistory();

  const url = `/borrow/${symbol}-${id}`;

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
            value={variableBorrowRate}
            thirtyDaysValue={avg30DaysVariableRate}
            liquidityMiningValue={vIncentivesAPY}
          />
        </Row>
      )}

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.stableAPY)} withMargin={true}>
          {stableBorrowRateEnabled ? (
            <LiquidityMiningCard value={stableBorrowRate} liquidityMiningValue={sIncentivesAPY} />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}
    </MobileCardWrapper>
  );
}
