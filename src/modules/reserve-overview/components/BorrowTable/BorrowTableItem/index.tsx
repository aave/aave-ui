import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { valueToBigNumber, InterestRate } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { BorrowRateMode } from '../../../../../libs/pool-data-provider/graphql';
import { loanActionLinkComposer } from '../../../../../helpers/loan-action-link-composer';
import { toggleBorrowRateMode } from '../../../../../helpers/toggle-borrow-rate-mode';
import Value from '../../../../../components/basic/Value';
import Link from '../../../../../components/basic/Link';
import DefaultButton from '../../../../../components/basic/DefaultButton';
import CustomSwitch from '../../../../../components/basic/CustomSwitch';
import { TokenIcon } from '../../../../../helpers/config/assets-config';

import defaultMessages from '../../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';
import { ComputedUserReserve } from '@aave/math-utils';
import { ComputedReserveData } from '../../../../../libs/pool-data-provider';

interface BorrowTableItemProps {
  symbol: string;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  type: 'stable' | 'variable';
  availableBorrows: number;
}

export default function BorrowTableItem({
  symbol,
  poolReserve,
  userReserve,
  type,
  availableBorrows,
}: BorrowTableItemProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme, xl, isCurrentThemeDark } = useThemeContext();

  const borrows =
    type === 'stable'
      ? valueToBigNumber(userReserve?.stableBorrows || '0').toNumber()
      : valueToBigNumber(userReserve?.variableBorrows || '0').toNumber();
  const borrowsUSD =
    type === 'stable'
      ? valueToBigNumber(userReserve?.stableBorrowsUSD || '0').toNumber()
      : valueToBigNumber(userReserve?.variableBorrowsUSD || '0').toNumber();

  const repayLink = loanActionLinkComposer(
    'repay',
    poolReserve.id,
    type === 'stable' ? InterestRate.Stable : InterestRate.Variable,
    poolReserve.underlyingAsset
  );
  const borrowLink = loanActionLinkComposer(
    'borrow',
    poolReserve.id,
    type === 'stable' ? InterestRate.Stable : InterestRate.Variable,
    poolReserve.underlyingAsset
  );

  const borrowRateMode = type === 'stable' ? InterestRate.Stable : InterestRate.Variable;

  const swiperWidth = xl ? 30 : 40;
  const swiperHeight = xl ? 16 : 20;

  return (
    <div className="BorrowTableItem">
      <div className="BorrowTableItem__column">
        <TokenIcon tokenSymbol={symbol} height={25} width={25} />
      </div>

      <div className="BorrowTableItem__column">
        <Value
          className="BorrowTableItem__value"
          value={borrows}
          maximumValueDecimals={3}
          subValue={borrowsUSD}
          maximumSubValueDecimals={2}
          subSymbol="USD"
        />
      </div>

      <div className="BorrowTableItem__column">
        <CustomSwitch
          onSwitch={() =>
            toggleBorrowRateMode(
              history,
              poolReserve.id,
              type === 'stable' ? InterestRate.Stable : InterestRate.Variable,
              poolReserve.underlyingAsset
            )
          }
          // @ts-ignore
          value={borrowRateMode === BorrowRateMode.Variable}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
          onLabel={intl.formatMessage(messages.variable)}
          offLabel={intl.formatMessage(messages.stable)}
          onColor={isCurrentThemeDark ? currentTheme.lightBlue.hex : currentTheme.darkBlue.hex}
          offColor={isCurrentThemeDark ? currentTheme.lightBlue.hex : currentTheme.darkBlue.hex}
          disabled={!poolReserve.stableBorrowRateEnabled || poolReserve.isFrozen}
        />
      </div>

      <div className="BorrowTableItem__column">
        <Link
          to={borrowLink}
          className="ButtonLink"
          disabled={!availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen}
        >
          <DefaultButton
            className="BorrowTableItem__button"
            title={intl.formatMessage(defaultMessages.borrow)}
            color="dark"
            disabled={!availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen}
          />
        </Link>

        <Link to={repayLink} className="ButtonLink" disabled={!borrows}>
          <span className="BorrowTableItem__button BorrowTableItem__buttonNoBorder">
            {intl.formatMessage(defaultMessages.repay)}
          </span>
        </Link>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .BorrowTableItem {
          background: ${currentTheme.whiteElement.hex};

          &__buttonNoBorder {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
