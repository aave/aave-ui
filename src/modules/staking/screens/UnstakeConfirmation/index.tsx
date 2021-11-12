import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import queryString from 'query-string';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';

import messages from './messages';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';

export default function UnstakeConfirmation() {
  const intl = useIntl();
  const location = useLocation();
  const { userId } = useStaticPoolDataContext();
  const { selectedStakeData, selectedStake, stakingService, cooldownStep } = useStakeDataContext();

  const query = queryString.parse(location.search);
  let amount = new BigNumber(typeof query.amount === 'string' ? query.amount : 0);

  if (amount.eq(0) || !userId) {
    return null;
  }

  const timeNowInSeconds = Math.floor(Date.now() / 1000);
  if (
    selectedStakeData.userCooldownEndTime + selectedStakeData.stakeUnstakeWindow <
      timeNowInSeconds ||
    cooldownStep < 2
  ) {
    return <Redirect to="/staking" />;
  }

  let blockingError = '';
  if (amount.gt(selectedStakeData.stakeTokenUserBalance)) {
    blockingError = intl.formatMessage(messages.blockingError);
  }

  const handleGetTransactions = async () => stakingService.redeem(userId, amount.toString());

  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.unstakeAsset, { asset: selectedStake.toUpperCase() })}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.unstake)}
      goToAfterSuccess="/staking"
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
      blockingError={blockingError}
      buttonTitle={intl.formatMessage(messages.unstake)}
    >
      <Row
        title={intl.formatMessage(messages.unstakeAsset, { asset: selectedStake.toUpperCase() })}
      >
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
