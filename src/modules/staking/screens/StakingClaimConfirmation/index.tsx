import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import queryString from 'query-string';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import Row from '../../../../components/basic/Row';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';
import Value from '../../../../components/basic/Value';

import messages from './messages';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';

export default function StakingClaimConfirmation() {
  const intl = useIntl();
  const location = useLocation();
  const { currentAccount } = useUserWalletDataContext();
  const { selectedStakeData, stakingService, selectedStake, STAKING_REWARD_TOKEN } =
    useStakeDataContext();

  const aTokenData = getAtokenInfo({
    address: STAKING_REWARD_TOKEN,
    symbol: 'AAVE',
    decimals: 18,
    withFormattedSymbol: true,
  });

  const query = queryString.parse(location.search);
  const amount = new BigNumber(typeof query.amount === 'string' ? query.amount : 0);

  if ((amount.lt(0) && !amount.eq(-1)) || !currentAccount) {
    return null;
  }
  const handleGetTransactions = async () =>
    stakingService.claimRewards(currentAccount, amount.toString());

  let blockingError = '';
  if (selectedStakeData.userIncentivesToClaim === '0') {
    blockingError = intl.formatMessage(messages.notEnoughBalance);
  }

  if (amount.gt(selectedStakeData.userIncentivesToClaim)) {
    blockingError = intl.formatMessage(messages.notHaveEnoughIncentives);
  }

  const formattedAmount = amount.eq(-1)
    ? selectedStakeData.userIncentivesToClaim
    : amount.toString();

  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.claim)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.claim)}
      blockingError={blockingError}
      goToAfterSuccess="/staking"
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
      aTokenData={aTokenData}
    >
      <Row title={intl.formatMessage(messages.claim, { asset: selectedStake.toUpperCase() })}>
        <Value symbol="AAVE" value={formattedAmount} tokenIcon={true} tooltipId="AAVE" />
      </Row>
    </StakeTxConfirmationView>
  );
}
