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

export type AToken = {
  __typename?: 'AToken';
  /** AToken address */
  id: Scalars['ID'];
  pool: Pool;
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
  tokenContractImpl: Scalars['Bytes'];
};

export type ATokenBalanceHistoryItem = {
  __typename?: 'ATokenBalanceHistoryItem';
  /** userReserve + txHash */
  id: Scalars['ID'];
  userReserve: UserReserve;
  timestamp: Scalars['Int'];
  scaledATokenBalance: Scalars['BigInt'];
  currentATokenBalance: Scalars['BigInt'];
  index: Scalars['BigInt'];
};

export type ATokenBalanceHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  scaledATokenBalance?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_not?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentATokenBalance?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_not?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  currentATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  index?: Maybe<Scalars['BigInt']>;
  index_not?: Maybe<Scalars['BigInt']>;
  index_gt?: Maybe<Scalars['BigInt']>;
  index_lt?: Maybe<Scalars['BigInt']>;
  index_gte?: Maybe<Scalars['BigInt']>;
  index_lte?: Maybe<Scalars['BigInt']>;
  index_in?: Maybe<Array<Scalars['BigInt']>>;
  index_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ATokenBalanceHistoryItem_OrderBy {
  Id = 'id',
  UserReserve = 'userReserve',
  Timestamp = 'timestamp',
  ScaledATokenBalance = 'scaledATokenBalance',
  CurrentATokenBalance = 'currentATokenBalance',
  Index = 'index',
}

export type AToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
  tokenContractImpl?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_contains?: Maybe<Scalars['Bytes']>;
};

export enum AToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
  TokenContractImpl = 'tokenContractImpl',
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export type Borrow = UserTransaction & {
  __typename?: 'Borrow';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  onBehalfOf: User;
  reserve: Reserve;
  userReserve: UserReserve;
  amount: Scalars['BigInt'];
  borrowRate: Scalars['BigInt'];
  borrowRateMode: BorrowRateMode;
  referrer?: Maybe<Referrer>;
  timestamp: Scalars['Int'];
  stableTokenDebt: Scalars['BigInt'];
  variableTokenDebt: Scalars['BigInt'];
};

export enum BorrowRateMode {
  None = 'None',
  Stable = 'Stable',
  Variable = 'Variable',
}

export type Borrow_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRate?: Maybe<Scalars['BigInt']>;
  borrowRate_not?: Maybe<Scalars['BigInt']>;
  borrowRate_gt?: Maybe<Scalars['BigInt']>;
  borrowRate_lt?: Maybe<Scalars['BigInt']>;
  borrowRate_gte?: Maybe<Scalars['BigInt']>;
  borrowRate_lte?: Maybe<Scalars['BigInt']>;
  borrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRateMode?: Maybe<BorrowRateMode>;
  borrowRateMode_not?: Maybe<BorrowRateMode>;
  referrer?: Maybe<Scalars['String']>;
  referrer_not?: Maybe<Scalars['String']>;
  referrer_gt?: Maybe<Scalars['String']>;
  referrer_lt?: Maybe<Scalars['String']>;
  referrer_gte?: Maybe<Scalars['String']>;
  referrer_lte?: Maybe<Scalars['String']>;
  referrer_in?: Maybe<Array<Scalars['String']>>;
  referrer_not_in?: Maybe<Array<Scalars['String']>>;
  referrer_contains?: Maybe<Scalars['String']>;
  referrer_not_contains?: Maybe<Scalars['String']>;
  referrer_starts_with?: Maybe<Scalars['String']>;
  referrer_not_starts_with?: Maybe<Scalars['String']>;
  referrer_ends_with?: Maybe<Scalars['String']>;
  referrer_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  stableTokenDebt?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_not?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_gt?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_lt?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_gte?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_lte?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  stableTokenDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableTokenDebt?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_not?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_gt?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_lt?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_gte?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_lte?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  variableTokenDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Borrow_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  OnBehalfOf = 'onBehalfOf',
  Reserve = 'reserve',
  UserReserve = 'userReserve',
  Amount = 'amount',
  BorrowRate = 'borrowRate',
  BorrowRateMode = 'borrowRateMode',
  Referrer = 'referrer',
  Timestamp = 'timestamp',
  StableTokenDebt = 'stableTokenDebt',
  VariableTokenDebt = 'variableTokenDebt',
}

export type ChainlinkAggregator = {
  __typename?: 'ChainlinkAggregator';
  id: Scalars['ID'];
  oracleAsset: PriceOracleAsset;
};

export type ChainlinkAggregator_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  oracleAsset?: Maybe<Scalars['String']>;
  oracleAsset_not?: Maybe<Scalars['String']>;
  oracleAsset_gt?: Maybe<Scalars['String']>;
  oracleAsset_lt?: Maybe<Scalars['String']>;
  oracleAsset_gte?: Maybe<Scalars['String']>;
  oracleAsset_lte?: Maybe<Scalars['String']>;
  oracleAsset_in?: Maybe<Array<Scalars['String']>>;
  oracleAsset_not_in?: Maybe<Array<Scalars['String']>>;
  oracleAsset_contains?: Maybe<Scalars['String']>;
  oracleAsset_not_contains?: Maybe<Scalars['String']>;
  oracleAsset_starts_with?: Maybe<Scalars['String']>;
  oracleAsset_not_starts_with?: Maybe<Scalars['String']>;
  oracleAsset_ends_with?: Maybe<Scalars['String']>;
  oracleAsset_not_ends_with?: Maybe<Scalars['String']>;
};

export enum ChainlinkAggregator_OrderBy {
  Id = 'id',
  OracleAsset = 'oracleAsset',
}

export type ChainlinkEns = {
  __typename?: 'ChainlinkENS';
  /** id is the node hash */
  id: Scalars['ID'];
  /** address of the aggregator */
  aggregatorAddress: Scalars['Bytes'];
  /** token address represented with this aggregator */
  underlyingAddress: Scalars['Bytes'];
  /** symbol of the token represented on the aggregator */
  symbol: Scalars['String'];
};

export type ChainlinkEns_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  aggregatorAddress?: Maybe<Scalars['Bytes']>;
  aggregatorAddress_not?: Maybe<Scalars['Bytes']>;
  aggregatorAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  aggregatorAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  aggregatorAddress_contains?: Maybe<Scalars['Bytes']>;
  aggregatorAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAddress?: Maybe<Scalars['Bytes']>;
  underlyingAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAddress_not_contains?: Maybe<Scalars['Bytes']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
};

export enum ChainlinkEns_OrderBy {
  Id = 'id',
  AggregatorAddress = 'aggregatorAddress',
  UnderlyingAddress = 'underlyingAddress',
  Symbol = 'symbol',
}

export type ClaimIncentiveCall = {
  __typename?: 'ClaimIncentiveCall';
  /** txHash */
  id: Scalars['ID'];
  incentivesController: IncentivesController;
  user: User;
  amount: Scalars['BigInt'];
};

export type ClaimIncentiveCall_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  incentivesController?: Maybe<Scalars['String']>;
  incentivesController_not?: Maybe<Scalars['String']>;
  incentivesController_gt?: Maybe<Scalars['String']>;
  incentivesController_lt?: Maybe<Scalars['String']>;
  incentivesController_gte?: Maybe<Scalars['String']>;
  incentivesController_lte?: Maybe<Scalars['String']>;
  incentivesController_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_not_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_contains?: Maybe<Scalars['String']>;
  incentivesController_not_contains?: Maybe<Scalars['String']>;
  incentivesController_starts_with?: Maybe<Scalars['String']>;
  incentivesController_not_starts_with?: Maybe<Scalars['String']>;
  incentivesController_ends_with?: Maybe<Scalars['String']>;
  incentivesController_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ClaimIncentiveCall_OrderBy {
  Id = 'id',
  IncentivesController = 'incentivesController',
  User = 'user',
  Amount = 'amount',
}

export type ContractToPoolMapping = {
  __typename?: 'ContractToPoolMapping';
  id: Scalars['ID'];
  pool: Pool;
};

export type ContractToPoolMapping_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
};

export enum ContractToPoolMapping_OrderBy {
  Id = 'id',
  Pool = 'pool',
}

export type Deposit = UserTransaction & {
  __typename?: 'Deposit';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  onBehalfOf: User;
  reserve: Reserve;
  userReserve: UserReserve;
  amount: Scalars['BigInt'];
  referrer?: Maybe<Referrer>;
  timestamp: Scalars['Int'];
};

export type Deposit_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  referrer?: Maybe<Scalars['String']>;
  referrer_not?: Maybe<Scalars['String']>;
  referrer_gt?: Maybe<Scalars['String']>;
  referrer_lt?: Maybe<Scalars['String']>;
  referrer_gte?: Maybe<Scalars['String']>;
  referrer_lte?: Maybe<Scalars['String']>;
  referrer_in?: Maybe<Array<Scalars['String']>>;
  referrer_not_in?: Maybe<Array<Scalars['String']>>;
  referrer_contains?: Maybe<Scalars['String']>;
  referrer_not_contains?: Maybe<Scalars['String']>;
  referrer_starts_with?: Maybe<Scalars['String']>;
  referrer_not_starts_with?: Maybe<Scalars['String']>;
  referrer_ends_with?: Maybe<Scalars['String']>;
  referrer_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum Deposit_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  OnBehalfOf = 'onBehalfOf',
  Reserve = 'reserve',
  UserReserve = 'userReserve',
  Amount = 'amount',
  Referrer = 'referrer',
  Timestamp = 'timestamp',
}

export type FlashLoan = {
  __typename?: 'FlashLoan';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  reserve: Reserve;
  target: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  totalFee: Scalars['BigInt'];
  initiator: User;
  timestamp: Scalars['Int'];
};

export type FlashLoan_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['Bytes']>;
  target_not?: Maybe<Scalars['Bytes']>;
  target_in?: Maybe<Array<Scalars['Bytes']>>;
  target_not_in?: Maybe<Array<Scalars['Bytes']>>;
  target_contains?: Maybe<Scalars['Bytes']>;
  target_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFee?: Maybe<Scalars['BigInt']>;
  totalFee_not?: Maybe<Scalars['BigInt']>;
  totalFee_gt?: Maybe<Scalars['BigInt']>;
  totalFee_lt?: Maybe<Scalars['BigInt']>;
  totalFee_gte?: Maybe<Scalars['BigInt']>;
  totalFee_lte?: Maybe<Scalars['BigInt']>;
  totalFee_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  initiator?: Maybe<Scalars['String']>;
  initiator_not?: Maybe<Scalars['String']>;
  initiator_gt?: Maybe<Scalars['String']>;
  initiator_lt?: Maybe<Scalars['String']>;
  initiator_gte?: Maybe<Scalars['String']>;
  initiator_lte?: Maybe<Scalars['String']>;
  initiator_in?: Maybe<Array<Scalars['String']>>;
  initiator_not_in?: Maybe<Array<Scalars['String']>>;
  initiator_contains?: Maybe<Scalars['String']>;
  initiator_not_contains?: Maybe<Scalars['String']>;
  initiator_starts_with?: Maybe<Scalars['String']>;
  initiator_not_starts_with?: Maybe<Scalars['String']>;
  initiator_ends_with?: Maybe<Scalars['String']>;
  initiator_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum FlashLoan_OrderBy {
  Id = 'id',
  Pool = 'pool',
  Reserve = 'reserve',
  Target = 'target',
  Amount = 'amount',
  TotalFee = 'totalFee',
  Initiator = 'initiator',
  Timestamp = 'timestamp',
}

export type IncentivesController = {
  __typename?: 'IncentivesController';
  /** address of the incentives controller */
  id: Scalars['ID'];
  rewardToken: Scalars['Bytes'];
  rewardTokenDecimals: Scalars['Int'];
  rewardTokenSymbol: Scalars['String'];
  precision: Scalars['Int'];
  emissionEndTimestamp: Scalars['Int'];
  incentivizedActions: Array<IncentivizedAction>;
  claimIncentives: Array<ClaimIncentiveCall>;
};

export type IncentivesControllerIncentivizedActionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IncentivizedAction_Filter>;
};

export type IncentivesControllerClaimIncentivesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ClaimIncentiveCall_Filter>;
};

export type IncentivesController_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rewardToken?: Maybe<Scalars['Bytes']>;
  rewardToken_not?: Maybe<Scalars['Bytes']>;
  rewardToken_in?: Maybe<Array<Scalars['Bytes']>>;
  rewardToken_not_in?: Maybe<Array<Scalars['Bytes']>>;
  rewardToken_contains?: Maybe<Scalars['Bytes']>;
  rewardToken_not_contains?: Maybe<Scalars['Bytes']>;
  rewardTokenDecimals?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_not?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_gt?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_lt?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_gte?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_lte?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_in?: Maybe<Array<Scalars['Int']>>;
  rewardTokenDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
  rewardTokenSymbol?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not?: Maybe<Scalars['String']>;
  rewardTokenSymbol_gt?: Maybe<Scalars['String']>;
  rewardTokenSymbol_lt?: Maybe<Scalars['String']>;
  rewardTokenSymbol_gte?: Maybe<Scalars['String']>;
  rewardTokenSymbol_lte?: Maybe<Scalars['String']>;
  rewardTokenSymbol_in?: Maybe<Array<Scalars['String']>>;
  rewardTokenSymbol_not_in?: Maybe<Array<Scalars['String']>>;
  rewardTokenSymbol_contains?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not_contains?: Maybe<Scalars['String']>;
  rewardTokenSymbol_starts_with?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not_starts_with?: Maybe<Scalars['String']>;
  rewardTokenSymbol_ends_with?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not_ends_with?: Maybe<Scalars['String']>;
  precision?: Maybe<Scalars['Int']>;
  precision_not?: Maybe<Scalars['Int']>;
  precision_gt?: Maybe<Scalars['Int']>;
  precision_lt?: Maybe<Scalars['Int']>;
  precision_gte?: Maybe<Scalars['Int']>;
  precision_lte?: Maybe<Scalars['Int']>;
  precision_in?: Maybe<Array<Scalars['Int']>>;
  precision_not_in?: Maybe<Array<Scalars['Int']>>;
  emissionEndTimestamp?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_not?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_gt?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_lt?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_gte?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_lte?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  emissionEndTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum IncentivesController_OrderBy {
  Id = 'id',
  RewardToken = 'rewardToken',
  RewardTokenDecimals = 'rewardTokenDecimals',
  RewardTokenSymbol = 'rewardTokenSymbol',
  Precision = 'precision',
  EmissionEndTimestamp = 'emissionEndTimestamp',
  IncentivizedActions = 'incentivizedActions',
  ClaimIncentives = 'claimIncentives',
}

export type IncentivizedAction = {
  __typename?: 'IncentivizedAction';
  /** txHash */
  id: Scalars['ID'];
  incentivesController: IncentivesController;
  user: User;
  amount: Scalars['BigInt'];
};

export type IncentivizedAction_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  incentivesController?: Maybe<Scalars['String']>;
  incentivesController_not?: Maybe<Scalars['String']>;
  incentivesController_gt?: Maybe<Scalars['String']>;
  incentivesController_lt?: Maybe<Scalars['String']>;
  incentivesController_gte?: Maybe<Scalars['String']>;
  incentivesController_lte?: Maybe<Scalars['String']>;
  incentivesController_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_not_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_contains?: Maybe<Scalars['String']>;
  incentivesController_not_contains?: Maybe<Scalars['String']>;
  incentivesController_starts_with?: Maybe<Scalars['String']>;
  incentivesController_not_starts_with?: Maybe<Scalars['String']>;
  incentivesController_ends_with?: Maybe<Scalars['String']>;
  incentivesController_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum IncentivizedAction_OrderBy {
  Id = 'id',
  IncentivesController = 'incentivesController',
  User = 'user',
  Amount = 'amount',
}

export type LiquidationCall = UserTransaction & {
  __typename?: 'LiquidationCall';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  collateralReserve: Reserve;
  collateralUserReserve: UserReserve;
  collateralAmount: Scalars['BigInt'];
  principalReserve: Reserve;
  principalUserReserve: UserReserve;
  principalAmount: Scalars['BigInt'];
  liquidator: Scalars['Bytes'];
  timestamp: Scalars['Int'];
};

