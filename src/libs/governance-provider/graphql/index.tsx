import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};

export type Executor = {
  __typename?: 'Executor';
  admin: Scalars['Bytes'];
  authorizationBlock: Scalars['BigInt'];
  authorizationTimestamp: Scalars['BigInt'];
  authorized: Scalars['Boolean'];
  executionDelay: Scalars['BigInt'];
  gracePeriod: Scalars['BigInt'];
  id: Scalars['ID'];
  minimumQuorum: Scalars['BigInt'];
  pendingAdmin?: Maybe<Scalars['Bytes']>;
  propositionThreshold: Scalars['BigInt'];
  voteDifferential: Scalars['BigInt'];
  votingDuration: Scalars['BigInt'];
};

export type Executor_Filter = {
  admin?: Maybe<Scalars['Bytes']>;
  admin_contains?: Maybe<Scalars['Bytes']>;
  admin_in?: Maybe<Array<Scalars['Bytes']>>;
  admin_not?: Maybe<Scalars['Bytes']>;
  admin_not_contains?: Maybe<Scalars['Bytes']>;
  admin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  authorizationBlock?: Maybe<Scalars['BigInt']>;
  authorizationBlock_gt?: Maybe<Scalars['BigInt']>;
  authorizationBlock_gte?: Maybe<Scalars['BigInt']>;
  authorizationBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  authorizationBlock_lt?: Maybe<Scalars['BigInt']>;
  authorizationBlock_lte?: Maybe<Scalars['BigInt']>;
  authorizationBlock_not?: Maybe<Scalars['BigInt']>;
  authorizationBlock_not_in?: Maybe<Array<Scalars['BigInt']>>;
  authorizationTimestamp?: Maybe<Scalars['BigInt']>;
  authorizationTimestamp_gt?: Maybe<Scalars['BigInt']>;
  authorizationTimestamp_gte?: Maybe<Scalars['BigInt']>;
  authorizationTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  authorizationTimestamp_lt?: Maybe<Scalars['BigInt']>;
  authorizationTimestamp_lte?: Maybe<Scalars['BigInt']>;
  authorizationTimestamp_not?: Maybe<Scalars['BigInt']>;
  authorizationTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  authorized?: Maybe<Scalars['Boolean']>;
  authorized_in?: Maybe<Array<Scalars['Boolean']>>;
  authorized_not?: Maybe<Scalars['Boolean']>;
  authorized_not_in?: Maybe<Array<Scalars['Boolean']>>;
  executionDelay?: Maybe<Scalars['BigInt']>;
  executionDelay_gt?: Maybe<Scalars['BigInt']>;
  executionDelay_gte?: Maybe<Scalars['BigInt']>;
  executionDelay_in?: Maybe<Array<Scalars['BigInt']>>;
  executionDelay_lt?: Maybe<Scalars['BigInt']>;
  executionDelay_lte?: Maybe<Scalars['BigInt']>;
  executionDelay_not?: Maybe<Scalars['BigInt']>;
  executionDelay_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gracePeriod?: Maybe<Scalars['BigInt']>;
  gracePeriod_gt?: Maybe<Scalars['BigInt']>;
  gracePeriod_gte?: Maybe<Scalars['BigInt']>;
  gracePeriod_in?: Maybe<Array<Scalars['BigInt']>>;
  gracePeriod_lt?: Maybe<Scalars['BigInt']>;
  gracePeriod_lte?: Maybe<Scalars['BigInt']>;
  gracePeriod_not?: Maybe<Scalars['BigInt']>;
  gracePeriod_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  minimumQuorum?: Maybe<Scalars['BigInt']>;
  minimumQuorum_gt?: Maybe<Scalars['BigInt']>;
  minimumQuorum_gte?: Maybe<Scalars['BigInt']>;
  minimumQuorum_in?: Maybe<Array<Scalars['BigInt']>>;
  minimumQuorum_lt?: Maybe<Scalars['BigInt']>;
  minimumQuorum_lte?: Maybe<Scalars['BigInt']>;
  minimumQuorum_not?: Maybe<Scalars['BigInt']>;
  minimumQuorum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pendingAdmin?: Maybe<Scalars['Bytes']>;
  pendingAdmin_contains?: Maybe<Scalars['Bytes']>;
  pendingAdmin_in?: Maybe<Array<Scalars['Bytes']>>;
  pendingAdmin_not?: Maybe<Scalars['Bytes']>;
  pendingAdmin_not_contains?: Maybe<Scalars['Bytes']>;
  pendingAdmin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  propositionThreshold?: Maybe<Scalars['BigInt']>;
  propositionThreshold_gt?: Maybe<Scalars['BigInt']>;
  propositionThreshold_gte?: Maybe<Scalars['BigInt']>;
  propositionThreshold_in?: Maybe<Array<Scalars['BigInt']>>;
  propositionThreshold_lt?: Maybe<Scalars['BigInt']>;
  propositionThreshold_lte?: Maybe<Scalars['BigInt']>;
  propositionThreshold_not?: Maybe<Scalars['BigInt']>;
  propositionThreshold_not_in?: Maybe<Array<Scalars['BigInt']>>;
  voteDifferential?: Maybe<Scalars['BigInt']>;
  voteDifferential_gt?: Maybe<Scalars['BigInt']>;
  voteDifferential_gte?: Maybe<Scalars['BigInt']>;
  voteDifferential_in?: Maybe<Array<Scalars['BigInt']>>;
  voteDifferential_lt?: Maybe<Scalars['BigInt']>;
  voteDifferential_lte?: Maybe<Scalars['BigInt']>;
  voteDifferential_not?: Maybe<Scalars['BigInt']>;
  voteDifferential_not_in?: Maybe<Array<Scalars['BigInt']>>;
  votingDuration?: Maybe<Scalars['BigInt']>;
  votingDuration_gt?: Maybe<Scalars['BigInt']>;
  votingDuration_gte?: Maybe<Scalars['BigInt']>;
  votingDuration_in?: Maybe<Array<Scalars['BigInt']>>;
  votingDuration_lt?: Maybe<Scalars['BigInt']>;
  votingDuration_lte?: Maybe<Scalars['BigInt']>;
  votingDuration_not?: Maybe<Scalars['BigInt']>;
  votingDuration_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Executor_OrderBy {
  Admin = 'admin',
  AuthorizationBlock = 'authorizationBlock',
  AuthorizationTimestamp = 'authorizationTimestamp',
  Authorized = 'authorized',
  ExecutionDelay = 'executionDelay',
  GracePeriod = 'gracePeriod',
  Id = 'id',
  MinimumQuorum = 'minimumQuorum',
  PendingAdmin = 'pendingAdmin',
  PropositionThreshold = 'propositionThreshold',
  VoteDifferential = 'voteDifferential',
  VotingDuration = 'votingDuration',
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Proposal = {
  __typename?: 'Proposal';
  aipNumber: Scalars['BigInt'];
  author: Scalars['String'];
  calldatas?: Maybe<Array<Scalars['Bytes']>>;
  createdBlockNumber: Scalars['BigInt'];
  createdTimestamp: Scalars['Int'];
  creator: Scalars['Bytes'];
  currentNoVote: Scalars['BigInt'];
  currentYesVote: Scalars['BigInt'];
  discussions: Scalars['String'];
  endBlock: Scalars['BigInt'];
  executionTime?: Maybe<Scalars['BigInt']>;
  executor?: Maybe<Executor>;
  govContract: Scalars['Bytes'];
  governanceStrategy: Scalars['Bytes'];
  /**
   * proposal id
   *
   */
  id: Scalars['ID'];
  initiatorExecution?: Maybe<Scalars['Bytes']>;
  initiatorQueueing?: Maybe<Scalars['Bytes']>;
  ipfsHash: Scalars['String'];
  lastUpdateBlock: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['Int'];
  shortDescription: Scalars['String'];
  signatures?: Maybe<Array<Scalars['String']>>;
  startBlock: Scalars['BigInt'];
  state: ProposalState;
  targets?: Maybe<Array<Scalars['Bytes']>>;
  title: Scalars['String'];
  totalCurrentVoters: Scalars['Int'];
  totalPropositionSupply: Scalars['BigInt'];
  totalVotingSupply: Scalars['BigInt'];
  values?: Maybe<Array<Scalars['BigInt']>>;
  votes: Array<Vote>;
  winner: Winner;
  withDelegatecalls?: Maybe<Array<Scalars['Boolean']>>;
};

export type ProposalVotesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vote_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Vote_Filter>;
};

export enum ProposalState {
  Active = 'Active',
  Canceled = 'Canceled',
  Executed = 'Executed',
  Failed = 'Failed',
  Pending = 'Pending',
  Queued = 'Queued',
  Succeeded = 'Succeeded',
}

export type Proposal_Filter = {
  aipNumber?: Maybe<Scalars['BigInt']>;
  aipNumber_gt?: Maybe<Scalars['BigInt']>;
  aipNumber_gte?: Maybe<Scalars['BigInt']>;
  aipNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  aipNumber_lt?: Maybe<Scalars['BigInt']>;
  aipNumber_lte?: Maybe<Scalars['BigInt']>;
  aipNumber_not?: Maybe<Scalars['BigInt']>;
  aipNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  author?: Maybe<Scalars['String']>;
  author_contains?: Maybe<Scalars['String']>;
  author_ends_with?: Maybe<Scalars['String']>;
  author_gt?: Maybe<Scalars['String']>;
  author_gte?: Maybe<Scalars['String']>;
  author_in?: Maybe<Array<Scalars['String']>>;
  author_lt?: Maybe<Scalars['String']>;
  author_lte?: Maybe<Scalars['String']>;
  author_not?: Maybe<Scalars['String']>;
  author_not_contains?: Maybe<Scalars['String']>;
  author_not_ends_with?: Maybe<Scalars['String']>;
  author_not_in?: Maybe<Array<Scalars['String']>>;
  author_not_starts_with?: Maybe<Scalars['String']>;
  author_starts_with?: Maybe<Scalars['String']>;
  calldatas?: Maybe<Array<Scalars['Bytes']>>;
  calldatas_contains?: Maybe<Array<Scalars['Bytes']>>;
  calldatas_not?: Maybe<Array<Scalars['Bytes']>>;
  calldatas_not_contains?: Maybe<Array<Scalars['Bytes']>>;
  createdBlockNumber?: Maybe<Scalars['BigInt']>;
  createdBlockNumber_gt?: Maybe<Scalars['BigInt']>;
  createdBlockNumber_gte?: Maybe<Scalars['BigInt']>;
  createdBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  createdBlockNumber_lt?: Maybe<Scalars['BigInt']>;
  createdBlockNumber_lte?: Maybe<Scalars['BigInt']>;
  createdBlockNumber_not?: Maybe<Scalars['BigInt']>;
  createdBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  createdTimestamp?: Maybe<Scalars['Int']>;
  createdTimestamp_gt?: Maybe<Scalars['Int']>;
  createdTimestamp_gte?: Maybe<Scalars['Int']>;
  createdTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  createdTimestamp_lt?: Maybe<Scalars['Int']>;
  createdTimestamp_lte?: Maybe<Scalars['Int']>;
  createdTimestamp_not?: Maybe<Scalars['Int']>;
  createdTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  creator?: Maybe<Scalars['Bytes']>;
  creator_contains?: Maybe<Scalars['Bytes']>;
  creator_in?: Maybe<Array<Scalars['Bytes']>>;
  creator_not?: Maybe<Scalars['Bytes']>;
  creator_not_contains?: Maybe<Scalars['Bytes']>;
  creator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  currentNoVote?: Maybe<Scalars['BigInt']>;
  currentNoVote_gt?: Maybe<Scalars['BigInt']>;
  currentNoVote_gte?: Maybe<Scalars['BigInt']>;
  currentNoVote_in?: Maybe<Array<Scalars['BigInt']>>;
  currentNoVote_lt?: Maybe<Scalars['BigInt']>;
  currentNoVote_lte?: Maybe<Scalars['BigInt']>;
  currentNoVote_not?: Maybe<Scalars['BigInt']>;
  currentNoVote_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentYesVote?: Maybe<Scalars['BigInt']>;
  currentYesVote_gt?: Maybe<Scalars['BigInt']>;
  currentYesVote_gte?: Maybe<Scalars['BigInt']>;
  currentYesVote_in?: Maybe<Array<Scalars['BigInt']>>;
  currentYesVote_lt?: Maybe<Scalars['BigInt']>;
  currentYesVote_lte?: Maybe<Scalars['BigInt']>;
  currentYesVote_not?: Maybe<Scalars['BigInt']>;
  currentYesVote_not_in?: Maybe<Array<Scalars['BigInt']>>;
  discussions?: Maybe<Scalars['String']>;
  discussions_contains?: Maybe<Scalars['String']>;
  discussions_ends_with?: Maybe<Scalars['String']>;
  discussions_gt?: Maybe<Scalars['String']>;
  discussions_gte?: Maybe<Scalars['String']>;
  discussions_in?: Maybe<Array<Scalars['String']>>;
  discussions_lt?: Maybe<Scalars['String']>;
  discussions_lte?: Maybe<Scalars['String']>;
  discussions_not?: Maybe<Scalars['String']>;
  discussions_not_contains?: Maybe<Scalars['String']>;
  discussions_not_ends_with?: Maybe<Scalars['String']>;
  discussions_not_in?: Maybe<Array<Scalars['String']>>;
  discussions_not_starts_with?: Maybe<Scalars['String']>;
  discussions_starts_with?: Maybe<Scalars['String']>;
  endBlock?: Maybe<Scalars['BigInt']>;
  endBlock_gt?: Maybe<Scalars['BigInt']>;
  endBlock_gte?: Maybe<Scalars['BigInt']>;
  endBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  endBlock_lt?: Maybe<Scalars['BigInt']>;
  endBlock_lte?: Maybe<Scalars['BigInt']>;
  endBlock_not?: Maybe<Scalars['BigInt']>;
  endBlock_not_in?: Maybe<Array<Scalars['BigInt']>>;
  executionTime?: Maybe<Scalars['BigInt']>;
  executionTime_gt?: Maybe<Scalars['BigInt']>;
  executionTime_gte?: Maybe<Scalars['BigInt']>;
  executionTime_in?: Maybe<Array<Scalars['BigInt']>>;
  executionTime_lt?: Maybe<Scalars['BigInt']>;
  executionTime_lte?: Maybe<Scalars['BigInt']>;
  executionTime_not?: Maybe<Scalars['BigInt']>;
  executionTime_not_in?: Maybe<Array<Scalars['BigInt']>>;
  executor?: Maybe<Scalars['String']>;
  executor_contains?: Maybe<Scalars['String']>;
  executor_ends_with?: Maybe<Scalars['String']>;
  executor_gt?: Maybe<Scalars['String']>;
  executor_gte?: Maybe<Scalars['String']>;
  executor_in?: Maybe<Array<Scalars['String']>>;
  executor_lt?: Maybe<Scalars['String']>;
  executor_lte?: Maybe<Scalars['String']>;
  executor_not?: Maybe<Scalars['String']>;
  executor_not_contains?: Maybe<Scalars['String']>;
  executor_not_ends_with?: Maybe<Scalars['String']>;
  executor_not_in?: Maybe<Array<Scalars['String']>>;
  executor_not_starts_with?: Maybe<Scalars['String']>;
  executor_starts_with?: Maybe<Scalars['String']>;
  govContract?: Maybe<Scalars['Bytes']>;
  govContract_contains?: Maybe<Scalars['Bytes']>;
  govContract_in?: Maybe<Array<Scalars['Bytes']>>;
  govContract_not?: Maybe<Scalars['Bytes']>;
  govContract_not_contains?: Maybe<Scalars['Bytes']>;
  govContract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  governanceStrategy?: Maybe<Scalars['Bytes']>;
  governanceStrategy_contains?: Maybe<Scalars['Bytes']>;
  governanceStrategy_in?: Maybe<Array<Scalars['Bytes']>>;
  governanceStrategy_not?: Maybe<Scalars['Bytes']>;
  governanceStrategy_not_contains?: Maybe<Scalars['Bytes']>;
  governanceStrategy_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  initiatorExecution?: Maybe<Scalars['Bytes']>;
  initiatorExecution_contains?: Maybe<Scalars['Bytes']>;
  initiatorExecution_in?: Maybe<Array<Scalars['Bytes']>>;
  initiatorExecution_not?: Maybe<Scalars['Bytes']>;
  initiatorExecution_not_contains?: Maybe<Scalars['Bytes']>;
  initiatorExecution_not_in?: Maybe<Array<Scalars['Bytes']>>;
  initiatorQueueing?: Maybe<Scalars['Bytes']>;
  initiatorQueueing_contains?: Maybe<Scalars['Bytes']>;
  initiatorQueueing_in?: Maybe<Array<Scalars['Bytes']>>;
  initiatorQueueing_not?: Maybe<Scalars['Bytes']>;
  initiatorQueueing_not_contains?: Maybe<Scalars['Bytes']>;
  initiatorQueueing_not_in?: Maybe<Array<Scalars['Bytes']>>;
  ipfsHash?: Maybe<Scalars['String']>;
  ipfsHash_contains?: Maybe<Scalars['String']>;
  ipfsHash_ends_with?: Maybe<Scalars['String']>;
  ipfsHash_gt?: Maybe<Scalars['String']>;
  ipfsHash_gte?: Maybe<Scalars['String']>;
  ipfsHash_in?: Maybe<Array<Scalars['String']>>;
  ipfsHash_lt?: Maybe<Scalars['String']>;
  ipfsHash_lte?: Maybe<Scalars['String']>;
  ipfsHash_not?: Maybe<Scalars['String']>;
  ipfsHash_not_contains?: Maybe<Scalars['String']>;
  ipfsHash_not_ends_with?: Maybe<Scalars['String']>;
  ipfsHash_not_in?: Maybe<Array<Scalars['String']>>;
  ipfsHash_not_starts_with?: Maybe<Scalars['String']>;
  ipfsHash_starts_with?: Maybe<Scalars['String']>;
  lastUpdateBlock?: Maybe<Scalars['BigInt']>;
  lastUpdateBlock_gt?: Maybe<Scalars['BigInt']>;
  lastUpdateBlock_gte?: Maybe<Scalars['BigInt']>;
  lastUpdateBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  lastUpdateBlock_lt?: Maybe<Scalars['BigInt']>;
  lastUpdateBlock_lte?: Maybe<Scalars['BigInt']>;
  lastUpdateBlock_not?: Maybe<Scalars['BigInt']>;
  lastUpdateBlock_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  shortDescription?: Maybe<Scalars['String']>;
  shortDescription_contains?: Maybe<Scalars['String']>;
  shortDescription_ends_with?: Maybe<Scalars['String']>;
  shortDescription_gt?: Maybe<Scalars['String']>;
  shortDescription_gte?: Maybe<Scalars['String']>;
  shortDescription_in?: Maybe<Array<Scalars['String']>>;
  shortDescription_lt?: Maybe<Scalars['String']>;
  shortDescription_lte?: Maybe<Scalars['String']>;
  shortDescription_not?: Maybe<Scalars['String']>;
  shortDescription_not_contains?: Maybe<Scalars['String']>;
  shortDescription_not_ends_with?: Maybe<Scalars['String']>;
  shortDescription_not_in?: Maybe<Array<Scalars['String']>>;
  shortDescription_not_starts_with?: Maybe<Scalars['String']>;
  shortDescription_starts_with?: Maybe<Scalars['String']>;
  signatures?: Maybe<Array<Scalars['String']>>;
  signatures_contains?: Maybe<Array<Scalars['String']>>;
  signatures_not?: Maybe<Array<Scalars['String']>>;
  signatures_not_contains?: Maybe<Array<Scalars['String']>>;
  startBlock?: Maybe<Scalars['BigInt']>;
  startBlock_gt?: Maybe<Scalars['BigInt']>;
  startBlock_gte?: Maybe<Scalars['BigInt']>;
  startBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  startBlock_lt?: Maybe<Scalars['BigInt']>;
  startBlock_lte?: Maybe<Scalars['BigInt']>;
  startBlock_not?: Maybe<Scalars['BigInt']>;
  startBlock_not_in?: Maybe<Array<Scalars['BigInt']>>;
  state?: Maybe<ProposalState>;
  state_in?: Maybe<Array<ProposalState>>;
  state_not?: Maybe<ProposalState>;
  state_not_in?: Maybe<Array<ProposalState>>;
  targets?: Maybe<Array<Scalars['Bytes']>>;
  targets_contains?: Maybe<Array<Scalars['Bytes']>>;
  targets_not?: Maybe<Array<Scalars['Bytes']>>;
  targets_not_contains?: Maybe<Array<Scalars['Bytes']>>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_ends_with?: Maybe<Scalars['String']>;
  title_gt?: Maybe<Scalars['String']>;
  title_gte?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_lt?: Maybe<Scalars['String']>;
  title_lte?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_ends_with?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Scalars['String']>>;
  title_not_starts_with?: Maybe<Scalars['String']>;
  title_starts_with?: Maybe<Scalars['String']>;
  totalCurrentVoters?: Maybe<Scalars['Int']>;
  totalCurrentVoters_gt?: Maybe<Scalars['Int']>;
  totalCurrentVoters_gte?: Maybe<Scalars['Int']>;
  totalCurrentVoters_in?: Maybe<Array<Scalars['Int']>>;
  totalCurrentVoters_lt?: Maybe<Scalars['Int']>;
  totalCurrentVoters_lte?: Maybe<Scalars['Int']>;
  totalCurrentVoters_not?: Maybe<Scalars['Int']>;
  totalCurrentVoters_not_in?: Maybe<Array<Scalars['Int']>>;
  totalPropositionSupply?: Maybe<Scalars['BigInt']>;
  totalPropositionSupply_gt?: Maybe<Scalars['BigInt']>;
  totalPropositionSupply_gte?: Maybe<Scalars['BigInt']>;
  totalPropositionSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPropositionSupply_lt?: Maybe<Scalars['BigInt']>;
  totalPropositionSupply_lte?: Maybe<Scalars['BigInt']>;
  totalPropositionSupply_not?: Maybe<Scalars['BigInt']>;
  totalPropositionSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalVotingSupply?: Maybe<Scalars['BigInt']>;
  totalVotingSupply_gt?: Maybe<Scalars['BigInt']>;
  totalVotingSupply_gte?: Maybe<Scalars['BigInt']>;
  totalVotingSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalVotingSupply_lt?: Maybe<Scalars['BigInt']>;
  totalVotingSupply_lte?: Maybe<Scalars['BigInt']>;
  totalVotingSupply_not?: Maybe<Scalars['BigInt']>;
  totalVotingSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  values?: Maybe<Array<Scalars['BigInt']>>;
  values_contains?: Maybe<Array<Scalars['BigInt']>>;
  values_not?: Maybe<Array<Scalars['BigInt']>>;
  values_not_contains?: Maybe<Array<Scalars['BigInt']>>;
  winner?: Maybe<Winner>;
  winner_in?: Maybe<Array<Winner>>;
  winner_not?: Maybe<Winner>;
  winner_not_in?: Maybe<Array<Winner>>;
  withDelegatecalls?: Maybe<Array<Scalars['Boolean']>>;
  withDelegatecalls_contains?: Maybe<Array<Scalars['Boolean']>>;
  withDelegatecalls_not?: Maybe<Array<Scalars['Boolean']>>;
  withDelegatecalls_not_contains?: Maybe<Array<Scalars['Boolean']>>;
};

export enum Proposal_OrderBy {
  AipNumber = 'aipNumber',
  Author = 'author',
  Calldatas = 'calldatas',
  CreatedBlockNumber = 'createdBlockNumber',
  CreatedTimestamp = 'createdTimestamp',
  Creator = 'creator',
  CurrentNoVote = 'currentNoVote',
  CurrentYesVote = 'currentYesVote',
  Discussions = 'discussions',
  EndBlock = 'endBlock',
  ExecutionTime = 'executionTime',
  Executor = 'executor',
  GovContract = 'govContract',
  GovernanceStrategy = 'governanceStrategy',
  Id = 'id',
  InitiatorExecution = 'initiatorExecution',
  InitiatorQueueing = 'initiatorQueueing',
  IpfsHash = 'ipfsHash',
  LastUpdateBlock = 'lastUpdateBlock',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  ShortDescription = 'shortDescription',
  Signatures = 'signatures',
  StartBlock = 'startBlock',
  State = 'state',
  Targets = 'targets',
  Title = 'title',
  TotalCurrentVoters = 'totalCurrentVoters',
  TotalPropositionSupply = 'totalPropositionSupply',
  TotalVotingSupply = 'totalVotingSupply',
  Values = 'values',
  Votes = 'votes',
  Winner = 'winner',
  WithDelegatecalls = 'withDelegatecalls',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  executor?: Maybe<Executor>;
  executors: Array<Executor>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};

export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type QueryExecutorArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExecutorsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Executor_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Executor_Filter>;
};

