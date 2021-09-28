import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import rightArrowsWhite from '../../../../../images/rightArrowsWhite.svg';
import rightArrows from '../../../../../images/rightArrows.svg';

import staticStyles from './style';

interface SwapChangeValueProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
}

export default function SwapChangeValue({ leftComponent, rightComponent }: SwapChangeValueProps) {
  const { isCurrentThemeDark } = useThemeContext();

  return (
    <div className="SwapChangeValue">
      {leftComponent}
      <img
        className="SwapChangeValue__icon"
        src={isCurrentThemeDark ? rightArrowsWhite : rightArrows}
        alt=""
      />
      {rightComponent}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
