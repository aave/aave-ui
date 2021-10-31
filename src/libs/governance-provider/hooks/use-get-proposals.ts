import { useEffect, useState } from 'react';
import { tEthereumAddress, normalize } from '@aave/protocol-js';
import { formatEther } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import { providers } from 'ethers';

import {
  GovernanceProposalsSubscription,
  useGovernanceProposalsSubscription,
  Proposal,
  Executor,
} from '../graphql';
import { ProposalItem } from '../types';
import { getCorrectState, getProposalExpiry } from '../helper';
import { useStateLoading, LOADING_STATE } from '../../hooks/use-state-loading';

import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { ChainId } from '@aave/contract-helpers';

const NULL_ADDRESS: tEthereumAddress = ethers.constants.AddressZero;

type Maybe<T> = T | null;

type ProposalGraph = Pick<
  Proposal,
  | 'id'
  | 'title'
  | 'aipNumber'
  | 'state'
  | 'ipfsHash'
  | 'creator'
  | 'shortDescription'
  | 'totalVotingSupply'
  | 'executionTime'
  | 'startBlock'
  | 'endBlock'
  | 'currentYesVote'
  | 'currentNoVote'
  | 'governanceStrategy'
  | 'createdTimestamp'
  | 'createdBlockNumber'
  | 'totalPropositionSupply'
  | 'totalCurrentVoters'
  | 'targets'
  | 'values'
> & {
  executor?: Maybe<Executor>;
};

const MemorizeStartTimestamp: { [id: string]: number } = {};

const generateProposal = async (
  prop: ProposalGraph,
  provider: providers.Provider,
  averageNetworkBlockTime: number
) => {
  try {
    const memorizeId = prop.id;
    if (!MemorizeStartTimestamp[memorizeId]) {
      const { timestamp: startTimestamp } = await provider.getBlock(Number(prop.startBlock));
      MemorizeStartTimestamp[memorizeId] = Number(startTimestamp);
    }

    const totalVotingSupply = formatEther(prop.totalVotingSupply);

    const formattedForVotes = Number(normalize(prop?.currentYesVote || 0, 18));
    const formattedAgainstVotes = Number(normalize(prop?.currentNoVote || 0, 18));
    const proposal: ProposalItem = {
      id: Number(prop?.id),
      title: prop?.title || '',
      aip: prop?.aipNumber || 0,
      state: prop?.state || '', // By Default
      ipfsHash: prop?.ipfsHash,
      creator: prop.creator,
      executor: prop?.executor?.id || NULL_ADDRESS,
      shortDescription: prop?.shortDescription,
      totalVotingSupply,
      executionTime: prop?.executionTime || '',
      startBlock: Number(prop?.startBlock),
      endBlock: Number(prop?.endBlock),
      minimumQuorum: Number(prop?.executor?.minimumQuorum).toString(),
      minimumDiff: Number(prop?.executor?.voteDifferential).toString(),
      forVotes: prop?.currentYesVote,
      againstVotes: prop?.currentNoVote,
      formattedForVotes: formattedForVotes,
      formattedAgainstVotes: formattedAgainstVotes,
      formattedMinQuorum: Number(prop?.executor?.minimumQuorum) / 10000,
      formattedMinDiff: Number(prop?.executor?.voteDifferential) / 10000,
      gracePeriod: prop?.executor?.gracePeriod,
      executionDelay: prop?.executor?.executionDelay,
      strategy: prop?.governanceStrategy,
      totalCurrentVoters: prop.totalCurrentVoters,
      proposalActiveTimestamp: MemorizeStartTimestamp[memorizeId],
      proposalExpirationTimestamp: getProposalExpiry(
        averageNetworkBlockTime,
        prop.startBlock,
        prop.endBlock,
        MemorizeStartTimestamp[memorizeId]
      ),
      proposalCreatedTimestamp: prop.createdTimestamp,
      proposalCreated: prop.createdBlockNumber,
    };

    proposal.state = getCorrectState(proposal);
    return proposal;
  } catch (error) {
    console.error('Error on parse proposal ', error);
    return;
  }
};

const parserProposals = async (
  data: GovernanceProposalsSubscription,
  provider: providers.Provider,
  averageNetworkBlockTime: number
) => {
  if (!data.proposals) return [];

  const proposalPromises: Promise<ProposalItem | undefined>[] = data.proposals.map(
    (prop: ProposalGraph) => {
      return generateProposal(prop, provider, averageNetworkBlockTime);
    }
  );

  const results: (ProposalItem | undefined)[] = await Promise.all(proposalPromises);

  const proposals: ProposalItem[] = [];

  for (let i = 0; results.length > i; i++) {
    const prop = results[i];
    if (prop) proposals.push(prop);
  }

  return proposals;
};

const useGetProposals = ({
  skip = false,
  chainId,
  averageNetworkBlockTime,
}: {
  skip: boolean;
  chainId: ChainId;
  averageNetworkBlockTime: number;
}) => {
  const { loading, setLoading } = useStateLoading();
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const {
    data,
    loading: loadingProposals,
    error,
  } = useGovernanceProposalsSubscription({
    skip,
  });
  if (error) console.error('Error [useGetProposals]:', error);
  // we update when the people vote
  const updatedVotes =
    data?.proposals.reduce((count, prop) => {
      count = count + prop.totalCurrentVoters;
      return count;
    }, 0) || 0;

  useEffect(() => {
    if (data && data.proposals) {
      setLoading(LOADING_STATE.LOADING);

      parserProposals(data, getProvider(chainId), averageNetworkBlockTime).then(
        (resp: ProposalItem[]) => {
          setProposals(resp);
          setLoading(LOADING_STATE.FINISHED);
        }
      );
    } else setLoading(loadingProposals ? LOADING_STATE.LOADING : LOADING_STATE.FINISHED);
  }, [data?.proposals, updatedVotes, chainId]);

  return { proposals, loading, error };
};

export default useGetProposals;
