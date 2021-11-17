import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import rightArrowsWhite from '../../images/rightArrowsWhite.svg';
import rightArrows from '../../images/rightArrows.svg';

import staticStyles from './style';

interface ChangeValueProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
}

export default function ChangeValue({ leftComponent, rightComponent }: ChangeValueProps) {
  const { isCurrentThemeDark } = useThemeContext();

  return (
    <div className="ChangeValue">
      {leftComponent}
      <img
        className="ChangeValue__icon"
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
