import React, { useState } from 'react';
import classNames from 'classnames';

import { rgba, useThemeContext } from '@aave/aave-ui-kit';
import BasicField from '../BasicField';

import staticStyles from './style';

type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

export default function TextField({
  value,
  onChange,
  error,
  className,
  disabled,
  placeholder,
}: TextFieldProps) {
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();

  const [onFocus, setFocus] = useState(false);

  const background = rgba(`${currentTheme.textDarkBlue.rgb}, 0.05`);

  return (
    <div
      className={classNames(
        'TextField',
        {
          TextField__focus: onFocus,
          TextField__error: error,
          TextField__disabled: disabled,
        },
        className
      )}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <div className="TextField__wrapper">
        <BasicField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          className="TextField__input"
          disabled={disabled}
        />
      </div>

      <p className="TextField__error-text">{error}</p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TextField {
          &:hover,
          &__focus,
          &__error {
            .TextField__wrapper {
              background: ${background};
            }
          }

          &__error {
            .TextField__wrapper {
              border: 1px solid ${currentTheme.red.hex};
            }
          }

          &__wrapper {
            border: 1px solid
              ${isCurrentThemeDark
                ? sm
                  ? currentTheme.white.hex
                  : currentTheme.whiteItem.hex
                : currentTheme.textDarkBlue.hex};
          }

          &__error-text {
            color: ${currentTheme.red.hex};
          }
        }
      `}</style>
    </div>
  );
}
