import React from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import { BorrowRateMode } from '../../../../../libs/pool-data-provider/graphql';
import Row from '../../../../../components/basic/Row';
import ValuePercent from '../../../../../components/basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';

interface BorrowContentProps {
  borrowRate: number;
  borrowRateMode: string;
}

export default function BorrowContent({ borrowRate, borrowRateMode }: BorrowContentProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const borrowRateModeText: MessageDescriptor =
    borrowRateMode === BorrowRateMode.Variable ? messages.variable : messages.stable;

  return (
    <>
      <Row title={intl.formatMessage(messages.interest)} withMargin={true} onWhiteBackground={true}>
        <ValuePercent
          value={borrowRate}
          color="dark"
          minimumDecimals={2}
          maximumDecimals={2}
          onWhiteBackground={true}
        />
      </Row>
      <Row
        title={intl.formatMessage(messages.interestRateType)}
        withMargin={true}
        onWhiteBackground={true}
      >
        <p
          className={classNames('BorrowContent__rateMode', {
            BorrowContent__rateModeVariable: borrowRateMode === BorrowRateMode.Variable,
          })}
        >
          {intl.formatMessage(borrowRateModeText)}
        </p>
      </Row>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .BorrowContent__rateMode {
          color: ${currentTheme.darkBlue.hex};
        }
        .BorrowContent__rateModeVariable {
          color: ${currentTheme.darkBlue.hex};
        }
      `}</style>
    </>
  );
}
