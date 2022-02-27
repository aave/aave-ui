import { useState } from 'react';
import { normalize } from '@aave/protocol-js';
import { providers } from 'ethers';

import { ProposalItem } from '../types';
import { getProposalExpiry, IPFS_ENDPOINT } from '../helper';

import { useStateLoading, LOADING_STATE } from '../../hooks/use-state-loading';
import { usePolling } from '../../hooks/use-polling';
import { IpfsMeta } from '../types';

import fm from 'front-matter';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import {
  AaveGovernanceService,
  ChainId,
  getProposalMetadata,
  Proposal,
} from '@aave/contract-helpers';

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
    const meta = await getProposalMetadata(prop.ipfsHash, IPFS_ENDPOINT);
    // Fix Bug with the @
    const parsedDesc = !!meta.description
      ? meta.description.replace(/@/gi, '')
      : 'no description, or description loading failed';
    const processed = fm<IpfsMeta>(parsedDesc);

    const proposal: ProposalItem = {
      id: Number(prop.id),
      title: meta.title || '',
      state: prop.state || '',
      ipfsHash: prop.ipfsHash,
      description: {
        attributes: {
          ...meta,
          ...processed.attributes,
        },
        body: processed.body,
        error: undefined,
      },
      creator: prop.creator,
      executor: prop.executor,
      shortDescription: meta.shortDescription,
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
  const proposalPromises: Promise<ProposalItem | undefined>[] = data.map((prop) =>
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
  chainId,
}: {
  skip: boolean;
  averageNetworkBlockTime: number;
  governanceService: AaveGovernanceService;
  chainId: ChainId;
}) => {
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const { loading, setLoading } = useStateLoading();

  const getProposals = async () => {
    setLoading(LOADING_STATE.LOADING);
    try {
      const rawProposals = await governanceService.getProposals({ skip: 0, limit: 100 });
      setProposals(
        await parserProposals(rawProposals, getProvider(chainId), averageNetworkBlockTime)
      );
    } catch (e) {
      console.error(`ERROR Proposals RPC : ${e.message}`);
    }
    setLoading(LOADING_STATE.FINISHED);
  };

  usePolling(getProposals, INTERVAL_POOL, skip, [skip, chainId]);

  return { proposals, loading };
};

export default useGetProposalsRPC;
