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
import styled from 'styled-components';

const ItemValueText = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: right;
  color: #131313;
`;
const ItemValueSubText = styled.p`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000;
`;

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
  const balance = Number(underlyingBalance);
  const balanceValue = balance < 0.001 ? '< $ 0.001' : balance.toFixed(5);
  //120/100/85/75
  return (
    <TableItem tokenSymbol={symbol} color={uiColor} {...rest}>
      <div style={{ width: 120 }} className="flex-column">
        <ItemValueText>{balanceValue}</ItemValueText>
        <ItemValueSubText>$ {Number(underlyingBalanceUSD).toFixed(5)}</ItemValueSubText>
      </div>
      {/* <TableValueCol
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        tooltipId={`deposit-${symbol}__${index}`}
      /> */}
      <div style={{ width: 100 }}>
        <ItemValueText>{Number(liquidityRate).toFixed(2)}%</ItemValueText>
      </div>
      {/* <TableAprCol
        value={Number(liquidityRate)}
        thirtyDaysAverage={avg30DaysLiquidityRate}
        liquidityMiningValue={aincentivesAPR}
        symbol={symbol}
        type="deposit"
      /> */}

      <div style={{ width: 85 }}>
        <CustomSwitch
          value={usageAsCollateralEnabledOnUser && usageAsCollateralEnabledOnThePool}
          // offLabel={intl.formatMessage(messages.offLabel)}
          // onLabel={intl.formatMessage(messages.onLabel)}
          onColor={'#7159ff'}
          offColor={'#7e7878'}
          onSwitch={onToggleSwitch}
          disabled={!usageAsCollateralEnabledOnThePool}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
        />
      </div>

      {/* <TableCol maxWidth={125}>
        <CustomSwitch
          value={usageAsCollateralEnabledOnUser && usageAsCollateralEnabledOnThePool}
          // offLabel={intl.formatMessage(messages.offLabel)}
          // onLabel={intl.formatMessage(messages.onLabel)}
          onColor={'#7159ff'}
          offColor={'#7e7878'}
          onSwitch={onToggleSwitch}
          disabled={!usageAsCollateralEnabledOnThePool}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
        />
      </TableCol> */}

      <TableButtonsWrapper>
        {!isSwapButton && (
          <TableButtonCol
            dashboard
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