export type LiquidationCall_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  collateralReserve?: Maybe<Scalars['String']>;
  collateralReserve_not?: Maybe<Scalars['String']>;
  collateralReserve_gt?: Maybe<Scalars['String']>;
  collateralReserve_lt?: Maybe<Scalars['String']>;
  collateralReserve_gte?: Maybe<Scalars['String']>;
  collateralReserve_lte?: Maybe<Scalars['String']>;
  collateralReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_contains?: Maybe<Scalars['String']>;
  collateralReserve_not_contains?: Maybe<Scalars['String']>;
  collateralReserve_starts_with?: Maybe<Scalars['String']>;
  collateralReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralReserve_ends_with?: Maybe<Scalars['String']>;
  collateralReserve_not_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve?: Maybe<Scalars['String']>;
  collateralUserReserve_not?: Maybe<Scalars['String']>;
  collateralUserReserve_gt?: Maybe<Scalars['String']>;
  collateralUserReserve_lt?: Maybe<Scalars['String']>;
  collateralUserReserve_gte?: Maybe<Scalars['String']>;
  collateralUserReserve_lte?: Maybe<Scalars['String']>;
  collateralUserReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_not_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  collateralAmount?: Maybe<Scalars['BigInt']>;
  collateralAmount_not?: Maybe<Scalars['BigInt']>;
  collateralAmount_gt?: Maybe<Scalars['BigInt']>;
  collateralAmount_lt?: Maybe<Scalars['BigInt']>;
  collateralAmount_gte?: Maybe<Scalars['BigInt']>;
  collateralAmount_lte?: Maybe<Scalars['BigInt']>;
  collateralAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  principalReserve?: Maybe<Scalars['String']>;
  principalReserve_not?: Maybe<Scalars['String']>;
  principalReserve_gt?: Maybe<Scalars['String']>;
  principalReserve_lt?: Maybe<Scalars['String']>;
  principalReserve_gte?: Maybe<Scalars['String']>;
  principalReserve_lte?: Maybe<Scalars['String']>;
  principalReserve_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_contains?: Maybe<Scalars['String']>;
  principalReserve_not_contains?: Maybe<Scalars['String']>;
  principalReserve_starts_with?: Maybe<Scalars['String']>;
  principalReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalReserve_ends_with?: Maybe<Scalars['String']>;
  principalReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve?: Maybe<Scalars['String']>;
  principalUserReserve_not?: Maybe<Scalars['String']>;
  principalUserReserve_gt?: Maybe<Scalars['String']>;
  principalUserReserve_lt?: Maybe<Scalars['String']>;
  principalUserReserve_gte?: Maybe<Scalars['String']>;
  principalUserReserve_lte?: Maybe<Scalars['String']>;
  principalUserReserve_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_contains?: Maybe<Scalars['String']>;
  principalUserReserve_not_contains?: Maybe<Scalars['String']>;
  principalUserReserve_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalAmount?: Maybe<Scalars['BigInt']>;
  principalAmount_not?: Maybe<Scalars['BigInt']>;
  principalAmount_gt?: Maybe<Scalars['BigInt']>;
  principalAmount_lt?: Maybe<Scalars['BigInt']>;
  principalAmount_gte?: Maybe<Scalars['BigInt']>;
  principalAmount_lte?: Maybe<Scalars['BigInt']>;
  principalAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  principalAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidator?: Maybe<Scalars['Bytes']>;
  liquidator_not?: Maybe<Scalars['Bytes']>;
  liquidator_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_contains?: Maybe<Scalars['Bytes']>;
  liquidator_not_contains?: Maybe<Scalars['Bytes']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum LiquidationCall_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  CollateralReserve = 'collateralReserve',
  CollateralUserReserve = 'collateralUserReserve',
  CollateralAmount = 'collateralAmount',
  PrincipalReserve = 'principalReserve',
  PrincipalUserReserve = 'principalUserReserve',
  PrincipalAmount = 'principalAmount',
  Liquidator = 'liquidator',
  Timestamp = 'timestamp',
}

export type MapAssetPool = {
  __typename?: 'MapAssetPool';
  /** address of a /s /v token */
  id: Scalars['ID'];
  pool: Scalars['String'];
  underlyingAsset: Scalars['Bytes'];
};

export type MapAssetPool_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  underlyingAsset?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not?: Maybe<Scalars['Bytes']>;
  underlyingAsset_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAsset_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAsset_contains?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not_contains?: Maybe<Scalars['Bytes']>;
};

export enum MapAssetPool_OrderBy {
  Id = 'id',
  Pool = 'pool',
  UnderlyingAsset = 'underlyingAsset',
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type OriginationFeeLiquidation = UserTransaction & {
  __typename?: 'OriginationFeeLiquidation';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  collateralReserve: Reserve;
  collateralUserReserve: UserReserve;
  principalReserve: Reserve;
  principalUserReserve: UserReserve;
  feeLiquidated: Scalars['BigInt'];
  liquidatedCollateralForFee: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type OriginationFeeLiquidation_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  collateralReserve?: Maybe<Scalars['String']>;
  collateralReserve_not?: Maybe<Scalars['String']>;
  collateralReserve_gt?: Maybe<Scalars['String']>;
  collateralReserve_lt?: Maybe<Scalars['String']>;
  collateralReserve_gte?: Maybe<Scalars['String']>;
  collateralReserve_lte?: Maybe<Scalars['String']>;
  collateralReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_contains?: Maybe<Scalars['String']>;
  collateralReserve_not_contains?: Maybe<Scalars['String']>;
  collateralReserve_starts_with?: Maybe<Scalars['String']>;
  collateralReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralReserve_ends_with?: Maybe<Scalars['String']>;
  collateralReserve_not_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve?: Maybe<Scalars['String']>;
  collateralUserReserve_not?: Maybe<Scalars['String']>;
  collateralUserReserve_gt?: Maybe<Scalars['String']>;
  collateralUserReserve_lt?: Maybe<Scalars['String']>;
  collateralUserReserve_gte?: Maybe<Scalars['String']>;
  collateralUserReserve_lte?: Maybe<Scalars['String']>;
  collateralUserReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_not_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalReserve?: Maybe<Scalars['String']>;
  principalReserve_not?: Maybe<Scalars['String']>;
  principalReserve_gt?: Maybe<Scalars['String']>;
  principalReserve_lt?: Maybe<Scalars['String']>;
  principalReserve_gte?: Maybe<Scalars['String']>;
  principalReserve_lte?: Maybe<Scalars['String']>;
  principalReserve_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_contains?: Maybe<Scalars['String']>;
  principalReserve_not_contains?: Maybe<Scalars['String']>;
  principalReserve_starts_with?: Maybe<Scalars['String']>;
  principalReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalReserve_ends_with?: Maybe<Scalars['String']>;
  principalReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve?: Maybe<Scalars['String']>;
  principalUserReserve_not?: Maybe<Scalars['String']>;
  principalUserReserve_gt?: Maybe<Scalars['String']>;
  principalUserReserve_lt?: Maybe<Scalars['String']>;
  principalUserReserve_gte?: Maybe<Scalars['String']>;
  principalUserReserve_lte?: Maybe<Scalars['String']>;
  principalUserReserve_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_contains?: Maybe<Scalars['String']>;
  principalUserReserve_not_contains?: Maybe<Scalars['String']>;
  principalUserReserve_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  feeLiquidated?: Maybe<Scalars['BigInt']>;
  feeLiquidated_not?: Maybe<Scalars['BigInt']>;
  feeLiquidated_gt?: Maybe<Scalars['BigInt']>;
  feeLiquidated_lt?: Maybe<Scalars['BigInt']>;
  feeLiquidated_gte?: Maybe<Scalars['BigInt']>;
  feeLiquidated_lte?: Maybe<Scalars['BigInt']>;
  feeLiquidated_in?: Maybe<Array<Scalars['BigInt']>>;
  feeLiquidated_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatedCollateralForFee?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_not?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_gt?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_lt?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_gte?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_lte?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatedCollateralForFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum OriginationFeeLiquidation_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  CollateralReserve = 'collateralReserve',
  CollateralUserReserve = 'collateralUserReserve',
  PrincipalReserve = 'principalReserve',
  PrincipalUserReserve = 'principalUserReserve',
  FeeLiquidated = 'feeLiquidated',
  LiquidatedCollateralForFee = 'liquidatedCollateralForFee',
  Timestamp = 'timestamp',
}

export type Pool = {
  __typename?: 'Pool';
  id: Scalars['ID'];
  protocol: Protocol;
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  ethereumAddress?: Maybe<Scalars['Bytes']>;
  emergencyAdmin?: Maybe<Scalars['Bytes']>;
  history: Array<PoolConfigurationHistoryItem>;
  lastUpdateTimestamp: Scalars['Int'];
  reserves: Array<Reserve>;
  depositHistory: Array<Deposit>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  borrowHistory: Array<Borrow>;
  swapHistory: Array<Swap>;
  usageAsCollateralHistory: Array<UsageAsCollateral>;
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  repayHistory: Array<Repay>;
  flashLoanHistory: Array<FlashLoan>;
  liquidationCallHistory: Array<LiquidationCall>;
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
  active: Scalars['Boolean'];
  paused: Scalars['Boolean'];
};

export type PoolHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PoolConfigurationHistoryItem_Filter>;
};

export type PoolReservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Reserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Reserve_Filter>;
};

export type PoolDepositHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
};

export type PoolRedeemUnderlyingHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type PoolBorrowHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Borrow_Filter>;
};

export type PoolSwapHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Swap_Filter>;
};

export type PoolUsageAsCollateralHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type PoolRebalanceStableBorrowRateHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type PoolRepayHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Repay_Filter>;
};

export type PoolFlashLoanHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FlashLoan_Filter>;
};

export type PoolLiquidationCallHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type PoolOriginationFeeLiquidationHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type PoolConfigurationHistoryItem = {
  __typename?: 'PoolConfigurationHistoryItem';
  /** tx hash */
  id: Scalars['ID'];
  active?: Maybe<Scalars['Boolean']>;
  pool: Pool;
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  timestamp: Scalars['Int'];
};

export type PoolConfigurationHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  active?: Maybe<Scalars['Boolean']>;
  active_not?: Maybe<Scalars['Boolean']>;
  active_in?: Maybe<Array<Scalars['Boolean']>>;
  active_not_in?: Maybe<Array<Scalars['Boolean']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPool_not?: Maybe<Scalars['Bytes']>;
  lendingPool_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_contains?: Maybe<Scalars['Bytes']>;
  lendingPool_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolCollateralManager_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolCollateralManager_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfiguratorImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfiguratorImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_not_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not?: Maybe<Scalars['Bytes']>;
  configurationAdmin_in?: Maybe<Array<Scalars['Bytes']>>;
  configurationAdmin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  configurationAdmin_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not_contains?: Maybe<Scalars['Bytes']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum PoolConfigurationHistoryItem_OrderBy {
  Id = 'id',
  Active = 'active',
  Pool = 'pool',
  LendingPool = 'lendingPool',
  LendingPoolCollateralManager = 'lendingPoolCollateralManager',
  LendingPoolConfiguratorImpl = 'lendingPoolConfiguratorImpl',
  LendingPoolImpl = 'lendingPoolImpl',
  LendingPoolConfigurator = 'lendingPoolConfigurator',
  ProxyPriceProvider = 'proxyPriceProvider',
  LendingRateOracle = 'lendingRateOracle',
  ConfigurationAdmin = 'configurationAdmin',
  Timestamp = 'timestamp',
}

export type Pool_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  protocol?: Maybe<Scalars['String']>;
  protocol_not?: Maybe<Scalars['String']>;
  protocol_gt?: Maybe<Scalars['String']>;
  protocol_lt?: Maybe<Scalars['String']>;
  protocol_gte?: Maybe<Scalars['String']>;
  protocol_lte?: Maybe<Scalars['String']>;
  protocol_in?: Maybe<Array<Scalars['String']>>;
  protocol_not_in?: Maybe<Array<Scalars['String']>>;
  protocol_contains?: Maybe<Scalars['String']>;
  protocol_not_contains?: Maybe<Scalars['String']>;
  protocol_starts_with?: Maybe<Scalars['String']>;
  protocol_not_starts_with?: Maybe<Scalars['String']>;
  protocol_ends_with?: Maybe<Scalars['String']>;
  protocol_not_ends_with?: Maybe<Scalars['String']>;
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPool_not?: Maybe<Scalars['Bytes']>;
  lendingPool_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_contains?: Maybe<Scalars['Bytes']>;
  lendingPool_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolCollateralManager_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolCollateralManager_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfiguratorImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfiguratorImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_not_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not?: Maybe<Scalars['Bytes']>;
  configurationAdmin_in?: Maybe<Array<Scalars['Bytes']>>;
  configurationAdmin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  configurationAdmin_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not_contains?: Maybe<Scalars['Bytes']>;
  ethereumAddress?: Maybe<Scalars['Bytes']>;
  ethereumAddress_not?: Maybe<Scalars['Bytes']>;
  ethereumAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  ethereumAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  ethereumAddress_contains?: Maybe<Scalars['Bytes']>;
  ethereumAddress_not_contains?: Maybe<Scalars['Bytes']>;
  emergencyAdmin?: Maybe<Scalars['Bytes']>;
  emergencyAdmin_not?: Maybe<Scalars['Bytes']>;
  emergencyAdmin_in?: Maybe<Array<Scalars['Bytes']>>;
  emergencyAdmin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  emergencyAdmin_contains?: Maybe<Scalars['Bytes']>;
  emergencyAdmin_not_contains?: Maybe<Scalars['Bytes']>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  active?: Maybe<Scalars['Boolean']>;
  active_not?: Maybe<Scalars['Boolean']>;
  active_in?: Maybe<Array<Scalars['Boolean']>>;
  active_not_in?: Maybe<Array<Scalars['Boolean']>>;
  paused?: Maybe<Scalars['Boolean']>;
  paused_not?: Maybe<Scalars['Boolean']>;
  paused_in?: Maybe<Array<Scalars['Boolean']>>;
  paused_not_in?: Maybe<Array<Scalars['Boolean']>>;
};

export enum Pool_OrderBy {
  Id = 'id',
  Protocol = 'protocol',
  LendingPool = 'lendingPool',
  LendingPoolCollateralManager = 'lendingPoolCollateralManager',
  LendingPoolConfiguratorImpl = 'lendingPoolConfiguratorImpl',
  LendingPoolImpl = 'lendingPoolImpl',
  LendingPoolConfigurator = 'lendingPoolConfigurator',
  ProxyPriceProvider = 'proxyPriceProvider',
  LendingRateOracle = 'lendingRateOracle',
  ConfigurationAdmin = 'configurationAdmin',
  EthereumAddress = 'ethereumAddress',
  EmergencyAdmin = 'emergencyAdmin',
  History = 'history',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  Reserves = 'reserves',
  DepositHistory = 'depositHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  BorrowHistory = 'borrowHistory',
  SwapHistory = 'swapHistory',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RepayHistory = 'repayHistory',
  FlashLoanHistory = 'flashLoanHistory',
  LiquidationCallHistory = 'liquidationCallHistory',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
  Active = 'active',
  Paused = 'paused',
}

export type PriceData = {
  __typename?: 'PriceData';
  priceInEth: Scalars['String'];
};

export type PriceHistoryItem = {
  __typename?: 'PriceHistoryItem';
  id: Scalars['ID'];
  asset: PriceOracleAsset;
  price: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type PriceHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  asset?: Maybe<Scalars['String']>;
  asset_not?: Maybe<Scalars['String']>;
  asset_gt?: Maybe<Scalars['String']>;
  asset_lt?: Maybe<Scalars['String']>;
  asset_gte?: Maybe<Scalars['String']>;
  asset_lte?: Maybe<Scalars['String']>;
  asset_in?: Maybe<Array<Scalars['String']>>;
  asset_not_in?: Maybe<Array<Scalars['String']>>;
  asset_contains?: Maybe<Scalars['String']>;
  asset_not_contains?: Maybe<Scalars['String']>;
  asset_starts_with?: Maybe<Scalars['String']>;
  asset_not_starts_with?: Maybe<Scalars['String']>;
  asset_ends_with?: Maybe<Scalars['String']>;
  asset_not_ends_with?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum PriceHistoryItem_OrderBy {
  Id = 'id',
  Asset = 'asset',
  Price = 'price',
  Timestamp = 'timestamp',
}

export type PriceOracle = {
  __typename?: 'PriceOracle';
  id: Scalars['ID'];
  proxyPriceProvider: Scalars['Bytes'];
  usdPriceEth: Scalars['BigInt'];
  usdPriceEthMainSource: Scalars['Bytes'];
  usdPriceEthFallbackRequired: Scalars['Boolean'];
  usdDependentAssets: Array<PriceOracleAsset>;
  fallbackPriceOracle: Scalars['Bytes'];
  tokens: Array<PriceOracleAsset>;
  usdPriceEthHistory: Array<UsdEthPriceHistoryItem>;
  tokensWithFallback: Array<PriceOracleAsset>;
  lastUpdateTimestamp: Scalars['Int'];
  version: Scalars['Int'];
};

export type PriceOracleUsdDependentAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleTokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleUsdPriceEthHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsdEthPriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsdEthPriceHistoryItem_Filter>;
};

export type PriceOracleTokensWithFallbackArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleAsset = {
  __typename?: 'PriceOracleAsset';
  id: Scalars['ID'];
  oracle: PriceOracle;
  priceInEth: Scalars['BigInt'];
  priceSource: Scalars['Bytes'];
  isFallbackRequired: Scalars['Boolean'];
  type: PriceOracleAssetType;
  platform: PriceOracleAssetPlatform;
  dependentAssets: Array<PriceOracleAsset>;
  lastUpdateTimestamp: Scalars['Int'];
  priceHistory: Array<PriceHistoryItem>;
  fromChainlinkSourcesRegistry: Scalars['Boolean'];
};

export type PriceOracleAssetDependentAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleAssetPriceHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceHistoryItem_Filter>;
};

export enum PriceOracleAssetPlatform {
  Simple = 'Simple',
  Uniswap = 'Uniswap',
}

export enum PriceOracleAssetType {
  Simple = 'Simple',
  Composite = 'Composite',
}

