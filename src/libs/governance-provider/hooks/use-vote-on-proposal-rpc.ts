import { useState } from 'react';
import { Vote } from '../types';
import { useStateLoading, LOADING_STATE } from '../../hooks/use-state-loading';
import { AaveGovernanceService } from '@aave/contract-helpers';
import { usePolling } from '../../hooks/use-polling';

const INTERVAL_POOL = 60000; // 1 min

const useVoteOnProposal = ({
  proposalId,
  user,
  skip,
  governanceService,
}: {
  proposalId: number | undefined;
  user: string | undefined;
  skip: boolean;
  governanceService: AaveGovernanceService;
}) => {
  const { loading, setLoading } = useStateLoading();
  const [voteData, setVoteData] = useState<Vote>();
  const [finish, setFinish] = useState(skip);

  const getVote = async () => {
    if (proposalId && user) {
      setLoading(LOADING_STATE.LOADING);
      const { votingPower, support } = await governanceService.getVoteOnProposal({
        proposalId,
        user,
      });

      if (votingPower && votingPower.toString() !== '0') {
        setVoteData({
          id: user,
          voter: user,
          votingPower: Number(votingPower.toString()),
          support,
        });
        // once we get the vote we don't need pool more.
        setFinish(true);
      }
      setLoading(LOADING_STATE.FINISHED);
    }
  };

  const forceUpdate = () => {
    !skip && getVote();
  };

  usePolling(getVote, INTERVAL_POOL, finish, [skip, proposalId, user]);

  return { data: voteData, loading, forceUpdate };
};

export default useVoteOnProposal;
