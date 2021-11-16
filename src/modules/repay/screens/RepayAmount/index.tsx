import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { BigNumber, InterestRate } from '@aave/protocol-js';
import { PoolInterface } from '@aave/contract-helpers';

import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import BasicForm from '../../../../components/forms/BasicForm';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import InfoWrapper from '../../../../components/wrappers/InfoWrapper';
import InfoPanel from '../../../../components/InfoPanel';
import RepayInfoPanel from '../../components/RepayInfoPanel';

import messages from './messages';

function RepayAmount({
  currencySymbol,
  userReserve,
  poolReserve,
  walletBalance,
  history,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { networkConfig, currentMarketData } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const query = queryString.parse(location.search);
  const debtType = query.debtType || InterestRate.Variable;

  const [assetAddress, setAssetAddress] = useState(poolReserve.underlyingAsset);
  const [maxAmountToRepay, setMaxAmountToRepay] = useState(new BigNumber(0));

  if (!userReserve) {
    throw new Error(intl.formatMessage(messages.error));
  }

  const { v3 } = currentMarketData;
  const { underlyingBalance } = userReserve;
  // useWalletBalanceProviderContext()
  // console.log('wallet balance: ', walletBalance.toString());
  // console.log('userReserve: ', userReserve);
  // console.log('aTokenBalance: ', userReserve.underlyingBalance);
  // console.log('aTokenBalanceUSD: ', userReserve.underlyingBalanceUSD);

  const repayWithATokens = assetAddress === poolReserve.aTokenAddress;

  useEffect(() => {
    const interestRate =
      debtType === InterestRate.Stable ? userReserve.stableBorrows : userReserve.variableBorrows;

    if (repayWithATokens) {
      const maxAmountToRepay = BigNumber.min(new BigNumber(underlyingBalance), interestRate);
      setMaxAmountToRepay(maxAmountToRepay);
    } else {
      const normalizedWalletBalance = walletBalance.minus(
        userReserve.reserve.symbol.toUpperCase() === networkConfig.baseAsset ? '0.004' : '0'
      );

      const maxAmountToRepay = BigNumber.min(normalizedWalletBalance, interestRate);
      setMaxAmountToRepay(maxAmountToRepay);
    }
  }, [walletBalance, underlyingBalance, repayWithATokens]);

  const handleSubmit = (amount: string, max?: boolean) => {
    const query = queryString.stringify({ debtType, amount: max ? '-1' : amount, assetAddress });
    history.push(`${history.location.pathname}confirmation?${query}`);
  };

  const handleGetTransactions = (userId: string) => async () =>
    await lendingPool.repay({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: '-1',
      interestRateMode: debtType as InterestRate,
    });

  const handleGetATokenTransactions = (userId: string) => async () =>
    await (lendingPool as PoolInterface).repayWithATokens({
      user: userId,
      reserve: poolReserve.aTokenAddress,
      amount: '-1',
      rateMode: debtType as InterestRate,
    });

  // TODO: get aToken symbol and name
  const asset = getAtokenInfo({
    address: poolReserve.underlyingAsset,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
    prefix: currentMarketData.aTokenPrefix,
    withFormattedSymbol: true,
  });

  const withAtokenBalance = +userReserve.underlyingBalance > 0 && v3;

  const options = withAtokenBalance
    ? [
        {
          label: currencySymbol,
          value: poolReserve.underlyingAsset,
          decimals: poolReserve.decimals,
        },
        {
          label: asset && asset.formattedSymbol ? asset.formattedSymbol : '',
          value: poolReserve.aTokenAddress,
          decimals: poolReserve.decimals,
        },
      ]
    : [];

  const setAsset = (address: string) => {
    setAssetAddress(address);
  };

  // console.log('asset:: ', asset);

  return (
    <>
      <BasicForm
        title={intl.formatMessage(messages.formTitle)}
        description={intl.formatMessage(
          withAtokenBalance ? messages.formDescriptionWithSelect : messages.formDescription
        )}
        maxAmount={maxAmountToRepay.toString(10)}
        amountFieldTitle={intl.formatMessage(messages.amountTitle)}
        currencySymbol={
          repayWithATokens && asset.formattedSymbol ? asset.formattedSymbol : currencySymbol
        }
        onSubmit={handleSubmit}
        absoluteMaximum={true}
        maxDecimals={poolReserve.decimals}
        getTransactionData={repayWithATokens ? handleGetTransactions : handleGetATokenTransactions}
        assetAddress={assetAddress}
        options={options}
        setAsset={setAsset}
        amountTitle={intl.formatMessage(messages.amountTitle)}
        selectTitle={intl.formatMessage(messages.selectTitle)}
      />

      <InfoWrapper>
        <RepayInfoPanel />
        {currencySymbol === 'SNX' && (
          <InfoPanel>
            {intl.formatMessage(messages.warningText, {
              symbol: <span>{currencySymbol}</span>,
            })}
          </InfoPanel>
        )}
      </InfoWrapper>
    </>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
  withUserReserve: true,
})(RepayAmount);
