import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../../../libs/protocol-data-provider';
import BalanceSectionWrapper from '../BalanceSectionWrapper';
import Row from '../../../../../../components/basic/Row';
import EModeButton from '../../../../../../components/eMode/EModeButton';
import EModeHelpModal from '../../../../../../components/eMode/EModeHelpModal';

import messages from './messages';
import staticStyles from './style';

interface BorrowBalanceSectionProps {
  isCollapse: boolean;
  balance: number | string;
  userId?: string;
}

export default function BorrowBalanceSection({
  userId,
  isCollapse,
  balance,
}: BorrowBalanceSectionProps) {
  const intl = useIntl();
  const { lg, md, sm } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  return (
    <BalanceSectionWrapper
      isCollapse={isCollapse}
      title={intl.formatMessage(messages.borrowBalance)}
      value={balance}
      children={
        userId && currentMarketData.v3 ? (
          !isCollapse || (md && !sm && !isCollapse) ? (
            <Row
              className="BorrowBalanceSection__row"
              title={
                <EModeHelpModal
                  className="BorrowBalanceSection__row--title"
                  text={intl.formatMessage(messages.eMode)}
                  color="white"
                  lightWeight={true}
                  iconSize={12}
                />
              }
              isColumn={lg && !md}
            >
              <EModeButton size="small" />

              <style jsx={true} global={true}>
                {staticStyles}
              </style>
            </Row>
          ) : undefined
        ) : undefined
      }
    />
  );
}
