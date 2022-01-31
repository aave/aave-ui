import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';

import messages from './messages';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';

export default function ActivateCooldownConfirmation() {
  const intl = useIntl();
  const { selectedStake, selectedStakeData, stakingService } = useStakeDataContext();
  const { currentAccount } = useUserWalletDataContext();

  if (!currentAccount) {
    return null;
  }
  const timeNowInSeconds = Math.floor(Date.now() / 1000);
  if (selectedStakeData.userCooldown > timeNowInSeconds) {
    return <Navigate to="/staking" replace />;
  }

  const handleGetTransactions = async () => stakingService.cooldown(currentAccount);

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