export type PriceOracleAsset_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  oracle?: Maybe<Scalars['String']>;
  oracle_not?: Maybe<Scalars['String']>;
  oracle_gt?: Maybe<Scalars['String']>;
  oracle_lt?: Maybe<Scalars['String']>;
  oracle_gte?: Maybe<Scalars['String']>;
  oracle_lte?: Maybe<Scalars['String']>;
  oracle_in?: Maybe<Array<Scalars['String']>>;
  oracle_not_in?: Maybe<Array<Scalars['String']>>;
  oracle_contains?: Maybe<Scalars['String']>;
  oracle_not_contains?: Maybe<Scalars['String']>;
  oracle_starts_with?: Maybe<Scalars['String']>;
  oracle_not_starts_with?: Maybe<Scalars['String']>;
  oracle_ends_with?: Maybe<Scalars['String']>;
  oracle_not_ends_with?: Maybe<Scalars['String']>;
  priceInEth?: Maybe<Scalars['BigInt']>;
  priceInEth_not?: Maybe<Scalars['BigInt']>;
  priceInEth_gt?: Maybe<Scalars['BigInt']>;
  priceInEth_lt?: Maybe<Scalars['BigInt']>;
  priceInEth_gte?: Maybe<Scalars['BigInt']>;
  priceInEth_lte?: Maybe<Scalars['BigInt']>;
  priceInEth_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInEth_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceSource?: Maybe<Scalars['Bytes']>;
  priceSource_not?: Maybe<Scalars['Bytes']>;
  priceSource_in?: Maybe<Array<Scalars['Bytes']>>;
  priceSource_not_in?: Maybe<Array<Scalars['Bytes']>>;
  priceSource_contains?: Maybe<Scalars['Bytes']>;
  priceSource_not_contains?: Maybe<Scalars['Bytes']>;
  isFallbackRequired?: Maybe<Scalars['Boolean']>;
  isFallbackRequired_not?: Maybe<Scalars['Boolean']>;
  isFallbackRequired_in?: Maybe<Array<Scalars['Boolean']>>;
  isFallbackRequired_not_in?: Maybe<Array<Scalars['Boolean']>>;
  type?: Maybe<PriceOracleAssetType>;
  type_not?: Maybe<PriceOracleAssetType>;
  platform?: Maybe<PriceOracleAssetPlatform>;
  platform_not?: Maybe<PriceOracleAssetPlatform>;
  dependentAssets?: Maybe<Array<Scalars['String']>>;
  dependentAssets_not?: Maybe<Array<Scalars['String']>>;
  dependentAssets_contains?: Maybe<Array<Scalars['String']>>;
  dependentAssets_not_contains?: Maybe<Array<Scalars['String']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  fromChainlinkSourcesRegistry?: Maybe<Scalars['Boolean']>;
  fromChainlinkSourcesRegistry_not?: Maybe<Scalars['Boolean']>;
  fromChainlinkSourcesRegistry_in?: Maybe<Array<Scalars['Boolean']>>;
  fromChainlinkSourcesRegistry_not_in?: Maybe<Array<Scalars['Boolean']>>;
};

export enum PriceOracleAsset_OrderBy {
  Id = 'id',
  Oracle = 'oracle',
  PriceInEth = 'priceInEth',
  PriceSource = 'priceSource',
  IsFallbackRequired = 'isFallbackRequired',
  Type = 'type',
  Platform = 'platform',
  DependentAssets = 'dependentAssets',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  PriceHistory = 'priceHistory',
  FromChainlinkSourcesRegistry = 'fromChainlinkSourcesRegistry',
}

export type PriceOracle_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_not_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_contains?: Maybe<Scalars['Bytes']>;
  usdPriceEth?: Maybe<Scalars['BigInt']>;
  usdPriceEth_not?: Maybe<Scalars['BigInt']>;
  usdPriceEth_gt?: Maybe<Scalars['BigInt']>;
  usdPriceEth_lt?: Maybe<Scalars['BigInt']>;
  usdPriceEth_gte?: Maybe<Scalars['BigInt']>;
  usdPriceEth_lte?: Maybe<Scalars['BigInt']>;
  usdPriceEth_in?: Maybe<Array<Scalars['BigInt']>>;
  usdPriceEth_not_in?: Maybe<Array<Scalars['BigInt']>>;
  usdPriceEthMainSource?: Maybe<Scalars['Bytes']>;
  usdPriceEthMainSource_not?: Maybe<Scalars['Bytes']>;
  usdPriceEthMainSource_in?: Maybe<Array<Scalars['Bytes']>>;
  usdPriceEthMainSource_not_in?: Maybe<Array<Scalars['Bytes']>>;
  usdPriceEthMainSource_contains?: Maybe<Scalars['Bytes']>;
  usdPriceEthMainSource_not_contains?: Maybe<Scalars['Bytes']>;
  usdPriceEthFallbackRequired?: Maybe<Scalars['Boolean']>;
  usdPriceEthFallbackRequired_not?: Maybe<Scalars['Boolean']>;
  usdPriceEthFallbackRequired_in?: Maybe<Array<Scalars['Boolean']>>;
  usdPriceEthFallbackRequired_not_in?: Maybe<Array<Scalars['Boolean']>>;
  usdDependentAssets?: Maybe<Array<Scalars['String']>>;
  usdDependentAssets_not?: Maybe<Array<Scalars['String']>>;
  usdDependentAssets_contains?: Maybe<Array<Scalars['String']>>;
  usdDependentAssets_not_contains?: Maybe<Array<Scalars['String']>>;
  fallbackPriceOracle?: Maybe<Scalars['Bytes']>;
  fallbackPriceOracle_not?: Maybe<Scalars['Bytes']>;
  fallbackPriceOracle_in?: Maybe<Array<Scalars['Bytes']>>;
  fallbackPriceOracle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  fallbackPriceOracle_contains?: Maybe<Scalars['Bytes']>;
  fallbackPriceOracle_not_contains?: Maybe<Scalars['Bytes']>;
  tokensWithFallback?: Maybe<Array<Scalars['String']>>;
  tokensWithFallback_not?: Maybe<Array<Scalars['String']>>;
  tokensWithFallback_contains?: Maybe<Array<Scalars['String']>>;
  tokensWithFallback_not_contains?: Maybe<Array<Scalars['String']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  version?: Maybe<Scalars['Int']>;
  version_not?: Maybe<Scalars['Int']>;
  version_gt?: Maybe<Scalars['Int']>;
  version_lt?: Maybe<Scalars['Int']>;
  version_gte?: Maybe<Scalars['Int']>;
  version_lte?: Maybe<Scalars['Int']>;
  version_in?: Maybe<Array<Scalars['Int']>>;
  version_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum PriceOracle_OrderBy {
  Id = 'id',
  ProxyPriceProvider = 'proxyPriceProvider',
  UsdPriceEth = 'usdPriceEth',
  UsdPriceEthMainSource = 'usdPriceEthMainSource',
  UsdPriceEthFallbackRequired = 'usdPriceEthFallbackRequired',
  UsdDependentAssets = 'usdDependentAssets',
  FallbackPriceOracle = 'fallbackPriceOracle',
  Tokens = 'tokens',
  UsdPriceEthHistory = 'usdPriceEthHistory',
  TokensWithFallback = 'tokensWithFallback',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  Version = 'version',
}

export type Protocol = {
  __typename?: 'Protocol';
  id: Scalars['ID'];
  pools: Array<Pool>;
};

export type ProtocolPoolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pool_Filter>;
};

export type ProtocolData = {
  __typename?: 'ProtocolData';
  reserves: Array<ReserveData>;
  usdPriceEth: Scalars['String'];
  emissionEndTimestamp: Scalars['Float'];
};

export type Protocol_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Protocol_OrderBy {
  Id = 'id',
  Pools = 'pools',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  atoken?: Maybe<AToken>;
  atokenBalanceHistoryItem?: Maybe<ATokenBalanceHistoryItem>;
  atokenBalanceHistoryItems: Array<ATokenBalanceHistoryItem>;
  atokens: Array<AToken>;
  borrow?: Maybe<Borrow>;
  borrows: Array<Borrow>;
  chainlinkAggregator?: Maybe<ChainlinkAggregator>;
  chainlinkAggregators: Array<ChainlinkAggregator>;
  chainlinkENS?: Maybe<ChainlinkEns>;
  chainlinkENSs: Array<ChainlinkEns>;
  claimIncentiveCall?: Maybe<ClaimIncentiveCall>;
  claimIncentiveCalls: Array<ClaimIncentiveCall>;
  contractToPoolMapping?: Maybe<ContractToPoolMapping>;
  contractToPoolMappings: Array<ContractToPoolMapping>;
  deposit?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  flashLoan?: Maybe<FlashLoan>;
  flashLoans: Array<FlashLoan>;
  incentivesController?: Maybe<IncentivesController>;
  incentivesControllers: Array<IncentivesController>;
  incentivizedAction?: Maybe<IncentivizedAction>;
  incentivizedActions: Array<IncentivizedAction>;
  liquidationCall?: Maybe<LiquidationCall>;
  liquidationCalls: Array<LiquidationCall>;
  mapAssetPool?: Maybe<MapAssetPool>;
  mapAssetPools: Array<MapAssetPool>;
  originationFeeLiquidation?: Maybe<OriginationFeeLiquidation>;
  originationFeeLiquidations: Array<OriginationFeeLiquidation>;
  ping: Scalars['String'];
  pool?: Maybe<Pool>;
  poolConfigurationHistoryItem?: Maybe<PoolConfigurationHistoryItem>;
  poolConfigurationHistoryItems: Array<PoolConfigurationHistoryItem>;
  pools: Array<Pool>;
  priceHistoryItem?: Maybe<PriceHistoryItem>;
  priceHistoryItems: Array<PriceHistoryItem>;
  priceOracle?: Maybe<PriceOracle>;
  priceOracleAsset?: Maybe<PriceOracleAsset>;
  priceOracleAssets: Array<PriceOracleAsset>;
  priceOracles: Array<PriceOracle>;
  protocol?: Maybe<Protocol>;
  protocolData: ProtocolData;
  protocols: Array<Protocol>;
  rebalanceStableBorrowRate?: Maybe<RebalanceStableBorrowRate>;
  rebalanceStableBorrowRates: Array<RebalanceStableBorrowRate>;
  redeemUnderlying?: Maybe<RedeemUnderlying>;
  redeemUnderlyings: Array<RedeemUnderlying>;
  referrer?: Maybe<Referrer>;
  referrers: Array<Referrer>;
  repay?: Maybe<Repay>;
  repays: Array<Repay>;
  reserve?: Maybe<Reserve>;
  reserveConfigurationHistoryItem?: Maybe<ReserveConfigurationHistoryItem>;
  reserveConfigurationHistoryItems: Array<ReserveConfigurationHistoryItem>;
  reserveParamsHistoryItem?: Maybe<ReserveParamsHistoryItem>;
  reserveParamsHistoryItems: Array<ReserveParamsHistoryItem>;
  reserves: Array<Reserve>;
  stableDebtToken?: Maybe<StableDebtToken>;
  stableDebtTokens: Array<StableDebtToken>;
  stableTokenDelegatedAllowance?: Maybe<StableTokenDelegatedAllowance>;
  stableTokenDelegatedAllowances: Array<StableTokenDelegatedAllowance>;
  stakeGeneralUIData: StakeGeneralUiData;
  stakeUserUIData: StakeUserUiData;
  stoken?: Maybe<SToken>;
  stokenBalanceHistoryItem?: Maybe<STokenBalanceHistoryItem>;
  stokenBalanceHistoryItems: Array<STokenBalanceHistoryItem>;
  stokens: Array<SToken>;
  swap?: Maybe<Swap>;
  swapHistories: Array<SwapHistory>;
  swapHistory?: Maybe<SwapHistory>;
  swaps: Array<Swap>;
  usageAsCollateral?: Maybe<UsageAsCollateral>;
  usageAsCollaterals: Array<UsageAsCollateral>;
  usdEthPriceHistoryItem?: Maybe<UsdEthPriceHistoryItem>;
  usdEthPriceHistoryItems: Array<UsdEthPriceHistoryItem>;
  user?: Maybe<User>;
  userData: UserData;
  userReserve?: Maybe<UserReserve>;
  userReserves: Array<UserReserve>;
  userTransaction?: Maybe<UserTransaction>;
  userTransactions: Array<UserTransaction>;
  users: Array<User>;
  variableDebtToken?: Maybe<VariableDebtToken>;
  variableDebtTokens: Array<VariableDebtToken>;
  variableTokenDelegatedAllowance?: Maybe<VariableTokenDelegatedAllowance>;
  variableTokenDelegatedAllowances: Array<VariableTokenDelegatedAllowance>;
  vtoken?: Maybe<VToken>;
  vtokenBalanceHistoryItem?: Maybe<VTokenBalanceHistoryItem>;
  vtokenBalanceHistoryItems: Array<VTokenBalanceHistoryItem>;
  vtokens: Array<VToken>;
  wethreserve?: Maybe<WethReserve>;
  wethreserves: Array<WethReserve>;
};

export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type QueryAtokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryAtokenBalanceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryAtokenBalanceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ATokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ATokenBalanceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryAtokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryBorrowArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryBorrowsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Borrow_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryChainlinkAggregatorArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryChainlinkAggregatorsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkAggregator_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ChainlinkAggregator_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryChainlinkEnsArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryChainlinkEnSsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkEns_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ChainlinkEns_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryClaimIncentiveCallArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryClaimIncentiveCallsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ClaimIncentiveCall_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryContractToPoolMappingArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryContractToPoolMappingsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractToPoolMapping_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ContractToPoolMapping_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryDepositArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryDepositsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryFlashLoanArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryFlashLoansArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FlashLoan_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryIncentivesControllerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryIncentivesControllersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivesController_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IncentivesController_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryIncentivizedActionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryIncentivizedActionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IncentivizedAction_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryLiquidationCallArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryLiquidationCallsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LiquidationCall_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryMapAssetPoolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryMapAssetPoolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MapAssetPool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MapAssetPool_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryOriginationFeeLiquidationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryOriginationFeeLiquidationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryPoolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryPoolConfigurationHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryPoolConfigurationHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PoolConfigurationHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryPoolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pool_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryPriceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryPriceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryPriceOracleArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryPriceOracleAssetArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryPriceOracleAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracleAsset_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryPriceOraclesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracle_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryProtocolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryProtocolDataArgs = {
  poolAddress: Scalars['String'];
};

export type QueryProtocolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Protocol_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Protocol_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryRebalanceStableBorrowRateArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryRebalanceStableBorrowRatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryRedeemUnderlyingArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryRedeemUnderlyingsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RedeemUnderlying_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryReferrerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryReferrersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Referrer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Referrer_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryRepayArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryRepaysArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Repay_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryReserveArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryReserveConfigurationHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryReserveConfigurationHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReserveConfigurationHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryReserveParamsHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryReserveParamsHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveParamsHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReserveParamsHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryReservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Reserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Reserve_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryStableDebtTokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryStableDebtTokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StableDebtToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryStableTokenDelegatedAllowanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryStableTokenDelegatedAllowancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StableTokenDelegatedAllowance_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryStakeUserUiDataArgs = {
  userAddress: Scalars['String'];
};

export type QueryStokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryStokenBalanceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryStokenBalanceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<STokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<STokenBalanceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryStokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type QuerySwapArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QuerySwapHistoriesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SwapHistory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SwapHistory_Filter>;
  block?: Maybe<Block_Height>;
};

export type QuerySwapHistoryArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QuerySwapsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Swap_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryUsageAsCollateralArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryUsageAsCollateralsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsageAsCollateral_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryUsdEthPriceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryUsdEthPriceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsdEthPriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsdEthPriceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryUserDataArgs = {
  poolAddress: Scalars['String'];
  userAddress: Scalars['String'];
};

export type QueryUserReserveArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryUserReservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserReserve_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryUserTransactionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryUserTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserTransaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserTransaction_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<User_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryVariableDebtTokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryVariableDebtTokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VariableDebtToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryVariableTokenDelegatedAllowanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryVariableTokenDelegatedAllowancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VariableTokenDelegatedAllowance_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryVtokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryVtokenBalanceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryVtokenBalanceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VTokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VTokenBalanceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryVtokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryWethreserveArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type QueryWethreservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WethReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<WethReserve_Filter>;
  block?: Maybe<Block_Height>;
};

export type RebalanceStableBorrowRate = UserTransaction & {
  __typename?: 'RebalanceStableBorrowRate';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  reserve: Reserve;
  userReserve: UserReserve;
  borrowRateFrom: Scalars['BigInt'];
  borrowRateTo: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type RebalanceStableBorrowRate_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  borrowRateFrom?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_not?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_gt?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_lt?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_gte?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_lte?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRateFrom_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRateTo?: Maybe<Scalars['BigInt']>;
  borrowRateTo_not?: Maybe<Scalars['BigInt']>;
  borrowRateTo_gt?: Maybe<Scalars['BigInt']>;
  borrowRateTo_lt?: Maybe<Scalars['BigInt']>;
  borrowRateTo_gte?: Maybe<Scalars['BigInt']>;
  borrowRateTo_lte?: Maybe<Scalars['BigInt']>;
  borrowRateTo_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRateTo_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum RebalanceStableBorrowRate_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  Reserve = 'reserve',
  UserReserve = 'userReserve',
  BorrowRateFrom = 'borrowRateFrom',
  BorrowRateTo = 'borrowRateTo',
  Timestamp = 'timestamp',
}

export type RedeemUnderlying = UserTransaction & {
  __typename?: 'RedeemUnderlying';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  onBehalfOf: User;
  reserve: Reserve;
  userReserve: UserReserve;
  amount: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type RedeemUnderlying_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum RedeemUnderlying_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  OnBehalfOf = 'onBehalfOf',
  Reserve = 'reserve',
  UserReserve = 'userReserve',
  Amount = 'amount',
  Timestamp = 'timestamp',
}

