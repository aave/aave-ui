import { useState, useEffect } from 'react';
import { Proposal, normalize, AaveGovernanceV2Interface, Network } from '@aave/protocol-js';
import { providers } from 'ethers';

import { ProposalItem } from '../types';
import { getProposalExpiry } from '../helper';

import { useStateLoading, LOADING_STATE } from '../../hooks/use-state-loading';
import { usePooling } from '../../hooks/use-pooling';
import { IpfsMeta } from '../types';

import fm from 'front-matter';
import { getProvider } from '../../../helpers/markets/markets-data';

const MemorizeStartTimestamp: { [id: string]: number } = {};
const MemorizeProposalTimestamp: { [id: string]: number } = {};

const generateProposal = async (
  prop: Proposal,
  provider: providers.Provider,
  averageNetworkBlockTime: number
) => {
  try {
    const memorizeId = prop.id;
    if (!MemorizeStartTimestamp[memorizeId]) {
      const { timestamp: startTimestamp } = await provider.getBlock(Number(prop.startBlock));
      MemorizeStartTimestamp[memorizeId] = Number(startTimestamp);
    }
    if (!MemorizeProposalTimestamp[memorizeId]) {
      const { timestamp: proposalTimestamp } = await provider.getBlock(
        Number(prop.proposalCreated)
      );
      MemorizeProposalTimestamp[memorizeId] = Number(proposalTimestamp);
    }
    // Fix Bug with the @
    const parsedDesc = !!prop.description
      ? prop.description.replace(/@/gi, '')
      : 'no description, or description loading failed';
    const processed = fm<IpfsMeta>(parsedDesc);

    const proposal: ProposalItem = {
      id: Number(prop.id),
      title: prop.title || '',
      state: prop.state || '',
      ipfsHash: prop.ipfsHash,
      description: {
        attributes: { ...processed.attributes },
        body: processed.body,
        error: undefined,
      },
      creator: prop.creator,
      executor: prop.executor,
      shortDescription: prop.shortDescription,
      totalVotingSupply: normalize(prop.totalVotingSupply, 18),
      executionTime: prop.executionTime,
      startBlock: Number(prop.startBlock),
      endBlock: Number(prop.endBlock),
      minimumQuorum: prop.minimumQuorum,
      minimumDiff: prop.minimumDiff,
      forVotes: prop.forVotes,
      againstVotes: prop.againstVotes,
      aip: 0, // need to modify protocol-js to add aip in Proposal type
      formattedForVotes: Number(normalize(prop.forVotes, 18)),
      formattedAgainstVotes: Number(normalize(prop.againstVotes, 18)),
      formattedMinQuorum: Number(prop.minimumQuorum) / 10000,
      formattedMinDiff: Number(prop.minimumDiff) / 10000,
      gracePeriod: Number(prop.executionTimeWithGracePeriod),
      executionDelay: 0,
      strategy: prop.strategy,
      totalCurrentVoters: 0,
      proposalActiveTimestamp: MemorizeStartTimestamp[memorizeId],
      proposalExpirationTimestamp: getProposalExpiry(
        averageNetworkBlockTime,
        prop.startBlock,
        prop.endBlock,
        MemorizeStartTimestamp[memorizeId]
      ),
      proposalCreatedTimestamp: MemorizeProposalTimestamp[memorizeId],
      proposalCreated: prop.proposalCreated,
    };

    return proposal;
  } catch (error) {
    console.error('Error on parse proposal ', error);
  }
};

const parserProposals = async (
  data: Proposal[],
  provider: providers.Provider,
  averageNetworkBlockTime: number
) => {
  const proposalPromises: Promise<ProposalItem | undefined>[] = data.map((prop: Proposal) =>
    generateProposal(prop, provider, averageNetworkBlockTime)
  );
  const results: (ProposalItem | undefined)[] = await Promise.all(proposalPromises);
  const proposals: ProposalItem[] = [];

  for (let i = 0; results.length > i; i++) {
    const prop = results[i];
    if (prop) proposals.push(prop);
  }
  return proposals;
};

const INTERVAL_POOL = 120000; // 2 min

const useGetProposalsRPC = ({
  skip = false,
  averageNetworkBlockTime,
  governanceService,
  network,
}: {
  skip: boolean;
  averageNetworkBlockTime: number;
  governanceService: AaveGovernanceV2Interface;
  network: Network;
}) => {
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const { loading, setLoading } = useStateLoading();

  const getProposals = async () => {
    setLoading(LOADING_STATE.LOADING);
    try {
      const rawProposals = await governanceService.getProposals({ skip: 0, limit: 100 });
      setProposals(
        await parserProposals(rawProposals, getProvider(network), averageNetworkBlockTime)
      );
    } catch (e) {
      console.error(`ERROR Proposals RPC : ${e.message}`);
    }
    setLoading(LOADING_STATE.FINISHED);
  };

  useEffect(() => {
    !skip && getProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, network]);

  usePooling(getProposals, INTERVAL_POOL, skip, [skip, network]);

  return { proposals, loading };
};

export default useGetProposalsRPC;
