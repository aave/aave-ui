import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import AmountField from '../AmountField';
import AssetSelect from './components/AssetSelect';

import staticStyles from './style';

interface AmountFieldWithSelectProps {
  asset: string;
  setAsset: (address: string, decimals: number) => void;
  options: {
    label: string;
    value: string;
    decimals: number;
  }[];
  selectTitle: string;
  selectReverseTitle?: boolean;
  amount: string;
  onChangeAmount: (value: string) => void;
  setMaxSelected?: (value: boolean) => void;
  maxAmount?: string;
  amountTitle?: string;
  amountInUsd: string;
  percentDifference?: string;
  error?: string;
  disabled?: boolean;
  maxDecimals?: number;
  loading?: boolean;
  queryAsset?: string;
}

/**
 * Returns the number of decimals to show.
 * @param amount
 */
const getVisibleDecimals = (amount: string = '') => {
  if (amount.startsWith('0.0000')) return 6;
  if (amount.startsWith('0.00')) return 4;
  return 2;
};

export default function AmountFieldWithSelect({
  asset,
  setAsset,
  options,
  selectTitle,
  selectReverseTitle,
  amount,
  onChangeAmount,
  setMaxSelected,
  maxAmount,
  amountTitle,
  amountInUsd,
  percentDifference,
  error,
  disabled,
  maxDecimals,
  loading,
  queryAsset,
}: AmountFieldWithSelectProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const handleAmountChange = (newAmount: string) => {
    const newAmountValue = valueToBigNumber(newAmount);

    if (!!maxAmount && !!setMaxSelected) {
      if (newAmountValue.gt(maxAmount)) {
        onChangeAmount(maxAmount);
        return setMaxSelected(true);
      } else if (newAmountValue.isNegative()) {
        onChangeAmount('0');
      } else {
        onChangeAmount(newAmount);
      }
      setMaxSelected(false);
    } else {
      onChangeAmount(newAmount);
    }
  };

  const handleMaxButtonClick = () => {
    if (!!maxAmount && !!setMaxSelected) {
      onChangeAmount(maxAmount);
      setMaxSelected(true);
    }
  };

  return (
    <div
      className={classNames('AmountFieldWithSelect', {
        AmountFieldWithSelect__reverse: selectReverseTitle,
      })}
    >
      <AssetSelect
        asset={asset}
        setAsset={setAsset}
        options={options}
        title={selectTitle}
        reverseTitle={selectReverseTitle}
        queryAsset={queryAsset}
      />

      <div className="AmountFieldWithSelect__field-inner">
        <AmountField
          className="AmountFieldWithSelect__field"
          title={amountTitle && amountTitle}
          symbol=""
          value={amount}
          onChange={handleAmountChange}
          onMaxButtonClick={!!setMaxSelected ? handleMaxButtonClick : undefined}
          maxAmount={maxAmount}
          topDecimals={getVisibleDecimals(maxAmount)}
          error={error}
          disabled={disabled}
          maxDecimals={maxDecimals}
          loading={loading}
        />
        <span className="AmountFieldWithSelect__usdValue">
          = $ {intl.formatNumber(+amountInUsd, { maximumFractionDigits: 2 })}{' '}
          {!!percentDifference &&
            `(${intl.formatNumber(+percentDifference, { maximumFractionDigits: 2 })}%)`}
        </span>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .AmountFieldWithSelect {
          &__usdValue {
            color: ${currentTheme.secondary.hex};
          }
        }
      `}</style>
    </div>
  );
}
