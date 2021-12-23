import React, { useContext } from 'react';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';

import useGetMetadataDescription from '../../../../libs/governance-provider/hooks/use-get-metadata-description';
import useVoteOnProposalRPC from '../../../../libs/governance-provider/hooks/use-vote-on-proposal-rpc';
import { useGovernanceDataContext } from '../../../../libs/governance-provider';
import ProposalWrapper from '../../components/proposal/ProposalWrapper';
import TextContent from '../TextContent';
import VoteConfirmation from '../VoteConfirmation';

import { IpfsPropsal } from '../../../../libs/governance-provider/types';
import { ProposalItem, ProposalParams, Vote } from '../../../../libs/governance-provider/types';

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

  const { proposalId: _proposalId, proposalHash } = useParams<ProposalParams>();
  const proposalId = Number(_proposalId);
  const { userId } = useStaticPoolDataContext();
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
    user: userId,
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
        <Switch>
          <Route
            exact={true}
            path="/governance/:proposalId-:proposalHash"
            component={TextContent}
          />

          <Route
            exact={true}
            path="/governance/:proposalId-:proposalHash/:vote"
            component={VoteConfirmation}
          />
        </Switch>
      </ProposalWrapper>
    </ProposalProviderContext.Provider>
  );
}
