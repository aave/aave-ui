import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import queryString from 'query-string';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import Row from '../../../../components/basic/Row';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';
import Value from '../../../../components/basic/Value';

import messages from './messages';

export default function StakeWithApprovalConfirmation() {
  const intl = useIntl();
  const location = useLocation();
  const { userId } = useStaticPoolDataContext();
  const { selectedStake, selectedStakeData, stakingService } = useStakeDataContext();

  const aTokenData = getAtokenInfo({
    address: stakingService.stakingContractAddress,
    symbol: selectedStake.toUpperCase(),
    decimals: 18,
    prefix: 'stk',
  });

  const query = queryString.parse(location.search);
  let amount = new BigNumber(typeof query.amount === 'string' ? query.amount : 0);

  if (!amount || !userId) {
    return null;
  }

  const handleGetTransactions = async () => await stakingService.stake(userId, amount.toString());

  let blockingError = '';
  if (amount.gt(selectedStakeData.underlyingTokenUserBalance)) {
    blockingError = intl.formatMessage(messages.notEnoughBalance, {
      asset: selectedStake.toUpperCase(),
    });
  }

  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description, {
        asset: <strong>{selectedStake.toUpperCase()}</strong>,
        module: <strong>{intl.formatMessage(messages.safetyModule)}</strong>,
      })}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.stake, { asset: selectedStake.toUpperCase() })}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.stake, { asset: selectedStake.toUpperCase() })}
      mainTxType="STAKE_ACTION"
      blockingError={blockingError}
      goToAfterSuccess="/staking"
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
      buttonTitle={intl.formatMessage(messages.buttonTitle)}
      aTokenData={aTokenData}
    >
      <Row title={intl.formatMessage(messages.amount)}>
        <Value
          symbol={selectedStake.toUpperCase()}
          value={amount.toString()}
          tokenIcon={true}
          tooltipId={selectedStake.toUpperCase()}
        />
      </Row>
    </StakeTxConfirmationView>
  );
}
