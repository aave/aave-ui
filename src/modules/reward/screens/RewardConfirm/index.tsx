import { useIntl } from 'react-intl';
import { normalize } from '@aave/protocol-js';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Row from '../../../../components/basic/Row';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import Value from '../../../../components/basic/Value';
import {
  useIncentivesDataContext,
  UserIncentiveData,
} from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import messages from './messages';
import { useLocation } from 'react-router-dom';
import { getRewardTokenSymbol } from '../../../../components/TopIncentiveBalance';

export function RewardConfirm() {
  const intl = useIntl();
  const location = useLocation();

  // TO-DO: need to refactor to allow custom incentiveController
  const { incentiveService } = useTxBuilderContext();

  const { user, reserves } = useDynamicPoolDataContext();
  const { userIncentives } = useIncentivesDataContext();
  const incentiveControllerAddress = location.pathname.split('/')[3];
  const incentiveData: UserIncentiveData = userIncentives[incentiveControllerAddress];
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
