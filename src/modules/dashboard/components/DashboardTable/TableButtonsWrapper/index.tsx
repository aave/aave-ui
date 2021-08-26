import React, { ReactNode } from 'react';

import staticStyles from './style';

type TableButtonsWrapperProps = {
  children: ReactNode;
};

export default function TableButtonsWrapper({ children }: TableButtonsWrapperProps) {
  return (
    <div className="TableButtonsWrapper">
      {children}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
