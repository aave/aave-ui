import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import TableCol from '../../../dashboard/components/DashboardTable/TableCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { DepositTableItem } from './types';

export default function DepositItem({
  reserve: { symbol, liquidityRate, id, underlyingAsset },
  uiColor,
  usageAsCollateralEnabledOnUser,
  usageAsCollateralEnabledOnThePool,
  underlyingBalance,
  underlyingBalanceUSD,
  onToggleSwitch,
  isActive,
  isFrozen,
  avg30DaysLiquidityRate,
  index,
  aincentivesAPR,
  ...rest
}: DepositTableItem) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const swiperWidth = xl && !lg ? 30 : md ? 30 : 40;
  const swiperHeight = xl && !lg ? 16 : md ? 16 : 20;

  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  return (
    <TableItem tokenSymbol={symbol} color={uiColor} {...rest}>
      <TableValueCol
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        tooltipId={`deposit-${symbol}__${index}`}
      />
      <TableAprCol
        value={Number(liquidityRate)}
        thirtyDaysAverage={avg30DaysLiquidityRate}
        liquidityMiningValue={aincentivesAPR}
        symbol={symbol}
        type="deposit"
      />

      <TableCol maxWidth={125}>
        <CustomSwitch
          value={usageAsCollateralEnabledOnUser && usageAsCollateralEnabledOnThePool}
          offLabel={intl.formatMessage(messages.offLabel)}
          onLabel={intl.formatMessage(messages.onLabel)}
          onColor={currentTheme.green.hex}
          offColor={currentTheme.red.hex}
          onSwitch={onToggleSwitch}
          disabled={!usageAsCollateralEnabledOnThePool}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
        />
      </TableCol>

      <TableButtonsWrapper>
        {!isSwapButton && (
          <TableButtonCol
            disabled={!isActive || isFrozen}
            title={intl.formatMessage(defaultMessages.deposit)}
            linkTo={`/deposit/${underlyingAsset}-${id}`}
          />
        )}

        <TableButtonCol
          disabled={!isActive}
          title={intl.formatMessage(defaultMessages.withdraw)}
          linkTo={`/withdraw/${underlyingAsset}-${id}`}
          withoutBorder={!isSwapButton}
        />

        {isSwapButton && (
          <TableButtonCol
            disabled={!isActive || isFrozen}
            title={intl.formatMessage(defaultMessages.swap)}
            linkTo={`/asset-swap?asset=${underlyingAsset}`}
            withoutBorder={true}
          />
        )}
      </TableButtonsWrapper>
    </TableItem>
  );
}
