import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../../../../../components/basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';

interface BorrowPowerUsedLineProps {
  collateralUsagePercent: string;
}

export default function BorrowPowerUsedLine({ collateralUsagePercent }: BorrowPowerUsedLineProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div className="BorrowPowerUsedLine">
      <div className="BorrowPowerUsedLine__lineWrapper">
        {collateralUsagePercent !== '0' && (
          <div
            className="BorrowPowerUsedLine__line"
            style={{ width: `${+collateralUsagePercent * 100}%` }}
          />
        )}
      </div>

      <div className="BorrowPowerUsedLine__info">
        <p className="BorrowPowerUsedLine__title">{intl.formatMessage(messages.borrowPowerUsed)}</p>
        <ValuePercent value={collateralUsagePercent} color="white" />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .BorrowPowerUsedLine {
          &__lineWrapper {
            background: ${isCurrentThemeDark ? currentTheme.mainBg.hex : currentTheme.headerBg.hex};
          }
        }
      `}</style>
    </div>
  );
}
