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
  ...rest
}: TableAvailablePositionProps) {
  const { currentTheme, lg } = useThemeContext();
  const asset = getAssetInfo(tokenSymbol);

  return (
    <div
      className={classNames('TableAvailablePosition', {
        TableAvailablePosition__withInfo: tokenSymbol === 'AMPL',
      })}
      {...rest}
    >
      <TableCol className="TableAvailablePosition__inner" maxWidth={lg ? 280 : 200}>
        <TokenIcon
          tokenSymbol={tokenSymbol}
          tokenFullName={asset.shortSymbol || asset.formattedName}
          height={26}
          width={26}
          className="TableAvailablePosition__token"
          tooltipId={tokenSymbol}
        />
        {isIsolated && <IsolatedBadge />}
      </TableCol>

      {children}

      {tokenSymbol === 'AMPL' && <AMPLWarning />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableAvailablePosition {
          background: ${currentTheme.whiteElement.hex};
        }
      `}</style>
    </div>
  );
}
