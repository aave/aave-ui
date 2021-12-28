import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import TableCol from '../TableCol';
import AMPLWarning from '../../../../../components/AMPLWarning';
import IsolatedBadge from '../../../../../components/isolationMode/IsolatedBadge';
import { getAssetInfo, TokenIcon } from '../../../../../helpers/config/assets-config';

import staticStyles from './style';

interface TableItemProps {
  tokenSymbol: string;
  children: ReactNode;
  isIsolated?: boolean;
}

export default function TableItem({ tokenSymbol, children, isIsolated }: TableItemProps) {
  const { currentTheme, isCurrentThemeDark, lg } = useThemeContext();
  const asset = getAssetInfo(tokenSymbol);

  return (
    <div
      className={classNames('TableItem', {
        TableItem__withInfo: tokenSymbol === 'AMPL',
        TableItem__isolated: isIsolated,
      })}
    >
      <TableCol className="TableItem__inner" maxWidth={lg ? 250 : 160}>
        <TokenIcon
          tokenSymbol={tokenSymbol}
          tokenFullName={asset.shortSymbol || asset.formattedName}
          height={30}
          width={30}
          className="TableItem__token"
          tooltipId={tokenSymbol}
        />
      </TableCol>

      {children}

      {tokenSymbol === 'AMPL' && <AMPLWarning />}

      {isIsolated && (
        <div className="TableItem__isolated--inner">
          <IsolatedBadge isWhiteIcon={true} />
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableItem {
          &:after {
            background: ${currentTheme.mainBg.hex};
          }

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
