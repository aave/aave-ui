import React, { useContext } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';

import useGetMetadataDescription from '../../../../libs/governance-provider/hooks/use-get-metadata-description';
import useVoteOnProposalRPC from '../../../../libs/governance-provider/hooks/use-vote-on-proposal-rpc';
import { useGovernanceDataContext } from '../../../../libs/governance-provider';
import ProposalWrapper from '../../components/proposal/ProposalWrapper';
import TextContent from '../TextContent';
import VoteConfirmation from '../VoteConfirmation';

import { IpfsPropsal } from '../../../../libs/governance-provider/types';
import { ProposalItem, ProposalParams, Vote } from '../../../../libs/governance-provider/types';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';

export interface ProtocolContextDataType {
  proposal: ProposalItem | undefined;
  parsedBody: IpfsPropsal | undefined;
  proposalId: number;
  proposalHash: string;
  loading: boolean;
  voteData: Vote | undefined;
  voteDataLoading: boolean;

  forceUpdateVoteData: () => void;
}

const ProposalProviderContext = React.createContext({} as ProtocolContextDataType);
export const useProposalDataContext = () => useContext(ProposalProviderContext);

export default function Proposal() {
  const location = useLocation();

  // TODO: account for unset params
  const { proposalId: _proposalId, proposalHash } = useParams() as unknown as ProposalParams;
  const proposalId = Number(_proposalId);
  const { currentAccount } = useUserWalletDataContext();
  const { proposals, governanceService } = useGovernanceDataContext();
  const proposal = proposals.find((prop) => prop.id === proposalId);
  const { body, loading } = useGetMetadataDescription(
    proposalHash,
    !!proposal?.description && proposal.ipfsHash === proposalHash
  );
  const parsedBody = proposal?.description ? proposal?.description : body;
  const {
    data: voteData,
    loading: voteDataLoading,
    forceUpdate,
  } = useVoteOnProposalRPC({
    skip: false,
    user: currentAccount,
    proposalId,
    governanceService,
  });

  return (
    <ProposalProviderContext.Provider
      value={{
        proposalId,
        proposalHash,
        loading,
        parsedBody,
        proposal,
        voteData,
        voteDataLoading,
        forceUpdateVoteData: forceUpdate,
      }}
    >
      <ProposalWrapper isSidePanelVisibleOnMobile={location.pathname.split('/').length <= 3}>
        <Routes>
          <Route path="/" element={<TextContent />} />
          <Route path=":vote" element={<VoteConfirmation />} />
        </Routes>
      </ProposalWrapper>
    </ProposalProviderContext.Provider>
  );
}
