import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { normalize } from '@aave/protocol-js';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import {
  useIncentivesDataContext,
  UserIncentive,
} from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { ATokenInfo, getAtokenInfo } from '../../../../helpers/get-atoken-info';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Row from '../../../../components/basic/Row';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { UserIncentiveDict } from '@aave/math-utils';

export function RewardConfirm() {
  const intl = useIntl();
  const location = useLocation();

  const { user } = useDynamicPoolDataContext();
  const { userIncentives, incentivesTxBuilder, incentivesTxBuilderV2 } = useIncentivesDataContext();
  const { currentMarketData } = useProtocolDataContext();
  const rewardTokenAddress = location.pathname.split('/')[3];
  const mode = rewardTokenAddress === 'all' ? 'all' : 'single';

  if (!user) {
    return null;
  }

  let incentiveData: UserIncentive | undefined = undefined;
  let aTokenData = undefined;
  let assets: string[] = [];
  let incentivesControllerAddress = '';
  let blockingError = '';
  let formattedAmount = '0';

  if (mode === 'single') {
    incentiveData = userIncentives[rewardTokenAddress];
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
    assets = [];
  }

  const handleGetTransactions = async () => {
    if (currentMarketData.v3) {
      if (rewardTokenAddress === 'all') {
        console.log(`user id: ${user.id}`);
        return incentivesTxBuilderV2.claimAllRewards({
          user: user.id,
          assets,
          to: user.id,
          incentivesControllerAddress,
        });
      } else {
        return incentivesTxBuilderV2.claimRewards({
          user: user.id,
          assets,
          to: user.id,
          incentivesControllerAddress,
          reward: rewardTokenAddress,
        });
      }
    } else {
      return incentivesTxBuilder.claimRewards({
        user: user.id,
        assets,
        to: user.id,
        incentivesControllerAddress,
      });
    }
  };

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
                tokenIcon={true}
                tooltipId={incentiveData ? incentiveData.rewardTokenSymbol : ''}
              />
            </Row>
          ) : (
            Object.entries(userIncentives).map((incentive) => (
              <Row title={intl.formatMessage(messages.claim)}>
                <Value
                  symbol={incentive[1].rewardTokenSymbol}
                  value={normalize(incentive[1].claimableRewards, incentive[1].rewardTokenDecimals)}
                  tokenIcon={true}
                  tooltipId={incentive[1].rewardTokenSymbol}
                />
              </Row>
            ))
          )}
        </PoolTxConfirmationView>
      </ContentWrapper>
    </ScreenWrapper>
  );
}
