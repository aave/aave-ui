import React from 'react';
import { Range } from 'react-range';
import { useIntl } from 'react-intl';
import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import {
  useStaticPoolDataContext,
  useDynamicPoolDataContext,
} from '../../../libs/pool-data-provider';
import ValuePercent from '../ValuePercent';

import messages from './messages';
import staticStyles from './style';

interface RiskBarProps {
  value: number;
  onChange: (amount: string) => void;
  maxAmount: string;
  currencySymbol: string;
}

export default function RiskBar({ value, onChange, maxAmount, currencySymbol }: RiskBarProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { reserves, user } = useDynamicPoolDataContext();

  if (!user) {
    return null;
  }

  const reserveETHPrice = reserves.find(
    (reserve) => reserve.symbol === currencySymbol
  )?.priceInMarketReferenceCurrency;

  const amountToBorrowInUsd = valueToBigNumber(value)
    .multipliedBy(reserveETHPrice || '0')
    .multipliedBy(marketRefPriceInUsd);

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits(
    user.totalCollateralUSD,
    valueToBigNumber(user.totalBorrowsUSD).plus(amountToBorrowInUsd),
    user.currentLiquidationThreshold
  );

  const handleChange = (value: number[]) => {
    onChange(value[0].toString());
  };

  return (
    <div className="RiskBar">
      <div className="RiskBar__top-inner">
        <span className="RiskBar__title">{intl.formatMessage(messages.safer)}</span>
        {Number(newHealthFactor) > 0 && (
          <div className="RiskBar__newHF">
            <p>{intl.formatMessage(messages.newHF)}</p>
            <ValuePercent value={newHealthFactor} color="dark" percentSymbol={false} />
          </div>
        )}
        <span className="RiskBar__title">{intl.formatMessage(messages.riskier)}</span>
      </div>

      <div className="RiskBar__range-inner">
        <Range
          step={Number(maxAmount) / 100}
          min={0}
          max={Number(maxAmount)}
          values={[value]}
          onChange={(values) => handleChange(values)}
          renderTrack={({ props, children }) => (
            <div
              className="RiskBar__track"
              {...props}
              style={{
                ...props.style,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              className="RiskBar__thumb"
              {...props}
              style={{
                ...props.style,
              }}
            />
          )}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .RiskBar {
          &__title {
            color: ${currentTheme.green.hex};
            &:last-of-type {
              color: ${currentTheme.red.hex};
            }
          }

          &__newHF {
            color: ${currentTheme.textDarkBlue.hex};
          }

          .RiskBar__thumb {
            background: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
