import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

export interface onChange {
  name: string;
  value: boolean;
}

interface CheckBoxFieldProps {
  className?: string;
  title?: string | ReactNode;
  value: boolean;
  name: string;
  onChange: ({ name: string, value: boolean }: onChange) => void;
  isFullBleed?: boolean;
}

export default function CheckBoxField({
  className,
  title,
  value,
  onChange,
  name,
  isFullBleed,
}: CheckBoxFieldProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('CheckBoxField', className, { CheckBoxField__fullBleed: isFullBleed })}
    >
      <input
        checked={value}
        id={`${name}FieldId`}
        type="checkbox"
        onChange={() => onChange({ name, value: !value })}
      />

      <label className="CheckBoxField__label" htmlFor={`${name}FieldId`}>
        <span>
          {isFullBleed ? (
            <i />
          ) : (
            <svg viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1" />
            </svg>
          )}
        </span>

        {title && <p>{title}</p>}
      </label>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .CheckBoxField {
          color: ${currentTheme.darkBlue.hex};
        }

        .CheckBoxField input:disabled + label {
          color: ${currentTheme.textDarkBlue.hex};
        }

        .CheckBoxField__label span:first-child {
          border: 1px solid ${currentTheme.textDarkBlue.hex};
        }

        .CheckBoxField__label:hover p {
          color: ${currentTheme.primary.hex};
        }

        .CheckBoxField__label span:first-child svg {
          stroke: ${currentTheme.whiteElement.hex};
        }

        .CheckBoxField input[type='checkbox']:disabled + .CheckBoxField__label span:first-child {
          border-color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.textDarkBlue.hex};
        }

        .CheckBoxField input:checked + .CheckBoxField__label span:first-child {
          background: ${currentTheme.textDarkBlue.hex};
          border-color: ${currentTheme.textDarkBlue.hex};
        }

        .CheckBoxField__fullBleed input:checked + .CheckBoxField__label span:first-child {
          background: ${currentTheme.secondary.hex};
          border-color: ${currentTheme.secondary.hex};
        }
        .CheckBoxField__fullBleed input:checked + .CheckBoxField__label span:first-child i {
          background: ${currentTheme.secondary.hex};
          border-color: ${currentTheme.white.hex};
        }
      `}</style>
    </div>
  );
}
