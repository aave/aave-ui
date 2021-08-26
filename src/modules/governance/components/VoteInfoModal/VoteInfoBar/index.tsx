import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import Row from '../../../../../components/basic/Row';
import PercentLine from '../../PercentLine';

import messages from './messages';
import staticStyles from './style';

interface VoteInfoBarProps {
  type: 'yes' | 'no';
  totalValue: number;
  currentValue: number;
}

export default function VoteInfoBar({ type, totalValue, currentValue }: VoteInfoBarProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('VoteInfoBar', { VoteInfoBarNo: type === 'no' })}>
      <Row
        className="VoteInfoBar__row"
        title={intl.formatMessage(type === 'yes' ? messages.yes : messages.no)}
        onWhiteBackground={true}
      >
        <p className="VoteInfoBar__amount">
          {intl.formatNumber(currentValue, { maximumFractionDigits: 2 })}{' '}
          {intl.formatMessage(messages.votes)}
        </p>
      </Row>

      <PercentLine
        color={type === 'yes' ? 'green' : 'red'}
        totalValue={totalValue}
        currentValue={currentValue}
        withBorder={true}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .VoteInfoBar {
          &__amount {
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
