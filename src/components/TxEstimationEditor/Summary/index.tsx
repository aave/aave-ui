import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber, normalize } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import Value from '../../basic/Value';

import messages from './messages';
import staticStyles from './style';

interface SummaryProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  marketRefPriceInUsd: string;
  customGasPrice: string | null;
  defaultGasPrice: string | null;
  totalGas: string;
  editDisabled?: boolean;
}

const gasPriceFormat = (value: string | null | undefined) => {
  if (!value) return '';
  return Math.round(Number(normalize(value, 9)));
};

export default function Summary({
  visible,
  setVisible,
  marketRefPriceInUsd,
  customGasPrice,
  defaultGasPrice,
  totalGas,
  editDisabled,
}: SummaryProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const gasPrice = customGasPrice ? customGasPrice : defaultGasPrice || '0';
  const estimationCost = normalize(valueToBigNumber(totalGas).times(gasPrice), 18);

  return (
    <div className="TxEstimationEditor">
      <div className="TxEstimationEditor__title">{intl.formatMessage(messages.gasPrice)}</div>

      <div className="TxEstimationEditor__valuesWrapper">
        <div className="TxEstimationEditor__values">
          <Value value={Number(estimationCost)} symbol="ETH" /> /
          <Value
            value={valueToBigNumber(estimationCost).multipliedBy(marketRefPriceInUsd).toNumber()}
            symbol="USD"
          />
        </div>
        /
        <div className="TxEstimationEditor__action">
          <Value value={Number(gasPriceFormat(gasPrice))} symbol="GWEI" />
          {!editDisabled && (
            <button type="button" onClick={() => setVisible(!visible)}>
              {intl.formatMessage(messages.edit)}
            </button>
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TxEstimationEditor {
          color: ${currentTheme.primary.hex};

          button {
            color: ${currentTheme.secondary.hex};
          }
        }
      `}</style>
    </div>
  );
}
