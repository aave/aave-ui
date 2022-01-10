import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';

import NoDataPanel from '../../../../components/NoDataPanel';
import BasicForm from '../../../../components/forms/BasicForm';
import BorrowInterestRateForm from '../../components/BorrowInterestRateForm';
import BorrowCurrencyWrapper from '../../components/BorrowCurrencyWrapper';
import InfoWrapper from '../../../../components/wrappers/InfoWrapper';
import AMPLWarning from '../../../../components/AMPLWarning';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import { getAssetInfo } from '../../../../helpers/config/assets-config';
import CapsAmountWarning from '../../../../components/caps/CapsAmountWarning';
import { CapType } from '../../../../components/caps/helper';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { useTxBuilderContext } from '../../../../libs/tx-provider';

import messages from './messages';
import { valueToBigNumber } from '@aave/math-utils';
import BigNumber from 'bignumber.js';
import { InterestRate } from '@aave/contract-helpers';
import { useLocation, useNavigate } from 'react-router';
import { getMaxAmountAvailalbeToBorrow } from '../../utils';

enum BorrowStep {
  AmountForm,
  RateModeSelection,
}

interface BorrowAmountProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {}

function BorrowAmount({ userReserve, poolReserve, user, currencySymbol }: BorrowAmountProps) {
  const [amountToBorrow, setAmountToBorrow] = useState('0');
  const [borrowStep, setBorrowStep] = useState<BorrowStep>(BorrowStep.AmountForm);
  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();
  const navigate = useNavigate();
  const location = useLocation();

  const asset = getAssetInfo(currencySymbol);

  const maxUserAmountToBorrow = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  ).div(poolReserve.priceInMarketReferenceCurrency);

  const maxAmountToBorrow = user
    ? getMaxAmountAvailalbeToBorrow(poolReserve, user)
    : new BigNumber(0);

  const formattedMaxAmountToBorrow = maxAmountToBorrow.toString(10);

  const handleSetAmountSubmit = (amount: string) => {
    setAmountToBorrow(amount);
    setBorrowStep(BorrowStep.RateModeSelection);
  };

  const handleInterestModeSubmit = (rateMode: string) => {
    const query = queryString.stringify({ rateMode, amount: amountToBorrow });
    navigate(`${location.pathname}/confirmation?${query}`);
  };

  const goBack = () => setBorrowStep(BorrowStep.AmountForm);

  const handleTransactionData = (userId: string) => async () => {
    const referralCode = undefined;
    return await lendingPool.borrow({
      interestRateMode: InterestRate.Variable,
      referralCode,
      user: userId,
      amount: formattedMaxAmountToBorrow,
      reserve: poolReserve.underlyingAsset,
      debtTokenAddress: poolReserve.variableDebtTokenAddress,
    });
  };

  const percentageOfCap = valueToBigNumber(poolReserve.totalDebt)
    .dividedBy(poolReserve.borrowCap)
    .toNumber();

  const isBorrowNotAvailableDueDebtCeiling =
    user &&
    user.isInIsolationMode &&
    user.isolatedReserve &&
    user.isolatedReserve.debtCeiling === user.isolatedReserve.isolationModeTotalDebt;

  return (
    <BorrowCurrencyWrapper
      poolReserve={poolReserve}
      currencySymbol={currencySymbol}
      userReserve={userReserve}
      user={user}
      goBack={borrowStep === BorrowStep.RateModeSelection ? () => goBack() : undefined}
    >
      {formattedMaxAmountToBorrow !== '0' ? (
        <>
          {borrowStep === BorrowStep.AmountForm && (
            <BasicForm
              title={intl.formatMessage(messages.title)}
              description={intl.formatMessage(messages.description)}
              maxAmount={formattedMaxAmountToBorrow}
              currencySymbol={currencySymbol}
              onSubmit={handleSetAmountSubmit}
              amountFieldTitle={
                <AvailableCapsHelpModal capType={CapType.borrowCap} iconSize={12} />
              }
              withRiskBar={true}
              maxRiskBarAmount={maxUserAmountToBorrow.toString()}
              maxDecimals={poolReserve.decimals}
              getTransactionData={handleTransactionData}
            />
          )}

          {borrowStep === BorrowStep.RateModeSelection && (
            <BorrowInterestRateForm
              poolReserve={poolReserve}
              userReserve={userReserve}
              amountToBorrow={amountToBorrow}
              onSubmit={handleInterestModeSubmit}
            />
          )}
        </>
      ) : (
        <>
          {poolReserve.borrowCap !== '0' && !!user && formattedMaxAmountToBorrow === '0' ? (
            <NoDataPanel
              title={intl.formatMessage(messages.borrowCapReached)}
              description={intl.formatMessage(messages.borrowCapReachedDescription)}
            />
          ) : (
            <>
              {isBorrowNotAvailableDueDebtCeiling ? (
                <NoDataPanel
                  title={intl.formatMessage(messages.borrowingAgainst)}
                  description={intl.formatMessage(messages.borrowingAgainstDescription)}
                />
              ) : (
                <NoDataPanel
                  title={
                    !user
                      ? intl.formatMessage(messages.connectWallet)
                      : poolReserve.availableLiquidity === '0'
                      ? intl.formatMessage(messages.noLiquidityAvailableTitle)
                      : !user || user.totalLiquidityMarketReferenceCurrency === '0'
                      ? intl.formatMessage(messages.noDataTitle)
                      : intl.formatMessage(messages.healthFactorTooLowTitle)
                  }
                  description={
                    !user
                      ? intl.formatMessage(messages.connectWalletDescription)
                      : poolReserve.availableLiquidity === '0'
                      ? intl.formatMessage(messages.noLiquidityAvailableDescription, {
                          symbol: asset.formattedName,
                        })
                      : !user || user.totalLiquidityMarketReferenceCurrency === '0'
                      ? intl.formatMessage(messages.noDataDescription)
                      : intl.formatMessage(messages.healthFactorTooLowDescription)
                  }
                  buttonTitle={!user ? undefined : intl.formatMessage(messages.noDataButtonTitle)}
                  linkTo={!user ? undefined : `/deposit/${poolReserve.underlyingAsset}`}
                  withConnectButton={!user}
                />
              )}
            </>
          )}
        </>
      )}

      {borrowStep === BorrowStep.AmountForm && (
        <InfoWrapper>
          <>
            {poolReserve.borrowCap !== '0' && percentageOfCap >= 0.99 && percentageOfCap < 1 && (
              <CapsAmountWarning capType={CapType.borrowCap} />
            )}
            {currencySymbol === 'AMPL' && <AMPLWarning withInfoPanel={true} />}
          </>
        </InfoWrapper>
      )}
    </BorrowCurrencyWrapper>
  );
}

export default routeParamValidationHOC({})(BorrowAmount);
