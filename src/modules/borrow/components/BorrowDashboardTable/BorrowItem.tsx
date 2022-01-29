import React from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableCol from '../../../dashboard/components/DashboardTable/TableCol';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import { BorrowRateMode } from '../../../../libs/pool-data-provider/graphql';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { BorrowTableItem } from './types';
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

export default function BorrowItem({
  reserve: { symbol },
  uiColor,
  currentBorrows,
  currentBorrowsUSD,
  borrowRate,
  avg30DaysVariableRate,
  borrowRateMode,
  onSwitchToggle,
  isActive,
  isFrozen,
  borrowingEnabled,
  stableBorrowRateEnabled,
  repayLink,
  borrowLink,
  index,
  vincentivesAPR,
  sincentivesAPR,
  ...rest
}: BorrowTableItem) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md, isCurrentThemeDark } = useThemeContext();

  const swiperWidth = xl && !lg ? 30 : md ? 30 : 40;
  const swiperHeight = xl && !lg ? 16 : md ? 16 : 20;

  const borrow = Number(currentBorrows);
  const borrowValue = borrow < 0.001 ? '< $ 0.001' : borrow.toFixed(5);

  return (
    <TableItem tokenSymbol={symbol} color={uiColor} {...rest}>
      <div style={{ width: 120 }} className="flex-column">
        <ItemValueText>{borrowValue}</ItemValueText>
        <ItemValueSubText>$ {Number(currentBorrowsUSD).toFixed(5)}</ItemValueSubText>
      </div>
      {/* <TableValueCol
        value={Number(currentBorrows)}
        subValue={Number(currentBorrowsUSD)}
        tooltipId={`borrow-${symbol}__${index}`}
      /> */}
      <div style={{ width: 100 }}>
        <ItemValueText>{Number(borrowRate).toFixed(2)}%</ItemValueText>
      </div>
      {/* <TableAprCol
        value={Number(borrowRate)}
        thirtyDaysAverage={borrowRateMode === BorrowRateMode.Variable ? avg30DaysVariableRate : ''}
        liquidityMiningValue={
          borrowRateMode === BorrowRateMode.Variable ? vincentivesAPR : sincentivesAPR
        }
        symbol={symbol}
        type={borrowRateMode === BorrowRateMode.Variable ? 'borrow-variable' : 'borrow-stable'}
      /> */}

      <div style={{ width: 85 }}>
        <CustomSwitch
          value={borrowRateMode === BorrowRateMode.Variable}
          // offLabel={intl.formatMessage(messages.offLabel)}
          // onLabel={intl.formatMessage(messages.onLabel)}
          onColor={'#7159ff'}
          offColor={'#7e7878'}
          onSwitch={onSwitchToggle}
          disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
        />
      </div>

      {/* <TableCol maxWidth={125}>
        <CustomSwitch
          value={borrowRateMode === BorrowRateMode.Variable}
          // offLabel={intl.formatMessage(messages.offLabel)}
          // onLabel={intl.formatMessage(messages.onLabel)}
          onColor={'#7159ff'}
          offColor={'#7e7878'}
          onSwitch={onSwitchToggle}
          disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
        />
      </TableCol> */}

      <TableButtonsWrapper>
        <TableButtonCol
          dashboard
          disabled={!isActive || !borrowingEnabled || isFrozen}
          title={intl.formatMessage(defaultMessages.borrow)}
          linkTo={borrowLink}
        />
        <TableButtonCol
          disabled={!isActive}
          title={intl.formatMessage(defaultMessages.repay)}
          linkTo={repayLink}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
