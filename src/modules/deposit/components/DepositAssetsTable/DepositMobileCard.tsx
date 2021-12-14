import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
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
  aIncentives,
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
      <Row title={<AvailableCapsHelpModal capType={CapType.supplyCap} />} withMargin={true}>
        {!userId || Number(availableToDeposit) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={availableToDeposit}
            subValue={availableToDepositUSD}
            maximumSubValueDecimals={2}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            nextToValue={
              <CapsHint
                capType={CapType.supplyCap}
                capAmount={supplyCap}
                totalAmount={totalLiquidity}
                tooltipId={`supplyCap__${id}`}
                withoutText={true}
              />
            }
          />
        )}
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.APY)} withMargin={true}>
          {borrowingEnabled ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={liquidityRate}
              liquidityMiningValues={aIncentives}
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
