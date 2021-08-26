import React, { ReactNode } from 'react';

import staticStyles from './style';

interface TableHeaderWrapperProps {
  children: ReactNode;
}

export default function TableHeaderWrapper({ children }: TableHeaderWrapperProps) {
  return (
    <div className="TableHeaderWrapper">
      {children}
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