export type QueryProposalArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Proposal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Proposal_Filter>;
};

export type QueryVoteArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVotesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vote_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Vote_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  executor?: Maybe<Executor>;
  executors: Array<Executor>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};

export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type SubscriptionExecutorArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExecutorsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Executor_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Executor_Filter>;
};

export type SubscriptionProposalArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Proposal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Proposal_Filter>;
};

export type SubscriptionVoteArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVotesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vote_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Vote_Filter>;
};

export type Vote = {
  __typename?: 'Vote';
  /**
   * voter:proposalid
   *
   */
  id: Scalars['ID'];
  proposal: Proposal;
  support: Scalars['Boolean'];
  timestamp: Scalars['Int'];
  voter: Scalars['Bytes'];
  votingPower: Scalars['BigInt'];
};

export type Vote_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  proposal?: Maybe<Scalars['String']>;
  proposal_contains?: Maybe<Scalars['String']>;
  proposal_ends_with?: Maybe<Scalars['String']>;
  proposal_gt?: Maybe<Scalars['String']>;
  proposal_gte?: Maybe<Scalars['String']>;
  proposal_in?: Maybe<Array<Scalars['String']>>;
  proposal_lt?: Maybe<Scalars['String']>;
  proposal_lte?: Maybe<Scalars['String']>;
  proposal_not?: Maybe<Scalars['String']>;
  proposal_not_contains?: Maybe<Scalars['String']>;
  proposal_not_ends_with?: Maybe<Scalars['String']>;
  proposal_not_in?: Maybe<Array<Scalars['String']>>;
  proposal_not_starts_with?: Maybe<Scalars['String']>;
  proposal_starts_with?: Maybe<Scalars['String']>;
  support?: Maybe<Scalars['Boolean']>;
  support_in?: Maybe<Array<Scalars['Boolean']>>;
  support_not?: Maybe<Scalars['Boolean']>;
  support_not_in?: Maybe<Array<Scalars['Boolean']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  voter?: Maybe<Scalars['Bytes']>;
  voter_contains?: Maybe<Scalars['Bytes']>;
  voter_in?: Maybe<Array<Scalars['Bytes']>>;
  voter_not?: Maybe<Scalars['Bytes']>;
  voter_not_contains?: Maybe<Scalars['Bytes']>;
  voter_not_in?: Maybe<Array<Scalars['Bytes']>>;
  votingPower?: Maybe<Scalars['BigInt']>;
  votingPower_gt?: Maybe<Scalars['BigInt']>;
  votingPower_gte?: Maybe<Scalars['BigInt']>;
  votingPower_in?: Maybe<Array<Scalars['BigInt']>>;
  votingPower_lt?: Maybe<Scalars['BigInt']>;
  votingPower_lte?: Maybe<Scalars['BigInt']>;
  votingPower_not?: Maybe<Scalars['BigInt']>;
  votingPower_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Vote_OrderBy {
  Id = 'id',
  Proposal = 'proposal',
  Support = 'support',
  Timestamp = 'timestamp',
  Voter = 'voter',
  VotingPower = 'votingPower',
}

