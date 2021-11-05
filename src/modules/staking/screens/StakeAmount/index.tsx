import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import queryString from 'query-string';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import BasicForm from '../../../../components/forms/BasicForm';
import RiskInfoPanel from '../../components/RiskInfoPanel';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

export default function StakeAmount() {
  const intl = useIntl();
  const {
    selectedStake,
    selectedStakeData: { underlyingTokenUserBalance },
    stakingService,
  } = useStakeDataContext();
  const history = useHistory();

  const stakeDisclaimerHidden =
    localStorage.getItem(`showStake${selectedStake}Disclaimer`) === 'false';

  const handleSubmit = (amount: string) => {
    const query = queryString.stringify({ amount });
    history.push(
      `/staking/${selectedStake}/${!stakeDisclaimerHidden ? 'disclaimer' : 'confirmation'}?${query}`
    );
  };

  const currencyName = selectedStake.toUpperCase();
  const handleGetTransactions = (userId: string) => async () => {
    if (underlyingTokenUserBalance === '0') return [];
    return await stakingService.stake(userId, underlyingTokenUserBalance);
  };
  return (
    <>
      <BasicForm
        title={intl.formatMessage(messages.caption)}
        description={intl.formatMessage(messages.description, {
          symbol: <strong>{currencyName}</strong>,
          module: <strong>{intl.formatMessage(messages.safetyModule)}</strong>,
          incentives: <strong>{intl.formatMessage(messages.protocolIncentives)}</strong>,
        })}
        amountFieldTitle={intl.formatMessage(messages.availableToStake)}
        maxAmount={underlyingTokenUserBalance}
        currencySymbol={currencyName}
        onSubmit={handleSubmit}
        submitButtonTitle={intl.formatMessage(defaultMessages.stake)}
        getTransactionData={handleGetTransactions}
      />
      <RiskInfoPanel />
    </>
  );
}
