import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import BasicField from '../BasicField';

import messages from './messages';
import staticStyles from './style';

import search from './images/search.svg';
import searchWhite from './images/searchWhite.svg';

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchField({
  value,
  onChange,
  className,
  placeholder,
  ...props
}: SearchFieldProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [onFocus, setFocus] = useState(false);

  useEffect(() => {
    return () => {
      onChange('');
    };
  }, [onChange]);

  return (
    <div
      className={classNames('SearchField', className, {
        SearchFieldFocused: onFocus,
      })}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <BasicField
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : intl.formatMessage(messages.placeholder)}
        type="search"
        {...props}
      />
      <img
        className="SearchField__image"
        src={isCurrentThemeDark ? searchWhite : search}
        alt="search"
        width={15}
        height={15}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .SearchField {
          &:hover {
            &:after {
              border-color: ${currentTheme.primary.hex};
            }
          }
          &:after {
            border-color: ${currentTheme.textDarkBlue.hex};
          }
        }

        .SearchFieldFocused {
          &:after {
            border-color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </div>
  );
}
