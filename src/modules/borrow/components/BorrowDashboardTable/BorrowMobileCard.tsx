import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { BorrowRateMode } from '../../../../libs/pool-data-provider/graphql';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import NoData from '../../../../components/basic/NoData';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import BorrowInterestHelpModal from '../../../../components/HelpModal/BorrowInterestHelpModal';
import AMPLWarning from '../../../../components/AMPLWarning';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { BorrowTableItem } from './types';

export default function BorrowMobileCard({
  reserve: { symbol },
  currentBorrows,
  currentBorrowsUSD,
  borrowRate,
  borrowRateMode,
  onSwitchToggle,
  isActive,
  isFrozen,
  borrowingEnabled,
  stableBorrowRateEnabled,
  repayLink,
  borrowLink,
  vIncentives,
  sIncentives,
}: BorrowTableItem) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const swiperWidth = 50;
  const swiperHeight = 24;

  return (
    <>
      <MobileCardWrapper symbol={symbol}>
        <Row title={intl.formatMessage(messages.balance)} withMargin={true}>
          <Value
            value={Number(currentBorrows)}
            subValue={Number(currentBorrowsUSD)}
            subSymbol="USD"
          />
        </Row>

        <Row title={intl.formatMessage(messages.apyRowTitle)} withMargin={true}>
          {borrowingEnabled ? (
            <IncentivesCard
              symbol={symbol}
              value={Number(borrowRate)}
              incentives={borrowRateMode === BorrowRateMode.Variable ? vIncentives : sIncentives}
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>

        <Row
          title={
            <BorrowInterestHelpModal text={intl.formatMessage(messages.APYType)} iconSize={12} />
          }
          withMargin={true}
          className="Row__center"
        >
          <CustomSwitch
            value={borrowRateMode === BorrowRateMode.Variable}
            offLabel={intl.formatMessage(messages.offLabel)}
            onLabel={intl.formatMessage(messages.onLabel)}
            onColor={isCurrentThemeDark ? currentTheme.headerBg.hex : currentTheme.darkBlue.hex}
            offColor={isCurrentThemeDark ? currentTheme.headerBg.hex : currentTheme.darkBlue.hex}
            onSwitch={onSwitchToggle}
            disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
            swiperHeight={swiperHeight}
            swiperWidth={swiperWidth}
          />
        </Row>

        <Row
          title={intl.formatMessage(messages.borrowMore)}
          className="Row__center"
          withMargin={true}
        >
          <Link
            to={borrowLink}
            className="ButtonLink"
            disabled={!isActive || !borrowingEnabled || isFrozen}
          >
            <DefaultButton
              title={intl.formatMessage(defaultMessages.borrow)}
              color="dark"
              disabled={!isActive || !borrowingEnabled || isFrozen}
            />
          </Link>
        </Row>

        <Row title={intl.formatMessage(messages.repayYourBorrow)} className="Row__center">
          <Link to={repayLink} className="ButtonLink" disabled={!isActive}>
            <DefaultButton
              title={intl.formatMessage(defaultMessages.repay)}
              color="dark"
              transparent={true}
              disabled={!isActive}
            />
          </Link>
        </Row>
      </MobileCardWrapper>

      {symbol === 'AMPL' && <AMPLWarning />}
    </>
  );
}
