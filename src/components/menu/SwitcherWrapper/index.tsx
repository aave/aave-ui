import React from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import LabeledSwitcher from '../../basic/LabeledSwitcher';

import staticStyles from './style';

interface SwitcherWrapperProps {
  title: string;
  value: boolean;
  leftOption: string;
  rightOption: string;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  labelUppercase?: boolean;
}

export default function SwitcherWrapper({
  title,
  value,
  onToggle,
  disabled,
  leftOption,
  rightOption,
  labelUppercase,
}: SwitcherWrapperProps) {
  const { currentTheme, md } = useThemeContext();

  const switcherWidth = md ? 245 : 160;
  const switcherHeight = md ? 36 : 32;

  return (
    <div className={classNames('SwitcherWrapper', { SwitcherWrapper__uppercase: labelUppercase })}>
      <p className="SwitcherWrapper__title">{title}</p>
      <LabeledSwitcher
        value={value}
        disabled={disabled}
        leftOption={leftOption}
        rightOption={rightOption}
        onToggle={onToggle}
        width={switcherWidth}
        height={switcherHeight}
        fontSize={12}
      />

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .SwitcherWrapper {
          &__title {
            color: ${md ? currentTheme.white.hex : currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
