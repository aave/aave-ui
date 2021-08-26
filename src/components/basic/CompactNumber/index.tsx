import React from 'react';
import { CustomFormatConfig, FormattedNumber, FormatNumberOptions } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

interface CompactNumberProps {
  value: string | number;
}

const POSTFIXES = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];

export function CompactNumber({
  value,
  maximumFractionDigits = 2,
  ...props
}: CompactNumberProps & FormatNumberOptions & CustomFormatConfig) {
  const bnValue = valueToBigNumber(value);

  const integerPlaces = bnValue.toFixed(0).length;
  const significantDigitsGroup = Math.min(
    Math.floor(integerPlaces ? (integerPlaces - 1) / 3 : 0),
    POSTFIXES.length - 1
  );
  const postfix = POSTFIXES[significantDigitsGroup];
  const formattedValue = bnValue.dividedBy(10 ** (3 * significantDigitsGroup)).toNumber();

  return (
    <>
      <FormattedNumber
        value={formattedValue}
        maximumFractionDigits={maximumFractionDigits}
        {...props}
      />
      {postfix}
    </>
  );
}
