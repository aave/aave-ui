import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import BorrowInterestHelpModal from '../../../../components/HelpModal/BorrowInterestHelpModal';

import messages from './messages';
import staticStyles from './style';

interface BorrowTableProps {
  children: ReactNode;
}

export default function BorrowTable({ children }: BorrowTableProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="BorrowTable">
      <div className="BorrowTable__header">
        <div className="BorrowTable__header-column">
          <p>{intl.formatMessage(messages.yourBorrows)}</p>
        </div>
        <div className="BorrowTable__header-column">
          <p>{intl.formatMessage(messages.borrowed)}</p>
        </div>
        <div className="BorrowTable__header-column">
          <BorrowInterestHelpModal text={intl.formatMessage(messages.APYType)} iconSize={12} />
        </div>
        <div className="BorrowTable__header-column" />
      </div>

      <div className="BorrowTable__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .BorrowTable {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
