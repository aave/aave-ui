import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import {
  ChainId,
  InterestRate,
  Pool,
  PoolInterface,
  synthetixProxyByChainId,
} from '@aave/contract-helpers';

import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import RepayContentWrapper from '../../components/RepayContentWrapper';
import Row from '../../../../components/basic/Row';
import NoDataPanel from '../../../../components/NoDataPanel';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import HealthFactor from '../../../../components/HealthFactor';
import NotHaveEnoughFundsToRepayHelpModal from '../../../../components/HelpModal/NotHaveEnoughFundsToRepayHelpModal';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import { getAssetInfo, isAssetStable } from '../../../../helpers/config/assets-config';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import {
  calculateHealthFactorFromBalancesBigUnits,
  USD_DECIMALS,
  valueToBigNumber,
} from '@aave/math-utils';
import BigNumber from 'bignumber.js';
import { useLocation } from 'react-router';

function RepayConfirmation({
  currencySymbol,
  amount,
  user,
  poolReserve,
  userReserve,
  walletBalance,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { marketReferencePriceInUsd, userId, marketReferenceCurrencyDecimals } =
    useAppDataContext();
  const { currentMarketData, chainId } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();

  const [isTxExecuted, setIsTxExecuted] = useState(false);
  const [repayWithPermitEnabled, setRepayWithPermitEnable] = useState(
    currentMarketData.v3 && chainId !== ChainId.harmony && chainId !== ChainId.harmony_testnet
  );
  const [signedAmount, setSignedAmount] = useState('0');

  const assetDetails = getAssetInfo(poolReserve.symbol);
  const location = useLocation();
  const query = queryString.parse(location.search);
  const debtType = query.debtType ? (query.debtType as InterestRate) : InterestRate.Variable;
  const assetAddress = query.assetAddress ? (query.assetAddress as string) : '';

  const repayWithATokens = assetAddress === poolReserve.aTokenAddress && currentMarketData.v3;
  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  if (!amount || !userReserve) {
    return null;
  }

  const { underlyingBalance, usageAsCollateralEnabledOnUser, reserve } = userReserve;

  const maxAmountToRepay = valueToBigNumber(
    debtType === InterestRate.Stable ? userReserve.stableBorrows : userReserve.variableBorrows
  );

  const safeAmountToRepayAll = valueToBigNumber(maxAmountToRepay).multipliedBy('1.0025');

  let amountToRepay = amount.toString();
  let amountToRepayUI = amount;
  if (amountToRepay === '-1') {
    amountToRepayUI = BigNumber.min(
      repayWithATokens ? underlyingBalance : walletBalance,
      maxAmountToRepay
    );

    if (
      (synthetixProxyByChainId[chainId] &&
        reserve.underlyingAsset.toLowerCase() === synthetixProxyByChainId[chainId].toLowerCase()) ||
      !repayWithATokens
    ) {
      amountToRepay = BigNumber.min(walletBalance, safeAmountToRepayAll).toString();
    }
  }

  const displayAmountToRepay = BigNumber.min(amountToRepayUI, maxAmountToRepay);
  const displayAmountToRepayInUsd = displayAmountToRepay
    .multipliedBy(poolReserve.formattedPriceInMarketReferenceCurrency)
    .multipliedBy(marketReferencePriceInUsd)
    .shiftedBy(-USD_DECIMALS);

  const amountAfterRepay = maxAmountToRepay.minus(amountToRepayUI).toString();
  const displayAmountAfterRepay = BigNumber.min(amountAfterRepay, maxAmountToRepay);
  const displayAmountAfterRepayInUsd = displayAmountAfterRepay
    .multipliedBy(poolReserve.formattedPriceInMarketReferenceCurrency)
    .multipliedBy(marketReferencePriceInUsd)
    .shiftedBy(-USD_DECIMALS);

  const healthFactorAfterRepay = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency:
      repayWithATokens && usageAsCollateralEnabledOnUser
        ? new BigNumber(user.totalCollateralMarketReferenceCurrency).minus(
            new BigNumber(reserve.formattedPriceInMarketReferenceCurrency)
              .shiftedBy(-marketReferenceCurrencyDecimals)
              .multipliedBy(amountToRepayUI)
          )
        : user.totalCollateralMarketReferenceCurrency,
    borrowBalanceMarketReferenceCurrency: new BigNumber(
      user.totalBorrowsMarketReferenceCurrency
    ).minus(
      new BigNumber(reserve.formattedPriceInMarketReferenceCurrency)
        .shiftedBy(-marketReferenceCurrencyDecimals)
        .multipliedBy(amountToRepayUI)
    ),
    currentLiquidationThreshold: user.currentLiquidationThreshold,
  });

  const handleGetTransactions = async () => {
    if (currentMarketData.v3) {
      // TO-DO: No need for this cast once a single Pool type is used in use-tx-builder-context
      const newPool: Pool = lendingPool as Pool;
      return await newPool.repay({
        user: userId,
        reserve: poolReserve.underlyingAsset,
        amount: amountToRepay.toString(),
        interestRateMode: debtType as InterestRate,
      });
    } else {
      return await lendingPool.repay({
        user: userId,
        reserve: poolReserve.underlyingAsset,
        amount: amountToRepay.toString(),
        interestRateMode: debtType as InterestRate,
      });
    }
  };

  // Generate signature request payload
  const handleGetPermitSignatureRequest = async () => {
    // TO-DO: No need for this cast once a single Pool type is ued in use-tx-builder-context
    setSignedAmount(amountToRepay.toString());
    const newPool: Pool = lendingPool as Pool;
    return await newPool.signERC20Approval({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: amountToRepay.toString(),
    });
  };

  // Generate supply transaction with signed permit
  const handleGetPermitRepay = async (signature: string) => {
    // TO-DO: No need for this cast once a single Pool type is ued in use-tx-builder-context
    const newPool: Pool = lendingPool as Pool;
    return await newPool.repayWithPermit({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: signedAmount, // amountToRepay.toString(),
      interestRateMode: debtType as InterestRate,
      signature,
    });
  };

  const handleGetATokenTransactions = async () => {
    return (lendingPool as PoolInterface).repayWithATokens({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: amountToRepay.toString(),
      rateMode: debtType as InterestRate,
    });
  };

  const handleMainTxExecuted = () => setIsTxExecuted(true);

  const blockingError = (
    repayWithATokens
      ? valueToBigNumber(underlyingBalance).eq(0)
      : walletBalance.eq('0') || repayWithATokens
      ? valueToBigNumber(underlyingBalance).lt(amount)
      : walletBalance.lt(amount)
  )
    ? intl.formatMessage(messages.error, {
        userReserveSymbol: assetDetails.formattedSymbol || assetDetails.symbol,
      })
    : '';

  const warningMessage =
    amount.eq('-1') &&
    amountToRepayUI.gte(maxAmountToRepay) &&
    !amountToRepayUI.gte(safeAmountToRepayAll)
      ? intl.formatMessage(messages.warningMessage)
      : '';

  const isNotHaveEnoughFunds =
    amount.toString() === '-1' &&
    (repayWithATokens
      ? valueToBigNumber(underlyingBalance).lt(maxAmountToRepay)
      : walletBalance.lt(maxAmountToRepay));

  return (
    <RepayContentWrapper>
      <PoolTxConfirmationView
        mainTxName={intl.formatMessage(defaultMessages.repay)}
        caption={intl.formatMessage(messages.caption)}
        boxTitle={intl.formatMessage(defaultMessages.repay)}
        boxDescription={intl.formatMessage(messages.boxDescription)}
        approveDescription={
          repayWithPermitEnabled
            ? intl.formatMessage(messages.permitDescription)
            : intl.formatMessage(messages.approveDescription)
        }
        getTransactionsData={repayWithATokens ? handleGetATokenTransactions : handleGetTransactions}
        getPermitSignatureRequest={handleGetPermitSignatureRequest}
        getPermitEnabledTransactionData={handleGetPermitRepay}
        permitEnabled={repayWithPermitEnabled}
        togglePermit={setRepayWithPermitEnable}
        onMainTxExecuted={handleMainTxExecuted}
        blockingError={blockingError}
        goToAfterSuccess="/dashboard/borrowings"
        warningMessage={warningMessage}
      >
        <Row title={intl.formatMessage(messages.rowTitle)} withMargin={true}>
          <Value
            symbol={
              repayWithATokens
                ? `${currentMarketData.aTokenPrefix}${currencySymbol}`
                : currencySymbol
            }
            value={displayAmountToRepay.toString()}
            tokenIcon={true}
            subValue={displayAmountToRepayInUsd.toString()}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(currencySymbol) ? 4 : 12}
            maximumSubValueDecimals={4}
            updateCondition={isTxExecuted}
            tooltipId={poolReserve.underlyingAsset}
          />
        </Row>

        <Row
          title={intl.formatMessage(messages.secondRowTitle)}
          subTitle={
            isNotHaveEnoughFunds && (
              <NotHaveEnoughFundsToRepayHelpModal
                text={intl.formatMessage(messages.secondRowTitleSubTitle)}
              />
            )
          }
          withMargin={true}
        >
          <Value
            symbol={
              repayWithATokens
                ? `${currentMarketData.aTokenPrefix}${currencySymbol}`
                : currencySymbol
            }
            value={Number(displayAmountAfterRepay) > 0 ? Number(displayAmountAfterRepay) : 0}
            subValue={
              Number(displayAmountAfterRepayInUsd) > 0 ? Number(displayAmountAfterRepayInUsd) : 0
            }
            subSymbol="USD"
            maximumSubValueDecimals={4}
            tokenIcon={true}
            maximumValueDecimals={
              isNotHaveEnoughFunds ? 14 : isAssetStable(currencySymbol) ? 4 : 12
            }
            updateCondition={isTxExecuted}
            tooltipId={poolReserve.id}
            withSmallDecimals={isNotHaveEnoughFunds}
            isSmallValueCenterEllipsis={isNotHaveEnoughFunds}
          />
        </Row>

        <HealthFactor
          title={intl.formatMessage(messages.currentHealthFactor)}
          value={user.healthFactor}
          updateCondition={isTxExecuted}
          titleColor="dark"
        />

        <HealthFactor
          value={
            healthFactorAfterRepay.toNumber() > 10 * 10 ? '-1' : healthFactorAfterRepay.toString()
          }
          title={intl.formatMessage(messages.nextHealthFactor)}
          withoutModal={true}
          updateCondition={isTxExecuted}
          titleColor="dark"
        />
      </PoolTxConfirmationView>
    </RepayContentWrapper>
  );
}

export default routeParamValidationHOC({
  withAmount: true,
  withWalletBalance: true,
  withUserReserve: true,
  allowLimitAmount: true,
})(RepayConfirmation);
