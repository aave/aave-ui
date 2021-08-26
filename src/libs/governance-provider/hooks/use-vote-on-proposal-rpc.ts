import { useState, useEffect } from 'react';
import { Vote } from '../types';
import { useStateLoading, LOADING_STATE } from '../../hooks/use-state-loading';
import { usePooling } from '../../hooks/use-pooling';
import { AaveGovernanceV2Interface } from '@aave/protocol-js';

const INTERVAL_POOL = 60000; // 1 min

const useVoteOnProposal = ({
  proposalId,
  user,
  skip,
  governanceService,
}: {
  proposalId: string | undefined;
  user: string | undefined;
  skip: boolean;
  governanceService: AaveGovernanceV2Interface;
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

  useEffect(() => {
    !skip && getVote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePooling(getVote, INTERVAL_POOL, finish, [skip, proposalId, user]);

  return { data: voteData, loading, forceUpdate };
};

export default useVoteOnProposal;