export type Referrer = {
  __typename?: 'Referrer';
  id: Scalars['ID'];
  deposits: Array<Deposit>;
  borrows: Array<Borrow>;
};

export type ReferrerDepositsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
};

export type ReferrerBorrowsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Borrow_Filter>;
};

export type Referrer_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Referrer_OrderBy {
  Id = 'id',
  Deposits = 'deposits',
  Borrows = 'borrows',
}

export type Repay = UserTransaction & {
  __typename?: 'Repay';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  onBehalfOf: User;
  reserve: Reserve;
  userReserve: UserReserve;
  amount: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type Repay_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum Repay_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  OnBehalfOf = 'onBehalfOf',
  Reserve = 'reserve',
  UserReserve = 'userReserve',
  Amount = 'amount',
  Timestamp = 'timestamp',
}

export type Reserve = {
  __typename?: 'Reserve';
  /** Reserve address */
  id: Scalars['ID'];
  underlyingAsset: Scalars['Bytes'];
  pool: Pool;
  symbol: Scalars['String'];
  name: Scalars['String'];
  decimals: Scalars['Int'];
  usageAsCollateralEnabled: Scalars['Boolean'];
  borrowingEnabled: Scalars['Boolean'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
  isFrozen: Scalars['Boolean'];
  price: PriceOracleAsset;
  reserveInterestRateStrategy: Scalars['Bytes'];
  optimalUtilisationRate: Scalars['BigInt'];
  variableRateSlope1: Scalars['BigInt'];
  variableRateSlope2: Scalars['BigInt'];
  stableRateSlope1: Scalars['BigInt'];
  stableRateSlope2: Scalars['BigInt'];
  baseVariableBorrowRate: Scalars['BigInt'];
  baseLTVasCollateral: Scalars['BigInt'];
  reserveLiquidationThreshold: Scalars['BigInt'];
  reserveLiquidationBonus: Scalars['BigInt'];
  utilizationRate: Scalars['BigDecimal'];
  totalLiquidity: Scalars['BigInt'];
  totalATokenSupply: Scalars['BigInt'];
  totalLiquidityAsCollateral: Scalars['BigInt'];
  availableLiquidity: Scalars['BigInt'];
  totalPrincipalStableDebt: Scalars['BigInt'];
  totalScaledVariableDebt: Scalars['BigInt'];
  totalCurrentVariableDebt: Scalars['BigInt'];
  totalDeposits: Scalars['BigInt'];
  liquidityRate: Scalars['BigInt'];
  averageStableRate: Scalars['BigInt'];
  variableBorrowRate: Scalars['BigInt'];
  stableBorrowRate: Scalars['BigInt'];
  liquidityIndex: Scalars['BigInt'];
  variableBorrowIndex: Scalars['BigInt'];
  aToken: AToken;
  vToken: VToken;
  sToken: SToken;
  reserveFactor: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['Int'];
  stableDebtLastUpdateTimestamp: Scalars['Int'];
  aEmissionPerSecond: Scalars['BigInt'];
  vEmissionPerSecond: Scalars['BigInt'];
  sEmissionPerSecond: Scalars['BigInt'];
  aTokenIncentivesIndex: Scalars['BigInt'];
  vTokenIncentivesIndex: Scalars['BigInt'];
  sTokenIncentivesIndex: Scalars['BigInt'];
  aIncentivesLastUpdateTimestamp: Scalars['Int'];
  vIncentivesLastUpdateTimestamp: Scalars['Int'];
  sIncentivesLastUpdateTimestamp: Scalars['Int'];
  lifetimeLiquidity: Scalars['BigInt'];
  lifetimePrincipalStableDebt: Scalars['BigInt'];
  lifetimeScaledVariableDebt: Scalars['BigInt'];
  lifetimeCurrentVariableDebt: Scalars['BigInt'];
  lifetimeRepayments: Scalars['BigInt'];
  lifetimeWithdrawals: Scalars['BigInt'];
  lifetimeBorrows: Scalars['BigInt'];
  lifetimeLiquidated: Scalars['BigInt'];
  lifetimeFlashLoans: Scalars['BigInt'];
  lifetimeFlashLoanPremium: Scalars['BigInt'];
  lifetimeDepositorsInterestEarned: Scalars['BigInt'];
  lifetimeReserveFactorAccrued: Scalars['BigInt'];
  userReserves: Array<UserReserve>;
  depositHistory: Array<Deposit>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  borrowHistory: Array<Borrow>;
  usageAsCollateralHistory: Array<UsageAsCollateral>;
  swapHistory: Array<Swap>;
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  repayHistory: Array<Repay>;
  flashLoanHistory: Array<FlashLoan>;
  liquidationCallHistory: Array<LiquidationCall>;
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
  paramsHistory: Array<ReserveParamsHistoryItem>;
  configurationHistory: Array<ReserveConfigurationHistoryItem>;
  deposits: Array<Deposit>;
};

export type ReserveUserReservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserReserve_Filter>;
};

export type ReserveDepositHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
};

export type ReserveRedeemUnderlyingHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type ReserveBorrowHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Borrow_Filter>;
};

export type ReserveUsageAsCollateralHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type ReserveSwapHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Swap_Filter>;
};

export type ReserveRebalanceStableBorrowRateHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type ReserveRepayHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Repay_Filter>;
};

export type ReserveFlashLoanHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FlashLoan_Filter>;
};

export type ReserveLiquidationCallHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type ReserveOriginationFeeLiquidationHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type ReserveParamsHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveParamsHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReserveParamsHistoryItem_Filter>;
};

export type ReserveConfigurationHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReserveConfigurationHistoryItem_Filter>;
};

export type ReserveDepositsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
};

