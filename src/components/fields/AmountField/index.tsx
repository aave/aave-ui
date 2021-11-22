import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import Row from '../../basic/Row';
import BasicField from '../BasicField';
import Value from '../../basic/Value';
import Preloader from '../../basic/Preloader';
import { TokenIcon } from '../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

type AmountFieldProps = {
  symbol: string;
  value: string;
  onChange: (value: string) => void;
  onMaxButtonClick?: () => void;
  error?: string;
  title?: string;
  maxAmount?: number | string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  maxDecimals?: number;
  topDecimals?: number;
};

export default function AmountField({
  symbol,
  value,
  onChange,
  error,
  title,
  maxAmount,
  className,
  disabled,
  loading,
  maxDecimals = 18,
  onMaxButtonClick,
  topDecimals,
}: AmountFieldProps) {
  const intl = useIntl();
  const { currentTheme, lg, md, sm, isCurrentThemeDark } = useThemeContext();
  const [onFocus, setFocus] = useState(false);

  const blockInvalidChar = (event: React.KeyboardEvent<HTMLInputElement>) =>
    ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();

  // remove leading zeroes before meaningful digit
  const integerPart = (value.split('.')[0] || '').replace(/^0[0-9]/, '0');
  // remove decimal places which does not make sense
  const decimalPart = (value.split('.')[1] || '').substring(0, maxDecimals);
  // merge
  const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

  const background = rgba(`${currentTheme.textDarkBlue.rgb}, 0.05`);

  return (
    <div
      className={classNames(
        'AmountField',
        {
          AmountField__focus: onFocus,
          AmountField__error: error,
          AmountField__disabled: disabled || loading,
        },
        className
      )}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {title && maxAmount && (
        <Row className="AmountField__top-row" title={title}>
          <Value
            value={maxAmount}
            maximumValueDecimals={topDecimals ? topDecimals : 6}
            minimumValueDecimals={topDecimals}
            color="dark"
            symbol={symbol}
          />
        </Row>
      )}

      <div className="AmountField__wrapper">
        <TokenIcon tokenSymbol={symbol} width={lg && !md ? 24 : 30} height={lg && !md ? 24 : 30} />

        <BasicField
          value={formattedValue}
          onChange={onChange}
          placeholder={intl.formatMessage(messages.placeholder)}
          min={0}
          type="number"
          step="any"
          className="AmountField__input"
          disabled={disabled || loading}
          onKeyDown={blockInvalidChar}
        />

        {maxAmount && !loading && !!onMaxButtonClick && (
          <div className="AmountField__right-inner">
            <button
              className="AmountField__maxButton"
              type="button"
              onClick={onMaxButtonClick}
              disabled={disabled}
            >
              {intl.formatMessage(messages.max)}
            </button>
          </div>
        )}

        {loading && <Preloader />}
      </div>

      <p className="AmountField__error-text">{error}</p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AmountField {
          &:hover,
          &__focus,
          &__error {
            .AmountField__wrapper {
              background-color: ${background};
            }
          }

          &__error {
            .AmountField__wrapper {
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
          &__maxButton {
            color: ${currentTheme.primary.hex};
          }

          &__error-text {
            color: ${currentTheme.red.hex};
          }

          &__disabled {
            &:hover {
              .AmountField__wrapper {
                background-color: transparent;
              }
            }
          }

          &__smallerThanMinSymbol {
            color: ${currentTheme.textDarkBlue.hex};
            margin-right: 3px;
          }
        }
      `}</style>
    </div>
  );
}