export enum Winner {
  Abstain = 'Abstain',
  Na = 'Na',
  No = 'No',
  Yes = 'Yes',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GovernanceProposalsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type GovernanceProposalsSubscription = {
  __typename?: 'Subscription';
  proposals: Array<{
    __typename?: 'Proposal';
    id: string;
    state: ProposalState;
    ipfsHash: string;
    creator: any;
    aipNumber: any;
    totalVotingSupply: any;
    totalPropositionSupply: any;
    totalCurrentVoters: number;
    targets?: Array<any> | null | undefined;
    values?: Array<any> | null | undefined;
    signatures?: Array<string> | null | undefined;
    calldatas?: Array<any> | null | undefined;
    withDelegatecalls?: Array<boolean> | null | undefined;
    startBlock: any;
    endBlock: any;
    governanceStrategy: any;
    currentYesVote: any;
    currentNoVote: any;
    winner: Winner;
    createdTimestamp: number;
    executionTime?: any | null | undefined;
    initiatorQueueing?: any | null | undefined;
    initiatorExecution?: any | null | undefined;
    lastUpdateTimestamp: number;
    lastUpdateBlock: any;
    title: string;
    shortDescription: string;
    createdBlockNumber: any;
    executor?:
      | {
          __typename?: 'Executor';
          id: string;
          authorized: boolean;
          propositionThreshold: any;
          votingDuration: any;
          voteDifferential: any;
          minimumQuorum: any;
          gracePeriod: any;
          executionDelay: any;
          admin: any;
          authorizationBlock: any;
          authorizationTimestamp: any;
          pendingAdmin?: any | null | undefined;
        }
      | null
      | undefined;
  }>;
};

export type GetVoteByUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetVoteByUserQuery = {
  __typename?: 'Query';
  vote?:
    | {
        __typename?: 'Vote';
        voter: any;
        id: string;
        support: boolean;
        votingPower: any;
        timestamp: number;
        proposal: { __typename?: 'Proposal'; id: string };
      }
    | null
    | undefined;
};

export type GetTopVotersSubscriptionVariables = Exact<{
  proposalId: Scalars['String'];
  first: Scalars['Int'];
  support: Scalars['Boolean'];
}>;

export type GetTopVotersSubscription = {
  __typename?: 'Subscription';
  votes: Array<{
    __typename?: 'Vote';
    voter: any;
    support: boolean;
    votingPower: any;
    id: string;
    timestamp: number;
  }>;
};

export const GovernanceProposalsDocument = gql`
  subscription GovernanceProposals {
    proposals {
      id
      state
      ipfsHash
      creator
      aipNumber
      totalVotingSupply
      totalPropositionSupply
      executor {
        id
        authorized
        propositionThreshold
        votingDuration
        voteDifferential
        minimumQuorum
        gracePeriod
        executionDelay
        admin
        authorizationBlock
        authorizationTimestamp
        pendingAdmin
      }
      totalCurrentVoters
      targets
      values
      signatures
      calldatas
      withDelegatecalls
      startBlock
      endBlock
      governanceStrategy
      currentYesVote
      currentNoVote
      winner
      createdTimestamp
      executionTime
      initiatorQueueing
      initiatorExecution
      lastUpdateTimestamp
      lastUpdateBlock
      title
      shortDescription
      createdBlockNumber
    }
  }
`;

/**
 * __useGovernanceProposalsSubscription__
 *
 * To run a query within a React component, call `useGovernanceProposalsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGovernanceProposalsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGovernanceProposalsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGovernanceProposalsSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    GovernanceProposalsSubscription,
    GovernanceProposalsSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    GovernanceProposalsSubscription,
    GovernanceProposalsSubscriptionVariables
  >(GovernanceProposalsDocument, options);
}
export type GovernanceProposalsSubscriptionHookResult = ReturnType<
  typeof useGovernanceProposalsSubscription
>;
export type GovernanceProposalsSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<GovernanceProposalsSubscription>;
export const GetVoteByUserDocument = gql`
  query GetVoteByUser($id: ID!) {
    vote(id: $id) {
      voter
      id
      proposal {
        id
      }
      support
      votingPower
      timestamp
    }
  }
`;

/**
 * __useGetVoteByUserQuery__
 *
 * To run a query within a React component, call `useGetVoteByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteByUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVoteByUserQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<GetVoteByUserQuery, GetVoteByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetVoteByUserQuery, GetVoteByUserQueryVariables>(
    GetVoteByUserDocument,
    options
  );
}
export function useGetVoteByUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetVoteByUserQuery,
    GetVoteByUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetVoteByUserQuery, GetVoteByUserQueryVariables>(
    GetVoteByUserDocument,
    options
  );
}
export type GetVoteByUserQueryHookResult = ReturnType<typeof useGetVoteByUserQuery>;
export type GetVoteByUserLazyQueryHookResult = ReturnType<typeof useGetVoteByUserLazyQuery>;
export type GetVoteByUserQueryResult = ApolloReactCommon.QueryResult<
  GetVoteByUserQuery,
  GetVoteByUserQueryVariables
>;
export const GetTopVotersDocument = gql`
  subscription GetTopVoters($proposalId: String!, $first: Int!, $support: Boolean!) {
    votes(
      first: $first
      where: { proposal: $proposalId, support: $support }
      orderBy: votingPower
      orderDirection: desc
    ) {
      voter
      support
      votingPower
      id
      timestamp
    }
  }
`;

/**
 * __useGetTopVotersSubscription__
 *
 * To run a query within a React component, call `useGetTopVotersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetTopVotersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopVotersSubscription({
 *   variables: {
 *      proposalId: // value for 'proposalId'
 *      first: // value for 'first'
 *      support: // value for 'support'
 *   },
 * });
 */
export function useGetTopVotersSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    GetTopVotersSubscription,
    GetTopVotersSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    GetTopVotersSubscription,
    GetTopVotersSubscriptionVariables
  >(GetTopVotersDocument, options);
}
export type GetTopVotersSubscriptionHookResult = ReturnType<typeof useGetTopVotersSubscription>;
export type GetTopVotersSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<GetTopVotersSubscription>;
