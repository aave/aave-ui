import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import TableItemWrapper from '../../BasicTable/TableItemWrapper';
import TableColumn from '../../BasicTable/TableColumn';
import FreezedWarning from '../../FreezedWarning';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';

import staticStyles from './style';

interface TableItemProps {
  symbol: string;
  url: string;
  isFreezed?: boolean;
  isBorrow?: boolean;
  children?: ReactNode;
  darkOnDarkMode?: boolean;
}

export default function TableItem({
  symbol,
  url,
  isFreezed,
  isBorrow,
  children,
  darkOnDarkMode,
}: TableItemProps) {
  const history = useHistory();
  const asset = getAssetInfo(symbol);

  return (
    <TableItemWrapper
      className={classNames('TableItem', {
        TableItem__withHeight: darkOnDarkMode,
        TableItem__borrow: isBorrow,
      })}
      onClick={() => history.push(url)}
      disabled={isFreezed}
      withGoToTop={true}
      darkOnDarkMode={darkOnDarkMode}
    >
      <TableColumn className="TableItem__token-inner">
        <TokenIcon
          tokenSymbol={symbol}
          height={35}
          width={35}
          tokenFullName={asset.shortSymbol || asset.name}
          className="TableItem__tokenIcon"
        />
      </TableColumn>
      <div className="TableItem__content">
        {children}

        {isFreezed && (
          <TableColumn>
            <FreezedWarning symbol={symbol} className="TableItem__freezedWarning" />
          </TableColumn>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableItemWrapper>
  );
}
