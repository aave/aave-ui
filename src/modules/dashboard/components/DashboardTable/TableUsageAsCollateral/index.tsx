import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import IsolationModeBadge from '../../../../../components/isolationMode/IsolationModeBadge';

import messages from './messages';
import staticStyles from './style';

interface TableUsageAsCollateralProps {
  isUserInIsolationMode?: boolean;
  isIsolated: boolean;
  usageAsCollateralEnabled: boolean;
}

export default function TableUsageAsCollateral({
  isUserInIsolationMode,
  isIsolated,
  usageAsCollateralEnabled,
}: TableUsageAsCollateralProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="TableUsageAsCollateralWrapper">
      {!isUserInIsolationMode ? (
        <>
          {!isIsolated ? (
            <p
              className={classNames('TableUsageAsCollateral', {
                TableUsageAsCollateral__disabled: !usageAsCollateralEnabled,
              })}
            >
              {intl.formatMessage(usageAsCollateralEnabled ? messages.yes : messages.no)}
            </p>
          ) : (
            <IsolationModeBadge isIsolated={isIsolated} />
          )}
        </>
      ) : (
        <IsolationModeBadge isIsolated={isIsolated} />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableUsageAsCollateral {
          color: ${currentTheme.green.hex};
          &__disabled {
            color: ${currentTheme.red.hex};
          }
        }
      `}</style>
    </div>
  );
}
