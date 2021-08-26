import { useGetTopVotersSubscription } from '../graphql';
import { Vote } from '../types';
const TOP_VOTERS_SIZE = 10;

const useGetTopVoters = ({ proposalId, skip }: { proposalId: string; skip: boolean }) => {
  let forTopVotes: Vote[] = [];
  let againstTopVotes: Vote[] = [];

  const {
    data: listForVotes,
    error: errorForTopVoters,
    loading: loadingForVotes,
  } = useGetTopVotersSubscription({
    variables: {
      first: TOP_VOTERS_SIZE,
      proposalId: proposalId,
      support: true,
    },
    skip,
  });

  const {
    data: listAgainstVotes,
    error: errorAgainstTopVoters,
    loading: loadingAgainstVotes,
  } = useGetTopVotersSubscription({
    variables: {
      first: TOP_VOTERS_SIZE,
      proposalId: proposalId,
      support: false,
    },
    skip,
  });

  if (listForVotes && listForVotes.votes.length > 0) {
    forTopVotes = listForVotes.votes as Vote[];
  }
  if (listAgainstVotes && listAgainstVotes.votes.length > 0) {
    againstTopVotes = listAgainstVotes.votes as Vote[];
  }
  return {
    forTopVotes,
    againstTopVotes,
    error: !!errorForTopVoters || !!errorAgainstTopVoters,
    loading: loadingForVotes || loadingAgainstVotes,
  };
};

export default useGetTopVoters;
