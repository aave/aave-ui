import React from 'react';
import { Redirect } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';

import messages from './messages';

export default function ActivateCooldownConfirmation() {
  const intl = useIntl();
  const { selectedStake, selectedStakeData, stakingService } = useStakeDataContext();
  const { userId } = useStaticPoolDataContext();

  if (!userId) {
    return null;
  }
  const timeNowInSeconds = Math.floor(Date.now() / 1000);
  if (selectedStakeData.userCooldown > timeNowInSeconds) {
    return <Redirect to="/staking" />;
  }

  const handleGetTransactions = async () => stakingService.cooldown(userId);

  let blockingError = '';
  if (selectedStakeData.stakeTokenUserBalance === '0') {
    blockingError = intl.formatMessage(messages.notEnoughBalance);
  }

  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description, {
        asset: selectedStake.toUpperCase(),
        activate: <strong>{intl.formatMessage(messages.activate)}</strong>,
        confirm: <strong>{intl.formatMessage(messages.confirm)}</strong>,
      })}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.activateCooldown, {
        asset: selectedStake.toUpperCase(),
      })}
      buttonTitle={intl.formatMessage(messages.buttonTitle)}
      mainTxName={intl.formatMessage(messages.title)}
      blockingError={blockingError}
      goToAfterSuccess="/staking"
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
    />
  );
}
