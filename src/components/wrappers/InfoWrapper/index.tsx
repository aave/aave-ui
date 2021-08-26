import React, { ReactNode } from 'react';

import staticStyles from './style';

interface InfoWrapperProps {
  children: ReactNode;
}

export default function InfoWrapper({ children }: InfoWrapperProps) {
  return (
    <div className="InfoWrapper">
      {children}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
