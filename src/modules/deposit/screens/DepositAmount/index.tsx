import React from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';
import { Content } from '../../../../components/content-wrapper';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
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
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import { PageTitle } from '../../../../components/PageTitle';
import messages from './messages';

import linkIcon from '../../../../images/whiteLinkIcon.svg';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';
import { BlockTitle } from '../../../../components/BlockTitle';
import { BlockWrapper } from '../../../../components/wrappers/BlockWrapper';
import styled from 'styled-components';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';


interface DepositAmountProps
  extends Pick<
    ValidationWrapperComponentProps,
    'currencySymbol' | 'poolReserve' | 'history' | 'walletBalance' | 'user' | 'userReserve'
  > {}

const BlockRow = ({title, value, marginBottom}:{title: string, value: string, marginBottom?: number}) => {
  const Title = styled.p`
    font-family: Montserrat;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000;
  `
  const Value = styled.p`
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000;
  `
  return (
    <div style={{marginBottom: marginBottom, paddingRight: 30}} className="flex-row between w100">
      <Title>{title}</Title>
      <Value>{value}</Value>
    </div>
  )
}

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

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  if (maxAmountToDeposit.gt(0) && poolReserve.symbol.toUpperCase() === networkConfig.baseAsset) {
    // keep it for tx gas cost
    maxAmountToDeposit = maxAmountToDeposit.minus('0.001');
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
  const { marketRefPriceInUsd } = useStaticPoolDataContext();

  const overviewData = {
    utilizationRate: Number(poolReserve.utilizationRate),
    availableLiquidity: poolReserve.availableLiquidity,
    priceInUsd: valueToBigNumber(poolReserve.priceInMarketReferenceCurrency)
      .multipliedBy(marketRefPriceInUsd)
      .toNumber(),
    depositApy: Number(poolReserve.supplyAPY),
    avg30DaysLiquidityRate: Number(poolReserve.avg30DaysLiquidityRate),
    stableRate: Number(poolReserve.stableBorrowAPY),
    variableRate: Number(poolReserve.variableBorrowAPY),
    avg30DaysVariableRate: Number(poolReserve.avg30DaysVariableBorrowRate),
    usageAsCollateralEnabled: poolReserve.usageAsCollateralEnabled,
    stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
    baseLTVasCollateral: Number(poolReserve.baseLTVasCollateral),
    liquidationThreshold: Number(poolReserve.reserveLiquidationThreshold),
    liquidationBonus: Number(poolReserve.reserveLiquidationBonus),
    borrowingEnabled: poolReserve.borrowingEnabled,
  };

  return (
    <Content>
      <div className="flex-row centered-align">
        <TokenIcon style={{marginTop: 55}} tokenSymbol={currencySymbol} height={35} width={35} />
        <PageTitle>{asset.name} Reverse Overview</PageTitle>
      </div>
      <BlockTitle style={{marginTop: 30}}>{intl.formatMessage(messages.deposit)} {asset.formattedName}</BlockTitle>
      <BlockWrapper className='flex-row between' style={{marginTop:20}}>
        <div style={{
          width:'30%',
          borderRight: 'solid 2px #e2e2e2'
        }} className="flex-column">
          <BlockRow marginBottom={20} title={'Utilization rate'} value={'4.19%'} />
          <BlockRow marginBottom={20} title={'Available liquidity'} value={'4.19%'} />
          <BlockRow marginBottom={20} title={'Deposit APY'} value={'4.19%'} />
          <BlockRow title={'Can be used as collateral'} value={'4.19%'} />
        </div>
        <div style={{
          width:'30%',
          borderRight: 'solid 2px #e2e2e2'
        }} className="flex-column">
          <BlockRow marginBottom={20} title={'Asset price'} value={'4.19%'} />
          <BlockRow marginBottom={20} title={'Maximum LTV'} value={'4.19%'} />
          <BlockRow marginBottom={20} title={'Liquidation threshold'} value={'4.19%'} />
          <BlockRow title={'Liquidation penalty'} value={'4.19%'} />
        </div>
        <div style={{
          width:'30%'
        }} className="flex-column">
          <BlockRow marginBottom={20} title={'Your balance in Aave'} value={'4.19%'} />
          <BlockRow marginBottom={20} title={'Your wallet balance'} value={'4.19%'} />
          <BlockRow title={'Health factor'} value={'4.19%'} />
        </div>
      </BlockWrapper>
      <DepositCurrencyWrapper
        currencySymbol={currencySymbol}
        poolReserve={poolReserve}
        walletBalance={walletBalance}
        userReserve={userReserve}
        user={user}
      >
      {!maxAmountToDeposit.eq('0') && (
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
          amountFieldTitle={intl.formatMessage(messages.amountTitle)}
          maxAmount={maxAmountToDeposit.toString(10)}
          currencySymbol={currencySymbol}
          onSubmit={handleSubmit}
          maxDecimals={poolReserve.decimals}
          getTransactionData={handleTransactionData}
        />
      )}
      {maxAmountToDeposit.eq('0') && (!user || !lpPoolLink) && (
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

      {maxAmountToDeposit.eq('0') && user && lpPoolLink && (
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

      <InfoWrapper>
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
    </DepositCurrencyWrapper>
    </Content>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
})(DepositAmount);
