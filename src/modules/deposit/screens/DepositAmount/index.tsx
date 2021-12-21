import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { valueToBigNumber } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';
import BigNumber from 'bignumber.js';

import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import { getAssetInfo } from '../../../../helpers/config/assets-config';
import { usePayments } from '../../../../helpers/payments';
import { getLPTokenPoolLink } from '../../../../helpers/lp-tokens';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import NoDataPanel from '../../../../components/NoDataPanel';
import DefaultButton from '../../../../components/basic/DefaultButton';
import BasicForm from '../../../../components/forms/BasicForm';
import PaymentsPanel from '../../components/PaymentsPanel';
import Link from '../../../../components/basic/Link';
import InfoPanel from '../../../../components/InfoPanel';
import InfoWrapper from '../../../../components/wrappers/InfoWrapper';
import AMPLWarning from '../../../../components/AMPLWarning';
import DepositCurrencyWrapper from '../../components/DepositCurrencyWrapper';
import IsolationModeScreen from '../../components/IsolationModeScreen';
import CapsAmountWarning from '../../../../components/caps/CapsAmountWarning';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { CapType } from '../../../../components/caps/helper';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';

import messages from './messages';

import linkIcon from '../../../../images/whiteLinkIcon.svg';

enum DepositStep {
  IsolationScreen,
  AmountForm,
}

interface DepositAmountProps
  extends Pick<
    ValidationWrapperComponentProps,
    'currencySymbol' | 'poolReserve' | 'history' | 'walletBalance' | 'user' | 'userReserve'
  > {}

