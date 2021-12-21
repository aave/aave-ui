import React, { FormEvent, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { ChainId, EthereumTransactionTypeExtended } from '@aave/contract-helpers';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import TxEstimation from '../../TxEstimation';
import Caption from '../../basic/Caption';
import AmountField from '../../fields/AmountField';
import RiskBar from '../../basic/RiskBar';
import DefaultButton from '../../basic/DefaultButton';
import ConnectButton from '../../ConnectButton';
import AmountFieldWithSelect, {
  AmountFieldWithSelectOption,
  AmountFieldWithSelectSetAsset,
} from '../../fields/AmountFieldWithSelect';

import messages from './messages';
import staticStyles from './style';
import { valueToBigNumber } from '@aave/math-utils';

interface BasicFormProps {
  title?: string;
  description?: string | ReactNode;
  maxAmount: string;
  amountFieldTitle?: string | ReactNode;
  currencySymbol: string;
  onSubmit: (amount: string, max?: boolean) => void;
  withRiskBar?: boolean;
  maxRiskBarAmount?: string;
  submitButtonTitle?: string;
  absoluteMaximum?: boolean;
  className?: string;
  maxDecimals?: number;
  warning?: ReactNode;
  children?: ReactNode;
  getTransactionData?: (
    user: string
  ) => () => Promise<EthereumTransactionTypeExtended[]> | EthereumTransactionTypeExtended[];
  assetAddress?: string;
  setAsset?: AmountFieldWithSelectSetAsset;
  options?: AmountFieldWithSelectOption[];
  selectTitle?: string;
  amountTitle?: string;
}

export default function BasicForm({
  title,
  description,
  maxAmount,
  amountFieldTitle,
  currencySymbol,
  onSubmit,
  withRiskBar,
  maxRiskBarAmount,
  submitButtonTitle,
  absoluteMaximum,
  className,
  maxDecimals,
  warning,
  children,
  getTransactionData,
  assetAddress,
  setAsset,
  options,
  selectTitle,
  amountTitle,
}: BasicFormProps) {
  const intl = useIntl();
  const { chainId } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();

  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (newAmount: string) => {
    const newAmountValue = valueToBigNumber(newAmount);
    setError('');
    if (newAmountValue.gt(maxAmount)) {
      setAmount(maxAmount);
      return setIsMaxSelected(true);
    } else if (newAmountValue.isNegative()) {
      setAmount('0');
    } else {
      setAmount(newAmount);
    }
    setIsMaxSelected(false);
  };

  const handleMaxButtonClick = () => {
    setAmount(maxAmount);
    setIsMaxSelected(true);
    setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valueToBigNumber(amount).isNaN() && +amount !== 0) {
      return onSubmit(amount, absoluteMaximum && isMaxSelected);
    }

    setError(intl.formatMessage(messages.error));
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('BasicForm', className)}>
      {!!title && <Caption title={title} description={description} />}

      <div className="BasicForm__inner">
        {children}

        {options && options.length && setAsset && selectTitle && assetAddress ? (
          <AmountFieldWithSelect
            symbol={currencySymbol}
            asset={assetAddress}
            setAsset={(address: string, decimals: number) => {
              setAsset(address, decimals);
              setAmount('');
            }}
            options={options}
            selectTitle={selectTitle}
            amountTitle={amountTitle}
            maxAmount={maxAmount}
            amount={amount}
            onChangeAmount={handleAmountChange}
            setMaxSelected={setIsMaxSelected}
            error={error}
            maxDecimals={maxDecimals}
          />
        ) : (
          <AmountField
            title={amountFieldTitle}
            maxAmount={maxAmount}
            symbol={currencySymbol}
            maxDecimals={maxDecimals}
            value={amount}
            onChange={handleAmountChange}
            onMaxButtonClick={handleMaxButtonClick}
            error={error}
          />
        )}

        {[ChainId.mainnet].includes(chainId) && getTransactionData && (
          <TxEstimation getTransactionsData={getTransactionData} amount={amount} />
        )}

        {withRiskBar && maxRiskBarAmount && (
          <RiskBar
            value={Number(amount)}
            onChange={handleAmountChange}
            maxAmount={maxRiskBarAmount}
            currencySymbol={currencySymbol}
          />
        )}

        {!!warning && <div className="BasicForm__warning">{warning}</div>}
      </div>

      <div className="BasicForm__buttons">
        {!currentAccount ? (
          <ConnectButton />
        ) : (
          <DefaultButton
            title={submitButtonTitle || intl.formatMessage(messages.continue)}
            mobileBig={true}
            type="submit"
          />
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </form>
  );
}
