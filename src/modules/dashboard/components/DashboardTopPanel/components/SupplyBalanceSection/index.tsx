import React from 'react';
import { useIntl } from 'react-intl';

import BalanceSectionWrapper from '../BalanceSectionWrapper';

import messages from './messages';

interface SupplyBalanceSectionProps {
  isCollapse: boolean;
  balance: number | string;
}

export default function SupplyBalanceSection({ isCollapse, balance }: SupplyBalanceSectionProps) {
  const intl = useIntl();

  return (
    <BalanceSectionWrapper
      isCollapse={isCollapse}
      title={intl.formatMessage(messages.supplyBalance)}
      value={balance}
      children={<h1>Used as collateral</h1>}
    />
  );
}
