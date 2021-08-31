import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import TableCol from '../TableCol';
import AMPLWarning from '../../../../../components/AMPLWarning';
import { getAssetInfo, TokenIcon } from '../../../../../helpers/markets/assets';

import staticStyles from './style';

interface TableItemProps {
  tokenSymbol: string;
  color?: string;
  children: ReactNode;
}

export default function TableItem({ tokenSymbol, color, children }: TableItemProps) {
  const { currentTheme } = useThemeContext();
  const asset = getAssetInfo(tokenSymbol);

  return (
    <div className={classNames('TableItem', { TableItem__AMPL: tokenSymbol === 'AMPL' })}>
      <span className="TableItem__assetColor" style={{ backgroundColor: color }} />

      <TableCol className="TableItem__inner" maxWidth={160}>
        <TokenIcon
          tokenSymbol={tokenSymbol}
          tokenFullName={asset.formattedName}
          height={30}
          width={30}
          className="TableItem__token"
        />
      </TableCol>

      {children}

      {tokenSymbol === 'AMPL' && <AMPLWarning />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableItem {
          background: ${currentTheme.whiteElement.hex};
        }
      `}</style>
    </div>
  );
}
