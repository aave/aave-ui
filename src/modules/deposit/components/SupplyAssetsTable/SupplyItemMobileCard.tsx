import React from 'react';

import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import TableCanBeCollateral from '../../../dashboard/components/DashboardTable/TableCanBeCollateral';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { SupplyTableItem } from './types';

export default function SupplyItemMobileCard({
  id,
  symbol,
  underlyingAsset,
  walletBalance,
  walletBalanceUSD,
  liquidityRate,
  userId,
  borrowingEnabled,
  isFreezed,
  aIncentives,
  isIsolated,
  totalLiquidity,
  supplyCap,
  isActive,
  usageAsCollateralEnabledOnUser,
}: SupplyTableItem) {
  const intl = useIntl();

  return (
    <MobileCardWrapper symbol={symbol} disabled={isFreezed} isIsolated={isIsolated}>
      <Row title={intl.formatMessage(messages.walletBalance)} withMargin={true}>
        {!userId || Number(walletBalance) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={walletBalance}
            symbol={symbol}
            subValue={walletBalanceUSD}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 7}
            maximumSubValueDecimals={2}
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
            <IncentivesCard symbol={symbol} value={liquidityRate} incentives={aIncentives} />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}

      <Row title={intl.formatMessage(messages.collateral)} withMargin={true}>
        <TableCanBeCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabled={usageAsCollateralEnabledOnUser}
        />
      </Row>

      <TableButtonsWrapper>
        <Link
          to={`/deposit/${underlyingAsset}`}
          className="ButtonLink"
          disabled={!isActive || isFreezed}
        >
          <DefaultButton
            title={intl.formatMessage(defaultMessages.deposit)}
            color="dark"
            disabled={!isActive || isFreezed}
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