function DepositAmount({
  currencySymbol,
  poolReserve,
  user,
  userReserve,
  history,
  walletBalance,
}: DepositAmountProps) {
  const intl = useIntl();
  const { networkConfig, currentMarketData } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const { payments, isPaymentNashNotOnMainMarket } = usePayments();
  const { sm } = useThemeContext();

  const asset = getAssetInfo(currencySymbol);

  const hasDifferentCollateral = user?.userReservesData.find(
    (reserve) => reserve.usageAsCollateralEnabledOnUser && reserve.reserve.id !== poolReserve.id
  );

  const showIsolationScreen =
    poolReserve.isIsolated &&
    !hasDifferentCollateral &&
    (userReserve?.underlyingBalance !== '0' ? userReserve?.usageAsCollateralEnabledOnUser : true);

  const [depositStep, setDepositStep] = useState<DepositStep>(
    showIsolationScreen ? DepositStep.IsolationScreen : DepositStep.AmountForm
  );

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  if (maxAmountToDeposit.gt(0) && poolReserve.symbol.toUpperCase() === networkConfig.baseAsset) {
    // keep it for tx gas cost
    maxAmountToDeposit = maxAmountToDeposit.minus('0.001');
  }

  if (poolReserve.supplyCap !== '0') {
    maxAmountToDeposit = BigNumber.min(
      maxAmountToDeposit,
      new BigNumber(poolReserve.supplyCap).minus(poolReserve.totalLiquidity).multipliedBy('0.995')
    );
  }

  if (maxAmountToDeposit.lte(0)) {
    maxAmountToDeposit = valueToBigNumber('0');
  }

  const handleSubmit = (amount: string) => {
    const query = queryString.stringify({ amount });
    history.push(`${history.location.pathname}/confirmation?${query}`);
  };

  const handleTransactionData = (userId: string) => async () => {
    return await lendingPool.deposit({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: maxAmountToDeposit.toString(10),
      referralCode: undefined,
    });
  };

  const lpPoolLink = getLPTokenPoolLink(poolReserve);

  const goBack = () => setDepositStep(DepositStep.IsolationScreen);

  const percentageOfCap = valueToBigNumber(poolReserve.totalLiquidity)
    .dividedBy(poolReserve.supplyCap)
    .toNumber();

  return (
    <DepositCurrencyWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      walletBalance={walletBalance}
      userReserve={userReserve}
      user={user}
      goBack={
        depositStep === DepositStep.AmountForm && showIsolationScreen ? () => goBack() : undefined
      }
    >
      {!maxAmountToDeposit.eq('0') && (
        <>
          {depositStep === DepositStep.IsolationScreen && (
            <IsolationModeScreen onClick={() => setDepositStep(DepositStep.AmountForm)} />
          )}

          {depositStep === DepositStep.AmountForm && (
            <BasicForm
              title={intl.formatMessage(messages.title)}
              description={
                currencySymbol === 'AAVE' && isFeatureEnabled.staking(currentMarketData)
                  ? intl.formatMessage(messages.aaveDescription, {
                      stake: <strong>{intl.formatMessage(messages.stake)}</strong>,
                      link: (
                        <Link
                          className="italic"
                          to="/staking"
                          bold={true}
                          title={intl.formatMessage(messages.stakingView)}
                        />
                      ),
                    })
                  : intl.formatMessage(messages.description)
              }
              amountFieldTitle={
                <AvailableCapsHelpModal capType={CapType.supplyCap} iconSize={12} />
              }
              maxAmount={maxAmountToDeposit.toString(10)}
              currencySymbol={currencySymbol}
              onSubmit={handleSubmit}
              maxDecimals={poolReserve.decimals}
              getTransactionData={handleTransactionData}
            />
          )}
        </>
      )}

      {maxAmountToDeposit.eq('0') && (!user || !lpPoolLink) && (
        <>
          {poolReserve.supplyCap !== '0' && maxAmountToDeposit.eq('0') ? (
            <NoDataPanel
              title={intl.formatMessage(messages.supplyCapReached)}
              description={intl.formatMessage(messages.supplyCapReachedDescription)}
            />
          ) : (
            <NoDataPanel
              title={
                !user
                  ? intl.formatMessage(messages.connectWallet)
                  : intl.formatMessage(messages.noDataTitle)
              }
              description={
                !user
                  ? intl.formatMessage(messages.connectWalletDescription)
                  : intl.formatMessage(messages.noDataDescription, {
                      currencySymbol: asset.formattedName,
                    })
              }
              linkTo={
                !user
                  ? undefined
                  : isFeatureEnabled.faucet(currentMarketData)
                  ? `/faucet/${currencySymbol}`
                  : undefined
              }
              buttonTitle={
                !user
                  ? undefined
                  : isFeatureEnabled.faucet(currentMarketData)
                  ? intl.formatMessage(messages.noDataButtonTitle)
                  : undefined
              }
              withConnectButton={!user}
            />
          )}
        </>
      )}

      {maxAmountToDeposit.eq('0') && user && lpPoolLink && (
        <>
          {poolReserve.supplyCap !== '0' && maxAmountToDeposit.eq('0') ? (
            <NoDataPanel
              title={intl.formatMessage(messages.supplyCapReached)}
              description={intl.formatMessage(messages.supplyCapReachedDescription)}
            />
          ) : (
            <NoDataPanel
              title={intl.formatMessage(messages.noDataTitle)}
              description={intl.formatMessage(messages.noDataLPTokenDescription, {
                currencySymbol: asset.formattedName,
              })}
            >
              <Link to={lpPoolLink} absolute={true} inNewWindow={true} className="ButtonLink">
                <DefaultButton
                  className="DepositAmount__poolLink--button"
                  title={intl.formatMessage(messages.viewPool)}
                  iconComponent={<img src={linkIcon} alt="" />}
                  size="medium"
                  mobileBig={true}
                />
              </Link>
            </NoDataPanel>
          )}
        </>
      )}

      {user &&
        sm &&
        payments.some(
          (payment) =>
            payment.availableAssets?.includes(currencySymbol.toUpperCase()) &&
            !isPaymentNashNotOnMainMarket(payment.name)
        ) && (
          <PaymentsPanel
            currencySymbol={currencySymbol}
            withoutOrTitle={maxAmountToDeposit.eq('0')}
          />
        )}

      {depositStep === DepositStep.AmountForm && (
        <InfoWrapper>
          {poolReserve.supplyCap !== '0' && percentageOfCap >= 0.99 && percentageOfCap < 1 && (
            <CapsAmountWarning capType={CapType.supplyCap} />
          )}

          {currencySymbol === 'AMPL' && <AMPLWarning withInfoPanel={true} />}

          {currencySymbol === 'AAVE' && isFeatureEnabled.staking(currentMarketData) && (
            <InfoPanel>
              {intl.formatMessage(messages.aaveWarning, {
                link: (
                  <Link
                    className="italic"
                    to="/staking"
                    bold={true}
                    title={intl.formatMessage(messages.stakingView)}
                  />
                ),
              })}
            </InfoPanel>
          )}

          {currencySymbol === 'SNX' && !maxAmountToDeposit.eq('0') && (
            <InfoPanel>
              {intl.formatMessage(messages.warningText, {
                symbol: <strong>{currencySymbol}</strong>,
              })}
            </InfoPanel>
          )}

          {user &&
            !sm &&
            payments.some(
              (payment) =>
                payment.availableAssets?.includes(currencySymbol.toUpperCase()) &&
                !isPaymentNashNotOnMainMarket(payment.name)
            ) && <PaymentsPanel currencySymbol={currencySymbol} />}
        </InfoWrapper>
      )}
    </DepositCurrencyWrapper>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
})(DepositAmount);