export type ReserveConfigurationHistoryItem = {
  __typename?: 'ReserveConfigurationHistoryItem';
  /** tx hash */
  id: Scalars['ID'];
  reserve: Reserve;
  usageAsCollateralEnabled: Scalars['Boolean'];
  borrowingEnabled: Scalars['Boolean'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
  isFrozen: Scalars['Boolean'];
  reserveInterestRateStrategy: Scalars['Bytes'];
  baseLTVasCollateral: Scalars['BigInt'];
  reserveLiquidationThreshold: Scalars['BigInt'];
  reserveLiquidationBonus: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type ReserveConfigurationHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  usageAsCollateralEnabled?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_not?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  usageAsCollateralEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  borrowingEnabled?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_not?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  borrowingEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  stableBorrowRateEnabled?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_not?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  stableBorrowRateEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isActive_not?: Maybe<Scalars['Boolean']>;
  isActive_in?: Maybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen?: Maybe<Scalars['Boolean']>;
  isFrozen_not?: Maybe<Scalars['Boolean']>;
  isFrozen_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen_not_in?: Maybe<Array<Scalars['Boolean']>>;
  reserveInterestRateStrategy?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveInterestRateStrategy_not_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveInterestRateStrategy_contains?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not_contains?: Maybe<Scalars['Bytes']>;
  baseLTVasCollateral?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_not?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_lt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_lte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  baseLTVasCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationBonus?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationBonus_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum ReserveConfigurationHistoryItem_OrderBy {
  Id = 'id',
  Reserve = 'reserve',
  UsageAsCollateralEnabled = 'usageAsCollateralEnabled',
  BorrowingEnabled = 'borrowingEnabled',
  StableBorrowRateEnabled = 'stableBorrowRateEnabled',
  IsActive = 'isActive',
  IsFrozen = 'isFrozen',
  ReserveInterestRateStrategy = 'reserveInterestRateStrategy',
  BaseLtVasCollateral = 'baseLTVasCollateral',
  ReserveLiquidationThreshold = 'reserveLiquidationThreshold',
  ReserveLiquidationBonus = 'reserveLiquidationBonus',
  Timestamp = 'timestamp',
}

export type ReserveData = {
  __typename?: 'ReserveData';
  id: Scalars['String'];
  underlyingAsset: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  decimals: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isFrozen: Scalars['Boolean'];
  usageAsCollateralEnabled: Scalars['Boolean'];
  aTokenAddress: Scalars['String'];
  stableDebtTokenAddress: Scalars['String'];
  variableDebtTokenAddress: Scalars['String'];
  borrowingEnabled: Scalars['Boolean'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  reserveFactor: Scalars['String'];
  baseLTVasCollateral: Scalars['String'];
  optimalUtilisationRate: Scalars['String'];
  stableRateSlope1: Scalars['String'];
  stableRateSlope2: Scalars['String'];
  averageStableRate: Scalars['String'];
  stableDebtLastUpdateTimestamp: Scalars['Float'];
  baseVariableBorrowRate: Scalars['String'];
  variableRateSlope1: Scalars['String'];
  variableRateSlope2: Scalars['String'];
  liquidityIndex: Scalars['String'];
  reserveLiquidationThreshold: Scalars['String'];
  reserveLiquidationBonus: Scalars['String'];
  variableBorrowIndex: Scalars['String'];
  variableBorrowRate: Scalars['String'];
  availableLiquidity: Scalars['String'];
  stableBorrowRate: Scalars['String'];
  liquidityRate: Scalars['String'];
  totalPrincipalStableDebt: Scalars['String'];
  totalScaledVariableDebt: Scalars['String'];
  lastUpdateTimestamp: Scalars['Float'];
  aEmissionPerSecond: Scalars['String'];
  vEmissionPerSecond: Scalars['String'];
  sEmissionPerSecond: Scalars['String'];
  aIncentivesLastUpdateTimestamp: Scalars['Float'];
  vIncentivesLastUpdateTimestamp: Scalars['Float'];
  sIncentivesLastUpdateTimestamp: Scalars['Float'];
  aTokenIncentivesIndex: Scalars['String'];
  vTokenIncentivesIndex: Scalars['String'];
  sTokenIncentivesIndex: Scalars['String'];
  price: PriceData;
};

export type ReserveParamsHistoryItem = {
  __typename?: 'ReserveParamsHistoryItem';
  /** tx hash */
  id: Scalars['ID'];
  reserve: Reserve;
  variableBorrowRate: Scalars['BigInt'];
  variableBorrowIndex: Scalars['BigInt'];
  utilizationRate: Scalars['BigDecimal'];
  stableBorrowRate: Scalars['BigInt'];
  averageStableBorrowRate: Scalars['BigInt'];
  liquidityIndex: Scalars['BigInt'];
  liquidityRate: Scalars['BigInt'];
  totalLiquidity: Scalars['BigInt'];
  totalATokenSupply: Scalars['BigInt'];
  totalLiquidityAsCollateral: Scalars['BigInt'];
  availableLiquidity: Scalars['BigInt'];
  priceInEth: Scalars['BigInt'];
  priceInUsd: Scalars['BigDecimal'];
  timestamp: Scalars['Int'];
  totalScaledVariableDebt: Scalars['BigInt'];
  totalCurrentVariableDebt: Scalars['BigInt'];
  totalPrincipalStableDebt: Scalars['BigInt'];
  lifetimePrincipalStableDebt: Scalars['BigInt'];
  lifetimeScaledVariableDebt: Scalars['BigInt'];
  lifetimeCurrentVariableDebt: Scalars['BigInt'];
  lifetimeLiquidity: Scalars['BigInt'];
  lifetimeRepayments: Scalars['BigInt'];
  lifetimeWithdrawals: Scalars['BigInt'];
  lifetimeBorrows: Scalars['BigInt'];
  lifetimeLiquidated: Scalars['BigInt'];
  lifetimeFlashLoans: Scalars['BigInt'];
  lifetimeFlashLoanPremium: Scalars['BigInt'];
  lifetimeReserveFactorAccrued: Scalars['BigInt'];
  lifetimeDepositorsInterestEarned: Scalars['BigInt'];
};

export type ReserveParamsHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  variableBorrowRate?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  utilizationRate?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_not?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_lt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_lte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_in?: Maybe<Array<Scalars['BigDecimal']>>;
  utilizationRate_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableBorrowRate?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex?: Maybe<Scalars['BigInt']>;
  liquidityIndex_not?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_lt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_lte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate?: Maybe<Scalars['BigInt']>;
  liquidityRate_not?: Maybe<Scalars['BigInt']>;
  liquidityRate_gt?: Maybe<Scalars['BigInt']>;
  liquidityRate_lt?: Maybe<Scalars['BigInt']>;
  liquidityRate_gte?: Maybe<Scalars['BigInt']>;
  liquidityRate_lte?: Maybe<Scalars['BigInt']>;
  liquidityRate_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity?: Maybe<Scalars['BigInt']>;
  totalLiquidity_not?: Maybe<Scalars['BigInt']>;
  totalLiquidity_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalATokenSupply?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_not?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_lt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_lte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalATokenSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidityAsCollateral?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_not?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidityAsCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  availableLiquidity?: Maybe<Scalars['BigInt']>;
  availableLiquidity_not?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_lt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_lte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  availableLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInEth?: Maybe<Scalars['BigInt']>;
  priceInEth_not?: Maybe<Scalars['BigInt']>;
  priceInEth_gt?: Maybe<Scalars['BigInt']>;
  priceInEth_lt?: Maybe<Scalars['BigInt']>;
  priceInEth_gte?: Maybe<Scalars['BigInt']>;
  priceInEth_lte?: Maybe<Scalars['BigInt']>;
  priceInEth_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInEth_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInUsd?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_not?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_gt?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_lt?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_gte?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_lte?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_in?: Maybe<Array<Scalars['BigDecimal']>>;
  priceInUsd_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  totalScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidity?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_not?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_lt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_lte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_not?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_lt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_lte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeBorrows?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_not?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_lt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_lte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeBorrows_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_not?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_lt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_lte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_not?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_lt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_lte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ReserveParamsHistoryItem_OrderBy {
  Id = 'id',
  Reserve = 'reserve',
  VariableBorrowRate = 'variableBorrowRate',
  VariableBorrowIndex = 'variableBorrowIndex',
  UtilizationRate = 'utilizationRate',
  StableBorrowRate = 'stableBorrowRate',
  AverageStableBorrowRate = 'averageStableBorrowRate',
  LiquidityIndex = 'liquidityIndex',
  LiquidityRate = 'liquidityRate',
  TotalLiquidity = 'totalLiquidity',
  TotalATokenSupply = 'totalATokenSupply',
  TotalLiquidityAsCollateral = 'totalLiquidityAsCollateral',
  AvailableLiquidity = 'availableLiquidity',
  PriceInEth = 'priceInEth',
  PriceInUsd = 'priceInUsd',
  Timestamp = 'timestamp',
  TotalScaledVariableDebt = 'totalScaledVariableDebt',
  TotalCurrentVariableDebt = 'totalCurrentVariableDebt',
  TotalPrincipalStableDebt = 'totalPrincipalStableDebt',
  LifetimePrincipalStableDebt = 'lifetimePrincipalStableDebt',
  LifetimeScaledVariableDebt = 'lifetimeScaledVariableDebt',
  LifetimeCurrentVariableDebt = 'lifetimeCurrentVariableDebt',
  LifetimeLiquidity = 'lifetimeLiquidity',
  LifetimeRepayments = 'lifetimeRepayments',
  LifetimeWithdrawals = 'lifetimeWithdrawals',
  LifetimeBorrows = 'lifetimeBorrows',
  LifetimeLiquidated = 'lifetimeLiquidated',
  LifetimeFlashLoans = 'lifetimeFlashLoans',
  LifetimeFlashLoanPremium = 'lifetimeFlashLoanPremium',
  LifetimeReserveFactorAccrued = 'lifetimeReserveFactorAccrued',
  LifetimeDepositorsInterestEarned = 'lifetimeDepositorsInterestEarned',
}

export type Reserve_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  underlyingAsset?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not?: Maybe<Scalars['Bytes']>;
  underlyingAsset_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAsset_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAsset_contains?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not_contains?: Maybe<Scalars['Bytes']>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['Int']>;
  decimals_not?: Maybe<Scalars['Int']>;
  decimals_gt?: Maybe<Scalars['Int']>;
  decimals_lt?: Maybe<Scalars['Int']>;
  decimals_gte?: Maybe<Scalars['Int']>;
  decimals_lte?: Maybe<Scalars['Int']>;
  decimals_in?: Maybe<Array<Scalars['Int']>>;
  decimals_not_in?: Maybe<Array<Scalars['Int']>>;
  usageAsCollateralEnabled?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_not?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  usageAsCollateralEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  borrowingEnabled?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_not?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  borrowingEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  stableBorrowRateEnabled?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_not?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  stableBorrowRateEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isActive_not?: Maybe<Scalars['Boolean']>;
  isActive_in?: Maybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen?: Maybe<Scalars['Boolean']>;
  isFrozen_not?: Maybe<Scalars['Boolean']>;
  isFrozen_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen_not_in?: Maybe<Array<Scalars['Boolean']>>;
  price?: Maybe<Scalars['String']>;
  price_not?: Maybe<Scalars['String']>;
  price_gt?: Maybe<Scalars['String']>;
  price_lt?: Maybe<Scalars['String']>;
  price_gte?: Maybe<Scalars['String']>;
  price_lte?: Maybe<Scalars['String']>;
  price_in?: Maybe<Array<Scalars['String']>>;
  price_not_in?: Maybe<Array<Scalars['String']>>;
  price_contains?: Maybe<Scalars['String']>;
  price_not_contains?: Maybe<Scalars['String']>;
  price_starts_with?: Maybe<Scalars['String']>;
  price_not_starts_with?: Maybe<Scalars['String']>;
  price_ends_with?: Maybe<Scalars['String']>;
  price_not_ends_with?: Maybe<Scalars['String']>;
  reserveInterestRateStrategy?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveInterestRateStrategy_not_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveInterestRateStrategy_contains?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not_contains?: Maybe<Scalars['Bytes']>;
  optimalUtilisationRate?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_not?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_gt?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_lt?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_gte?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_lte?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_in?: Maybe<Array<Scalars['BigInt']>>;
  optimalUtilisationRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope1?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_not?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_gt?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_lt?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_gte?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_lte?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope1_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope2?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_not?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_gt?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_lt?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_gte?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_lte?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope2_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableRateSlope1?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_not?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_gt?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_lt?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_gte?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_lte?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_in?: Maybe<Array<Scalars['BigInt']>>;
  stableRateSlope1_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableRateSlope2?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_not?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_gt?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_lt?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_gte?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_lte?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_in?: Maybe<Array<Scalars['BigInt']>>;
  stableRateSlope2_not_in?: Maybe<Array<Scalars['BigInt']>>;
  baseVariableBorrowRate?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  baseVariableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  baseLTVasCollateral?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_not?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_lt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_lte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  baseLTVasCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationBonus?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationBonus_not_in?: Maybe<Array<Scalars['BigInt']>>;
  utilizationRate?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_not?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_lt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_lte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_in?: Maybe<Array<Scalars['BigDecimal']>>;
  utilizationRate_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity?: Maybe<Scalars['BigInt']>;
  totalLiquidity_not?: Maybe<Scalars['BigInt']>;
  totalLiquidity_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalATokenSupply?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_not?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_lt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_lte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalATokenSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidityAsCollateral?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_not?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidityAsCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  availableLiquidity?: Maybe<Scalars['BigInt']>;
  availableLiquidity_not?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_lt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_lte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  availableLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDeposits?: Maybe<Scalars['BigInt']>;
  totalDeposits_not?: Maybe<Scalars['BigInt']>;
  totalDeposits_gt?: Maybe<Scalars['BigInt']>;
  totalDeposits_lt?: Maybe<Scalars['BigInt']>;
  totalDeposits_gte?: Maybe<Scalars['BigInt']>;
  totalDeposits_lte?: Maybe<Scalars['BigInt']>;
  totalDeposits_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDeposits_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate?: Maybe<Scalars['BigInt']>;
  liquidityRate_not?: Maybe<Scalars['BigInt']>;
  liquidityRate_gt?: Maybe<Scalars['BigInt']>;
  liquidityRate_lt?: Maybe<Scalars['BigInt']>;
  liquidityRate_gte?: Maybe<Scalars['BigInt']>;
  liquidityRate_lte?: Maybe<Scalars['BigInt']>;
  liquidityRate_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableRate?: Maybe<Scalars['BigInt']>;
  averageStableRate_not?: Maybe<Scalars['BigInt']>;
  averageStableRate_gt?: Maybe<Scalars['BigInt']>;
  averageStableRate_lt?: Maybe<Scalars['BigInt']>;
  averageStableRate_gte?: Maybe<Scalars['BigInt']>;
  averageStableRate_lte?: Maybe<Scalars['BigInt']>;
  averageStableRate_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex?: Maybe<Scalars['BigInt']>;
  liquidityIndex_not?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_lt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_lte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aToken?: Maybe<Scalars['String']>;
  aToken_not?: Maybe<Scalars['String']>;
  aToken_gt?: Maybe<Scalars['String']>;
  aToken_lt?: Maybe<Scalars['String']>;
  aToken_gte?: Maybe<Scalars['String']>;
  aToken_lte?: Maybe<Scalars['String']>;
  aToken_in?: Maybe<Array<Scalars['String']>>;
  aToken_not_in?: Maybe<Array<Scalars['String']>>;
  aToken_contains?: Maybe<Scalars['String']>;
  aToken_not_contains?: Maybe<Scalars['String']>;
  aToken_starts_with?: Maybe<Scalars['String']>;
  aToken_not_starts_with?: Maybe<Scalars['String']>;
  aToken_ends_with?: Maybe<Scalars['String']>;
  aToken_not_ends_with?: Maybe<Scalars['String']>;
  vToken?: Maybe<Scalars['String']>;
  vToken_not?: Maybe<Scalars['String']>;
  vToken_gt?: Maybe<Scalars['String']>;
  vToken_lt?: Maybe<Scalars['String']>;
  vToken_gte?: Maybe<Scalars['String']>;
  vToken_lte?: Maybe<Scalars['String']>;
  vToken_in?: Maybe<Array<Scalars['String']>>;
  vToken_not_in?: Maybe<Array<Scalars['String']>>;
  vToken_contains?: Maybe<Scalars['String']>;
  vToken_not_contains?: Maybe<Scalars['String']>;
  vToken_starts_with?: Maybe<Scalars['String']>;
  vToken_not_starts_with?: Maybe<Scalars['String']>;
  vToken_ends_with?: Maybe<Scalars['String']>;
  vToken_not_ends_with?: Maybe<Scalars['String']>;
  sToken?: Maybe<Scalars['String']>;
  sToken_not?: Maybe<Scalars['String']>;
  sToken_gt?: Maybe<Scalars['String']>;
  sToken_lt?: Maybe<Scalars['String']>;
  sToken_gte?: Maybe<Scalars['String']>;
  sToken_lte?: Maybe<Scalars['String']>;
  sToken_in?: Maybe<Array<Scalars['String']>>;
  sToken_not_in?: Maybe<Array<Scalars['String']>>;
  sToken_contains?: Maybe<Scalars['String']>;
  sToken_not_contains?: Maybe<Scalars['String']>;
  sToken_starts_with?: Maybe<Scalars['String']>;
  sToken_not_starts_with?: Maybe<Scalars['String']>;
  sToken_ends_with?: Maybe<Scalars['String']>;
  sToken_not_ends_with?: Maybe<Scalars['String']>;
  reserveFactor?: Maybe<Scalars['BigInt']>;
  reserveFactor_not?: Maybe<Scalars['BigInt']>;
  reserveFactor_gt?: Maybe<Scalars['BigInt']>;
  reserveFactor_lt?: Maybe<Scalars['BigInt']>;
  reserveFactor_gte?: Maybe<Scalars['BigInt']>;
  reserveFactor_lte?: Maybe<Scalars['BigInt']>;
  reserveFactor_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveFactor_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  stableDebtLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  stableDebtLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  aEmissionPerSecond?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_not?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_gt?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_lt?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_gte?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_lte?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_in?: Maybe<Array<Scalars['BigInt']>>;
  aEmissionPerSecond_not_in?: Maybe<Array<Scalars['BigInt']>>;
  vEmissionPerSecond?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_not?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_gt?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_lt?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_gte?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_lte?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_in?: Maybe<Array<Scalars['BigInt']>>;
  vEmissionPerSecond_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sEmissionPerSecond?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_not?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_gt?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_lt?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_gte?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_lte?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_in?: Maybe<Array<Scalars['BigInt']>>;
  sEmissionPerSecond_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aTokenIncentivesIndex?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_not?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_gt?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_lt?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_gte?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_lte?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  aTokenIncentivesIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  vTokenIncentivesIndex?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_not?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_gt?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_lt?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_gte?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_lte?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  vTokenIncentivesIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sTokenIncentivesIndex?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_not?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_gt?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_lt?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_gte?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_lte?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  sTokenIncentivesIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  aIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  vIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  vIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  sIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  sIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  lifetimeLiquidity?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_not?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_lt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_lte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_not?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_lt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_lte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeBorrows?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_not?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_lt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_lte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeBorrows_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_not?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_lt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_lte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_not?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_lt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_lte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Reserve_OrderBy {
  Id = 'id',
  UnderlyingAsset = 'underlyingAsset',
  Pool = 'pool',
  Symbol = 'symbol',
  Name = 'name',
  Decimals = 'decimals',
  UsageAsCollateralEnabled = 'usageAsCollateralEnabled',
  BorrowingEnabled = 'borrowingEnabled',
  StableBorrowRateEnabled = 'stableBorrowRateEnabled',
  IsActive = 'isActive',
  IsFrozen = 'isFrozen',
  Price = 'price',
  ReserveInterestRateStrategy = 'reserveInterestRateStrategy',
  OptimalUtilisationRate = 'optimalUtilisationRate',
  VariableRateSlope1 = 'variableRateSlope1',
  VariableRateSlope2 = 'variableRateSlope2',
  StableRateSlope1 = 'stableRateSlope1',
  StableRateSlope2 = 'stableRateSlope2',
  BaseVariableBorrowRate = 'baseVariableBorrowRate',
  BaseLtVasCollateral = 'baseLTVasCollateral',
  ReserveLiquidationThreshold = 'reserveLiquidationThreshold',
  ReserveLiquidationBonus = 'reserveLiquidationBonus',
  UtilizationRate = 'utilizationRate',
  TotalLiquidity = 'totalLiquidity',
  TotalATokenSupply = 'totalATokenSupply',
  TotalLiquidityAsCollateral = 'totalLiquidityAsCollateral',
  AvailableLiquidity = 'availableLiquidity',
  TotalPrincipalStableDebt = 'totalPrincipalStableDebt',
  TotalScaledVariableDebt = 'totalScaledVariableDebt',
  TotalCurrentVariableDebt = 'totalCurrentVariableDebt',
  TotalDeposits = 'totalDeposits',
  LiquidityRate = 'liquidityRate',
  AverageStableRate = 'averageStableRate',
  VariableBorrowRate = 'variableBorrowRate',
  StableBorrowRate = 'stableBorrowRate',
  LiquidityIndex = 'liquidityIndex',
  VariableBorrowIndex = 'variableBorrowIndex',
  AToken = 'aToken',
  VToken = 'vToken',
  SToken = 'sToken',
  ReserveFactor = 'reserveFactor',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  StableDebtLastUpdateTimestamp = 'stableDebtLastUpdateTimestamp',
  AEmissionPerSecond = 'aEmissionPerSecond',
  VEmissionPerSecond = 'vEmissionPerSecond',
  SEmissionPerSecond = 'sEmissionPerSecond',
  ATokenIncentivesIndex = 'aTokenIncentivesIndex',
  VTokenIncentivesIndex = 'vTokenIncentivesIndex',
  STokenIncentivesIndex = 'sTokenIncentivesIndex',
  AIncentivesLastUpdateTimestamp = 'aIncentivesLastUpdateTimestamp',
  VIncentivesLastUpdateTimestamp = 'vIncentivesLastUpdateTimestamp',
  SIncentivesLastUpdateTimestamp = 'sIncentivesLastUpdateTimestamp',
  LifetimeLiquidity = 'lifetimeLiquidity',
  LifetimePrincipalStableDebt = 'lifetimePrincipalStableDebt',
  LifetimeScaledVariableDebt = 'lifetimeScaledVariableDebt',
  LifetimeCurrentVariableDebt = 'lifetimeCurrentVariableDebt',
  LifetimeRepayments = 'lifetimeRepayments',
  LifetimeWithdrawals = 'lifetimeWithdrawals',
  LifetimeBorrows = 'lifetimeBorrows',
  LifetimeLiquidated = 'lifetimeLiquidated',
  LifetimeFlashLoans = 'lifetimeFlashLoans',
  LifetimeFlashLoanPremium = 'lifetimeFlashLoanPremium',
  LifetimeDepositorsInterestEarned = 'lifetimeDepositorsInterestEarned',
  LifetimeReserveFactorAccrued = 'lifetimeReserveFactorAccrued',
  UserReserves = 'userReserves',
  DepositHistory = 'depositHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  BorrowHistory = 'borrowHistory',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
  SwapHistory = 'swapHistory',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RepayHistory = 'repayHistory',
  FlashLoanHistory = 'flashLoanHistory',
  LiquidationCallHistory = 'liquidationCallHistory',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
  ParamsHistory = 'paramsHistory',
  ConfigurationHistory = 'configurationHistory',
  Deposits = 'deposits',
}

export type SToken = {
  __typename?: 'SToken';
  /** SToken address */
  id: Scalars['ID'];
  pool: Pool;
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
  tokenContractImpl: Scalars['Bytes'];
};

export type STokenBalanceHistoryItem = {
  __typename?: 'STokenBalanceHistoryItem';
  /** userReserve + txHash */
  id: Scalars['ID'];
  userReserve: UserReserve;
  principalStableDebt: Scalars['BigInt'];
  currentStableDebt: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  avgStableBorrowRate: Scalars['BigInt'];
};

export type STokenBalanceHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalStableDebt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_not?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  principalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_not?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  avgStableBorrowRate?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  avgStableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum STokenBalanceHistoryItem_OrderBy {
  Id = 'id',
  UserReserve = 'userReserve',
  PrincipalStableDebt = 'principalStableDebt',
  CurrentStableDebt = 'currentStableDebt',
  Timestamp = 'timestamp',
  AvgStableBorrowRate = 'avgStableBorrowRate',
}

export type SToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
  tokenContractImpl?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_contains?: Maybe<Scalars['Bytes']>;
};

export enum SToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
  TokenContractImpl = 'tokenContractImpl',
}

export type StableDebtToken = {
  __typename?: 'StableDebtToken';
  /** StableDebtToken address */
  id: Scalars['ID'];
  pool: Pool;
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
};

export type StableDebtToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum StableDebtToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
}

export type StableTokenDelegatedAllowance = {
  __typename?: 'StableTokenDelegatedAllowance';
  /** stable + fromuser address + touser address+ reserve address */
  id: Scalars['ID'];
  fromUser: User;
  toUser: User;
  amountAllowed: Scalars['BigInt'];
  userReserve: UserReserve;
};

export type StableTokenDelegatedAllowance_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fromUser?: Maybe<Scalars['String']>;
  fromUser_not?: Maybe<Scalars['String']>;
  fromUser_gt?: Maybe<Scalars['String']>;
  fromUser_lt?: Maybe<Scalars['String']>;
  fromUser_gte?: Maybe<Scalars['String']>;
  fromUser_lte?: Maybe<Scalars['String']>;
  fromUser_in?: Maybe<Array<Scalars['String']>>;
  fromUser_not_in?: Maybe<Array<Scalars['String']>>;
  fromUser_contains?: Maybe<Scalars['String']>;
  fromUser_not_contains?: Maybe<Scalars['String']>;
  fromUser_starts_with?: Maybe<Scalars['String']>;
  fromUser_not_starts_with?: Maybe<Scalars['String']>;
  fromUser_ends_with?: Maybe<Scalars['String']>;
  fromUser_not_ends_with?: Maybe<Scalars['String']>;
  toUser?: Maybe<Scalars['String']>;
  toUser_not?: Maybe<Scalars['String']>;
  toUser_gt?: Maybe<Scalars['String']>;
  toUser_lt?: Maybe<Scalars['String']>;
  toUser_gte?: Maybe<Scalars['String']>;
  toUser_lte?: Maybe<Scalars['String']>;
  toUser_in?: Maybe<Array<Scalars['String']>>;
  toUser_not_in?: Maybe<Array<Scalars['String']>>;
  toUser_contains?: Maybe<Scalars['String']>;
  toUser_not_contains?: Maybe<Scalars['String']>;
  toUser_starts_with?: Maybe<Scalars['String']>;
  toUser_not_starts_with?: Maybe<Scalars['String']>;
  toUser_ends_with?: Maybe<Scalars['String']>;
  toUser_not_ends_with?: Maybe<Scalars['String']>;
  amountAllowed?: Maybe<Scalars['BigInt']>;
  amountAllowed_not?: Maybe<Scalars['BigInt']>;
  amountAllowed_gt?: Maybe<Scalars['BigInt']>;
  amountAllowed_lt?: Maybe<Scalars['BigInt']>;
  amountAllowed_gte?: Maybe<Scalars['BigInt']>;
  amountAllowed_lte?: Maybe<Scalars['BigInt']>;
  amountAllowed_in?: Maybe<Array<Scalars['BigInt']>>;
  amountAllowed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
};

export enum StableTokenDelegatedAllowance_OrderBy {
  Id = 'id',
  FromUser = 'fromUser',
  ToUser = 'toUser',
  AmountAllowed = 'amountAllowed',
  UserReserve = 'userReserve',
}

export type StakeGeneralData = {
  __typename?: 'StakeGeneralData';
  stakeTokenTotalSupply: Scalars['String'];
  stakeCooldownSeconds: Scalars['Float'];
  stakeUnstakeWindow: Scalars['Float'];
  stakeTokenPriceEth: Scalars['String'];
  rewardTokenPriceEth: Scalars['String'];
  stakeApy: Scalars['String'];
  distributionPerSecond: Scalars['String'];
  distributionEnd: Scalars['String'];
};

export type StakeGeneralUiData = {
  __typename?: 'StakeGeneralUIData';
  aave: StakeGeneralData;
  bpt: StakeGeneralData;
  usdPriceEth: Scalars['String'];
};

export type StakeUserData = {
  __typename?: 'StakeUserData';
  stakeTokenUserBalance: Scalars['String'];
  underlyingTokenUserBalance: Scalars['String'];
  userCooldown: Scalars['Float'];
  userIncentivesToClaim: Scalars['String'];
  userPermitNonce: Scalars['String'];
};

