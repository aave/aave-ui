import { tEthereumAddress, ProposalState } from '@aave/protocol-js';
import { BigNumber } from 'ethers';

export type CheckMap = {
  [key: string]: boolean;
};

export type Vote = {
  id: string;
  voter: string;
  votingPower: number;
  support: boolean;
};

export type Executor = {
  id: string;
  authorized: boolean;
  propositionThreshold: number;
  votingDuration: number;
  voteDifferential: number;
  minimumQuorum: number;
  gracePeriod: number;
  executionDelay: number;
  admin: string;
  authorizationBlock: number;
  authorizationTimestamp: number;
  pendingAdmin: string;
};

export interface Proposal {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  creator: tEthereumAddress;
  executor: tEthereumAddress;
  targets: tEthereumAddress[];
  values: BigNumber[];
  signatures: string[];
  calldatas: string[];
  withDelegatecalls: boolean[];
  startBlock: number;
  endBlock: number;
  executionTime: string;
  executionTimeWithGracePeriod: string;
  forVotes: string;
  againstVotes: string;
  executed: boolean;
  canceled: boolean;
  strategy: string;
  ipfsHash: string;
  state: ProposalState;
  minimumQuorum: string;
  minimumDiff: string;
  proposalCreated: number;
  totalCurrentVoters: number;
}

export interface ProposalItem {
  id: number;
  state: ProposalState;
  title: string;
  description?: IpfsPropsal | undefined;
  shortDescription: string;
  creator: tEthereumAddress;
  executor: tEthereumAddress;
  executionDelay: number;
  proposalActiveTimestamp: number;
  proposalExpirationTimestamp: number;
  proposalCreatedTimestamp: number;
  gracePeriod: number;
  startBlock: number;
  endBlock: number;
  executionTime: string;
  forVotes: string;
  againstVotes: string;
  formattedForVotes: number;
  formattedAgainstVotes: number;
  formattedMinQuorum: number;
  formattedMinDiff: number;
  proposalCreated: number;
  strategy: string;
  ipfsHash: string;
  minimumQuorum: string;
  minimumDiff: string;
  totalCurrentVoters: number;
  totalVotingSupply: string;
  aip: number;
  votes?: Vote[] | undefined;
}

export interface ProposalParams {
  proposalId: string;
  proposalHash: string;
  vote: string;
}

export interface ProposalVoteParams extends ProposalParams {
  vote: string;
}

export interface IpfsPropsal {
  attributes?: IpfsMeta;
  body?: string;
  error?: string;
}
export interface IpfsMeta {
  title: string;
  author: string;
  created: string;
  discussions?: string;
  aip?: number;
  status?: string;
  updated?: string;
  requires?: number[];
}
