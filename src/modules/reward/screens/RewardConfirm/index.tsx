import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { normalize } from '@aave/protocol-js';
import { getRewardTokenSymbol } from '../../../../components/wrappers/IncentiveWrapper';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { useIncentivesDataContext } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Row from '../../../../components/basic/Row';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import Link from '../../../../components/basic/Link';

import messages from './messages';

export function RewardConfirm() {
  const intl = useIntl();
  const location = useLocation();

  const { user, reserves } = useDynamicPoolDataContext();
  const { userIncentives, incentivesTxBuilder } = useIncentivesDataContext();
  const incentivesControllerAddress = location.pathname.split('/')[3];
  const incentiveData = userIncentives[incentivesControllerAddress];
  const rewardTokenSymbol = getRewardTokenSymbol(reserves, incentiveData.rewardTokenAddress);

  const aTokenData = getAtokenInfo({
    address: incentiveData.rewardTokenAddress,
    symbol: rewardTokenSymbol,
    decimals: incentiveData.rewardTokenDecimals,
    withFormattedSymbol: true,
  });

  if ((incentiveData.claimableRewards.lt(0) && !incentiveData.claimableRewards.eq(-1)) || !user) {
    return null;
  }

  let blockingError = '';
  if (incentiveData.claimableRewards.eq('0')) {
    blockingError = intl.formatMessage(messages.notEnoughBalance);
  }

  const formattedAmount = normalize(
    incentiveData.claimableRewards,
    incentiveData.rewardTokenDecimals
  );

  const assets = incentiveData.assets;
  const handleGetTransactions = async () =>
    incentivesTxBuilder.claimRewards({
      user: user.id,
      assets,
      to: user.id,
      incentivesControllerAddress,
    });

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
          dangerousMessage={
            rewardTokenSymbol === 'TRIBE' ? (
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
          <Row title={intl.formatMessage(messages.claim)}>
            <Value
              symbol={rewardTokenSymbol}
              value={formattedAmount}
              tokenIcon={true}
              tooltipId={rewardTokenSymbol}
            />
          </Row>
        </PoolTxConfirmationView>
      </ContentWrapper>
    </ScreenWrapper>
  );
}
