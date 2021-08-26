import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext, AnimationArrow, DropdownWrapper } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface SelectFieldProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
  value: ReactNode;
  placeholder?: string;
  className?: string;
}

export default function SelectField({
  visible,
  setVisible,
  children,
  disabled,
  value,
  placeholder,
  className,
}: SelectFieldProps) {
  const { currentTheme, xl } = useThemeContext();

  return (
    <DropdownWrapper
      visible={visible}
      setVisible={setVisible}
      className={classNames('SelectField', { SelectField__active: visible }, className)}
      verticalPosition="bottom"
      horizontalPosition="left"
      buttonComponent={
        <button
          className={classNames('SelectField__select', { SelectField__selectActive: visible })}
          disabled={disabled}
          type="button"
          onClick={() => setVisible(!visible)}
        >
          <span
            className={classNames('SelectField__select-value', {
              SelectField__selectValueActive: !!value,
            })}
          >
            {placeholder && !value ? placeholder : value}
          </span>
          <AnimationArrow
            active={visible}
            width={xl ? 14 : 18}
            height={xl ? 8 : 10}
            marginLeft={5}
            arrowTopPosition={4}
            arrowWidth={xl ? 9 : 11}
            arrowHeight={2}
            color={visible ? currentTheme.secondary.hex : currentTheme.textDarkBlue.hex}
          />
        </button>
      }
    >
      <div className="SelectField__items">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SelectField {
          &__select {
            background: ${currentTheme.whiteItem.hex};
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
