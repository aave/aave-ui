import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import TableCol from '../TableCol';
import AMPLWarning from '../../../../../components/AMPLWarning';
import { getAssetInfo, TokenIcon } from '../../../../../helpers/config/assets-config';

import staticStyles from './style';

interface TableItemProps {
  tokenSymbol: string;
  children: ReactNode;
}

export default function TableItem({ tokenSymbol, children, ...rest }: TableItemProps) {
  const { currentTheme, lg } = useThemeContext();
  const asset = getAssetInfo(tokenSymbol);

  return (
    <div
      className={classNames('TableItem', {
        TableItem__withInfo: tokenSymbol === 'AMPL',
      })}
      {...rest}
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

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableItem {
          &:after {
            background: ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </div>
  );
}
