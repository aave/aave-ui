import React, { ReactNode, Children } from 'react';
import classNames from 'classnames';

import staticStyles from './style';

type TableButtonsWrapperProps = {
  children: ReactNode;
};

export default function TableButtonsWrapper({ children }: TableButtonsWrapperProps) {
  const countChildren = Children.toArray(children).length;

  return (
    <div
      className={classNames('TableButtonsWrapper', {
        TableButtonsWrapper__onlyOne: countChildren === 1,
      })}
    >
      {children}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
