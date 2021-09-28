import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber, InterestRate } from '@aave/protocol-js';
import queryString from 'query-string';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import NoDataPanel from '../../../../components/NoDataPanel';
import SwapForm from '../../../../components/forms/SwapForm';
import AmountFieldWithSelect from '../../../../components/fields/AmountFieldWithSelect';
import RepayContentWrapper from '../../components/RepayContentWrapper';
import SwapDetailsWrapper, {
  DEFAULT_MAX_SLIPPAGE,
} from '../../../../components/wrappers/SwapDetailsWrapper';

import { useAssetSwap } from '../../../../libs/use-asset-swap';
import { calculateHFAfterRepay } from '../../helpers';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

const applySlippage = (amount: string, slippagePercent: number | string) => {
  return valueToBigNumber(amount || '0').multipliedBy(1 + +slippagePercent / 100);
};

export function RepayAmountWithSelect({
  userReserve: toAssetUserData,
  history,
  user,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { reserves } = useDynamicPoolDataContext();
  const { currentTheme } = useThemeContext();
  const {
    loading,
    fromAsset,
    fromAmount,
    fromAmountInUSD,
    toAsset,
    toAmount,
    toAmountInUSD,
    isReverse,
    onSetFromAmount,
    onSetToAmount,
    onSetFromAsset,
    onSetToAsset,
    path,
  } = useAssetSwap({
    initialToAsset: {
      address: toAssetUserData?.reserve.underlyingAsset || '',
      decimals: toAssetUserData?.reserve.decimals || 18,
    },
  });

  const [isMaxDebtSelected, setIsMaxDebtSelected] = useState(false);
  const [maxSlippage, setMaxSlippage] = useState(DEFAULT_MAX_SLIPPAGE);

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  if (!toAssetUserData) {
    throw new Error(intl.formatMessage(messages.error));
  }

  const query = queryString.parse(location.search);
  const maxDebtToRepay =
    toAssetUserData[query.debtType === InterestRate.Stable ? 'stableBorrows' : 'variableBorrows'];

  const availableDeposits = user.reservesData.filter(
    (res) =>
      res.underlyingBalance !== '0' &&
      res.reserve.symbol.toUpperCase() !== 'XSUSHI' &&
      res.reserve.symbol.toUpperCase() !== 'GUSD' &&
      res.reserve.symbol.toUpperCase() !== 'BUSD' &&
      res.reserve.symbol.toUpperCase() !== 'SUSD' &&
      res.reserve.symbol.toUpperCase() !== 'BAL' &&
      res.reserve.symbol.toUpperCase() !== 'KNC' &&
      res.reserve.symbol.toUpperCase() !== 'ZRX'
  );

  const availableDepositsOptions = availableDeposits.map((res) => ({
    label: res.reserve.symbol,
    value: res.reserve.underlyingAsset,
    decimals: res.reserve.decimals,
  }));

  const repayDestinationOption = [
    {
      label: toAssetUserData.reserve.symbol,
      value: toAssetUserData.reserve.underlyingAsset,
      decimals: toAssetUserData.reserve.decimals,
    },
  ];

  const fromAssetUserData = user.reservesData.find(
    (res) => res.reserve.underlyingAsset === fromAsset
  );

  const fromAssetData = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === fromAsset.toLowerCase()
  );
  const toAssetData = reserves.find(
    (res) =>
      res.underlyingAsset.toLowerCase() === toAssetUserData?.reserve.underlyingAsset.toLowerCase()
  );

  const fromAmountWithSlippage = applySlippage(fromAmount, maxSlippage);
  const fromAmountInUSDWithSlippage = applySlippage(fromAmountInUSD, maxSlippage);

  const maxAmountToSwap = fromAssetUserData?.underlyingBalance || '0';

  const usdValueSlippage = +fromAmountInUSD
    ? valueToBigNumber(fromAmountInUSD)
        .minus(toAmountInUSD)
        .div(fromAmountInUSD)
        .multipliedBy(-100)
        .toFixed(2)
    : '0';

  const { hfAfterSwap, hfInitialEffectOfFromAmount } = calculateHFAfterRepay(
    fromAmountWithSlippage,
    fromAssetData,
    fromAssetUserData,
    isMaxDebtSelected ? maxDebtToRepay : toAmount,
    toAssetData,
    toAssetUserData,
    user
  );

  const fromAmountNotEnoughError = valueToBigNumber(fromAssetUserData?.underlyingBalance || 0).lt(
    fromAmountWithSlippage
  )
    ? intl.formatMessage(messages.notEnoughBalance)
    : undefined;

  const debtAmountNotEnoughError = valueToBigNumber(maxDebtToRepay).lt(toAmount)
    ? intl.formatMessage(messages.notEnoughDebt)
    : undefined;

  const swapLimitError = valueToBigNumber(fromAmountInUSD).gt(150000)
    ? intl.formatMessage(messages.swapLimitError)
    : undefined;

  const isSubmitButtonDisabled =
    loading ||
    (hfAfterSwap.lte(1) && !hfAfterSwap.eq(-1)) ||
    fromAmountWithSlippage.eq('0') ||
    !+toAmount ||
    !+fromAmount ||
    !!fromAmountNotEnoughError ||
    !!swapLimitError ||
    !!debtAmountNotEnoughError;

  const uniswapFees = path.length ? (path.length - 1) * 0.003 : undefined;
  const flashloanFees = valueToBigNumber(user.healthFactor)
    .minus(hfInitialEffectOfFromAmount)
    .lte(1.01)
    ? 0.0009
    : undefined;

  const flashFees = valueToBigNumber(flashloanFees || '0')
    .multipliedBy(100)
    .toString();

  const handleSubmit = () => {
    if (
      !valueToBigNumber(fromAmount).isNaN() &&
      fromAmount !== '0' &&
      !valueToBigNumber(toAmount).isNaN() &&
      toAmount !== '0'
    ) {
      const query = queryString.stringify({
        fromAsset,
        toAsset: toAssetUserData.reserve.underlyingAsset,
        fromAmount: fromAmountWithSlippage.toString(10),
        toAmount,
        maxSlippage,
        isReverse,
        fromAmountInUSD: fromAmountInUSDWithSlippage.toString(10),
        toAmountInUSD,
        repayAll: isMaxDebtSelected && isReverse,
        debtType: queryString.parse(location.search).debtType,
        useEthPath: path.length > 2,
        flashFees,
      });

      history.push(`${history.location.pathname}confirmation?${query}`);
    }
  };

  return (
    <RepayContentWrapper
      rightPanel={
        <SwapDetailsWrapper
          title={intl.formatMessage(messages.rightPanelTitle)}
          priceImpact={(+usdValueSlippage).toString()}
          healthFactor={user.healthFactor}
          hfAfterSwap={hfAfterSwap.toString()}
          maxSlippage={maxSlippage}
          setMaxSlippage={setMaxSlippage}
          flashloanFees={flashloanFees}
        />
      }
    >
      <SwapForm
        onSubmit={handleSubmit}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        caption={intl.formatMessage(defaultMessages.repay)}
        description={intl.formatMessage(messages.description)}
        error={fromAmountNotEnoughError || debtAmountNotEnoughError || swapLimitError}
        buttonTitle={intl.formatMessage(messages.continue)}
        helpText={intl.formatMessage(messages.helpText, {
          increase: (
            <strong style={{ color: `${currentTheme.green.hex}` }}>
              {intl.formatMessage(messages.increase)}
            </strong>
          ),
        })}
        fromField={
          <AmountFieldWithSelect
            asset={toAsset}
            setAsset={onSetToAsset}
            options={repayDestinationOption}
            selectTitle={intl.formatMessage(messages.toTitle)}
            amount={toAmount}
            setMaxSelected={setIsMaxDebtSelected}
            onChangeAmount={onSetToAmount}
            maxAmount={maxDebtToRepay.toString()}
            amountInUsd={toAmountInUSD}
            amountTitle={intl.formatMessage(messages.availableToRepay)}
            percentDifference={(+usdValueSlippage).toString()}
            disabled={loading}
            loading={loading}
            maxDecimals={toAssetData?.decimals}
          />
        }
        toField={
          <AmountFieldWithSelect
            asset={fromAsset}
            setAsset={onSetFromAsset}
            options={availableDepositsOptions}
            selectTitle={intl.formatMessage(messages.fromTitle)}
            amount={fromAmount.toString()}
            // setMaxSelected={setIsMaxDepositSelected}
            onChangeAmount={onSetFromAmount}
            maxAmount={maxAmountToSwap}
            amountInUsd={fromAmountInUSD.toString()}
            amountTitle={intl.formatMessage(messages.available)}
            disabled={true}
            loading={loading}
            error={fromAmountNotEnoughError}
            maxDecimals={fromAssetData?.decimals}
          />
        }
      />
    </RepayContentWrapper>
  );
}

export default routeParamValidationHOC({
  withUserReserve: true,
})(RepayAmountWithSelect);
