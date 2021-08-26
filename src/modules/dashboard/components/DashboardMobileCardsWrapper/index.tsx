import React, { ReactNode } from 'react';

import staticStyles from './style';

interface DashboardMobileCardsWrapperProps {
  children: ReactNode;
}

export default function DashboardMobileCardsWrapper({
  children,
}: DashboardMobileCardsWrapperProps) {
  return (
    <div className="DashboardMobileCardsWrapper">
      {children}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
