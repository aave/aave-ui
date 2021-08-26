import React, { ReactNode } from 'react';
import classNames from 'classnames';

import staticStyles from './style';

interface TableColProps {
  children: ReactNode;
  className?: string;
  maxWidth?: number;
  minWidth?: number;
}

export default function TableCol({ children, className, maxWidth, minWidth }: TableColProps) {
  return (
    <div className={classNames('TableCol', className)} style={{ maxWidth, minWidth }}>
      {children}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
