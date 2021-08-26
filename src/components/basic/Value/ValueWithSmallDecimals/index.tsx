import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { textCenterEllipsis, useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface ValueWithSmallDecimalsProps {
  value: number;
  maximumValueDecimals: number;
  minimumValueDecimals: number;
  centerEllipsis?: boolean;
}

export default function ValueWithSmallDecimals({
  value,
  maximumValueDecimals,
  minimumValueDecimals,
  centerEllipsis,
}: ValueWithSmallDecimalsProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const smallValueDecimalsCount = maximumValueDecimals - minimumValueDecimals;
  const valueForSmallDecimals = valueToBigNumber(value)
    .toFixed(maximumValueDecimals)
    .toString()
    .slice(0, -smallValueDecimalsCount);
  const smallDecimals = valueToBigNumber(value)
    .toFixed(maximumValueDecimals)
    .toString()
    .split(/[.,]/)[1]
    .slice(minimumValueDecimals);

  return (
    <>
      {intl.formatNumber(Number(valueForSmallDecimals), {
        maximumFractionDigits: maximumValueDecimals,
        minimumFractionDigits: minimumValueDecimals,
      })}

      <span className="ValueWithSmallDecimals">
        {centerEllipsis ? textCenterEllipsis(smallDecimals, 1, 4) : smallDecimals}
      </span>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ValueWithSmallDecimals {
          color: ${currentTheme.white.hex};
        }
      `}</style>
    </>
  );
}
