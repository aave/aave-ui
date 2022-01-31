import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import CustomScroll from '../basic/CustomScroll';

import staticStyles from './style';

interface BasicTableProps {
  children: ReactNode;
  headerColumns?: ReactNode;
  className?: string;
}

export default function BasicTable({ children, headerColumns, className }: BasicTableProps) {
  const { sm } = useThemeContext();

  return (
    <div className={classNames('BasicTable', className)}>
      <div>
        {!!headerColumns && <div className="BasicTable__header">{headerColumns}</div>}

        <div>
          {!sm ? (
            <div>{children}</div>
          ) : (
            <div className="BasicTable__content-inner">{children}</div>
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
