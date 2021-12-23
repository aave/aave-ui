import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import TableCol from '../TableCol';
import AMPLWarning from '../../../../../components/AMPLWarning';
import IsolatedBadge from '../../../../../components/isolationMode/IsolatedBadge';
import { getAssetInfo, TokenIcon } from '../../../../../helpers/config/assets-config';

import staticStyles from './style';

interface TableAvailablePositionProps {
  tokenSymbol: string;
  children: ReactNode;
  isIsolated?: boolean;
}

export default function TableAvailablePosition({
  tokenSymbol,
  children,
  isIsolated,
}: TableAvailablePositionProps) {
  const { currentTheme, isCurrentThemeDark, lg } = useThemeContext();
  const asset = getAssetInfo(tokenSymbol);

  return (
    <div
      className={classNames('TableAvailablePosition', {
        TableAvailablePosition__withInfo: tokenSymbol === 'AMPL',
        TableAvailablePosition__isolated: isIsolated,
      })}
    >
      <TableCol className="TableAvailablePosition__inner" maxWidth={lg ? 250 : 160}>
        <TokenIcon
          tokenSymbol={tokenSymbol}
          tokenFullName={asset.shortSymbol || asset.formattedName}
          height={26}
          width={26}
          className="TableAvailablePosition__token"
          tooltipId={tokenSymbol}
        />
      </TableCol>

      {children}

      {tokenSymbol === 'AMPL' && <AMPLWarning />}

      {isIsolated && (
        <div className="TableAvailablePosition__isolated--inner">
          <IsolatedBadge isWhiteIcon={true} />
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableAvailablePosition {
          background: ${currentTheme.whiteElement.hex};

          &__isolated--inner {
            background: ${isCurrentThemeDark
              ? currentTheme.headerBg.hex
              : currentTheme.darkBlue.hex};
            .IsolatedBadge {
              color: ${currentTheme.white.hex} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
