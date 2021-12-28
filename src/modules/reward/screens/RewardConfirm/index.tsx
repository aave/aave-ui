import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { normalize } from '@aave/math-utils';

import { useAppDataContext } from '../../../../libs/pool-data-provider';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import Row from '../../../../components/basic/Row';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import { UserIncentiveResponse } from '../../../../libs/pool-data-provider/hooks/use-incentives-data';

export default function RewardConfirm() {
  const intl = useIntl();
  const location = useLocation();

  const { user, incentivesTxBuilder, incentivesTxBuilderV2, userId } = useAppDataContext();
  const { currentMarketData } = useProtocolDataContext();

  // lock values to not update them after tx was executed
  const [isTxExecuted, setIsTxExecuted] = useState(false);

  const rewardTokenAddress = location.pathname.split('/')[3];
  const mode = rewardTokenAddress === 'all' ? 'all' : 'single';

  if (!user) {
    return null;
  }

  let incentiveData: UserIncentiveResponse | undefined = undefined;
  let aTokenData = undefined;
  let assets: string[] = [];
  let incentivesControllerAddress = '';
  let blockingError = '';
  let formattedAmount = '0';
  let totalClaimableUSD = 0;

  if (mode === 'single') {
    incentiveData = user.calculatedUserIncentives[rewardTokenAddress];
    aTokenData = getAtokenInfo({
      address: rewardTokenAddress,
      symbol: incentiveData.rewardTokenSymbol,
      decimals: incentiveData.rewardTokenDecimals,
      withFormattedSymbol: true,
    });
    if (incentiveData.claimableRewards.lt(0) && !incentiveData.claimableRewards.eq(-1)) {
      return null;
    }
    if (incentiveData.claimableRewards.eq('0')) {
      blockingError = intl.formatMessage(messages.notEnoughBalance);
    }
    formattedAmount = normalize(incentiveData.claimableRewards, incentiveData.rewardTokenDecimals);
    assets = incentiveData.assets;
    incentivesControllerAddress = incentiveData.incentiveControllerAddress;
  } else {
    Object.entries(user.calculatedUserIncentives).forEach((incentive) => {
      // We are assuming that all rewards are coming from the same incentive controller address so it doesn't matter which reward we fetch this from
      incentivesControllerAddress = incentive[1].incentiveControllerAddress;
      incentive[1].assets.forEach((asset) => {
        if (!assets.includes(asset)) {
          assets.push(asset);
        }
      });
      const normalizedRewards = normalize(
        incentive[1].claimableRewards,
        incentive[1].rewardTokenDecimals
      );
      totalClaimableUSD =
        totalClaimableUSD + Number(normalizedRewards) * Number(incentive[1].rewardPriceFeed);
    });
    if (totalClaimableUSD <= 0) {
      blockingError = intl.formatMessage(messages.notEnoughBalance);
    }
  }

  const handleGetTransactions = async () => {
    if (currentMarketData.v3) {
      if (rewardTokenAddress === 'all') {
        return incentivesTxBuilderV2.claimAllRewards({
          user: userId,
          assets,
          to: userId,
          incentivesControllerAddress,
        });
      } else {
        return incentivesTxBuilderV2.claimRewards({
          user: userId,
          assets,
          to: userId,
          incentivesControllerAddress,
          reward: rewardTokenAddress,
        });
      }
    } else {
      return incentivesTxBuilder.claimRewards({
        user: userId,
        assets,
        to: userId,
        incentivesControllerAddress,
      });
    }
  };

  return (
    <PoolTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      getTransactionsData={handleGetTransactions}
      onMainTxExecuted={() => setIsTxExecuted(true)}
      boxTitle={intl.formatMessage(messages.claim)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.claim)}
      blockingError={blockingError}
      aTokenData={aTokenData}
      goToAfterSuccess="/dashboard"
      dangerousMessage={
        incentiveData && incentiveData.rewardTokenSymbol === 'TRIBE' ? (
          <div>
            <p>
              {intl.formatMessage(messages.tribeWarningFirst, {
                proposal: (
                  <Link
                    to="https://www.withtally.com/governance/fei/proposal/20"
                    inNewWindow={true}
                    absolute={true}
                    color="secondary"
                    title={intl.formatMessage(messages.proposal)}
                  />
                ),
                link: (
                  <Link
                    to="https://app.fei.money/farm"
                    inNewWindow={true}
                    absolute={true}
                    color="secondary"
                    title={intl.formatMessage(messages.feiMessage)}
                  />
                ),
              })}
            </p>
            <p style={{ marginTop: 15 }}>{intl.formatMessage(messages.tribeWarningSecond)}</p>
          </div>
        ) : undefined
      }
    >
      {mode === 'single' ? (
        <Row title={intl.formatMessage(messages.claim)}>
          <Value
            symbol={incentiveData ? incentiveData.rewardTokenSymbol : ''}
            value={formattedAmount}
            subValue={Number(formattedAmount) * Number(incentiveData?.rewardPriceFeed)}
            subSymbol="USD"
            tokenIcon={true}
            tooltipId={incentiveData ? incentiveData.rewardTokenSymbol : ''}
            updateCondition={isTxExecuted}
            maximumSubValueDecimals={2}
            minimumSubValueDecimals={2}
          />
        </Row>
      ) : (
        <>
          <Row title={intl.formatMessage(messages.claim)} withMargin={true}>
            <div>
              {Object.entries(user.calculatedUserIncentives).map((incentive) => {
                const claimableRewards = normalize(
                  incentive[1].claimableRewards,
                  incentive[1].rewardTokenDecimals
                );
                const claimableRewardsUSD =
                  Number(claimableRewards) * Number(incentive[1].rewardPriceFeed);
                return (
                  <Value
                    symbol={incentive[1].rewardTokenSymbol}
                    value={claimableRewards}
                    subValue={claimableRewardsUSD}
                    subSymbol="USD"
                    tokenIcon={true}
                    tooltipId={incentive[0]}
                    updateCondition={isTxExecuted}
                    key={incentive[0]}
                    maximumSubValueDecimals={2}
                    minimumSubValueDecimals={2}
                  />
                );
              })}
            </div>
          </Row>

          <Row title={intl.formatMessage(messages.totalWorth)}>
            <Value
              value={totalClaimableUSD}
              symbol="USD"
              tokenIcon={true}
              withoutSymbol={true}
              color="primary"
              maximumValueDecimals={2}
              minimumValueDecimals={2}
              updateCondition={isTxExecuted}
            />
          </Row>
        </>
      )}
    </PoolTxConfirmationView>
  );
}