export type StakeUserUiData = {
  __typename?: 'StakeUserUIData';
  aave: StakeUserData;
  bpt: StakeUserData;
  usdPriceEth: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  atoken?: Maybe<AToken>;
  atokenBalanceHistoryItem?: Maybe<ATokenBalanceHistoryItem>;
  atokenBalanceHistoryItems: Array<ATokenBalanceHistoryItem>;
  atokens: Array<AToken>;
  borrow?: Maybe<Borrow>;
  borrows: Array<Borrow>;
  chainlinkAggregator?: Maybe<ChainlinkAggregator>;
  chainlinkAggregators: Array<ChainlinkAggregator>;
  chainlinkENS?: Maybe<ChainlinkEns>;
  chainlinkENSs: Array<ChainlinkEns>;
  claimIncentiveCall?: Maybe<ClaimIncentiveCall>;
  claimIncentiveCalls: Array<ClaimIncentiveCall>;
  contractToPoolMapping?: Maybe<ContractToPoolMapping>;
  contractToPoolMappings: Array<ContractToPoolMapping>;
  deposit?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  flashLoan?: Maybe<FlashLoan>;
  flashLoans: Array<FlashLoan>;
  incentivesController?: Maybe<IncentivesController>;
  incentivesControllers: Array<IncentivesController>;
  incentivizedAction?: Maybe<IncentivizedAction>;
  incentivizedActions: Array<IncentivizedAction>;
  liquidationCall?: Maybe<LiquidationCall>;
  liquidationCalls: Array<LiquidationCall>;
  mapAssetPool?: Maybe<MapAssetPool>;
  mapAssetPools: Array<MapAssetPool>;
  originationFeeLiquidation?: Maybe<OriginationFeeLiquidation>;
  originationFeeLiquidations: Array<OriginationFeeLiquidation>;
  pool?: Maybe<Pool>;
  poolConfigurationHistoryItem?: Maybe<PoolConfigurationHistoryItem>;
  poolConfigurationHistoryItems: Array<PoolConfigurationHistoryItem>;
  pools: Array<Pool>;
  priceHistoryItem?: Maybe<PriceHistoryItem>;
  priceHistoryItems: Array<PriceHistoryItem>;
  priceOracle?: Maybe<PriceOracle>;
  priceOracleAsset?: Maybe<PriceOracleAsset>;
  priceOracleAssets: Array<PriceOracleAsset>;
  priceOracles: Array<PriceOracle>;
  protocol?: Maybe<Protocol>;
  protocolDataUpdate: ProtocolData;
  protocols: Array<Protocol>;
  rebalanceStableBorrowRate?: Maybe<RebalanceStableBorrowRate>;
  rebalanceStableBorrowRates: Array<RebalanceStableBorrowRate>;
  redeemUnderlying?: Maybe<RedeemUnderlying>;
  redeemUnderlyings: Array<RedeemUnderlying>;
  referrer?: Maybe<Referrer>;
  referrers: Array<Referrer>;
  repay?: Maybe<Repay>;
  repays: Array<Repay>;
  reserve?: Maybe<Reserve>;
  reserveConfigurationHistoryItem?: Maybe<ReserveConfigurationHistoryItem>;
  reserveConfigurationHistoryItems: Array<ReserveConfigurationHistoryItem>;
  reserveParamsHistoryItem?: Maybe<ReserveParamsHistoryItem>;
  reserveParamsHistoryItems: Array<ReserveParamsHistoryItem>;
  reserves: Array<Reserve>;
  stableDebtToken?: Maybe<StableDebtToken>;
  stableDebtTokens: Array<StableDebtToken>;
  stableTokenDelegatedAllowance?: Maybe<StableTokenDelegatedAllowance>;
  stableTokenDelegatedAllowances: Array<StableTokenDelegatedAllowance>;
  stakeGeneralUIDataUpdate: StakeGeneralUiData;
  stakeUserUIDataUpdate: StakeUserUiData;
  stoken?: Maybe<SToken>;
  stokenBalanceHistoryItem?: Maybe<STokenBalanceHistoryItem>;
  stokenBalanceHistoryItems: Array<STokenBalanceHistoryItem>;
  stokens: Array<SToken>;
  swap?: Maybe<Swap>;
  swapHistories: Array<SwapHistory>;
  swapHistory?: Maybe<SwapHistory>;
  swaps: Array<Swap>;
  usageAsCollateral?: Maybe<UsageAsCollateral>;
  usageAsCollaterals: Array<UsageAsCollateral>;
  usdEthPriceHistoryItem?: Maybe<UsdEthPriceHistoryItem>;
  usdEthPriceHistoryItems: Array<UsdEthPriceHistoryItem>;
  user?: Maybe<User>;
  userDataUpdate: UserData;
  userReserve?: Maybe<UserReserve>;
  userReserves: Array<UserReserve>;
  userTransaction?: Maybe<UserTransaction>;
  userTransactions: Array<UserTransaction>;
  users: Array<User>;
  variableDebtToken?: Maybe<VariableDebtToken>;
  variableDebtTokens: Array<VariableDebtToken>;
  variableTokenDelegatedAllowance?: Maybe<VariableTokenDelegatedAllowance>;
  variableTokenDelegatedAllowances: Array<VariableTokenDelegatedAllowance>;
  vtoken?: Maybe<VToken>;
  vtokenBalanceHistoryItem?: Maybe<VTokenBalanceHistoryItem>;
  vtokenBalanceHistoryItems: Array<VTokenBalanceHistoryItem>;
  vtokens: Array<VToken>;
  wethreserve?: Maybe<WethReserve>;
  wethreserves: Array<WethReserve>;
};

export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type SubscriptionAtokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionAtokenBalanceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionAtokenBalanceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ATokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ATokenBalanceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionAtokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionBorrowArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionBorrowsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Borrow_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionChainlinkAggregatorArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionChainlinkAggregatorsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkAggregator_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ChainlinkAggregator_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionChainlinkEnsArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionChainlinkEnSsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkEns_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ChainlinkEns_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionClaimIncentiveCallArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionClaimIncentiveCallsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ClaimIncentiveCall_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionContractToPoolMappingArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionContractToPoolMappingsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractToPoolMapping_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ContractToPoolMapping_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionDepositArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionDepositsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionFlashLoanArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionFlashLoansArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FlashLoan_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionIncentivesControllerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionIncentivesControllersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivesController_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IncentivesController_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionIncentivizedActionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionIncentivizedActionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IncentivizedAction_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionLiquidationCallArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionLiquidationCallsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LiquidationCall_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionMapAssetPoolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionMapAssetPoolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MapAssetPool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MapAssetPool_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionOriginationFeeLiquidationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionOriginationFeeLiquidationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionPoolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPoolConfigurationHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPoolConfigurationHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PoolConfigurationHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionPoolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Pool_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionPriceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPriceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionPriceOracleArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPriceOracleAssetArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPriceOracleAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracleAsset_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionPriceOraclesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceOracle_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionProtocolArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionProtocolDataUpdateArgs = {
  poolAddress: Scalars['String'];
};

export type SubscriptionProtocolsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Protocol_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Protocol_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionRebalanceStableBorrowRateArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionRebalanceStableBorrowRatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionRedeemUnderlyingArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionRedeemUnderlyingsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RedeemUnderlying_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionReferrerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionReferrersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Referrer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Referrer_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionRepayArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionRepaysArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Repay_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionReserveArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionReserveConfigurationHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionReserveConfigurationHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReserveConfigurationHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionReserveParamsHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionReserveParamsHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveParamsHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReserveParamsHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionReservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Reserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Reserve_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionStableDebtTokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionStableDebtTokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StableDebtToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionStableTokenDelegatedAllowanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionStableTokenDelegatedAllowancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StableTokenDelegatedAllowance_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionStakeUserUiDataUpdateArgs = {
  userAddress: Scalars['String'];
};

export type SubscriptionStokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionStokenBalanceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionStokenBalanceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<STokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<STokenBalanceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionStokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionSwapArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionSwapHistoriesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SwapHistory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SwapHistory_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionSwapHistoryArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionSwapsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Swap_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionUsageAsCollateralArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionUsageAsCollateralsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsageAsCollateral_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionUsdEthPriceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionUsdEthPriceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsdEthPriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsdEthPriceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionUserArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionUserDataUpdateArgs = {
  poolAddress: Scalars['String'];
  userAddress: Scalars['String'];
};

export type SubscriptionUserReserveArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionUserReservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserReserve_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionUserTransactionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionUserTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserTransaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserTransaction_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<User_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionVariableDebtTokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionVariableDebtTokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VariableDebtToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionVariableTokenDelegatedAllowanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionVariableTokenDelegatedAllowancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VariableTokenDelegatedAllowance_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionVtokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionVtokenBalanceHistoryItemArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionVtokenBalanceHistoryItemsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VTokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VTokenBalanceHistoryItem_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionVtokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VToken_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionWethreserveArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};

export type SubscriptionWethreservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WethReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<WethReserve_Filter>;
  block?: Maybe<Block_Height>;
};

export type Swap = UserTransaction & {
  __typename?: 'Swap';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  reserve: Reserve;
  userReserve: UserReserve;
  borrowRateModeFrom: BorrowRateMode;
  borrowRateModeTo: BorrowRateMode;
  stableBorrowRate: Scalars['BigInt'];
  variableBorrowRate: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type SwapHistory = {
  __typename?: 'SwapHistory';
  /** tx hash */
  id: Scalars['ID'];
  fromAsset: Scalars['String'];
  toAsset: Scalars['String'];
  fromAmount: Scalars['BigInt'];
  receivedAmount: Scalars['BigInt'];
  swapType: Scalars['String'];
};

export type SwapHistory_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fromAsset?: Maybe<Scalars['String']>;
  fromAsset_not?: Maybe<Scalars['String']>;
  fromAsset_gt?: Maybe<Scalars['String']>;
  fromAsset_lt?: Maybe<Scalars['String']>;
  fromAsset_gte?: Maybe<Scalars['String']>;
  fromAsset_lte?: Maybe<Scalars['String']>;
  fromAsset_in?: Maybe<Array<Scalars['String']>>;
  fromAsset_not_in?: Maybe<Array<Scalars['String']>>;
  fromAsset_contains?: Maybe<Scalars['String']>;
  fromAsset_not_contains?: Maybe<Scalars['String']>;
  fromAsset_starts_with?: Maybe<Scalars['String']>;
  fromAsset_not_starts_with?: Maybe<Scalars['String']>;
  fromAsset_ends_with?: Maybe<Scalars['String']>;
  fromAsset_not_ends_with?: Maybe<Scalars['String']>;
  toAsset?: Maybe<Scalars['String']>;
  toAsset_not?: Maybe<Scalars['String']>;
  toAsset_gt?: Maybe<Scalars['String']>;
  toAsset_lt?: Maybe<Scalars['String']>;
  toAsset_gte?: Maybe<Scalars['String']>;
  toAsset_lte?: Maybe<Scalars['String']>;
  toAsset_in?: Maybe<Array<Scalars['String']>>;
  toAsset_not_in?: Maybe<Array<Scalars['String']>>;
  toAsset_contains?: Maybe<Scalars['String']>;
  toAsset_not_contains?: Maybe<Scalars['String']>;
  toAsset_starts_with?: Maybe<Scalars['String']>;
  toAsset_not_starts_with?: Maybe<Scalars['String']>;
  toAsset_ends_with?: Maybe<Scalars['String']>;
  toAsset_not_ends_with?: Maybe<Scalars['String']>;
  fromAmount?: Maybe<Scalars['BigInt']>;
  fromAmount_not?: Maybe<Scalars['BigInt']>;
  fromAmount_gt?: Maybe<Scalars['BigInt']>;
  fromAmount_lt?: Maybe<Scalars['BigInt']>;
  fromAmount_gte?: Maybe<Scalars['BigInt']>;
  fromAmount_lte?: Maybe<Scalars['BigInt']>;
  fromAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  fromAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  receivedAmount?: Maybe<Scalars['BigInt']>;
  receivedAmount_not?: Maybe<Scalars['BigInt']>;
  receivedAmount_gt?: Maybe<Scalars['BigInt']>;
  receivedAmount_lt?: Maybe<Scalars['BigInt']>;
  receivedAmount_gte?: Maybe<Scalars['BigInt']>;
  receivedAmount_lte?: Maybe<Scalars['BigInt']>;
  receivedAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  receivedAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  swapType?: Maybe<Scalars['String']>;
  swapType_not?: Maybe<Scalars['String']>;
  swapType_gt?: Maybe<Scalars['String']>;
  swapType_lt?: Maybe<Scalars['String']>;
  swapType_gte?: Maybe<Scalars['String']>;
  swapType_lte?: Maybe<Scalars['String']>;
  swapType_in?: Maybe<Array<Scalars['String']>>;
  swapType_not_in?: Maybe<Array<Scalars['String']>>;
  swapType_contains?: Maybe<Scalars['String']>;
  swapType_not_contains?: Maybe<Scalars['String']>;
  swapType_starts_with?: Maybe<Scalars['String']>;
  swapType_not_starts_with?: Maybe<Scalars['String']>;
  swapType_ends_with?: Maybe<Scalars['String']>;
  swapType_not_ends_with?: Maybe<Scalars['String']>;
};

export enum SwapHistory_OrderBy {
  Id = 'id',
  FromAsset = 'fromAsset',
  ToAsset = 'toAsset',
  FromAmount = 'fromAmount',
  ReceivedAmount = 'receivedAmount',
  SwapType = 'swapType',
}

export type Swap_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  borrowRateModeFrom?: Maybe<BorrowRateMode>;
  borrowRateModeFrom_not?: Maybe<BorrowRateMode>;
  borrowRateModeTo?: Maybe<BorrowRateMode>;
  borrowRateModeTo_not?: Maybe<BorrowRateMode>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum Swap_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  Reserve = 'reserve',
  UserReserve = 'userReserve',
  BorrowRateModeFrom = 'borrowRateModeFrom',
  BorrowRateModeTo = 'borrowRateModeTo',
  StableBorrowRate = 'stableBorrowRate',
  VariableBorrowRate = 'variableBorrowRate',
  Timestamp = 'timestamp',
}

export type UsageAsCollateral = UserTransaction & {
  __typename?: 'UsageAsCollateral';
  /** tx hash */
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  reserve: Reserve;
  userReserve: UserReserve;
  fromState: Scalars['Boolean'];
  toState: Scalars['Boolean'];
  timestamp: Scalars['Int'];
};

export type UsageAsCollateral_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  fromState?: Maybe<Scalars['Boolean']>;
  fromState_not?: Maybe<Scalars['Boolean']>;
  fromState_in?: Maybe<Array<Scalars['Boolean']>>;
  fromState_not_in?: Maybe<Array<Scalars['Boolean']>>;
  toState?: Maybe<Scalars['Boolean']>;
  toState_not?: Maybe<Scalars['Boolean']>;
  toState_in?: Maybe<Array<Scalars['Boolean']>>;
  toState_not_in?: Maybe<Array<Scalars['Boolean']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum UsageAsCollateral_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  Reserve = 'reserve',
  UserReserve = 'userReserve',
  FromState = 'fromState',
  ToState = 'toState',
  Timestamp = 'timestamp',
}

export type UsdEthPriceHistoryItem = {
  __typename?: 'UsdEthPriceHistoryItem';
  id: Scalars['ID'];
  oracle: PriceOracle;
  price: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type UsdEthPriceHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  oracle?: Maybe<Scalars['String']>;
  oracle_not?: Maybe<Scalars['String']>;
  oracle_gt?: Maybe<Scalars['String']>;
  oracle_lt?: Maybe<Scalars['String']>;
  oracle_gte?: Maybe<Scalars['String']>;
  oracle_lte?: Maybe<Scalars['String']>;
  oracle_in?: Maybe<Array<Scalars['String']>>;
  oracle_not_in?: Maybe<Array<Scalars['String']>>;
  oracle_contains?: Maybe<Scalars['String']>;
  oracle_not_contains?: Maybe<Scalars['String']>;
  oracle_starts_with?: Maybe<Scalars['String']>;
  oracle_not_starts_with?: Maybe<Scalars['String']>;
  oracle_ends_with?: Maybe<Scalars['String']>;
  oracle_not_ends_with?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum UsdEthPriceHistoryItem_OrderBy {
  Id = 'id',
  Oracle = 'oracle',
  Price = 'price',
  Timestamp = 'timestamp',
}

export type User = {
  __typename?: 'User';
  /** user address */
  id: Scalars['ID'];
  borrowedReservesCount: Scalars['Int'];
  unclaimedRewards: Scalars['BigInt'];
  lifetimeRewards: Scalars['BigInt'];
  incentivesLastUpdated: Scalars['Int'];
  reserves: Array<UserReserve>;
  depositHistory: Array<Deposit>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  usageAsCollateralHistory: Array<UsageAsCollateral>;
  borrowHistory: Array<Borrow>;
  swapHistory: Array<Swap>;
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  repayHistory: Array<Repay>;
  liquidationCallHistory: Array<LiquidationCall>;
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
  incentivizedActions: Array<IncentivizedAction>;
  claimIncentives: Array<ClaimIncentiveCall>;
};

export type UserReservesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserReserve_Filter>;
};

export type UserDepositHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
};

export type UserRedeemUnderlyingHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type UserUsageAsCollateralHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type UserBorrowHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Borrow_Filter>;
};

export type UserSwapHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Swap_Filter>;
};

export type UserRebalanceStableBorrowRateHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type UserRepayHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Repay_Filter>;
};

export type UserLiquidationCallHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type UserOriginationFeeLiquidationHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type UserIncentivizedActionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IncentivizedAction_Filter>;
};

export type UserClaimIncentivesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ClaimIncentiveCall_Filter>;
};

export type UserData = {
  __typename?: 'UserData';
  userReserves: Array<UserReserveData>;
  userUnclaimedRewards: Scalars['String'];
};

