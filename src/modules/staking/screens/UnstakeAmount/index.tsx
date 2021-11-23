import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import queryString from 'query-string';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import BasicForm from '../../../../components/forms/BasicForm';

import messages from './messages';

export default function UnstakeAmount() {
  const intl = useIntl();
  const history = useHistory();
  const { selectedStakeData, selectedStake, cooldownStep, stakingService } = useStakeDataContext();

  const timeNowInSeconds = Math.floor(Date.now() / 1000);
  if (
    selectedStakeData.userCooldownEndTime + selectedStakeData.stakeUnstakeWindow <
      timeNowInSeconds ||
    cooldownStep < 2
  ) {
    return <Redirect to="/staking" />;
  }

  const handleSubmit = (amount: string) => {
    const query = queryString.stringify({ amount });
    history.push(`/staking/${selectedStake}/unstake/confirmation?${query}`);
  };

  const stkBalance = selectedStakeData.stakeTokenUserBalance;
  const handleGetTransactions = (userId: string) => async () =>
    stakingService.redeem(userId, stkBalance);
  return (
    <BasicForm
      title={intl.formatMessage(messages.caption, { asset: selectedStake.toUpperCase() })}
      description={intl.formatMessage(messages.description)}
      amountFieldTitle={intl.formatMessage(messages.currentlyStaked)}
      maxAmount={stkBalance.toString()}
      currencySymbol={selectedStake.toUpperCase()}
      onSubmit={handleSubmit}
      submitButtonTitle={intl.formatMessage(messages.unstake)}
      getTransactionData={handleGetTransactions}
    />
  );
}
