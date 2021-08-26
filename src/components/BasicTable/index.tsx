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
      <div className="BasicTable__wrapper">
        {!!headerColumns && <div className="BasicTable__header">{headerColumns}</div>}

        <div className="BasicTable__content">
          {!sm ? (
            <CustomScroll>
              <div className="BasicTable__content-inner">{children}</div>
            </CustomScroll>
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
