import React from 'react';
import { useIntl } from 'react-intl';

import BalanceSectionWrapper from '../BalanceSectionWrapper';

import messages from './messages';

interface BorrowBalanceSectionProps {
  isCollapse: boolean;
  balance: number | string;
}

export default function BorrowBalanceSection({ isCollapse, balance }: BorrowBalanceSectionProps) {
  const intl = useIntl();

  return (
    <BalanceSectionWrapper
      isCollapse={isCollapse}
      title={intl.formatMessage(messages.borrowBalance)}
      value={balance}
      children={undefined}
    />
  );
}
