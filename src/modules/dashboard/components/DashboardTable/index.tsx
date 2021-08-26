import React, { ReactNode } from 'react';

import staticStyles from './style';

interface DashboardTableProps {
  children: ReactNode;
}

export default function DashboardTable({ children }: DashboardTableProps) {
  return (
    <div className="DashboardTable">
      <div className="DashboardTable__content">{children}</div>

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