export type UserReserve = {
  __typename?: 'UserReserve';
  /** user address + reserve address */
  id: Scalars['ID'];
  pool: Pool;
  reserve: Reserve;
  user: User;
  usageAsCollateralEnabledOnUser: Scalars['Boolean'];
  scaledATokenBalance: Scalars['BigInt'];
  currentATokenBalance: Scalars['BigInt'];
  scaledVariableDebt: Scalars['BigInt'];
  currentVariableDebt: Scalars['BigInt'];
  principalStableDebt: Scalars['BigInt'];
  currentStableDebt: Scalars['BigInt'];
  currentTotalDebt: Scalars['BigInt'];
  stableBorrowRate: Scalars['BigInt'];
  oldStableBorrowRate: Scalars['BigInt'];
  liquidityRate: Scalars['BigInt'];
  stableBorrowLastUpdateTimestamp: Scalars['Int'];
  variableBorrowIndex: Scalars['BigInt'];
  aTokenincentivesUserIndex: Scalars['BigInt'];
  vTokenincentivesUserIndex: Scalars['BigInt'];
  sTokenincentivesUserIndex: Scalars['BigInt'];
  aIncentivesLastUpdateTimestamp: Scalars['Int'];
  vIncentivesLastUpdateTimestamp: Scalars['Int'];
  sIncentivesLastUpdateTimestamp: Scalars['Int'];
  /** Amount in currency units included as fee */
  lastUpdateTimestamp: Scalars['Int'];
  stableTokenDelegatedAllowances: Array<StableTokenDelegatedAllowance>;
  variableTokenDelegatedAllowances: Array<VariableTokenDelegatedAllowance>;
  aTokenBalanceHistory: Array<ATokenBalanceHistoryItem>;
  vTokenBalanceHistory: Array<VTokenBalanceHistoryItem>;
  sTokenBalanceHistory: Array<STokenBalanceHistoryItem>;
  usageAsCollateralHistory: Array<UsageAsCollateral>;
  depositHistory: Array<Deposit>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  borrowHistory: Array<Borrow>;
  swapHistory: Array<Swap>;
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  repayHistory: Array<Repay>;
  liquidationCallHistory: Array<LiquidationCall>;
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
};

export type UserReserveStableTokenDelegatedAllowancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StableTokenDelegatedAllowance_Filter>;
};

export type UserReserveVariableTokenDelegatedAllowancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VariableTokenDelegatedAllowance_Filter>;
};

export type UserReserveATokenBalanceHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ATokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ATokenBalanceHistoryItem_Filter>;
};

export type UserReserveVTokenBalanceHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VTokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VTokenBalanceHistoryItem_Filter>;
};

export type UserReserveSTokenBalanceHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<STokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<STokenBalanceHistoryItem_Filter>;
};

export type UserReserveUsageAsCollateralHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type UserReserveDepositHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Deposit_Filter>;
};

export type UserReserveRedeemUnderlyingHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type UserReserveBorrowHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Borrow_Filter>;
};

export type UserReserveSwapHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Swap_Filter>;
};

export type UserReserveRebalanceStableBorrowRateHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type UserReserveRepayHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Repay_Filter>;
};

export type UserReserveLiquidationCallHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type UserReserveOriginationFeeLiquidationHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type UserReserveData = {
  __typename?: 'UserReserveData';
  underlyingAsset: Scalars['String'];
  scaledATokenBalance: Scalars['String'];
  usageAsCollateralEnabledOnUser: Scalars['Boolean'];
  scaledVariableDebt: Scalars['String'];
  variableBorrowIndex: Scalars['String'];
  stableBorrowRate: Scalars['String'];
  principalStableDebt: Scalars['String'];
  stableBorrowLastUpdateTimestamp: Scalars['Float'];
  aTokenincentivesUserIndex: Scalars['String'];
  vTokenincentivesUserIndex: Scalars['String'];
  sTokenincentivesUserIndex: Scalars['String'];
};

export type UserReserve_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  usageAsCollateralEnabledOnUser?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabledOnUser_not?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabledOnUser_in?: Maybe<Array<Scalars['Boolean']>>;
  usageAsCollateralEnabledOnUser_not_in?: Maybe<Array<Scalars['Boolean']>>;
  scaledATokenBalance?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_not?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentATokenBalance?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_not?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  currentATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledVariableDebt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentVariableDebt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  principalStableDebt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_not?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  principalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_not?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentTotalDebt?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_not?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_gt?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_lt?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_gte?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_lte?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentTotalDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oldStableBorrowRate?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  oldStableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate?: Maybe<Scalars['BigInt']>;
  liquidityRate_not?: Maybe<Scalars['BigInt']>;
  liquidityRate_gt?: Maybe<Scalars['BigInt']>;
  liquidityRate_lt?: Maybe<Scalars['BigInt']>;
  liquidityRate_gte?: Maybe<Scalars['BigInt']>;
  liquidityRate_lte?: Maybe<Scalars['BigInt']>;
  liquidityRate_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  stableBorrowLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  variableBorrowIndex?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aTokenincentivesUserIndex?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_not?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_gt?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_lt?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_gte?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_lte?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  aTokenincentivesUserIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  vTokenincentivesUserIndex?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_not?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_gt?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_lt?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_gte?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_lte?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  vTokenincentivesUserIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sTokenincentivesUserIndex?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_not?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_gt?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_lt?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_gte?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_lte?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  sTokenincentivesUserIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  aIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  vIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  vIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  sIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  sIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum UserReserve_OrderBy {
  Id = 'id',
  Pool = 'pool',
  Reserve = 'reserve',
  User = 'user',
  UsageAsCollateralEnabledOnUser = 'usageAsCollateralEnabledOnUser',
  ScaledATokenBalance = 'scaledATokenBalance',
  CurrentATokenBalance = 'currentATokenBalance',
  ScaledVariableDebt = 'scaledVariableDebt',
  CurrentVariableDebt = 'currentVariableDebt',
  PrincipalStableDebt = 'principalStableDebt',
  CurrentStableDebt = 'currentStableDebt',
  CurrentTotalDebt = 'currentTotalDebt',
  StableBorrowRate = 'stableBorrowRate',
  OldStableBorrowRate = 'oldStableBorrowRate',
  LiquidityRate = 'liquidityRate',
  StableBorrowLastUpdateTimestamp = 'stableBorrowLastUpdateTimestamp',
  VariableBorrowIndex = 'variableBorrowIndex',
  ATokenincentivesUserIndex = 'aTokenincentivesUserIndex',
  VTokenincentivesUserIndex = 'vTokenincentivesUserIndex',
  STokenincentivesUserIndex = 'sTokenincentivesUserIndex',
  AIncentivesLastUpdateTimestamp = 'aIncentivesLastUpdateTimestamp',
  VIncentivesLastUpdateTimestamp = 'vIncentivesLastUpdateTimestamp',
  SIncentivesLastUpdateTimestamp = 'sIncentivesLastUpdateTimestamp',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  StableTokenDelegatedAllowances = 'stableTokenDelegatedAllowances',
  VariableTokenDelegatedAllowances = 'variableTokenDelegatedAllowances',
  ATokenBalanceHistory = 'aTokenBalanceHistory',
  VTokenBalanceHistory = 'vTokenBalanceHistory',
  STokenBalanceHistory = 'sTokenBalanceHistory',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
  DepositHistory = 'depositHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  BorrowHistory = 'borrowHistory',
  SwapHistory = 'swapHistory',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RepayHistory = 'repayHistory',
  LiquidationCallHistory = 'liquidationCallHistory',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
}

export type UserTransaction = {
  id: Scalars['ID'];
  pool: Pool;
  user: User;
  timestamp: Scalars['Int'];
};

export type UserTransaction_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_lt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_contains?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum UserTransaction_OrderBy {
  Id = 'id',
  Pool = 'pool',
  User = 'user',
  Timestamp = 'timestamp',
}

export type User_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  borrowedReservesCount?: Maybe<Scalars['Int']>;
  borrowedReservesCount_not?: Maybe<Scalars['Int']>;
  borrowedReservesCount_gt?: Maybe<Scalars['Int']>;
  borrowedReservesCount_lt?: Maybe<Scalars['Int']>;
  borrowedReservesCount_gte?: Maybe<Scalars['Int']>;
  borrowedReservesCount_lte?: Maybe<Scalars['Int']>;
  borrowedReservesCount_in?: Maybe<Array<Scalars['Int']>>;
  borrowedReservesCount_not_in?: Maybe<Array<Scalars['Int']>>;
  unclaimedRewards?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_not?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_gt?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_lt?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_gte?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_lte?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_in?: Maybe<Array<Scalars['BigInt']>>;
  unclaimedRewards_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRewards?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_not?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_gt?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_lt?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_gte?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_lte?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRewards_not_in?: Maybe<Array<Scalars['BigInt']>>;
  incentivesLastUpdated?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_not?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_gt?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_lt?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_gte?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_lte?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_in?: Maybe<Array<Scalars['Int']>>;
  incentivesLastUpdated_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum User_OrderBy {
  Id = 'id',
  BorrowedReservesCount = 'borrowedReservesCount',
  UnclaimedRewards = 'unclaimedRewards',
  LifetimeRewards = 'lifetimeRewards',
  IncentivesLastUpdated = 'incentivesLastUpdated',
  Reserves = 'reserves',
  DepositHistory = 'depositHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
  BorrowHistory = 'borrowHistory',
  SwapHistory = 'swapHistory',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RepayHistory = 'repayHistory',
  LiquidationCallHistory = 'liquidationCallHistory',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
  IncentivizedActions = 'incentivizedActions',
  ClaimIncentives = 'claimIncentives',
}

export type VToken = {
  __typename?: 'VToken';
  /** VToken address */
  id: Scalars['ID'];
  pool: Pool;
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
  tokenContractImpl: Scalars['Bytes'];
};

export type VTokenBalanceHistoryItem = {
  __typename?: 'VTokenBalanceHistoryItem';
  /** userReserve + txHash */
  id: Scalars['ID'];
  userReserve: UserReserve;
  scaledVariableDebt: Scalars['BigInt'];
  currentVariableDebt: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  index: Scalars['BigInt'];
};

export type VTokenBalanceHistoryItem_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  scaledVariableDebt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentVariableDebt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  index?: Maybe<Scalars['BigInt']>;
  index_not?: Maybe<Scalars['BigInt']>;
  index_gt?: Maybe<Scalars['BigInt']>;
  index_lt?: Maybe<Scalars['BigInt']>;
  index_gte?: Maybe<Scalars['BigInt']>;
  index_lte?: Maybe<Scalars['BigInt']>;
  index_in?: Maybe<Array<Scalars['BigInt']>>;
  index_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum VTokenBalanceHistoryItem_OrderBy {
  Id = 'id',
  UserReserve = 'userReserve',
  ScaledVariableDebt = 'scaledVariableDebt',
  CurrentVariableDebt = 'currentVariableDebt',
  Timestamp = 'timestamp',
  Index = 'index',
}

export type VToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
  tokenContractImpl?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_contains?: Maybe<Scalars['Bytes']>;
};

export enum VToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
  TokenContractImpl = 'tokenContractImpl',
}

export type VariableDebtToken = {
  __typename?: 'VariableDebtToken';
  /** VariableDebtToken address */
  id: Scalars['ID'];
  pool: Pool;
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
};

export type VariableDebtToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum VariableDebtToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
}

export type VariableTokenDelegatedAllowance = {
  __typename?: 'VariableTokenDelegatedAllowance';
  /** variable + fromuser address + touser address+ reserve address */
  id: Scalars['ID'];
  fromUser: User;
  toUser: User;
  amountAllowed: Scalars['BigInt'];
  userReserve: UserReserve;
};

export type VariableTokenDelegatedAllowance_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fromUser?: Maybe<Scalars['String']>;
  fromUser_not?: Maybe<Scalars['String']>;
  fromUser_gt?: Maybe<Scalars['String']>;
  fromUser_lt?: Maybe<Scalars['String']>;
  fromUser_gte?: Maybe<Scalars['String']>;
  fromUser_lte?: Maybe<Scalars['String']>;
  fromUser_in?: Maybe<Array<Scalars['String']>>;
  fromUser_not_in?: Maybe<Array<Scalars['String']>>;
  fromUser_contains?: Maybe<Scalars['String']>;
  fromUser_not_contains?: Maybe<Scalars['String']>;
  fromUser_starts_with?: Maybe<Scalars['String']>;
  fromUser_not_starts_with?: Maybe<Scalars['String']>;
  fromUser_ends_with?: Maybe<Scalars['String']>;
  fromUser_not_ends_with?: Maybe<Scalars['String']>;
  toUser?: Maybe<Scalars['String']>;
  toUser_not?: Maybe<Scalars['String']>;
  toUser_gt?: Maybe<Scalars['String']>;
  toUser_lt?: Maybe<Scalars['String']>;
  toUser_gte?: Maybe<Scalars['String']>;
  toUser_lte?: Maybe<Scalars['String']>;
  toUser_in?: Maybe<Array<Scalars['String']>>;
  toUser_not_in?: Maybe<Array<Scalars['String']>>;
  toUser_contains?: Maybe<Scalars['String']>;
  toUser_not_contains?: Maybe<Scalars['String']>;
  toUser_starts_with?: Maybe<Scalars['String']>;
  toUser_not_starts_with?: Maybe<Scalars['String']>;
  toUser_ends_with?: Maybe<Scalars['String']>;
  toUser_not_ends_with?: Maybe<Scalars['String']>;
  amountAllowed?: Maybe<Scalars['BigInt']>;
  amountAllowed_not?: Maybe<Scalars['BigInt']>;
  amountAllowed_gt?: Maybe<Scalars['BigInt']>;
  amountAllowed_lt?: Maybe<Scalars['BigInt']>;
  amountAllowed_gte?: Maybe<Scalars['BigInt']>;
  amountAllowed_lte?: Maybe<Scalars['BigInt']>;
  amountAllowed_in?: Maybe<Array<Scalars['BigInt']>>;
  amountAllowed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
};

export enum VariableTokenDelegatedAllowance_OrderBy {
  Id = 'id',
  FromUser = 'fromUser',
  ToUser = 'toUser',
  AmountAllowed = 'amountAllowed',
  UserReserve = 'userReserve',
}

export type WethReserve = {
  __typename?: 'WETHReserve';
  /** weth address */
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  symbol: Scalars['String'];
  name: Scalars['String'];
  decimals: Scalars['Int'];
  updatedTimestamp: Scalars['Int'];
  updatedBlockNumber: Scalars['BigInt'];
};

