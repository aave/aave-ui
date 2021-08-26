import React, { ReactNode } from 'react';
import classNames from 'classnames';

import staticStyles from './style';

interface TableColumnProps {
  children: ReactNode;
  className?: string;
  maxWidth?: number;
  minWidth?: number;
}

export default function TableColumn({ children, className, maxWidth, minWidth }: TableColumnProps) {
  return (
    <div className={classNames('TableColumn', className)} style={{ maxWidth, minWidth }}>
      {children}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
