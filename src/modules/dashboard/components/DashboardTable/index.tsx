import React, { ReactNode } from 'react';

import TableBottomText from './TableBottomText';

import staticStyles from './style';

interface DashboardTableProps {
  children: ReactNode;
  withBottomText?: boolean;
}

export default function DashboardTable({ children, withBottomText }: DashboardTableProps) {
  return (
    <div className="DashboardTable">
      <div className="DashboardTable__content">{children}</div>

      {withBottomText && <TableBottomText />}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
