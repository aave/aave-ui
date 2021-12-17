import React, { useEffect, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { EthereumTransactionTypeExtended, valueToBigNumber, normalize } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../libs/pool-data-provider';
import Value from '../basic/Value';

import messages from './messages';
import staticStyles from './style';

const INTERVAL = 10000;

interface TxEstimationProps {
  getTransactionsData?: (
    user: string
  ) => () => Promise<EthereumTransactionTypeExtended[]> | EthereumTransactionTypeExtended[];
  amount: string;
}

export default function TxEstimation({ getTransactionsData, amount }: TxEstimationProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const { marketRefPriceInUsd, userId } = useStaticPoolDataContext();
  const [estimatedTx, setEstimatedTx] = useState<string>('0');

  const gasData = useRef('0');

  const calculationGas = async () => {
    if (!getTransactionsData || !userId) return;
    try {
      const txData = getTransactionsData(userId);
      const txs = await txData();
      const gasEstimations = await Promise.all(txs.map((tx) => (tx.gas ? tx.gas() : null)));

      if (gasEstimations.length > 0 && !gasEstimations.includes(null)) {
        const accumulated = gasEstimations.reduce(
          (prev, next) => {
            if (next) {
              prev.gasLimit = prev.gasLimit.plus(next.gasLimit || '0');
              prev.gasPrice = valueToBigNumber(next.gasPrice);
            }
            return prev;
          },
          {
            gasLimit: valueToBigNumber('0'),
            gasPrice: valueToBigNumber('0'),
          }
        );

        const estimation = normalize(accumulated.gasLimit.times(accumulated.gasPrice), 18);
        // We update in case of the user has added specific amount
        if (estimatedTx !== '0') setEstimatedTx(estimation);
        gasData.current = estimation;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateGasPrice = () => {
    if (amount.length === 0 || valueToBigNumber(amount).lte('0')) {
      setEstimatedTx('0');
      return;
    }
    setEstimatedTx(gasData.current);
  };

  useEffect(() => {
    if (gasData.current === '0') calculationGas();
    const timeout = setInterval(calculationGas, INTERVAL);
    return () => clearInterval(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    // Debounce strategie to avoid a lot of calls when the users
    // add the amount
    let timeout: number = 0;
    if (timeout !== 0) {
      clearTimeout(timeout);
      timeout = 0;
    }
    timeout = window.setTimeout(updateGasPrice, 250);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, userId]);

  return (
    <div className="TxEstimation">
      <div className="TxEstimation__title">{intl.formatMessage(messages.approximate)}</div>

      <div className="TxEstimation__values">
        <Value value={Number(estimatedTx)} symbol={'ETH'} /> /
        <Value
          value={valueToBigNumber(estimatedTx).multipliedBy(marketRefPriceInUsd).toNumber()}
          symbol={'USD'}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TxEstimation,
        .TxEstimation .Value .Value__value {
          color: ${isCurrentThemeDark ? currentTheme.white.hex : currentTheme.lightBlue.hex};
        }
      `}</style>
    </div>
  );
}