export type WethReserve_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  address?: Maybe<Scalars['Bytes']>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['Int']>;
  decimals_not?: Maybe<Scalars['Int']>;
  decimals_gt?: Maybe<Scalars['Int']>;
  decimals_lt?: Maybe<Scalars['Int']>;
  decimals_gte?: Maybe<Scalars['Int']>;
  decimals_lte?: Maybe<Scalars['Int']>;
  decimals_in?: Maybe<Array<Scalars['Int']>>;
  decimals_not_in?: Maybe<Array<Scalars['Int']>>;
  updatedTimestamp?: Maybe<Scalars['Int']>;
  updatedTimestamp_not?: Maybe<Scalars['Int']>;
  updatedTimestamp_gt?: Maybe<Scalars['Int']>;
  updatedTimestamp_lt?: Maybe<Scalars['Int']>;
  updatedTimestamp_gte?: Maybe<Scalars['Int']>;
  updatedTimestamp_lte?: Maybe<Scalars['Int']>;
  updatedTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  updatedTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  updatedBlockNumber?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_not?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_gt?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_lt?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_gte?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_lte?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  updatedBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum WethReserve_OrderBy {
  Id = 'id',
  Address = 'address',
  Symbol = 'symbol',
  Name = 'name',
  Decimals = 'decimals',
  UpdatedTimestamp = 'updatedTimestamp',
  UpdatedBlockNumber = 'updatedBlockNumber',
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

export type ProtocolDataFragmentFragment = { __typename?: 'ProtocolData' } & Pick<
  ProtocolData,
  'usdPriceEth' | 'emissionEndTimestamp'
> & {
    reserves: Array<
      { __typename?: 'ReserveData' } & Pick<
        ReserveData,
        | 'id'
        | 'underlyingAsset'
        | 'name'
        | 'symbol'
        | 'decimals'
        | 'isActive'
        | 'isFrozen'
        | 'usageAsCollateralEnabled'
        | 'aTokenAddress'
        | 'stableDebtTokenAddress'
        | 'variableDebtTokenAddress'
        | 'borrowingEnabled'
        | 'stableBorrowRateEnabled'
        | 'reserveFactor'
        | 'baseLTVasCollateral'
        | 'optimalUtilisationRate'
        | 'stableRateSlope1'
        | 'stableRateSlope2'
        | 'averageStableRate'
        | 'stableDebtLastUpdateTimestamp'
        | 'baseVariableBorrowRate'
        | 'variableRateSlope1'
        | 'variableRateSlope2'
        | 'liquidityIndex'
        | 'reserveLiquidationThreshold'
        | 'reserveLiquidationBonus'
        | 'variableBorrowIndex'
        | 'variableBorrowRate'
        | 'availableLiquidity'
        | 'stableBorrowRate'
        | 'liquidityRate'
        | 'totalPrincipalStableDebt'
        | 'totalScaledVariableDebt'
        | 'lastUpdateTimestamp'
        | 'aEmissionPerSecond'
        | 'vEmissionPerSecond'
        | 'sEmissionPerSecond'
        | 'aIncentivesLastUpdateTimestamp'
        | 'vIncentivesLastUpdateTimestamp'
        | 'sIncentivesLastUpdateTimestamp'
        | 'aTokenIncentivesIndex'
        | 'vTokenIncentivesIndex'
        | 'sTokenIncentivesIndex'
      > & { price: { __typename?: 'PriceData' } & Pick<PriceData, 'priceInEth'> }
    >;
  };

export type C_ProtocolDataQueryVariables = Exact<{
  poolAddress: Scalars['String'];
}>;

export type C_ProtocolDataQuery = { __typename?: 'Query' } & {
  protocolData: { __typename?: 'ProtocolData' } & ProtocolDataFragmentFragment;
};

export type C_ProtocolDataUpdateSubscriptionVariables = Exact<{
  poolAddress: Scalars['String'];
}>;

export type C_ProtocolDataUpdateSubscription = { __typename?: 'Subscription' } & {
  protocolDataUpdate: { __typename?: 'ProtocolData' } & ProtocolDataFragmentFragment;
};

export type StakeGeneralUiDataFragmentFragment = { __typename?: 'StakeGeneralUIData' } & Pick<
  StakeGeneralUiData,
  'usdPriceEth'
> & {
    aave: { __typename?: 'StakeGeneralData' } & Pick<
      StakeGeneralData,
      | 'stakeTokenTotalSupply'
      | 'stakeCooldownSeconds'
      | 'stakeUnstakeWindow'
      | 'stakeTokenPriceEth'
      | 'rewardTokenPriceEth'
      | 'stakeApy'
      | 'distributionPerSecond'
      | 'distributionEnd'
    >;
    bpt: { __typename?: 'StakeGeneralData' } & Pick<
      StakeGeneralData,
      | 'stakeTokenTotalSupply'
      | 'stakeCooldownSeconds'
      | 'stakeUnstakeWindow'
      | 'stakeTokenPriceEth'
      | 'rewardTokenPriceEth'
      | 'stakeApy'
      | 'distributionPerSecond'
      | 'distributionEnd'
    >;
  };

export type C_StakeGeneralUiDataQueryVariables = Exact<{ [key: string]: never }>;

export type C_StakeGeneralUiDataQuery = { __typename?: 'Query' } & {
  stakeGeneralUIData: { __typename?: 'StakeGeneralUIData' } & StakeGeneralUiDataFragmentFragment;
};

export type C_StakeGeneralUiDataUpdateSubscriptionVariables = Exact<{ [key: string]: never }>;

export type C_StakeGeneralUiDataUpdateSubscription = { __typename?: 'Subscription' } & {
  stakeGeneralUIDataUpdate: {
    __typename?: 'StakeGeneralUIData';
  } & StakeGeneralUiDataFragmentFragment;
};

export type StakeUserUiDataFragmentFragment = { __typename?: 'StakeUserUIData' } & Pick<
  StakeUserUiData,
  'usdPriceEth'
> & {
    aave: { __typename?: 'StakeUserData' } & Pick<
      StakeUserData,
      | 'stakeTokenUserBalance'
      | 'underlyingTokenUserBalance'
      | 'userCooldown'
      | 'userIncentivesToClaim'
      | 'userPermitNonce'
    >;
    bpt: { __typename?: 'StakeUserData' } & Pick<
      StakeUserData,
      | 'stakeTokenUserBalance'
      | 'underlyingTokenUserBalance'
      | 'userCooldown'
      | 'userIncentivesToClaim'
      | 'userPermitNonce'
    >;
  };

export type C_StakeUserUiDataQueryVariables = Exact<{
  userAddress: Scalars['String'];
}>;

export type C_StakeUserUiDataQuery = { __typename?: 'Query' } & {
  stakeUserUIData: { __typename?: 'StakeUserUIData' } & StakeUserUiDataFragmentFragment;
};

export type C_StakeUserUiDataUpdateSubscriptionVariables = Exact<{
  userAddress: Scalars['String'];
}>;

export type C_StakeUserUiDataUpdateSubscription = { __typename?: 'Subscription' } & {
  stakeUserUIDataUpdate: { __typename?: 'StakeUserUIData' } & StakeUserUiDataFragmentFragment;
};

export type UserDataFragmentFragment = { __typename?: 'UserData' } & Pick<
  UserData,
  'userUnclaimedRewards'
> & {
    userReserves: Array<
      { __typename?: 'UserReserveData' } & Pick<
        UserReserveData,
        | 'underlyingAsset'
        | 'scaledATokenBalance'
        | 'usageAsCollateralEnabledOnUser'
        | 'scaledVariableDebt'
        | 'variableBorrowIndex'
        | 'stableBorrowRate'
        | 'principalStableDebt'
        | 'stableBorrowLastUpdateTimestamp'
        | 'aTokenincentivesUserIndex'
        | 'vTokenincentivesUserIndex'
        | 'sTokenincentivesUserIndex'
      >
    >;
  };

export type C_UserDataQueryVariables = Exact<{
  userAddress: Scalars['String'];
  poolAddress: Scalars['String'];
}>;

export type C_UserDataQuery = { __typename?: 'Query' } & {
  userData: { __typename?: 'UserData' } & UserDataFragmentFragment;
};

export type C_UserDataUpdateSubscriptionVariables = Exact<{
  userAddress: Scalars['String'];
  poolAddress: Scalars['String'];
}>;

export type C_UserDataUpdateSubscription = { __typename?: 'Subscription' } & {
  userDataUpdate: { __typename?: 'UserData' } & UserDataFragmentFragment;
};

export const ProtocolDataFragmentFragmentDoc = gql`
  fragment ProtocolDataFragment on ProtocolData {
    reserves {
      id
      underlyingAsset
      name
      symbol
      decimals
      isActive
      isFrozen
      usageAsCollateralEnabled
      aTokenAddress
      stableDebtTokenAddress
      variableDebtTokenAddress
      borrowingEnabled
      stableBorrowRateEnabled
      reserveFactor
      baseLTVasCollateral
      optimalUtilisationRate
      stableRateSlope1
      stableRateSlope2
      averageStableRate
      stableDebtLastUpdateTimestamp
      baseVariableBorrowRate
      variableRateSlope1
      variableRateSlope2
      liquidityIndex
      reserveLiquidationThreshold
      reserveLiquidationBonus
      variableBorrowIndex
      variableBorrowRate
      availableLiquidity
      stableBorrowRate
      liquidityRate
      totalPrincipalStableDebt
      totalScaledVariableDebt
      lastUpdateTimestamp
      aEmissionPerSecond
      vEmissionPerSecond
      sEmissionPerSecond
      aIncentivesLastUpdateTimestamp
      vIncentivesLastUpdateTimestamp
      sIncentivesLastUpdateTimestamp
      aTokenIncentivesIndex
      vTokenIncentivesIndex
      sTokenIncentivesIndex
      price {
        priceInEth
      }
    }
    usdPriceEth
    emissionEndTimestamp
  }
`;
export const StakeGeneralUiDataFragmentFragmentDoc = gql`
  fragment StakeGeneralUIDataFragment on StakeGeneralUIData {
    aave {
      stakeTokenTotalSupply
      stakeCooldownSeconds
      stakeUnstakeWindow
      stakeTokenPriceEth
      rewardTokenPriceEth
      stakeApy
      distributionPerSecond
      distributionEnd
    }
    bpt {
      stakeTokenTotalSupply
      stakeCooldownSeconds
      stakeUnstakeWindow
      stakeTokenPriceEth
      rewardTokenPriceEth
      stakeApy
      distributionPerSecond
      distributionEnd
    }
    usdPriceEth
  }
`;
export const StakeUserUiDataFragmentFragmentDoc = gql`
  fragment StakeUserUIDataFragment on StakeUserUIData {
    aave {
      stakeTokenUserBalance
      underlyingTokenUserBalance
      userCooldown
      userIncentivesToClaim
      userPermitNonce
    }
    bpt {
      stakeTokenUserBalance
      underlyingTokenUserBalance
      userCooldown
      userIncentivesToClaim
      userPermitNonce
    }
    usdPriceEth
  }
`;
export const UserDataFragmentFragmentDoc = gql`
  fragment UserDataFragment on UserData {
    userReserves {
      underlyingAsset
      scaledATokenBalance
      usageAsCollateralEnabledOnUser
      scaledVariableDebt
      variableBorrowIndex
      stableBorrowRate
      principalStableDebt
      stableBorrowLastUpdateTimestamp
      aTokenincentivesUserIndex
      vTokenincentivesUserIndex
      sTokenincentivesUserIndex
    }
    userUnclaimedRewards
  }
`;
export const C_ProtocolDataDocument = gql`
  query C_ProtocolData($poolAddress: String!) {
    protocolData(poolAddress: $poolAddress) {
      ...ProtocolDataFragment
    }
  }
  ${ProtocolDataFragmentFragmentDoc}
`;

/**
 * __useC_ProtocolDataQuery__
 *
 * To run a query within a React component, call `useC_ProtocolDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_ProtocolDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_ProtocolDataQuery({
 *   variables: {
 *      poolAddress: // value for 'poolAddress'
 *   },
 * });
 */
export function useC_ProtocolDataQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<C_ProtocolDataQuery, C_ProtocolDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_ProtocolDataQuery, C_ProtocolDataQueryVariables>(
    C_ProtocolDataDocument,
    options
  );
}
export function useC_ProtocolDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_ProtocolDataQuery,
    C_ProtocolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<C_ProtocolDataQuery, C_ProtocolDataQueryVariables>(
    C_ProtocolDataDocument,
    options
  );
}
export type C_ProtocolDataQueryHookResult = ReturnType<typeof useC_ProtocolDataQuery>;
export type C_ProtocolDataLazyQueryHookResult = ReturnType<typeof useC_ProtocolDataLazyQuery>;
export type C_ProtocolDataQueryResult = ApolloReactCommon.QueryResult<
  C_ProtocolDataQuery,
  C_ProtocolDataQueryVariables
>;
export const C_ProtocolDataUpdateDocument = gql`
  subscription C_ProtocolDataUpdate($poolAddress: String!) {
    protocolDataUpdate(poolAddress: $poolAddress) {
      ...ProtocolDataFragment
    }
  }
  ${ProtocolDataFragmentFragmentDoc}
`;

/**
 * __useC_ProtocolDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_ProtocolDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_ProtocolDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_ProtocolDataUpdateSubscription({
 *   variables: {
 *      poolAddress: // value for 'poolAddress'
 *   },
 * });
 */
export function useC_ProtocolDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_ProtocolDataUpdateSubscription,
    C_ProtocolDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_ProtocolDataUpdateSubscription,
    C_ProtocolDataUpdateSubscriptionVariables
  >(C_ProtocolDataUpdateDocument, options);
}
export type C_ProtocolDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_ProtocolDataUpdateSubscription
>;
export type C_ProtocolDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_ProtocolDataUpdateSubscription>;
export const C_StakeGeneralUiDataDocument = gql`
  query C_StakeGeneralUIData {
    stakeGeneralUIData {
      ...StakeGeneralUIDataFragment
    }
  }
  ${StakeGeneralUiDataFragmentFragmentDoc}
`;

/**
 * __useC_StakeGeneralUiDataQuery__
 *
 * To run a query within a React component, call `useC_StakeGeneralUiDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_StakeGeneralUiDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_StakeGeneralUiDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useC_StakeGeneralUiDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    C_StakeGeneralUiDataQuery,
    C_StakeGeneralUiDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_StakeGeneralUiDataQuery, C_StakeGeneralUiDataQueryVariables>(
    C_StakeGeneralUiDataDocument,
    options
  );
}
export function useC_StakeGeneralUiDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_StakeGeneralUiDataQuery,
    C_StakeGeneralUiDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    C_StakeGeneralUiDataQuery,
    C_StakeGeneralUiDataQueryVariables
  >(C_StakeGeneralUiDataDocument, options);
}
export type C_StakeGeneralUiDataQueryHookResult = ReturnType<typeof useC_StakeGeneralUiDataQuery>;
export type C_StakeGeneralUiDataLazyQueryHookResult = ReturnType<
  typeof useC_StakeGeneralUiDataLazyQuery
>;
export type C_StakeGeneralUiDataQueryResult = ApolloReactCommon.QueryResult<
  C_StakeGeneralUiDataQuery,
  C_StakeGeneralUiDataQueryVariables
>;
export const C_StakeGeneralUiDataUpdateDocument = gql`
  subscription C_StakeGeneralUIDataUpdate {
    stakeGeneralUIDataUpdate {
      ...StakeGeneralUIDataFragment
    }
  }
  ${StakeGeneralUiDataFragmentFragmentDoc}
`;

/**
 * __useC_StakeGeneralUiDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_StakeGeneralUiDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_StakeGeneralUiDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_StakeGeneralUiDataUpdateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useC_StakeGeneralUiDataUpdateSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    C_StakeGeneralUiDataUpdateSubscription,
    C_StakeGeneralUiDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_StakeGeneralUiDataUpdateSubscription,
    C_StakeGeneralUiDataUpdateSubscriptionVariables
  >(C_StakeGeneralUiDataUpdateDocument, options);
}
export type C_StakeGeneralUiDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_StakeGeneralUiDataUpdateSubscription
>;
export type C_StakeGeneralUiDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_StakeGeneralUiDataUpdateSubscription>;
export const C_StakeUserUiDataDocument = gql`
  query C_StakeUserUIData($userAddress: String!) {
    stakeUserUIData(userAddress: $userAddress) {
      ...StakeUserUIDataFragment
    }
  }
  ${StakeUserUiDataFragmentFragmentDoc}
`;

/**
 * __useC_StakeUserUiDataQuery__
 *
 * To run a query within a React component, call `useC_StakeUserUiDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_StakeUserUiDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_StakeUserUiDataQuery({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *   },
 * });
 */
export function useC_StakeUserUiDataQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    C_StakeUserUiDataQuery,
    C_StakeUserUiDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_StakeUserUiDataQuery, C_StakeUserUiDataQueryVariables>(
    C_StakeUserUiDataDocument,
    options
  );
}
export function useC_StakeUserUiDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_StakeUserUiDataQuery,
    C_StakeUserUiDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<C_StakeUserUiDataQuery, C_StakeUserUiDataQueryVariables>(
    C_StakeUserUiDataDocument,
    options
  );
}
export type C_StakeUserUiDataQueryHookResult = ReturnType<typeof useC_StakeUserUiDataQuery>;
export type C_StakeUserUiDataLazyQueryHookResult = ReturnType<typeof useC_StakeUserUiDataLazyQuery>;
export type C_StakeUserUiDataQueryResult = ApolloReactCommon.QueryResult<
  C_StakeUserUiDataQuery,
  C_StakeUserUiDataQueryVariables
>;
export const C_StakeUserUiDataUpdateDocument = gql`
  subscription C_StakeUserUIDataUpdate($userAddress: String!) {
    stakeUserUIDataUpdate(userAddress: $userAddress) {
      ...StakeUserUIDataFragment
    }
  }
  ${StakeUserUiDataFragmentFragmentDoc}
`;

/**
 * __useC_StakeUserUiDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_StakeUserUiDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_StakeUserUiDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_StakeUserUiDataUpdateSubscription({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *   },
 * });
 */
export function useC_StakeUserUiDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_StakeUserUiDataUpdateSubscription,
    C_StakeUserUiDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_StakeUserUiDataUpdateSubscription,
    C_StakeUserUiDataUpdateSubscriptionVariables
  >(C_StakeUserUiDataUpdateDocument, options);
}
export type C_StakeUserUiDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_StakeUserUiDataUpdateSubscription
>;
export type C_StakeUserUiDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_StakeUserUiDataUpdateSubscription>;
export const C_UserDataDocument = gql`
  query C_UserData($userAddress: String!, $poolAddress: String!) {
    userData(userAddress: $userAddress, poolAddress: $poolAddress) {
      ...UserDataFragment
    }
  }
  ${UserDataFragmentFragmentDoc}
`;

/**
 * __useC_UserDataQuery__
 *
 * To run a query within a React component, call `useC_UserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_UserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserDataQuery({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      poolAddress: // value for 'poolAddress'
 *   },
 * });
 */
export function useC_UserDataQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<C_UserDataQuery, C_UserDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_UserDataQuery, C_UserDataQueryVariables>(
    C_UserDataDocument,
    options
  );
}
export function useC_UserDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<C_UserDataQuery, C_UserDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<C_UserDataQuery, C_UserDataQueryVariables>(
    C_UserDataDocument,
    options
  );
}
export type C_UserDataQueryHookResult = ReturnType<typeof useC_UserDataQuery>;
export type C_UserDataLazyQueryHookResult = ReturnType<typeof useC_UserDataLazyQuery>;
export type C_UserDataQueryResult = ApolloReactCommon.QueryResult<
  C_UserDataQuery,
  C_UserDataQueryVariables
>;
export const C_UserDataUpdateDocument = gql`
  subscription C_UserDataUpdate($userAddress: String!, $poolAddress: String!) {
    userDataUpdate(userAddress: $userAddress, poolAddress: $poolAddress) {
      ...UserDataFragment
    }
  }
  ${UserDataFragmentFragmentDoc}
`;

/**
 * __useC_UserDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_UserDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_UserDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserDataUpdateSubscription({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      poolAddress: // value for 'poolAddress'
 *   },
 * });
 */
export function useC_UserDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_UserDataUpdateSubscription,
    C_UserDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_UserDataUpdateSubscription,
    C_UserDataUpdateSubscriptionVariables
  >(C_UserDataUpdateDocument, options);
}
export type C_UserDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_UserDataUpdateSubscription
>;
export type C_UserDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_UserDataUpdateSubscription>;
