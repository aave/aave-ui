import React, { ReactNode } from 'react';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

import animationCircle from '../../images/animationCircle.svg';
import aaveGhost from '../../images/aaveGhost.svg';

interface InfoPanelProps {
  children: ReactNode;
}

export default function InfoPanel({ children }: InfoPanelProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="InfoPanel">
      <img className="InfoPanel__circle" src={animationCircle} alt="" />

      <div className="InfoPanel__content-inner">
        <img className="InfoPanel__ghost" src={aaveGhost} alt="" />
        <div className="InfoPanel__content">{children}</div>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .InfoPanel {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.secondary.hex};
        }
      `}</style>
    </div>
  );
}
