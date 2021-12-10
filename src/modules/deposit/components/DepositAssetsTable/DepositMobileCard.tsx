import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import CapsHint, { CapType } from '../../../../components/caps/CapsHint';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import messages from './messages';

import { DepositTableItem } from './types';

export default function DepositMobileCard({
  id,
  symbol,
  underlyingAsset,
  availableToDeposit,
  availableToDepositUSD,
  liquidityRate,
  userId,
  borrowingEnabled,
  isFreezed,
  aincentivesAPR,
  isIsolated,
  totalLiquidity,
  supplyCap,
}: DepositTableItem) {
  const intl = useIntl();
  const history = useHistory();

  const url = `/deposit/${underlyingAsset}-${id}`;

  return (
    <MobileCardWrapper
      onClick={() => history.push(url)}
      symbol={symbol}
      withGoToTop={true}
      disabled={isFreezed}
      isIsolated={isIsolated}
    >
      <Row title={intl.formatMessage(messages.availableToDeposit)} withMargin={true}>
        {!userId || Number(availableToDeposit) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <div className="MobileCardWrapper__valueInner">
            <Value
              value={availableToDeposit}
              subValue={availableToDepositUSD}
              maximumSubValueDecimals={2}
              subSymbol="USD"
              maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
              minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            />
            <CapsHint
              capType={CapType.supplyCap}
              capAmount={supplyCap}
              totalAmount={totalLiquidity}
              tooltipId={`supplyCap__${id}`}
              withoutText={true}
            />
          </div>
        )}
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.APY)} withMargin={true}>
          {borrowingEnabled ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={liquidityRate}
              liquidityMiningValue={aincentivesAPR}
              type="deposit"
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}
    </MobileCardWrapper>
  );
}
