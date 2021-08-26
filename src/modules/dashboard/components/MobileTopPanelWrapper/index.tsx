import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import GradientPlusButton from '../../../../components/basic/GradientPlusButton';

import staticStyles from './style';

interface MobileTopPanelWrapperProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  buttonComponent: ReactNode;
  children: ReactNode;
}

export default function MobileTopPanelWrapper({
  visible,
  setVisible,
  buttonComponent,
  children,
}: MobileTopPanelWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="MobileTopPanelWrapper">
      <div className="MobileTopPanelWrapper__button" onClick={() => setVisible(!visible)}>
        {buttonComponent}
      </div>

      <div
        className={classNames('MobileTopPanelWrapper__content', {
          MobileTopPanelWrapper__contentVisible: visible,
        })}
      >
        {children}
      </div>

      <GradientPlusButton
        active={!visible}
        positionVertical="bottom"
        positionHorizontal="right"
        onClick={() => setVisible(!visible)}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .MobileTopPanelWrapper {
          background: ${currentTheme.darkBlue.hex};
        }
      `}</style>
    </div>
  );
}
