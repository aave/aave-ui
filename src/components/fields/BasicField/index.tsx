import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface BasicFieldProps {
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  type: string;
  isRequired?: boolean;
  placeholder?: string;
  step?: string;
  min?: number;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function BasicField({
  value,
  onChange,
  className,
  type,
  isRequired,
  placeholder,
  step,
  min,
  disabled,
  onKeyDown,
  ...props
}: BasicFieldProps) {
  const { currentTheme } = useThemeContext();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(event.target.value);
  };

  return (
    <div  className={classNames('BasicField', className)}>
      <input
        style={{
          border: 'none', padding: 0
        }}
        value={value}
        onChange={handleOnChange}
        type={type}
        placeholder={placeholder}
        required={isRequired}
        step={step}
        min={min}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...props}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .BasicField {
          border: none !important;
          input {
            color: ${currentTheme.textDarkBlue.hex};
            &::placeholder {
              font-family: Roboto;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: normal;
              color: #757d90;
            }
          }
        }
      `}</style>
    </div>
  );
}
