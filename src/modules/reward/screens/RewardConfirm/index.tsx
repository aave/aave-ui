import React from 'react';
import { useIntl } from 'react-intl';
import { ComputedReserveData, valueToBigNumber } from '@aave/protocol-js';

import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Row from '../../../../components/basic/Row';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';

import messages from './messages';

export function RewardConfirm() {
  const intl = useIntl();
  const { incentiveService } = useTxBuilderContext();
  const { userUnclaimedRewards } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { networkConfig } = useProtocolDataContext();

  const aTokenData = getAtokenInfo({
    address: incentiveService.incentivesControllerRewardTokenAddress,
    symbol: networkConfig.rewardTokenSymbol, // TODO: maybe need change in the future
    decimals: 18,
    withFormattedSymbol: true,
  });

  if (!user) return null;

  const amount = valueToBigNumber(user.totalRewards).plus(userUnclaimedRewards);
  if ((amount.lt(0) && !amount.eq(-1)) || !user) {
    return null;
  }

  let blockingError = '';
  if (amount.eq('0')) {
    blockingError = intl.formatMessage(messages.notEnoughBalance);
  }

  const formattedAmount = amount.toString();

  const assets = user.reservesData.reduce((acc, userReserve) => {
    const reserve = reserves.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === userReserve.reserve.underlyingAsset.toLowerCase()
    ) as ComputedReserveData;
    if (userReserve.aTokenRewards !== '0') acc.push(reserve.aTokenAddress);
    if (userReserve.vTokenRewards !== '0') acc.push(reserve.variableDebtTokenAddress);
    if (userReserve.sTokenRewards !== '0') acc.push(reserve.stableDebtTokenAddress);
    return acc;
  }, [] as string[]);

  const handleGetTransactions = async () =>
    incentiveService.claimRewards({ user: user.id, assets, to: user.id });

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTitleOnDesktop={true}
      withMobileGrayBg={true}
    >
      <ContentWrapper withBackButton={true} withFullHeight={true}>
        <PoolTxConfirmationView
          caption={intl.formatMessage(messages.title)}
          description={intl.formatMessage(messages.description)}
          getTransactionsData={handleGetTransactions}
          boxTitle={intl.formatMessage(messages.claim)}
          boxDescription={intl.formatMessage(messages.boxDescription)}
          mainTxName={intl.formatMessage(messages.claim)}
          blockingError={blockingError}
          goToAfterSuccess="/dashboard"
          aTokenData={aTokenData}
        >
          <Row title={intl.formatMessage(messages.claim)}>
            <Value
              symbol={networkConfig.rewardTokenSymbol}
              value={formattedAmount}
              tokenIcon={true}
              tooltipId={networkConfig.rewardTokenSymbol}
            />
          </Row>
        </PoolTxConfirmationView>
      </ContentWrapper>
    </ScreenWrapper>
  );
}
