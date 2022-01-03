import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

import NoDataPanel from '../../../../../components/NoDataPanel';
import GovernanceTxConfirmationView from '../../GovernanceTxConfirmationView';
import { useProposalDataContext } from '../../../screens/Proposal';

import messages from './messages';

import { ProposalVoteParams } from '../../../../../libs/governance-provider/types';
import { useGovernanceDataContext } from '../../../../../libs/governance-provider';
import { useUserWalletDataContext } from '../../../../../libs/web3-data-provider';

interface TxConfirmationWrapperProps {
  caption: string;
  blockingError?: string;
  boxTitle: string;
  boxDescription: string;
  mainTxName: string;
  children: ReactNode;
}

export default function VoteConfirmationWrapper({
  caption,
  blockingError,
  boxTitle,
  boxDescription,
  mainTxName,
  children,
}: TxConfirmationWrapperProps) {
  const intl = useIntl();
  const { currentAccount } = useUserWalletDataContext();
  // TODO: account for non set params
  const { vote } = useParams() as unknown as ProposalVoteParams;
  const { governanceService } = useGovernanceDataContext();
  const { forceUpdateVoteData, proposalId, proposalHash } = useProposalDataContext();
  const processedVote = vote.toLowerCase() === 'yes';

  if (!currentAccount) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const handleGetTransactions = async () => {
    return await governanceService.submitVote({
      proposalId: Number(proposalId),
      user: currentAccount,
      support: processedVote,
    });
  };
  const handleMainTxConfirmed = () => {
    forceUpdateVoteData();
  };
  return (
    <GovernanceTxConfirmationView
      caption={caption}
      blockingError={blockingError}
      boxTitle={boxTitle}
      boxDescription={boxDescription}
      mainTxName={mainTxName}
      getTransactionsData={handleGetTransactions}
      mainTxType="GOVERNANCE_ACTION"
      onMainTxConfirmed={handleMainTxConfirmed}
      goToAfterSuccess={`/governance/${proposalId}-${proposalHash}`}
      successButtonTitle={intl.formatMessage(messages.successButtonTitle)}
      updateTransactionsData={processedVote}
    >
      {children}
    </GovernanceTxConfirmationView>
  );
}
