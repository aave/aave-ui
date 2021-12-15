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
  /**
   * AToken address
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  tokenContractImpl: Scalars['Bytes'];
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
};

export type ATokenBalanceHistoryItem = {
  __typename?: 'ATokenBalanceHistoryItem';
  currentATokenBalance: Scalars['BigInt'];
  /**
   * userReserve + txHash
   *
   */
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  scaledATokenBalance: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  userReserve: UserReserve;
};

export type ATokenBalanceHistoryItem_Filter = {
  currentATokenBalance?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  currentATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_not?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  index?: Maybe<Scalars['BigInt']>;
  index_gt?: Maybe<Scalars['BigInt']>;
  index_gte?: Maybe<Scalars['BigInt']>;
  index_in?: Maybe<Array<Scalars['BigInt']>>;
  index_lt?: Maybe<Scalars['BigInt']>;
  index_lte?: Maybe<Scalars['BigInt']>;
  index_not?: Maybe<Scalars['BigInt']>;
  index_not_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledATokenBalance?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_not?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
};

export enum ATokenBalanceHistoryItem_OrderBy {
  CurrentATokenBalance = 'currentATokenBalance',
  Id = 'id',
  Index = 'index',
  ScaledATokenBalance = 'scaledATokenBalance',
  Timestamp = 'timestamp',
  UserReserve = 'userReserve',
}

export type AToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  tokenContractImpl?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_not?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum AToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  TokenContractImpl = 'tokenContractImpl',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};

export type Borrow = UserTransaction & {
  __typename?: 'Borrow';
  amount: Scalars['BigInt'];
  borrowRate: Scalars['BigInt'];
  borrowRateMode: BorrowRateMode;
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  onBehalfOf: User;
  pool: Pool;
  referrer?: Maybe<Referrer>;
  reserve: Reserve;
  stableTokenDebt: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  user: User;
  userReserve: UserReserve;
  variableTokenDebt: Scalars['BigInt'];
};

export enum BorrowRateMode {
  None = 'None',
  Stable = 'Stable',
  Variable = 'Variable',
}

export type Borrow_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRate?: Maybe<Scalars['BigInt']>;
  borrowRateMode?: Maybe<BorrowRateMode>;
  borrowRateMode_in?: Maybe<Array<BorrowRateMode>>;
  borrowRateMode_not?: Maybe<BorrowRateMode>;
  borrowRateMode_not_in?: Maybe<Array<BorrowRateMode>>;
  borrowRate_gt?: Maybe<Scalars['BigInt']>;
  borrowRate_gte?: Maybe<Scalars['BigInt']>;
  borrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRate_lt?: Maybe<Scalars['BigInt']>;
  borrowRate_lte?: Maybe<Scalars['BigInt']>;
  borrowRate_not?: Maybe<Scalars['BigInt']>;
  borrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  referrer?: Maybe<Scalars['String']>;
  referrer_contains?: Maybe<Scalars['String']>;
  referrer_ends_with?: Maybe<Scalars['String']>;
  referrer_gt?: Maybe<Scalars['String']>;
  referrer_gte?: Maybe<Scalars['String']>;
  referrer_in?: Maybe<Array<Scalars['String']>>;
  referrer_lt?: Maybe<Scalars['String']>;
  referrer_lte?: Maybe<Scalars['String']>;
  referrer_not?: Maybe<Scalars['String']>;
  referrer_not_contains?: Maybe<Scalars['String']>;
  referrer_not_ends_with?: Maybe<Scalars['String']>;
  referrer_not_in?: Maybe<Array<Scalars['String']>>;
  referrer_not_starts_with?: Maybe<Scalars['String']>;
  referrer_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  stableTokenDebt?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_gt?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_gte?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  stableTokenDebt_lt?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_lte?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_not?: Maybe<Scalars['BigInt']>;
  stableTokenDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  variableTokenDebt?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_gt?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_gte?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  variableTokenDebt_lt?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_lte?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_not?: Maybe<Scalars['BigInt']>;
  variableTokenDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Borrow_OrderBy {
  Amount = 'amount',
  BorrowRate = 'borrowRate',
  BorrowRateMode = 'borrowRateMode',
  Id = 'id',
  OnBehalfOf = 'onBehalfOf',
  Pool = 'pool',
  Referrer = 'referrer',
  Reserve = 'reserve',
  StableTokenDebt = 'stableTokenDebt',
  Timestamp = 'timestamp',
  User = 'user',
  UserReserve = 'userReserve',
  VariableTokenDebt = 'variableTokenDebt',
}

export type ChainlinkAggregator = {
  __typename?: 'ChainlinkAggregator';
  id: Scalars['ID'];
  oracleAsset: PriceOracleAsset;
};

export type ChainlinkAggregator_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  oracleAsset?: Maybe<Scalars['String']>;
  oracleAsset_contains?: Maybe<Scalars['String']>;
  oracleAsset_ends_with?: Maybe<Scalars['String']>;
  oracleAsset_gt?: Maybe<Scalars['String']>;
  oracleAsset_gte?: Maybe<Scalars['String']>;
  oracleAsset_in?: Maybe<Array<Scalars['String']>>;
  oracleAsset_lt?: Maybe<Scalars['String']>;
  oracleAsset_lte?: Maybe<Scalars['String']>;
  oracleAsset_not?: Maybe<Scalars['String']>;
  oracleAsset_not_contains?: Maybe<Scalars['String']>;
  oracleAsset_not_ends_with?: Maybe<Scalars['String']>;
  oracleAsset_not_in?: Maybe<Array<Scalars['String']>>;
  oracleAsset_not_starts_with?: Maybe<Scalars['String']>;
  oracleAsset_starts_with?: Maybe<Scalars['String']>;
};

export enum ChainlinkAggregator_OrderBy {
  Id = 'id',
  OracleAsset = 'oracleAsset',
}

export type ChainlinkEns = {
  __typename?: 'ChainlinkENS';
  /** address of the aggregator */
  aggregatorAddress: Scalars['Bytes'];
  /** id is the node hash */
  id: Scalars['ID'];
  /** symbol of the token represented on the aggregator */
  symbol: Scalars['String'];
  /** token address represented with this aggregator */
  underlyingAddress: Scalars['Bytes'];
};

export type ChainlinkEns_Filter = {
  aggregatorAddress?: Maybe<Scalars['Bytes']>;
  aggregatorAddress_contains?: Maybe<Scalars['Bytes']>;
  aggregatorAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  aggregatorAddress_not?: Maybe<Scalars['Bytes']>;
  aggregatorAddress_not_contains?: Maybe<Scalars['Bytes']>;
  aggregatorAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  symbol?: Maybe<Scalars['String']>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  underlyingAddress?: Maybe<Scalars['Bytes']>;
  underlyingAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum ChainlinkEns_OrderBy {
  AggregatorAddress = 'aggregatorAddress',
  Id = 'id',
  Symbol = 'symbol',
  UnderlyingAddress = 'underlyingAddress',
}

export type ClaimIncentiveCall = {
  __typename?: 'ClaimIncentiveCall';
  amount: Scalars['BigInt'];
  /**
   * txHash
   *
   */
  id: Scalars['ID'];
  incentivesController: IncentivesController;
  user: User;
};

export type ClaimIncentiveCall_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  incentivesController?: Maybe<Scalars['String']>;
  incentivesController_contains?: Maybe<Scalars['String']>;
  incentivesController_ends_with?: Maybe<Scalars['String']>;
  incentivesController_gt?: Maybe<Scalars['String']>;
  incentivesController_gte?: Maybe<Scalars['String']>;
  incentivesController_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_lt?: Maybe<Scalars['String']>;
  incentivesController_lte?: Maybe<Scalars['String']>;
  incentivesController_not?: Maybe<Scalars['String']>;
  incentivesController_not_contains?: Maybe<Scalars['String']>;
  incentivesController_not_ends_with?: Maybe<Scalars['String']>;
  incentivesController_not_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_not_starts_with?: Maybe<Scalars['String']>;
  incentivesController_starts_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum ClaimIncentiveCall_OrderBy {
  Amount = 'amount',
  Id = 'id',
  IncentivesController = 'incentivesController',
  User = 'user',
}

export type ContractToPoolMapping = {
  __typename?: 'ContractToPoolMapping';
  id: Scalars['ID'];
  pool: Pool;
};

export type ContractToPoolMapping_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
};

export enum ContractToPoolMapping_OrderBy {
  Id = 'id',
  Pool = 'pool',
}

export type Deposit = UserTransaction & {
  __typename?: 'Deposit';
  amount: Scalars['BigInt'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  onBehalfOf: User;
  pool: Pool;
  referrer?: Maybe<Referrer>;
  reserve: Reserve;
  timestamp: Scalars['Int'];
  user: User;
  userReserve: UserReserve;
};

export type Deposit_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  referrer?: Maybe<Scalars['String']>;
  referrer_contains?: Maybe<Scalars['String']>;
  referrer_ends_with?: Maybe<Scalars['String']>;
  referrer_gt?: Maybe<Scalars['String']>;
  referrer_gte?: Maybe<Scalars['String']>;
  referrer_in?: Maybe<Array<Scalars['String']>>;
  referrer_lt?: Maybe<Scalars['String']>;
  referrer_lte?: Maybe<Scalars['String']>;
  referrer_not?: Maybe<Scalars['String']>;
  referrer_not_contains?: Maybe<Scalars['String']>;
  referrer_not_ends_with?: Maybe<Scalars['String']>;
  referrer_not_in?: Maybe<Array<Scalars['String']>>;
  referrer_not_starts_with?: Maybe<Scalars['String']>;
  referrer_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum Deposit_OrderBy {
  Amount = 'amount',
  Id = 'id',
  OnBehalfOf = 'onBehalfOf',
  Pool = 'pool',
  Referrer = 'referrer',
  Reserve = 'reserve',
  Timestamp = 'timestamp',
  User = 'user',
  UserReserve = 'userReserve',
}

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

export type FlashLoan = {
  __typename?: 'FlashLoan';
  amount: Scalars['BigInt'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  initiator: User;
  pool: Pool;
  reserve: Reserve;
  target: Scalars['Bytes'];
  timestamp: Scalars['Int'];
  totalFee: Scalars['BigInt'];
};

export type FlashLoan_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  initiator?: Maybe<Scalars['String']>;
  initiator_contains?: Maybe<Scalars['String']>;
  initiator_ends_with?: Maybe<Scalars['String']>;
  initiator_gt?: Maybe<Scalars['String']>;
  initiator_gte?: Maybe<Scalars['String']>;
  initiator_in?: Maybe<Array<Scalars['String']>>;
  initiator_lt?: Maybe<Scalars['String']>;
  initiator_lte?: Maybe<Scalars['String']>;
  initiator_not?: Maybe<Scalars['String']>;
  initiator_not_contains?: Maybe<Scalars['String']>;
  initiator_not_ends_with?: Maybe<Scalars['String']>;
  initiator_not_in?: Maybe<Array<Scalars['String']>>;
  initiator_not_starts_with?: Maybe<Scalars['String']>;
  initiator_starts_with?: Maybe<Scalars['String']>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['Bytes']>;
  target_contains?: Maybe<Scalars['Bytes']>;
  target_in?: Maybe<Array<Scalars['Bytes']>>;
  target_not?: Maybe<Scalars['Bytes']>;
  target_not_contains?: Maybe<Scalars['Bytes']>;
  target_not_in?: Maybe<Array<Scalars['Bytes']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  totalFee?: Maybe<Scalars['BigInt']>;
  totalFee_gt?: Maybe<Scalars['BigInt']>;
  totalFee_gte?: Maybe<Scalars['BigInt']>;
  totalFee_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFee_lt?: Maybe<Scalars['BigInt']>;
  totalFee_lte?: Maybe<Scalars['BigInt']>;
  totalFee_not?: Maybe<Scalars['BigInt']>;
  totalFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum FlashLoan_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Initiator = 'initiator',
  Pool = 'pool',
  Reserve = 'reserve',
  Target = 'target',
  Timestamp = 'timestamp',
  TotalFee = 'totalFee',
}

export type IncentivesController = {
  __typename?: 'IncentivesController';
  claimIncentives: Array<ClaimIncentiveCall>;
  emissionEndTimestamp: Scalars['Int'];
  /**
   * address of the incentives controller
   *
   */
  id: Scalars['ID'];
  incentivizedActions: Array<IncentivizedAction>;
  precision: Scalars['Int'];
  rewardToken: Scalars['Bytes'];
  rewardTokenDecimals: Scalars['Int'];
  rewardTokenSymbol: Scalars['String'];
};

export type IncentivesControllerClaimIncentivesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ClaimIncentiveCall_Filter>;
};

export type IncentivesControllerIncentivizedActionsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<IncentivizedAction_Filter>;
};

export type IncentivesController_Filter = {
  emissionEndTimestamp?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_gt?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_gte?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  emissionEndTimestamp_lt?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_lte?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_not?: Maybe<Scalars['Int']>;
  emissionEndTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  precision?: Maybe<Scalars['Int']>;
  precision_gt?: Maybe<Scalars['Int']>;
  precision_gte?: Maybe<Scalars['Int']>;
  precision_in?: Maybe<Array<Scalars['Int']>>;
  precision_lt?: Maybe<Scalars['Int']>;
  precision_lte?: Maybe<Scalars['Int']>;
  precision_not?: Maybe<Scalars['Int']>;
  precision_not_in?: Maybe<Array<Scalars['Int']>>;
  rewardToken?: Maybe<Scalars['Bytes']>;
  rewardTokenDecimals?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_gt?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_gte?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_in?: Maybe<Array<Scalars['Int']>>;
  rewardTokenDecimals_lt?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_lte?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_not?: Maybe<Scalars['Int']>;
  rewardTokenDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
  rewardTokenSymbol?: Maybe<Scalars['String']>;
  rewardTokenSymbol_contains?: Maybe<Scalars['String']>;
  rewardTokenSymbol_ends_with?: Maybe<Scalars['String']>;
  rewardTokenSymbol_gt?: Maybe<Scalars['String']>;
  rewardTokenSymbol_gte?: Maybe<Scalars['String']>;
  rewardTokenSymbol_in?: Maybe<Array<Scalars['String']>>;
  rewardTokenSymbol_lt?: Maybe<Scalars['String']>;
  rewardTokenSymbol_lte?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not_contains?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not_ends_with?: Maybe<Scalars['String']>;
  rewardTokenSymbol_not_in?: Maybe<Array<Scalars['String']>>;
  rewardTokenSymbol_not_starts_with?: Maybe<Scalars['String']>;
  rewardTokenSymbol_starts_with?: Maybe<Scalars['String']>;
  rewardToken_contains?: Maybe<Scalars['Bytes']>;
  rewardToken_in?: Maybe<Array<Scalars['Bytes']>>;
  rewardToken_not?: Maybe<Scalars['Bytes']>;
  rewardToken_not_contains?: Maybe<Scalars['Bytes']>;
  rewardToken_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum IncentivesController_OrderBy {
  ClaimIncentives = 'claimIncentives',
  EmissionEndTimestamp = 'emissionEndTimestamp',
  Id = 'id',
  IncentivizedActions = 'incentivizedActions',
  Precision = 'precision',
  RewardToken = 'rewardToken',
  RewardTokenDecimals = 'rewardTokenDecimals',
  RewardTokenSymbol = 'rewardTokenSymbol',
}

export type IncentivizedAction = {
  __typename?: 'IncentivizedAction';
  amount: Scalars['BigInt'];
  /**
   * txHash
   *
   */
  id: Scalars['ID'];
  incentivesController: IncentivesController;
  user: User;
};

export type IncentivizedAction_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  incentivesController?: Maybe<Scalars['String']>;
  incentivesController_contains?: Maybe<Scalars['String']>;
  incentivesController_ends_with?: Maybe<Scalars['String']>;
  incentivesController_gt?: Maybe<Scalars['String']>;
  incentivesController_gte?: Maybe<Scalars['String']>;
  incentivesController_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_lt?: Maybe<Scalars['String']>;
  incentivesController_lte?: Maybe<Scalars['String']>;
  incentivesController_not?: Maybe<Scalars['String']>;
  incentivesController_not_contains?: Maybe<Scalars['String']>;
  incentivesController_not_ends_with?: Maybe<Scalars['String']>;
  incentivesController_not_in?: Maybe<Array<Scalars['String']>>;
  incentivesController_not_starts_with?: Maybe<Scalars['String']>;
  incentivesController_starts_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum IncentivizedAction_OrderBy {
  Amount = 'amount',
  Id = 'id',
  IncentivesController = 'incentivesController',
  User = 'user',
}

export type LiquidationCall = UserTransaction & {
  __typename?: 'LiquidationCall';
  collateralAmount: Scalars['BigInt'];
  collateralReserve: Reserve;
  collateralUserReserve: UserReserve;
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  liquidator: Scalars['Bytes'];
  pool: Pool;
  principalAmount: Scalars['BigInt'];
  principalReserve: Reserve;
  principalUserReserve: UserReserve;
  timestamp: Scalars['Int'];
  user: User;
};

export type LiquidationCall_Filter = {
  collateralAmount?: Maybe<Scalars['BigInt']>;
  collateralAmount_gt?: Maybe<Scalars['BigInt']>;
  collateralAmount_gte?: Maybe<Scalars['BigInt']>;
  collateralAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralAmount_lt?: Maybe<Scalars['BigInt']>;
  collateralAmount_lte?: Maybe<Scalars['BigInt']>;
  collateralAmount_not?: Maybe<Scalars['BigInt']>;
  collateralAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralReserve?: Maybe<Scalars['String']>;
  collateralReserve_contains?: Maybe<Scalars['String']>;
  collateralReserve_ends_with?: Maybe<Scalars['String']>;
  collateralReserve_gt?: Maybe<Scalars['String']>;
  collateralReserve_gte?: Maybe<Scalars['String']>;
  collateralReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_lt?: Maybe<Scalars['String']>;
  collateralReserve_lte?: Maybe<Scalars['String']>;
  collateralReserve_not?: Maybe<Scalars['String']>;
  collateralReserve_not_contains?: Maybe<Scalars['String']>;
  collateralReserve_not_ends_with?: Maybe<Scalars['String']>;
  collateralReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralReserve_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve?: Maybe<Scalars['String']>;
  collateralUserReserve_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve_gt?: Maybe<Scalars['String']>;
  collateralUserReserve_gte?: Maybe<Scalars['String']>;
  collateralUserReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_lt?: Maybe<Scalars['String']>;
  collateralUserReserve_lte?: Maybe<Scalars['String']>;
  collateralUserReserve_not?: Maybe<Scalars['String']>;
  collateralUserReserve_not_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  liquidator?: Maybe<Scalars['Bytes']>;
  liquidator_contains?: Maybe<Scalars['Bytes']>;
  liquidator_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_not?: Maybe<Scalars['Bytes']>;
  liquidator_not_contains?: Maybe<Scalars['Bytes']>;
  liquidator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  principalAmount?: Maybe<Scalars['BigInt']>;
  principalAmount_gt?: Maybe<Scalars['BigInt']>;
  principalAmount_gte?: Maybe<Scalars['BigInt']>;
  principalAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  principalAmount_lt?: Maybe<Scalars['BigInt']>;
  principalAmount_lte?: Maybe<Scalars['BigInt']>;
  principalAmount_not?: Maybe<Scalars['BigInt']>;
  principalAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  principalReserve?: Maybe<Scalars['String']>;
  principalReserve_contains?: Maybe<Scalars['String']>;
  principalReserve_ends_with?: Maybe<Scalars['String']>;
  principalReserve_gt?: Maybe<Scalars['String']>;
  principalReserve_gte?: Maybe<Scalars['String']>;
  principalReserve_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_lt?: Maybe<Scalars['String']>;
  principalReserve_lte?: Maybe<Scalars['String']>;
  principalReserve_not?: Maybe<Scalars['String']>;
  principalReserve_not_contains?: Maybe<Scalars['String']>;
  principalReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalReserve_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve?: Maybe<Scalars['String']>;
  principalUserReserve_contains?: Maybe<Scalars['String']>;
  principalUserReserve_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve_gt?: Maybe<Scalars['String']>;
  principalUserReserve_gte?: Maybe<Scalars['String']>;
  principalUserReserve_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_lt?: Maybe<Scalars['String']>;
  principalUserReserve_lte?: Maybe<Scalars['String']>;
  principalUserReserve_not?: Maybe<Scalars['String']>;
  principalUserReserve_not_contains?: Maybe<Scalars['String']>;
  principalUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum LiquidationCall_OrderBy {
  CollateralAmount = 'collateralAmount',
  CollateralReserve = 'collateralReserve',
  CollateralUserReserve = 'collateralUserReserve',
  Id = 'id',
  Liquidator = 'liquidator',
  Pool = 'pool',
  PrincipalAmount = 'principalAmount',
  PrincipalReserve = 'principalReserve',
  PrincipalUserReserve = 'principalUserReserve',
  Timestamp = 'timestamp',
  User = 'user',
}

export type MapAssetPool = {
  __typename?: 'MapAssetPool';
  /**
   * address of a /s /v token
   *
   */
  id: Scalars['ID'];
  pool: Scalars['String'];
  underlyingAsset: Scalars['Bytes'];
};

export type MapAssetPool_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  underlyingAsset?: Maybe<Scalars['Bytes']>;
  underlyingAsset_contains?: Maybe<Scalars['Bytes']>;
  underlyingAsset_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAsset_not?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not_in?: Maybe<Array<Scalars['Bytes']>>;
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
  collateralReserve: Reserve;
  collateralUserReserve: UserReserve;
  feeLiquidated: Scalars['BigInt'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  liquidatedCollateralForFee: Scalars['BigInt'];
  pool: Pool;
  principalReserve: Reserve;
  principalUserReserve: UserReserve;
  timestamp: Scalars['Int'];
  user: User;
};

export type OriginationFeeLiquidation_Filter = {
  collateralReserve?: Maybe<Scalars['String']>;
  collateralReserve_contains?: Maybe<Scalars['String']>;
  collateralReserve_ends_with?: Maybe<Scalars['String']>;
  collateralReserve_gt?: Maybe<Scalars['String']>;
  collateralReserve_gte?: Maybe<Scalars['String']>;
  collateralReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_lt?: Maybe<Scalars['String']>;
  collateralReserve_lte?: Maybe<Scalars['String']>;
  collateralReserve_not?: Maybe<Scalars['String']>;
  collateralReserve_not_contains?: Maybe<Scalars['String']>;
  collateralReserve_not_ends_with?: Maybe<Scalars['String']>;
  collateralReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralReserve_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve?: Maybe<Scalars['String']>;
  collateralUserReserve_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve_gt?: Maybe<Scalars['String']>;
  collateralUserReserve_gte?: Maybe<Scalars['String']>;
  collateralUserReserve_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_lt?: Maybe<Scalars['String']>;
  collateralUserReserve_lte?: Maybe<Scalars['String']>;
  collateralUserReserve_not?: Maybe<Scalars['String']>;
  collateralUserReserve_not_contains?: Maybe<Scalars['String']>;
  collateralUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  collateralUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  collateralUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  collateralUserReserve_starts_with?: Maybe<Scalars['String']>;
  feeLiquidated?: Maybe<Scalars['BigInt']>;
  feeLiquidated_gt?: Maybe<Scalars['BigInt']>;
  feeLiquidated_gte?: Maybe<Scalars['BigInt']>;
  feeLiquidated_in?: Maybe<Array<Scalars['BigInt']>>;
  feeLiquidated_lt?: Maybe<Scalars['BigInt']>;
  feeLiquidated_lte?: Maybe<Scalars['BigInt']>;
  feeLiquidated_not?: Maybe<Scalars['BigInt']>;
  feeLiquidated_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  liquidatedCollateralForFee?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_gt?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_gte?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatedCollateralForFee_lt?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_lte?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_not?: Maybe<Scalars['BigInt']>;
  liquidatedCollateralForFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  principalReserve?: Maybe<Scalars['String']>;
  principalReserve_contains?: Maybe<Scalars['String']>;
  principalReserve_ends_with?: Maybe<Scalars['String']>;
  principalReserve_gt?: Maybe<Scalars['String']>;
  principalReserve_gte?: Maybe<Scalars['String']>;
  principalReserve_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_lt?: Maybe<Scalars['String']>;
  principalReserve_lte?: Maybe<Scalars['String']>;
  principalReserve_not?: Maybe<Scalars['String']>;
  principalReserve_not_contains?: Maybe<Scalars['String']>;
  principalReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalReserve_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve?: Maybe<Scalars['String']>;
  principalUserReserve_contains?: Maybe<Scalars['String']>;
  principalUserReserve_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve_gt?: Maybe<Scalars['String']>;
  principalUserReserve_gte?: Maybe<Scalars['String']>;
  principalUserReserve_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_lt?: Maybe<Scalars['String']>;
  principalUserReserve_lte?: Maybe<Scalars['String']>;
  principalUserReserve_not?: Maybe<Scalars['String']>;
  principalUserReserve_not_contains?: Maybe<Scalars['String']>;
  principalUserReserve_not_ends_with?: Maybe<Scalars['String']>;
  principalUserReserve_not_in?: Maybe<Array<Scalars['String']>>;
  principalUserReserve_not_starts_with?: Maybe<Scalars['String']>;
  principalUserReserve_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum OriginationFeeLiquidation_OrderBy {
  CollateralReserve = 'collateralReserve',
  CollateralUserReserve = 'collateralUserReserve',
  FeeLiquidated = 'feeLiquidated',
  Id = 'id',
  LiquidatedCollateralForFee = 'liquidatedCollateralForFee',
  Pool = 'pool',
  PrincipalReserve = 'principalReserve',
  PrincipalUserReserve = 'principalUserReserve',
  Timestamp = 'timestamp',
  User = 'user',
}

export type Pool = {
  __typename?: 'Pool';
  active: Scalars['Boolean'];
  borrowHistory: Array<Borrow>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  depositHistory: Array<Deposit>;
  emergencyAdmin?: Maybe<Scalars['Bytes']>;
  ethereumAddress?: Maybe<Scalars['Bytes']>;
  flashLoanHistory: Array<FlashLoan>;
  history: Array<PoolConfigurationHistoryItem>;
  id: Scalars['ID'];
  lastUpdateTimestamp: Scalars['Int'];
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  liquidationCallHistory: Array<LiquidationCall>;
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
  paused: Scalars['Boolean'];
  protocol: Protocol;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  repayHistory: Array<Repay>;
  reserves: Array<Reserve>;
  swapHistory: Array<Swap>;
  usageAsCollateralHistory: Array<UsageAsCollateral>;
};

export type PoolBorrowHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Borrow_Filter>;
};

export type PoolDepositHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Deposit_Filter>;
};

export type PoolFlashLoanHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FlashLoan_Filter>;
};

export type PoolHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PoolConfigurationHistoryItem_Filter>;
};

export type PoolLiquidationCallHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type PoolOriginationFeeLiquidationHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type PoolRebalanceStableBorrowRateHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type PoolRedeemUnderlyingHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type PoolRepayHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Repay_Filter>;
};

export type PoolReservesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Reserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Reserve_Filter>;
};

export type PoolSwapHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};

export type PoolUsageAsCollateralHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type PoolConfigurationHistoryItem = {
  __typename?: 'PoolConfigurationHistoryItem';
  active?: Maybe<Scalars['Boolean']>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  pool: Pool;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  timestamp: Scalars['Int'];
};

export type PoolConfigurationHistoryItem_Filter = {
  active?: Maybe<Scalars['Boolean']>;
  active_in?: Maybe<Array<Scalars['Boolean']>>;
  active_not?: Maybe<Scalars['Boolean']>;
  active_not_in?: Maybe<Array<Scalars['Boolean']>>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  configurationAdmin_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin_in?: Maybe<Array<Scalars['Bytes']>>;
  configurationAdmin_not?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolCollateralManager_not?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfiguratorImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_contains?: Maybe<Scalars['Bytes']>;
  lendingPool_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_not?: Maybe<Scalars['Bytes']>;
  lendingPool_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPool_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle_not?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_not?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_in?: Maybe<Array<Scalars['Bytes']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum PoolConfigurationHistoryItem_OrderBy {
  Active = 'active',
  ConfigurationAdmin = 'configurationAdmin',
  Id = 'id',
  LendingPool = 'lendingPool',
  LendingPoolCollateralManager = 'lendingPoolCollateralManager',
  LendingPoolConfigurator = 'lendingPoolConfigurator',
  LendingPoolConfiguratorImpl = 'lendingPoolConfiguratorImpl',
  LendingPoolImpl = 'lendingPoolImpl',
  LendingRateOracle = 'lendingRateOracle',
  Pool = 'pool',
  ProxyPriceProvider = 'proxyPriceProvider',
  Timestamp = 'timestamp',
}

export type Pool_Filter = {
  active?: Maybe<Scalars['Boolean']>;
  active_in?: Maybe<Array<Scalars['Boolean']>>;
  active_not?: Maybe<Scalars['Boolean']>;
  active_not_in?: Maybe<Array<Scalars['Boolean']>>;
  configurationAdmin?: Maybe<Scalars['Bytes']>;
  configurationAdmin_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin_in?: Maybe<Array<Scalars['Bytes']>>;
  configurationAdmin_not?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not_contains?: Maybe<Scalars['Bytes']>;
  configurationAdmin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  emergencyAdmin?: Maybe<Scalars['Bytes']>;
  emergencyAdmin_contains?: Maybe<Scalars['Bytes']>;
  emergencyAdmin_in?: Maybe<Array<Scalars['Bytes']>>;
  emergencyAdmin_not?: Maybe<Scalars['Bytes']>;
  emergencyAdmin_not_contains?: Maybe<Scalars['Bytes']>;
  emergencyAdmin_not_in?: Maybe<Array<Scalars['Bytes']>>;
  ethereumAddress?: Maybe<Scalars['Bytes']>;
  ethereumAddress_contains?: Maybe<Scalars['Bytes']>;
  ethereumAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  ethereumAddress_not?: Maybe<Scalars['Bytes']>;
  ethereumAddress_not_contains?: Maybe<Scalars['Bytes']>;
  ethereumAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  lendingPool?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolCollateralManager_not?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolCollateralManager_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfiguratorImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfiguratorImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolConfigurator_not?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolConfigurator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPoolImpl_not?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPoolImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_contains?: Maybe<Scalars['Bytes']>;
  lendingPool_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingPool_not?: Maybe<Scalars['Bytes']>;
  lendingPool_not_contains?: Maybe<Scalars['Bytes']>;
  lendingPool_not_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_in?: Maybe<Array<Scalars['Bytes']>>;
  lendingRateOracle_not?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not_contains?: Maybe<Scalars['Bytes']>;
  lendingRateOracle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  paused?: Maybe<Scalars['Boolean']>;
  paused_in?: Maybe<Array<Scalars['Boolean']>>;
  paused_not?: Maybe<Scalars['Boolean']>;
  paused_not_in?: Maybe<Array<Scalars['Boolean']>>;
  protocol?: Maybe<Scalars['String']>;
  protocol_contains?: Maybe<Scalars['String']>;
  protocol_ends_with?: Maybe<Scalars['String']>;
  protocol_gt?: Maybe<Scalars['String']>;
  protocol_gte?: Maybe<Scalars['String']>;
  protocol_in?: Maybe<Array<Scalars['String']>>;
  protocol_lt?: Maybe<Scalars['String']>;
  protocol_lte?: Maybe<Scalars['String']>;
  protocol_not?: Maybe<Scalars['String']>;
  protocol_not_contains?: Maybe<Scalars['String']>;
  protocol_not_ends_with?: Maybe<Scalars['String']>;
  protocol_not_in?: Maybe<Array<Scalars['String']>>;
  protocol_not_starts_with?: Maybe<Scalars['String']>;
  protocol_starts_with?: Maybe<Scalars['String']>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_not?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Pool_OrderBy {
  Active = 'active',
  BorrowHistory = 'borrowHistory',
  ConfigurationAdmin = 'configurationAdmin',
  DepositHistory = 'depositHistory',
  EmergencyAdmin = 'emergencyAdmin',
  EthereumAddress = 'ethereumAddress',
  FlashLoanHistory = 'flashLoanHistory',
  History = 'history',
  Id = 'id',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  LendingPool = 'lendingPool',
  LendingPoolCollateralManager = 'lendingPoolCollateralManager',
  LendingPoolConfigurator = 'lendingPoolConfigurator',
  LendingPoolConfiguratorImpl = 'lendingPoolConfiguratorImpl',
  LendingPoolImpl = 'lendingPoolImpl',
  LendingRateOracle = 'lendingRateOracle',
  LiquidationCallHistory = 'liquidationCallHistory',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
  Paused = 'paused',
  Protocol = 'protocol',
  ProxyPriceProvider = 'proxyPriceProvider',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  RepayHistory = 'repayHistory',
  Reserves = 'reserves',
  SwapHistory = 'swapHistory',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
}

export type PriceHistoryItem = {
  __typename?: 'PriceHistoryItem';
  asset: PriceOracleAsset;
  id: Scalars['ID'];
  price: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type PriceHistoryItem_Filter = {
  asset?: Maybe<Scalars['String']>;
  asset_contains?: Maybe<Scalars['String']>;
  asset_ends_with?: Maybe<Scalars['String']>;
  asset_gt?: Maybe<Scalars['String']>;
  asset_gte?: Maybe<Scalars['String']>;
  asset_in?: Maybe<Array<Scalars['String']>>;
  asset_lt?: Maybe<Scalars['String']>;
  asset_lte?: Maybe<Scalars['String']>;
  asset_not?: Maybe<Scalars['String']>;
  asset_not_contains?: Maybe<Scalars['String']>;
  asset_not_ends_with?: Maybe<Scalars['String']>;
  asset_not_in?: Maybe<Array<Scalars['String']>>;
  asset_not_starts_with?: Maybe<Scalars['String']>;
  asset_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  price?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum PriceHistoryItem_OrderBy {
  Asset = 'asset',
  Id = 'id',
  Price = 'price',
  Timestamp = 'timestamp',
}

export type PriceOracle = {
  __typename?: 'PriceOracle';
  fallbackPriceOracle: Scalars['Bytes'];
  id: Scalars['ID'];
  lastUpdateTimestamp: Scalars['Int'];
  proxyPriceProvider: Scalars['Bytes'];
  tokens: Array<PriceOracleAsset>;
  tokensWithFallback: Array<PriceOracleAsset>;
  usdDependentAssets: Array<PriceOracleAsset>;
  usdPriceEth: Scalars['BigInt'];
  usdPriceEthFallbackRequired: Scalars['Boolean'];
  usdPriceEthHistory: Array<UsdEthPriceHistoryItem>;
  usdPriceEthMainSource: Scalars['Bytes'];
  version: Scalars['Int'];
};

export type PriceOracleTokensArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleTokensWithFallbackArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleUsdDependentAssetsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleUsdPriceEthHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsdEthPriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UsdEthPriceHistoryItem_Filter>;
};

export type PriceOracleAsset = {
  __typename?: 'PriceOracleAsset';
  dependentAssets: Array<PriceOracleAsset>;
  fromChainlinkSourcesRegistry: Scalars['Boolean'];
  id: Scalars['ID'];
  isFallbackRequired: Scalars['Boolean'];
  lastUpdateTimestamp: Scalars['Int'];
  oracle: PriceOracle;
  platform: PriceOracleAssetPlatform;
  priceHistory: Array<PriceHistoryItem>;
  priceInEth: Scalars['BigInt'];
  priceSource: Scalars['Bytes'];
  type: PriceOracleAssetType;
};

export type PriceOracleAssetDependentAssetsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type PriceOracleAssetPriceHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PriceHistoryItem_Filter>;
};

export enum PriceOracleAssetPlatform {
  Simple = 'Simple',
  Uniswap = 'Uniswap',
}

export enum PriceOracleAssetType {
  Composite = 'Composite',
  Simple = 'Simple',
}

export type PriceOracleAsset_Filter = {
  dependentAssets?: Maybe<Array<Scalars['String']>>;
  dependentAssets_contains?: Maybe<Array<Scalars['String']>>;
  dependentAssets_not?: Maybe<Array<Scalars['String']>>;
  dependentAssets_not_contains?: Maybe<Array<Scalars['String']>>;
  fromChainlinkSourcesRegistry?: Maybe<Scalars['Boolean']>;
  fromChainlinkSourcesRegistry_in?: Maybe<Array<Scalars['Boolean']>>;
  fromChainlinkSourcesRegistry_not?: Maybe<Scalars['Boolean']>;
  fromChainlinkSourcesRegistry_not_in?: Maybe<Array<Scalars['Boolean']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  isFallbackRequired?: Maybe<Scalars['Boolean']>;
  isFallbackRequired_in?: Maybe<Array<Scalars['Boolean']>>;
  isFallbackRequired_not?: Maybe<Scalars['Boolean']>;
  isFallbackRequired_not_in?: Maybe<Array<Scalars['Boolean']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  oracle?: Maybe<Scalars['String']>;
  oracle_contains?: Maybe<Scalars['String']>;
  oracle_ends_with?: Maybe<Scalars['String']>;
  oracle_gt?: Maybe<Scalars['String']>;
  oracle_gte?: Maybe<Scalars['String']>;
  oracle_in?: Maybe<Array<Scalars['String']>>;
  oracle_lt?: Maybe<Scalars['String']>;
  oracle_lte?: Maybe<Scalars['String']>;
  oracle_not?: Maybe<Scalars['String']>;
  oracle_not_contains?: Maybe<Scalars['String']>;
  oracle_not_ends_with?: Maybe<Scalars['String']>;
  oracle_not_in?: Maybe<Array<Scalars['String']>>;
  oracle_not_starts_with?: Maybe<Scalars['String']>;
  oracle_starts_with?: Maybe<Scalars['String']>;
  platform?: Maybe<PriceOracleAssetPlatform>;
  platform_in?: Maybe<Array<PriceOracleAssetPlatform>>;
  platform_not?: Maybe<PriceOracleAssetPlatform>;
  platform_not_in?: Maybe<Array<PriceOracleAssetPlatform>>;
  priceInEth?: Maybe<Scalars['BigInt']>;
  priceInEth_gt?: Maybe<Scalars['BigInt']>;
  priceInEth_gte?: Maybe<Scalars['BigInt']>;
  priceInEth_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInEth_lt?: Maybe<Scalars['BigInt']>;
  priceInEth_lte?: Maybe<Scalars['BigInt']>;
  priceInEth_not?: Maybe<Scalars['BigInt']>;
  priceInEth_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceSource?: Maybe<Scalars['Bytes']>;
  priceSource_contains?: Maybe<Scalars['Bytes']>;
  priceSource_in?: Maybe<Array<Scalars['Bytes']>>;
  priceSource_not?: Maybe<Scalars['Bytes']>;
  priceSource_not_contains?: Maybe<Scalars['Bytes']>;
  priceSource_not_in?: Maybe<Array<Scalars['Bytes']>>;
  type?: Maybe<PriceOracleAssetType>;
  type_in?: Maybe<Array<PriceOracleAssetType>>;
  type_not?: Maybe<PriceOracleAssetType>;
  type_not_in?: Maybe<Array<PriceOracleAssetType>>;
};

export enum PriceOracleAsset_OrderBy {
  DependentAssets = 'dependentAssets',
  FromChainlinkSourcesRegistry = 'fromChainlinkSourcesRegistry',
  Id = 'id',
  IsFallbackRequired = 'isFallbackRequired',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  Oracle = 'oracle',
  Platform = 'platform',
  PriceHistory = 'priceHistory',
  PriceInEth = 'priceInEth',
  PriceSource = 'priceSource',
  Type = 'type',
}

export type PriceOracle_Filter = {
  fallbackPriceOracle?: Maybe<Scalars['Bytes']>;
  fallbackPriceOracle_contains?: Maybe<Scalars['Bytes']>;
  fallbackPriceOracle_in?: Maybe<Array<Scalars['Bytes']>>;
  fallbackPriceOracle_not?: Maybe<Scalars['Bytes']>;
  fallbackPriceOracle_not_contains?: Maybe<Scalars['Bytes']>;
  fallbackPriceOracle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  proxyPriceProvider?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_in?: Maybe<Array<Scalars['Bytes']>>;
  proxyPriceProvider_not?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_contains?: Maybe<Scalars['Bytes']>;
  proxyPriceProvider_not_in?: Maybe<Array<Scalars['Bytes']>>;
  tokensWithFallback?: Maybe<Array<Scalars['String']>>;
  tokensWithFallback_contains?: Maybe<Array<Scalars['String']>>;
  tokensWithFallback_not?: Maybe<Array<Scalars['String']>>;
  tokensWithFallback_not_contains?: Maybe<Array<Scalars['String']>>;
  usdDependentAssets?: Maybe<Array<Scalars['String']>>;
  usdDependentAssets_contains?: Maybe<Array<Scalars['String']>>;
  usdDependentAssets_not?: Maybe<Array<Scalars['String']>>;
  usdDependentAssets_not_contains?: Maybe<Array<Scalars['String']>>;
  usdPriceEth?: Maybe<Scalars['BigInt']>;
  usdPriceEthFallbackRequired?: Maybe<Scalars['Boolean']>;
  usdPriceEthFallbackRequired_in?: Maybe<Array<Scalars['Boolean']>>;
  usdPriceEthFallbackRequired_not?: Maybe<Scalars['Boolean']>;
  usdPriceEthFallbackRequired_not_in?: Maybe<Array<Scalars['Boolean']>>;
  usdPriceEthMainSource?: Maybe<Scalars['Bytes']>;
  usdPriceEthMainSource_contains?: Maybe<Scalars['Bytes']>;
  usdPriceEthMainSource_in?: Maybe<Array<Scalars['Bytes']>>;
  usdPriceEthMainSource_not?: Maybe<Scalars['Bytes']>;
  usdPriceEthMainSource_not_contains?: Maybe<Scalars['Bytes']>;
  usdPriceEthMainSource_not_in?: Maybe<Array<Scalars['Bytes']>>;
  usdPriceEth_gt?: Maybe<Scalars['BigInt']>;
  usdPriceEth_gte?: Maybe<Scalars['BigInt']>;
  usdPriceEth_in?: Maybe<Array<Scalars['BigInt']>>;
  usdPriceEth_lt?: Maybe<Scalars['BigInt']>;
  usdPriceEth_lte?: Maybe<Scalars['BigInt']>;
  usdPriceEth_not?: Maybe<Scalars['BigInt']>;
  usdPriceEth_not_in?: Maybe<Array<Scalars['BigInt']>>;
  version?: Maybe<Scalars['Int']>;
  version_gt?: Maybe<Scalars['Int']>;
  version_gte?: Maybe<Scalars['Int']>;
  version_in?: Maybe<Array<Scalars['Int']>>;
  version_lt?: Maybe<Scalars['Int']>;
  version_lte?: Maybe<Scalars['Int']>;
  version_not?: Maybe<Scalars['Int']>;
  version_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum PriceOracle_OrderBy {
  FallbackPriceOracle = 'fallbackPriceOracle',
  Id = 'id',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  ProxyPriceProvider = 'proxyPriceProvider',
  Tokens = 'tokens',
  TokensWithFallback = 'tokensWithFallback',
  UsdDependentAssets = 'usdDependentAssets',
  UsdPriceEth = 'usdPriceEth',
  UsdPriceEthFallbackRequired = 'usdPriceEthFallbackRequired',
  UsdPriceEthHistory = 'usdPriceEthHistory',
  UsdPriceEthMainSource = 'usdPriceEthMainSource',
  Version = 'version',
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

export type Protocol = {
  __typename?: 'Protocol';
  id: Scalars['ID'];
  pools: Array<Pool>;
};

export type ProtocolPoolsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pool_Filter>;
};

export type Protocol_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
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
  executor?: Maybe<Executor>;
  executors: Array<Executor>;
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
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  protocol?: Maybe<Protocol>;
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
  userReserve?: Maybe<UserReserve>;
  userReserves: Array<UserReserve>;
  userTransaction?: Maybe<UserTransaction>;
  userTransactions: Array<UserTransaction>;
  users: Array<User>;
  variableDebtToken?: Maybe<VariableDebtToken>;
  variableDebtTokens: Array<VariableDebtToken>;
  variableTokenDelegatedAllowance?: Maybe<VariableTokenDelegatedAllowance>;
  variableTokenDelegatedAllowances: Array<VariableTokenDelegatedAllowance>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
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
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAtokenBalanceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAtokenBalanceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ATokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ATokenBalanceHistoryItem_Filter>;
};

export type QueryAtokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<AToken_Filter>;
};

export type QueryBorrowArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBorrowsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Borrow_Filter>;
};

export type QueryChainlinkAggregatorArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryChainlinkAggregatorsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkAggregator_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ChainlinkAggregator_Filter>;
};

export type QueryChainlinkEnsArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryChainlinkEnSsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkEns_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ChainlinkEns_Filter>;
};

export type QueryClaimIncentiveCallArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryClaimIncentiveCallsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ClaimIncentiveCall_Filter>;
};

export type QueryContractToPoolMappingArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryContractToPoolMappingsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractToPoolMapping_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ContractToPoolMapping_Filter>;
};

export type QueryDepositArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDepositsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Deposit_Filter>;
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

export type QueryFlashLoanArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFlashLoansArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<FlashLoan_Filter>;
};

export type QueryIncentivesControllerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryIncentivesControllersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivesController_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<IncentivesController_Filter>;
};

export type QueryIncentivizedActionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryIncentivizedActionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<IncentivizedAction_Filter>;
};

export type QueryLiquidationCallArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLiquidationCallsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<LiquidationCall_Filter>;
};

export type QueryMapAssetPoolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMapAssetPoolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MapAssetPool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<MapAssetPool_Filter>;
};

export type QueryOriginationFeeLiquidationArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryOriginationFeeLiquidationsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type QueryPoolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolConfigurationHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolConfigurationHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PoolConfigurationHistoryItem_Filter>;
};

export type QueryPoolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Pool_Filter>;
};

export type QueryPriceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPriceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PriceHistoryItem_Filter>;
};

export type QueryPriceOracleArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPriceOracleAssetArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPriceOracleAssetsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type QueryPriceOraclesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PriceOracle_Filter>;
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

export type QueryProtocolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProtocolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Protocol_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Protocol_Filter>;
};

export type QueryRebalanceStableBorrowRateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRebalanceStableBorrowRatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type QueryRedeemUnderlyingArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRedeemUnderlyingsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type QueryReferrerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryReferrersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Referrer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Referrer_Filter>;
};

export type QueryRepayArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRepaysArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Repay_Filter>;
};

export type QueryReserveArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryReserveConfigurationHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryReserveConfigurationHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ReserveConfigurationHistoryItem_Filter>;
};

export type QueryReserveParamsHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryReserveParamsHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveParamsHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ReserveParamsHistoryItem_Filter>;
};

export type QueryReservesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Reserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Reserve_Filter>;
};

export type QueryStableDebtTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryStableDebtTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<StableDebtToken_Filter>;
};

export type QueryStableTokenDelegatedAllowanceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryStableTokenDelegatedAllowancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<StableTokenDelegatedAllowance_Filter>;
};

export type QueryStokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryStokenBalanceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryStokenBalanceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<STokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<STokenBalanceHistoryItem_Filter>;
};

export type QueryStokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<SToken_Filter>;
};

export type QuerySwapArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySwapHistoriesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SwapHistory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<SwapHistory_Filter>;
};

export type QuerySwapHistoryArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySwapsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Swap_Filter>;
};

export type QueryUsageAsCollateralArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUsageAsCollateralsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type QueryUsdEthPriceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUsdEthPriceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsdEthPriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UsdEthPriceHistoryItem_Filter>;
};

export type QueryUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserReserveArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserReservesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UserReserve_Filter>;
};

export type QueryUserTransactionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserTransactionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserTransaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UserTransaction_Filter>;
};

export type QueryUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<User_Filter>;
};

export type QueryVariableDebtTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVariableDebtTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VariableDebtToken_Filter>;
};

export type QueryVariableTokenDelegatedAllowanceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVariableTokenDelegatedAllowancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VariableTokenDelegatedAllowance_Filter>;
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

export type QueryVtokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVtokenBalanceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVtokenBalanceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VTokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VTokenBalanceHistoryItem_Filter>;
};

export type QueryVtokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VToken_Filter>;
};

export type QueryWethreserveArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWethreservesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WethReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<WethReserve_Filter>;
};

export type RebalanceStableBorrowRate = UserTransaction & {
  __typename?: 'RebalanceStableBorrowRate';
  borrowRateFrom: Scalars['BigInt'];
  borrowRateTo: Scalars['BigInt'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  reserve: Reserve;
  timestamp: Scalars['Int'];
  user: User;
  userReserve: UserReserve;
};

export type RebalanceStableBorrowRate_Filter = {
  borrowRateFrom?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_gt?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_gte?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRateFrom_lt?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_lte?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_not?: Maybe<Scalars['BigInt']>;
  borrowRateFrom_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRateTo?: Maybe<Scalars['BigInt']>;
  borrowRateTo_gt?: Maybe<Scalars['BigInt']>;
  borrowRateTo_gte?: Maybe<Scalars['BigInt']>;
  borrowRateTo_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowRateTo_lt?: Maybe<Scalars['BigInt']>;
  borrowRateTo_lte?: Maybe<Scalars['BigInt']>;
  borrowRateTo_not?: Maybe<Scalars['BigInt']>;
  borrowRateTo_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum RebalanceStableBorrowRate_OrderBy {
  BorrowRateFrom = 'borrowRateFrom',
  BorrowRateTo = 'borrowRateTo',
  Id = 'id',
  Pool = 'pool',
  Reserve = 'reserve',
  Timestamp = 'timestamp',
  User = 'user',
  UserReserve = 'userReserve',
}

export type RedeemUnderlying = UserTransaction & {
  __typename?: 'RedeemUnderlying';
  amount: Scalars['BigInt'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  onBehalfOf: User;
  pool: Pool;
  reserve: Reserve;
  timestamp: Scalars['Int'];
  user: User;
  userReserve: UserReserve;
};

export type RedeemUnderlying_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum RedeemUnderlying_OrderBy {
  Amount = 'amount',
  Id = 'id',
  OnBehalfOf = 'onBehalfOf',
  Pool = 'pool',
  Reserve = 'reserve',
  Timestamp = 'timestamp',
  User = 'user',
  UserReserve = 'userReserve',
}

export type Referrer = {
  __typename?: 'Referrer';
  borrows: Array<Borrow>;
  deposits: Array<Deposit>;
  id: Scalars['ID'];
};

export type ReferrerBorrowsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Borrow_Filter>;
};

export type ReferrerDepositsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Deposit_Filter>;
};

export type Referrer_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Referrer_OrderBy {
  Borrows = 'borrows',
  Deposits = 'deposits',
  Id = 'id',
}

export type Repay = UserTransaction & {
  __typename?: 'Repay';
  amount: Scalars['BigInt'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  onBehalfOf: User;
  pool: Pool;
  reserve: Reserve;
  timestamp: Scalars['Int'];
  user: User;
  userReserve: UserReserve;
};

export type Repay_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  onBehalfOf?: Maybe<Scalars['String']>;
  onBehalfOf_contains?: Maybe<Scalars['String']>;
  onBehalfOf_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_gt?: Maybe<Scalars['String']>;
  onBehalfOf_gte?: Maybe<Scalars['String']>;
  onBehalfOf_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_lt?: Maybe<Scalars['String']>;
  onBehalfOf_lte?: Maybe<Scalars['String']>;
  onBehalfOf_not?: Maybe<Scalars['String']>;
  onBehalfOf_not_contains?: Maybe<Scalars['String']>;
  onBehalfOf_not_ends_with?: Maybe<Scalars['String']>;
  onBehalfOf_not_in?: Maybe<Array<Scalars['String']>>;
  onBehalfOf_not_starts_with?: Maybe<Scalars['String']>;
  onBehalfOf_starts_with?: Maybe<Scalars['String']>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum Repay_OrderBy {
  Amount = 'amount',
  Id = 'id',
  OnBehalfOf = 'onBehalfOf',
  Pool = 'pool',
  Reserve = 'reserve',
  Timestamp = 'timestamp',
  User = 'user',
  UserReserve = 'userReserve',
}

export type Reserve = {
  __typename?: 'Reserve';
  aEmissionPerSecond: Scalars['BigInt'];
  aIncentivesLastUpdateTimestamp: Scalars['Int'];
  aToken: AToken;
  aTokenIncentivesIndex: Scalars['BigInt'];
  availableLiquidity: Scalars['BigInt'];
  averageStableRate: Scalars['BigInt'];
  baseLTVasCollateral: Scalars['BigInt'];
  baseVariableBorrowRate: Scalars['BigInt'];
  borrowHistory: Array<Borrow>;
  borrowingEnabled: Scalars['Boolean'];
  configurationHistory: Array<ReserveConfigurationHistoryItem>;
  decimals: Scalars['Int'];
  depositHistory: Array<Deposit>;
  deposits: Array<Deposit>;
  flashLoanHistory: Array<FlashLoan>;
  /**
   * Reserve address
   *
   */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isFrozen: Scalars['Boolean'];
  lastUpdateTimestamp: Scalars['Int'];
  lifetimeBorrows: Scalars['BigInt'];
  lifetimeCurrentVariableDebt: Scalars['BigInt'];
  lifetimeDepositorsInterestEarned: Scalars['BigInt'];
  lifetimeFlashLoanPremium: Scalars['BigInt'];
  lifetimeFlashLoans: Scalars['BigInt'];
  lifetimeLiquidated: Scalars['BigInt'];
  lifetimeLiquidity: Scalars['BigInt'];
  lifetimePrincipalStableDebt: Scalars['BigInt'];
  lifetimeRepayments: Scalars['BigInt'];
  lifetimeReserveFactorAccrued: Scalars['BigInt'];
  lifetimeScaledVariableDebt: Scalars['BigInt'];
  lifetimeWithdrawals: Scalars['BigInt'];
  liquidationCallHistory: Array<LiquidationCall>;
  liquidityIndex: Scalars['BigInt'];
  liquidityRate: Scalars['BigInt'];
  name: Scalars['String'];
  optimalUtilisationRate: Scalars['BigInt'];
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
  paramsHistory: Array<ReserveParamsHistoryItem>;
  pool: Pool;
  price: PriceOracleAsset;
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  repayHistory: Array<Repay>;
  reserveFactor: Scalars['BigInt'];
  reserveInterestRateStrategy: Scalars['Bytes'];
  reserveLiquidationBonus: Scalars['BigInt'];
  reserveLiquidationThreshold: Scalars['BigInt'];
  sEmissionPerSecond: Scalars['BigInt'];
  sIncentivesLastUpdateTimestamp: Scalars['Int'];
  sToken: SToken;
  sTokenIncentivesIndex: Scalars['BigInt'];
  stableBorrowRate: Scalars['BigInt'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  stableDebtLastUpdateTimestamp: Scalars['Int'];
  stableRateSlope1: Scalars['BigInt'];
  stableRateSlope2: Scalars['BigInt'];
  swapHistory: Array<Swap>;
  symbol: Scalars['String'];
  totalATokenSupply: Scalars['BigInt'];
  totalCurrentVariableDebt: Scalars['BigInt'];
  totalDeposits: Scalars['BigInt'];
  totalLiquidity: Scalars['BigInt'];
  totalLiquidityAsCollateral: Scalars['BigInt'];
  totalPrincipalStableDebt: Scalars['BigInt'];
  totalScaledVariableDebt: Scalars['BigInt'];
  underlyingAsset: Scalars['Bytes'];
  usageAsCollateralEnabled: Scalars['Boolean'];
  usageAsCollateralHistory: Array<UsageAsCollateral>;
  userReserves: Array<UserReserve>;
  utilizationRate: Scalars['BigDecimal'];
  vEmissionPerSecond: Scalars['BigInt'];
  vIncentivesLastUpdateTimestamp: Scalars['Int'];
  vToken: VToken;
  vTokenIncentivesIndex: Scalars['BigInt'];
  variableBorrowIndex: Scalars['BigInt'];
  variableBorrowRate: Scalars['BigInt'];
  variableRateSlope1: Scalars['BigInt'];
  variableRateSlope2: Scalars['BigInt'];
};

export type ReserveBorrowHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Borrow_Filter>;
};

export type ReserveConfigurationHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ReserveConfigurationHistoryItem_Filter>;
};

export type ReserveDepositHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Deposit_Filter>;
};

export type ReserveDepositsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Deposit_Filter>;
};

export type ReserveFlashLoanHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FlashLoan_Filter>;
};

export type ReserveLiquidationCallHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type ReserveOriginationFeeLiquidationHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type ReserveParamsHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveParamsHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ReserveParamsHistoryItem_Filter>;
};

export type ReserveRebalanceStableBorrowRateHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type ReserveRedeemUnderlyingHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type ReserveRepayHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Repay_Filter>;
};

export type ReserveSwapHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};

export type ReserveUsageAsCollateralHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type ReserveUserReservesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UserReserve_Filter>;
};

export type ReserveConfigurationHistoryItem = {
  __typename?: 'ReserveConfigurationHistoryItem';
  baseLTVasCollateral: Scalars['BigInt'];
  borrowingEnabled: Scalars['Boolean'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isFrozen: Scalars['Boolean'];
  reserve: Reserve;
  reserveInterestRateStrategy: Scalars['Bytes'];
  reserveLiquidationBonus: Scalars['BigInt'];
  reserveLiquidationThreshold: Scalars['BigInt'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  timestamp: Scalars['Int'];
  usageAsCollateralEnabled: Scalars['Boolean'];
};

export type ReserveConfigurationHistoryItem_Filter = {
  baseLTVasCollateral?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  baseLTVasCollateral_lt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_lte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_not?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowingEnabled?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  borrowingEnabled_not?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isActive_in?: Maybe<Array<Scalars['Boolean']>>;
  isActive_not?: Maybe<Scalars['Boolean']>;
  isActive_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen?: Maybe<Scalars['Boolean']>;
  isFrozen_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen_not?: Maybe<Scalars['Boolean']>;
  isFrozen_not_in?: Maybe<Array<Scalars['Boolean']>>;
  reserve?: Maybe<Scalars['String']>;
  reserveInterestRateStrategy?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_contains?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveInterestRateStrategy_not?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not_contains?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveLiquidationBonus?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationBonus_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  stableBorrowRateEnabled?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  stableBorrowRateEnabled_not?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  usageAsCollateralEnabled?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  usageAsCollateralEnabled_not?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
};

export enum ReserveConfigurationHistoryItem_OrderBy {
  BaseLtVasCollateral = 'baseLTVasCollateral',
  BorrowingEnabled = 'borrowingEnabled',
  Id = 'id',
  IsActive = 'isActive',
  IsFrozen = 'isFrozen',
  Reserve = 'reserve',
  ReserveInterestRateStrategy = 'reserveInterestRateStrategy',
  ReserveLiquidationBonus = 'reserveLiquidationBonus',
  ReserveLiquidationThreshold = 'reserveLiquidationThreshold',
  StableBorrowRateEnabled = 'stableBorrowRateEnabled',
  Timestamp = 'timestamp',
  UsageAsCollateralEnabled = 'usageAsCollateralEnabled',
}

export type ReserveParamsHistoryItem = {
  __typename?: 'ReserveParamsHistoryItem';
  availableLiquidity: Scalars['BigInt'];
  averageStableBorrowRate: Scalars['BigInt'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  lifetimeBorrows: Scalars['BigInt'];
  lifetimeCurrentVariableDebt: Scalars['BigInt'];
  lifetimeDepositorsInterestEarned: Scalars['BigInt'];
  lifetimeFlashLoanPremium: Scalars['BigInt'];
  lifetimeFlashLoans: Scalars['BigInt'];
  lifetimeLiquidated: Scalars['BigInt'];
  lifetimeLiquidity: Scalars['BigInt'];
  lifetimePrincipalStableDebt: Scalars['BigInt'];
  lifetimeRepayments: Scalars['BigInt'];
  lifetimeReserveFactorAccrued: Scalars['BigInt'];
  lifetimeScaledVariableDebt: Scalars['BigInt'];
  lifetimeWithdrawals: Scalars['BigInt'];
  liquidityIndex: Scalars['BigInt'];
  liquidityRate: Scalars['BigInt'];
  priceInEth: Scalars['BigInt'];
  priceInUsd: Scalars['BigDecimal'];
  reserve: Reserve;
  stableBorrowRate: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  totalATokenSupply: Scalars['BigInt'];
  totalCurrentVariableDebt: Scalars['BigInt'];
  totalLiquidity: Scalars['BigInt'];
  totalLiquidityAsCollateral: Scalars['BigInt'];
  totalPrincipalStableDebt: Scalars['BigInt'];
  totalScaledVariableDebt: Scalars['BigInt'];
  utilizationRate: Scalars['BigDecimal'];
  variableBorrowIndex: Scalars['BigInt'];
  variableBorrowRate: Scalars['BigInt'];
};

export type ReserveParamsHistoryItem_Filter = {
  availableLiquidity?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  availableLiquidity_lt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_lte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_not?: Maybe<Scalars['BigInt']>;
  availableLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableBorrowRate?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  averageStableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lifetimeBorrows?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeBorrows_lt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_lte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_not?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned_lt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_lte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_not?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidity?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidity_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments_lt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_lte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_not?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued_lt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_lte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_not?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals_lt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_lte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_not?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex_lt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_lte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_not?: Maybe<Scalars['BigInt']>;
  liquidityIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate?: Maybe<Scalars['BigInt']>;
  liquidityRate_gt?: Maybe<Scalars['BigInt']>;
  liquidityRate_gte?: Maybe<Scalars['BigInt']>;
  liquidityRate_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate_lt?: Maybe<Scalars['BigInt']>;
  liquidityRate_lte?: Maybe<Scalars['BigInt']>;
  liquidityRate_not?: Maybe<Scalars['BigInt']>;
  liquidityRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInEth?: Maybe<Scalars['BigInt']>;
  priceInEth_gt?: Maybe<Scalars['BigInt']>;
  priceInEth_gte?: Maybe<Scalars['BigInt']>;
  priceInEth_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInEth_lt?: Maybe<Scalars['BigInt']>;
  priceInEth_lte?: Maybe<Scalars['BigInt']>;
  priceInEth_not?: Maybe<Scalars['BigInt']>;
  priceInEth_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceInUsd?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_gt?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_gte?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_in?: Maybe<Array<Scalars['BigDecimal']>>;
  priceInUsd_lt?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_lte?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_not?: Maybe<Scalars['BigDecimal']>;
  priceInUsd_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  totalATokenSupply?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalATokenSupply_lt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_lte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_not?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidityAsCollateral_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_not?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_not?: Maybe<Scalars['BigInt']>;
  totalLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  utilizationRate?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_in?: Maybe<Array<Scalars['BigDecimal']>>;
  utilizationRate_lt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_lte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_not?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  variableBorrowIndex?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ReserveParamsHistoryItem_OrderBy {
  AvailableLiquidity = 'availableLiquidity',
  AverageStableBorrowRate = 'averageStableBorrowRate',
  Id = 'id',
  LifetimeBorrows = 'lifetimeBorrows',
  LifetimeCurrentVariableDebt = 'lifetimeCurrentVariableDebt',
  LifetimeDepositorsInterestEarned = 'lifetimeDepositorsInterestEarned',
  LifetimeFlashLoanPremium = 'lifetimeFlashLoanPremium',
  LifetimeFlashLoans = 'lifetimeFlashLoans',
  LifetimeLiquidated = 'lifetimeLiquidated',
  LifetimeLiquidity = 'lifetimeLiquidity',
  LifetimePrincipalStableDebt = 'lifetimePrincipalStableDebt',
  LifetimeRepayments = 'lifetimeRepayments',
  LifetimeReserveFactorAccrued = 'lifetimeReserveFactorAccrued',
  LifetimeScaledVariableDebt = 'lifetimeScaledVariableDebt',
  LifetimeWithdrawals = 'lifetimeWithdrawals',
  LiquidityIndex = 'liquidityIndex',
  LiquidityRate = 'liquidityRate',
  PriceInEth = 'priceInEth',
  PriceInUsd = 'priceInUsd',
  Reserve = 'reserve',
  StableBorrowRate = 'stableBorrowRate',
  Timestamp = 'timestamp',
  TotalATokenSupply = 'totalATokenSupply',
  TotalCurrentVariableDebt = 'totalCurrentVariableDebt',
  TotalLiquidity = 'totalLiquidity',
  TotalLiquidityAsCollateral = 'totalLiquidityAsCollateral',
  TotalPrincipalStableDebt = 'totalPrincipalStableDebt',
  TotalScaledVariableDebt = 'totalScaledVariableDebt',
  UtilizationRate = 'utilizationRate',
  VariableBorrowIndex = 'variableBorrowIndex',
  VariableBorrowRate = 'variableBorrowRate',
}

export type Reserve_Filter = {
  aEmissionPerSecond?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_gt?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_gte?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_in?: Maybe<Array<Scalars['BigInt']>>;
  aEmissionPerSecond_lt?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_lte?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_not?: Maybe<Scalars['BigInt']>;
  aEmissionPerSecond_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  aIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  aToken?: Maybe<Scalars['String']>;
  aTokenIncentivesIndex?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_gt?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_gte?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  aTokenIncentivesIndex_lt?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_lte?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_not?: Maybe<Scalars['BigInt']>;
  aTokenIncentivesIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  aToken_contains?: Maybe<Scalars['String']>;
  aToken_ends_with?: Maybe<Scalars['String']>;
  aToken_gt?: Maybe<Scalars['String']>;
  aToken_gte?: Maybe<Scalars['String']>;
  aToken_in?: Maybe<Array<Scalars['String']>>;
  aToken_lt?: Maybe<Scalars['String']>;
  aToken_lte?: Maybe<Scalars['String']>;
  aToken_not?: Maybe<Scalars['String']>;
  aToken_not_contains?: Maybe<Scalars['String']>;
  aToken_not_ends_with?: Maybe<Scalars['String']>;
  aToken_not_in?: Maybe<Array<Scalars['String']>>;
  aToken_not_starts_with?: Maybe<Scalars['String']>;
  aToken_starts_with?: Maybe<Scalars['String']>;
  availableLiquidity?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_gte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  availableLiquidity_lt?: Maybe<Scalars['BigInt']>;
  availableLiquidity_lte?: Maybe<Scalars['BigInt']>;
  availableLiquidity_not?: Maybe<Scalars['BigInt']>;
  availableLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableRate?: Maybe<Scalars['BigInt']>;
  averageStableRate_gt?: Maybe<Scalars['BigInt']>;
  averageStableRate_gte?: Maybe<Scalars['BigInt']>;
  averageStableRate_in?: Maybe<Array<Scalars['BigInt']>>;
  averageStableRate_lt?: Maybe<Scalars['BigInt']>;
  averageStableRate_lte?: Maybe<Scalars['BigInt']>;
  averageStableRate_not?: Maybe<Scalars['BigInt']>;
  averageStableRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  baseLTVasCollateral?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_gte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  baseLTVasCollateral_lt?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_lte?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_not?: Maybe<Scalars['BigInt']>;
  baseLTVasCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  baseVariableBorrowRate?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  baseVariableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  baseVariableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowingEnabled?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  borrowingEnabled_not?: Maybe<Scalars['Boolean']>;
  borrowingEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  decimals?: Maybe<Scalars['Int']>;
  decimals_gt?: Maybe<Scalars['Int']>;
  decimals_gte?: Maybe<Scalars['Int']>;
  decimals_in?: Maybe<Array<Scalars['Int']>>;
  decimals_lt?: Maybe<Scalars['Int']>;
  decimals_lte?: Maybe<Scalars['Int']>;
  decimals_not?: Maybe<Scalars['Int']>;
  decimals_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isActive_in?: Maybe<Array<Scalars['Boolean']>>;
  isActive_not?: Maybe<Scalars['Boolean']>;
  isActive_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen?: Maybe<Scalars['Boolean']>;
  isFrozen_in?: Maybe<Array<Scalars['Boolean']>>;
  isFrozen_not?: Maybe<Scalars['Boolean']>;
  isFrozen_not_in?: Maybe<Array<Scalars['Boolean']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  lifetimeBorrows?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_gte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeBorrows_lt?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_lte?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_not?: Maybe<Scalars['BigInt']>;
  lifetimeBorrows_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_gte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeDepositorsInterestEarned_lt?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_lte?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_not?: Maybe<Scalars['BigInt']>;
  lifetimeDepositorsInterestEarned_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoanPremium_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoanPremium_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_gte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeFlashLoans_lt?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_lte?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_not?: Maybe<Scalars['BigInt']>;
  lifetimeFlashLoans_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidated_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidated_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidity?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_gte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeLiquidity_lt?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_lte?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_not?: Maybe<Scalars['BigInt']>;
  lifetimeLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimePrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimePrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_gte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRepayments_lt?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_lte?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_not?: Maybe<Scalars['BigInt']>;
  lifetimeRepayments_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_gte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeReserveFactorAccrued_lt?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_lte?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_not?: Maybe<Scalars['BigInt']>;
  lifetimeReserveFactorAccrued_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  lifetimeScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_gte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeWithdrawals_lt?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_lte?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_not?: Maybe<Scalars['BigInt']>;
  lifetimeWithdrawals_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_gte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityIndex_lt?: Maybe<Scalars['BigInt']>;
  liquidityIndex_lte?: Maybe<Scalars['BigInt']>;
  liquidityIndex_not?: Maybe<Scalars['BigInt']>;
  liquidityIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate?: Maybe<Scalars['BigInt']>;
  liquidityRate_gt?: Maybe<Scalars['BigInt']>;
  liquidityRate_gte?: Maybe<Scalars['BigInt']>;
  liquidityRate_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate_lt?: Maybe<Scalars['BigInt']>;
  liquidityRate_lte?: Maybe<Scalars['BigInt']>;
  liquidityRate_not?: Maybe<Scalars['BigInt']>;
  liquidityRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  optimalUtilisationRate?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_gt?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_gte?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_in?: Maybe<Array<Scalars['BigInt']>>;
  optimalUtilisationRate_lt?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_lte?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_not?: Maybe<Scalars['BigInt']>;
  optimalUtilisationRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  price_contains?: Maybe<Scalars['String']>;
  price_ends_with?: Maybe<Scalars['String']>;
  price_gt?: Maybe<Scalars['String']>;
  price_gte?: Maybe<Scalars['String']>;
  price_in?: Maybe<Array<Scalars['String']>>;
  price_lt?: Maybe<Scalars['String']>;
  price_lte?: Maybe<Scalars['String']>;
  price_not?: Maybe<Scalars['String']>;
  price_not_contains?: Maybe<Scalars['String']>;
  price_not_ends_with?: Maybe<Scalars['String']>;
  price_not_in?: Maybe<Array<Scalars['String']>>;
  price_not_starts_with?: Maybe<Scalars['String']>;
  price_starts_with?: Maybe<Scalars['String']>;
  reserveFactor?: Maybe<Scalars['BigInt']>;
  reserveFactor_gt?: Maybe<Scalars['BigInt']>;
  reserveFactor_gte?: Maybe<Scalars['BigInt']>;
  reserveFactor_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveFactor_lt?: Maybe<Scalars['BigInt']>;
  reserveFactor_lte?: Maybe<Scalars['BigInt']>;
  reserveFactor_not?: Maybe<Scalars['BigInt']>;
  reserveFactor_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveInterestRateStrategy?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_contains?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveInterestRateStrategy_not?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not_contains?: Maybe<Scalars['Bytes']>;
  reserveInterestRateStrategy_not_in?: Maybe<Array<Scalars['Bytes']>>;
  reserveLiquidationBonus?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationBonus_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationBonus_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_gte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_in?: Maybe<Array<Scalars['BigInt']>>;
  reserveLiquidationThreshold_lt?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_lte?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_not?: Maybe<Scalars['BigInt']>;
  reserveLiquidationThreshold_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sEmissionPerSecond?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_gt?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_gte?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_in?: Maybe<Array<Scalars['BigInt']>>;
  sEmissionPerSecond_lt?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_lte?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_not?: Maybe<Scalars['BigInt']>;
  sEmissionPerSecond_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  sIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  sToken?: Maybe<Scalars['String']>;
  sTokenIncentivesIndex?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_gt?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_gte?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  sTokenIncentivesIndex_lt?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_lte?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_not?: Maybe<Scalars['BigInt']>;
  sTokenIncentivesIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sToken_contains?: Maybe<Scalars['String']>;
  sToken_ends_with?: Maybe<Scalars['String']>;
  sToken_gt?: Maybe<Scalars['String']>;
  sToken_gte?: Maybe<Scalars['String']>;
  sToken_in?: Maybe<Array<Scalars['String']>>;
  sToken_lt?: Maybe<Scalars['String']>;
  sToken_lte?: Maybe<Scalars['String']>;
  sToken_not?: Maybe<Scalars['String']>;
  sToken_not_contains?: Maybe<Scalars['String']>;
  sToken_not_ends_with?: Maybe<Scalars['String']>;
  sToken_not_in?: Maybe<Array<Scalars['String']>>;
  sToken_not_starts_with?: Maybe<Scalars['String']>;
  sToken_starts_with?: Maybe<Scalars['String']>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRateEnabled?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  stableBorrowRateEnabled_not?: Maybe<Scalars['Boolean']>;
  stableBorrowRateEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableDebtLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  stableDebtLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  stableDebtLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  stableRateSlope1?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_gt?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_gte?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_in?: Maybe<Array<Scalars['BigInt']>>;
  stableRateSlope1_lt?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_lte?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_not?: Maybe<Scalars['BigInt']>;
  stableRateSlope1_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableRateSlope2?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_gt?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_gte?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_in?: Maybe<Array<Scalars['BigInt']>>;
  stableRateSlope2_lt?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_lte?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_not?: Maybe<Scalars['BigInt']>;
  stableRateSlope2_not_in?: Maybe<Array<Scalars['BigInt']>>;
  symbol?: Maybe<Scalars['String']>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  totalATokenSupply?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_gte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalATokenSupply_lt?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_lte?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_not?: Maybe<Scalars['BigInt']>;
  totalATokenSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCurrentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalCurrentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDeposits?: Maybe<Scalars['BigInt']>;
  totalDeposits_gt?: Maybe<Scalars['BigInt']>;
  totalDeposits_gte?: Maybe<Scalars['BigInt']>;
  totalDeposits_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDeposits_lt?: Maybe<Scalars['BigInt']>;
  totalDeposits_lte?: Maybe<Scalars['BigInt']>;
  totalDeposits_not?: Maybe<Scalars['BigInt']>;
  totalDeposits_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidityAsCollateral_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_not?: Maybe<Scalars['BigInt']>;
  totalLiquidityAsCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity_gt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_gte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_in?: Maybe<Array<Scalars['BigInt']>>;
  totalLiquidity_lt?: Maybe<Scalars['BigInt']>;
  totalLiquidity_lte?: Maybe<Scalars['BigInt']>;
  totalLiquidity_not?: Maybe<Scalars['BigInt']>;
  totalLiquidity_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalPrincipalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_not?: Maybe<Scalars['BigInt']>;
  totalPrincipalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalScaledVariableDebt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalScaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  totalScaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  underlyingAsset?: Maybe<Scalars['Bytes']>;
  underlyingAsset_contains?: Maybe<Scalars['Bytes']>;
  underlyingAsset_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAsset_not?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAsset_not_in?: Maybe<Array<Scalars['Bytes']>>;
  usageAsCollateralEnabled?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_in?: Maybe<Array<Scalars['Boolean']>>;
  usageAsCollateralEnabled_not?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  utilizationRate?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_gte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_in?: Maybe<Array<Scalars['BigDecimal']>>;
  utilizationRate_lt?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_lte?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_not?: Maybe<Scalars['BigDecimal']>;
  utilizationRate_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  vEmissionPerSecond?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_gt?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_gte?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_in?: Maybe<Array<Scalars['BigInt']>>;
  vEmissionPerSecond_lt?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_lte?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_not?: Maybe<Scalars['BigInt']>;
  vEmissionPerSecond_not_in?: Maybe<Array<Scalars['BigInt']>>;
  vIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  vIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  vToken?: Maybe<Scalars['String']>;
  vTokenIncentivesIndex?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_gt?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_gte?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  vTokenIncentivesIndex_lt?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_lte?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_not?: Maybe<Scalars['BigInt']>;
  vTokenIncentivesIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  vToken_contains?: Maybe<Scalars['String']>;
  vToken_ends_with?: Maybe<Scalars['String']>;
  vToken_gt?: Maybe<Scalars['String']>;
  vToken_gte?: Maybe<Scalars['String']>;
  vToken_in?: Maybe<Array<Scalars['String']>>;
  vToken_lt?: Maybe<Scalars['String']>;
  vToken_lte?: Maybe<Scalars['String']>;
  vToken_not?: Maybe<Scalars['String']>;
  vToken_not_contains?: Maybe<Scalars['String']>;
  vToken_not_ends_with?: Maybe<Scalars['String']>;
  vToken_not_in?: Maybe<Array<Scalars['String']>>;
  vToken_not_starts_with?: Maybe<Scalars['String']>;
  vToken_starts_with?: Maybe<Scalars['String']>;
  variableBorrowIndex?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope1?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_gt?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_gte?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope1_lt?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_lte?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_not?: Maybe<Scalars['BigInt']>;
  variableRateSlope1_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope2?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_gt?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_gte?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_in?: Maybe<Array<Scalars['BigInt']>>;
  variableRateSlope2_lt?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_lte?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_not?: Maybe<Scalars['BigInt']>;
  variableRateSlope2_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Reserve_OrderBy {
  AEmissionPerSecond = 'aEmissionPerSecond',
  AIncentivesLastUpdateTimestamp = 'aIncentivesLastUpdateTimestamp',
  AToken = 'aToken',
  ATokenIncentivesIndex = 'aTokenIncentivesIndex',
  AvailableLiquidity = 'availableLiquidity',
  AverageStableRate = 'averageStableRate',
  BaseLtVasCollateral = 'baseLTVasCollateral',
  BaseVariableBorrowRate = 'baseVariableBorrowRate',
  BorrowHistory = 'borrowHistory',
  BorrowingEnabled = 'borrowingEnabled',
  ConfigurationHistory = 'configurationHistory',
  Decimals = 'decimals',
  DepositHistory = 'depositHistory',
  Deposits = 'deposits',
  FlashLoanHistory = 'flashLoanHistory',
  Id = 'id',
  IsActive = 'isActive',
  IsFrozen = 'isFrozen',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  LifetimeBorrows = 'lifetimeBorrows',
  LifetimeCurrentVariableDebt = 'lifetimeCurrentVariableDebt',
  LifetimeDepositorsInterestEarned = 'lifetimeDepositorsInterestEarned',
  LifetimeFlashLoanPremium = 'lifetimeFlashLoanPremium',
  LifetimeFlashLoans = 'lifetimeFlashLoans',
  LifetimeLiquidated = 'lifetimeLiquidated',
  LifetimeLiquidity = 'lifetimeLiquidity',
  LifetimePrincipalStableDebt = 'lifetimePrincipalStableDebt',
  LifetimeRepayments = 'lifetimeRepayments',
  LifetimeReserveFactorAccrued = 'lifetimeReserveFactorAccrued',
  LifetimeScaledVariableDebt = 'lifetimeScaledVariableDebt',
  LifetimeWithdrawals = 'lifetimeWithdrawals',
  LiquidationCallHistory = 'liquidationCallHistory',
  LiquidityIndex = 'liquidityIndex',
  LiquidityRate = 'liquidityRate',
  Name = 'name',
  OptimalUtilisationRate = 'optimalUtilisationRate',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
  ParamsHistory = 'paramsHistory',
  Pool = 'pool',
  Price = 'price',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  RepayHistory = 'repayHistory',
  ReserveFactor = 'reserveFactor',
  ReserveInterestRateStrategy = 'reserveInterestRateStrategy',
  ReserveLiquidationBonus = 'reserveLiquidationBonus',
  ReserveLiquidationThreshold = 'reserveLiquidationThreshold',
  SEmissionPerSecond = 'sEmissionPerSecond',
  SIncentivesLastUpdateTimestamp = 'sIncentivesLastUpdateTimestamp',
  SToken = 'sToken',
  STokenIncentivesIndex = 'sTokenIncentivesIndex',
  StableBorrowRate = 'stableBorrowRate',
  StableBorrowRateEnabled = 'stableBorrowRateEnabled',
  StableDebtLastUpdateTimestamp = 'stableDebtLastUpdateTimestamp',
  StableRateSlope1 = 'stableRateSlope1',
  StableRateSlope2 = 'stableRateSlope2',
  SwapHistory = 'swapHistory',
  Symbol = 'symbol',
  TotalATokenSupply = 'totalATokenSupply',
  TotalCurrentVariableDebt = 'totalCurrentVariableDebt',
  TotalDeposits = 'totalDeposits',
  TotalLiquidity = 'totalLiquidity',
  TotalLiquidityAsCollateral = 'totalLiquidityAsCollateral',
  TotalPrincipalStableDebt = 'totalPrincipalStableDebt',
  TotalScaledVariableDebt = 'totalScaledVariableDebt',
  UnderlyingAsset = 'underlyingAsset',
  UsageAsCollateralEnabled = 'usageAsCollateralEnabled',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
  UserReserves = 'userReserves',
  UtilizationRate = 'utilizationRate',
  VEmissionPerSecond = 'vEmissionPerSecond',
  VIncentivesLastUpdateTimestamp = 'vIncentivesLastUpdateTimestamp',
  VToken = 'vToken',
  VTokenIncentivesIndex = 'vTokenIncentivesIndex',
  VariableBorrowIndex = 'variableBorrowIndex',
  VariableBorrowRate = 'variableBorrowRate',
  VariableRateSlope1 = 'variableRateSlope1',
  VariableRateSlope2 = 'variableRateSlope2',
}

export type SToken = {
  __typename?: 'SToken';
  /**
   * SToken address
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  tokenContractImpl: Scalars['Bytes'];
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
};

export type STokenBalanceHistoryItem = {
  __typename?: 'STokenBalanceHistoryItem';
  avgStableBorrowRate: Scalars['BigInt'];
  currentStableDebt: Scalars['BigInt'];
  /**
   * userReserve + txHash
   *
   */
  id: Scalars['ID'];
  principalStableDebt: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  userReserve: UserReserve;
};

export type STokenBalanceHistoryItem_Filter = {
  avgStableBorrowRate?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  avgStableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  avgStableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_not?: Maybe<Scalars['BigInt']>;
  currentStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  principalStableDebt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  principalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_not?: Maybe<Scalars['BigInt']>;
  principalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
};

export enum STokenBalanceHistoryItem_OrderBy {
  AvgStableBorrowRate = 'avgStableBorrowRate',
  CurrentStableDebt = 'currentStableDebt',
  Id = 'id',
  PrincipalStableDebt = 'principalStableDebt',
  Timestamp = 'timestamp',
  UserReserve = 'userReserve',
}

export type SToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  tokenContractImpl?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_not?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum SToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  TokenContractImpl = 'tokenContractImpl',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
}

export type StableDebtToken = {
  __typename?: 'StableDebtToken';
  /**
   * StableDebtToken address
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
};

export type StableDebtToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
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
  amountAllowed: Scalars['BigInt'];
  fromUser: User;
  /**
   * stable + fromuser address + touser address+ reserve address
   *
   */
  id: Scalars['ID'];
  toUser: User;
  userReserve: UserReserve;
};

export type StableTokenDelegatedAllowance_Filter = {
  amountAllowed?: Maybe<Scalars['BigInt']>;
  amountAllowed_gt?: Maybe<Scalars['BigInt']>;
  amountAllowed_gte?: Maybe<Scalars['BigInt']>;
  amountAllowed_in?: Maybe<Array<Scalars['BigInt']>>;
  amountAllowed_lt?: Maybe<Scalars['BigInt']>;
  amountAllowed_lte?: Maybe<Scalars['BigInt']>;
  amountAllowed_not?: Maybe<Scalars['BigInt']>;
  amountAllowed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fromUser?: Maybe<Scalars['String']>;
  fromUser_contains?: Maybe<Scalars['String']>;
  fromUser_ends_with?: Maybe<Scalars['String']>;
  fromUser_gt?: Maybe<Scalars['String']>;
  fromUser_gte?: Maybe<Scalars['String']>;
  fromUser_in?: Maybe<Array<Scalars['String']>>;
  fromUser_lt?: Maybe<Scalars['String']>;
  fromUser_lte?: Maybe<Scalars['String']>;
  fromUser_not?: Maybe<Scalars['String']>;
  fromUser_not_contains?: Maybe<Scalars['String']>;
  fromUser_not_ends_with?: Maybe<Scalars['String']>;
  fromUser_not_in?: Maybe<Array<Scalars['String']>>;
  fromUser_not_starts_with?: Maybe<Scalars['String']>;
  fromUser_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  toUser?: Maybe<Scalars['String']>;
  toUser_contains?: Maybe<Scalars['String']>;
  toUser_ends_with?: Maybe<Scalars['String']>;
  toUser_gt?: Maybe<Scalars['String']>;
  toUser_gte?: Maybe<Scalars['String']>;
  toUser_in?: Maybe<Array<Scalars['String']>>;
  toUser_lt?: Maybe<Scalars['String']>;
  toUser_lte?: Maybe<Scalars['String']>;
  toUser_not?: Maybe<Scalars['String']>;
  toUser_not_contains?: Maybe<Scalars['String']>;
  toUser_not_ends_with?: Maybe<Scalars['String']>;
  toUser_not_in?: Maybe<Array<Scalars['String']>>;
  toUser_not_starts_with?: Maybe<Scalars['String']>;
  toUser_starts_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
};

export enum StableTokenDelegatedAllowance_OrderBy {
  AmountAllowed = 'amountAllowed',
  FromUser = 'fromUser',
  Id = 'id',
  ToUser = 'toUser',
  UserReserve = 'userReserve',
}

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
  executor?: Maybe<Executor>;
  executors: Array<Executor>;
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
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  protocol?: Maybe<Protocol>;
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
  userReserve?: Maybe<UserReserve>;
  userReserves: Array<UserReserve>;
  userTransaction?: Maybe<UserTransaction>;
  userTransactions: Array<UserTransaction>;
  users: Array<User>;
  variableDebtToken?: Maybe<VariableDebtToken>;
  variableDebtTokens: Array<VariableDebtToken>;
  variableTokenDelegatedAllowance?: Maybe<VariableTokenDelegatedAllowance>;
  variableTokenDelegatedAllowances: Array<VariableTokenDelegatedAllowance>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
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
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAtokenBalanceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAtokenBalanceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ATokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ATokenBalanceHistoryItem_Filter>;
};

export type SubscriptionAtokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<AToken_Filter>;
};

export type SubscriptionBorrowArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBorrowsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Borrow_Filter>;
};

export type SubscriptionChainlinkAggregatorArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionChainlinkAggregatorsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkAggregator_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ChainlinkAggregator_Filter>;
};

export type SubscriptionChainlinkEnsArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionChainlinkEnSsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ChainlinkEns_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ChainlinkEns_Filter>;
};

export type SubscriptionClaimIncentiveCallArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionClaimIncentiveCallsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ClaimIncentiveCall_Filter>;
};

export type SubscriptionContractToPoolMappingArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionContractToPoolMappingsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractToPoolMapping_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ContractToPoolMapping_Filter>;
};

export type SubscriptionDepositArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDepositsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Deposit_Filter>;
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

export type SubscriptionFlashLoanArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFlashLoansArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FlashLoan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<FlashLoan_Filter>;
};

export type SubscriptionIncentivesControllerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionIncentivesControllersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivesController_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<IncentivesController_Filter>;
};

export type SubscriptionIncentivizedActionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionIncentivizedActionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<IncentivizedAction_Filter>;
};

export type SubscriptionLiquidationCallArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLiquidationCallsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<LiquidationCall_Filter>;
};

export type SubscriptionMapAssetPoolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMapAssetPoolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MapAssetPool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<MapAssetPool_Filter>;
};

export type SubscriptionOriginationFeeLiquidationArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionOriginationFeeLiquidationsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type SubscriptionPoolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolConfigurationHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolConfigurationHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PoolConfigurationHistoryItem_Filter>;
};

export type SubscriptionPoolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Pool_Filter>;
};

export type SubscriptionPriceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPriceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PriceHistoryItem_Filter>;
};

export type SubscriptionPriceOracleArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPriceOracleAssetArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPriceOracleAssetsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracleAsset_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PriceOracleAsset_Filter>;
};

export type SubscriptionPriceOraclesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceOracle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PriceOracle_Filter>;
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

export type SubscriptionProtocolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProtocolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Protocol_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Protocol_Filter>;
};

export type SubscriptionRebalanceStableBorrowRateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRebalanceStableBorrowRatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type SubscriptionRedeemUnderlyingArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRedeemUnderlyingsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type SubscriptionReferrerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionReferrersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Referrer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Referrer_Filter>;
};

export type SubscriptionRepayArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRepaysArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Repay_Filter>;
};

export type SubscriptionReserveArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionReserveConfigurationHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionReserveConfigurationHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveConfigurationHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ReserveConfigurationHistoryItem_Filter>;
};

export type SubscriptionReserveParamsHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionReserveParamsHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReserveParamsHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ReserveParamsHistoryItem_Filter>;
};

export type SubscriptionReservesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Reserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Reserve_Filter>;
};

export type SubscriptionStableDebtTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionStableDebtTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<StableDebtToken_Filter>;
};

export type SubscriptionStableTokenDelegatedAllowanceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionStableTokenDelegatedAllowancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<StableTokenDelegatedAllowance_Filter>;
};

export type SubscriptionStokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionStokenBalanceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionStokenBalanceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<STokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<STokenBalanceHistoryItem_Filter>;
};

export type SubscriptionStokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<SToken_Filter>;
};

export type SubscriptionSwapArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSwapHistoriesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SwapHistory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<SwapHistory_Filter>;
};

export type SubscriptionSwapHistoryArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSwapsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Swap_Filter>;
};

export type SubscriptionUsageAsCollateralArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUsageAsCollateralsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type SubscriptionUsdEthPriceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUsdEthPriceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsdEthPriceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UsdEthPriceHistoryItem_Filter>;
};

export type SubscriptionUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserReserveArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserReservesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UserReserve_Filter>;
};

export type SubscriptionUserTransactionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserTransactionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserTransaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<UserTransaction_Filter>;
};

export type SubscriptionUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<User_Filter>;
};

export type SubscriptionVariableDebtTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVariableDebtTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableDebtToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VariableDebtToken_Filter>;
};

export type SubscriptionVariableTokenDelegatedAllowanceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVariableTokenDelegatedAllowancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VariableTokenDelegatedAllowance_Filter>;
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

export type SubscriptionVtokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVtokenBalanceHistoryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVtokenBalanceHistoryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VTokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VTokenBalanceHistoryItem_Filter>;
};

export type SubscriptionVtokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VToken_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<VToken_Filter>;
};

export type SubscriptionWethreserveArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWethreservesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WethReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<WethReserve_Filter>;
};

export type Swap = UserTransaction & {
  __typename?: 'Swap';
  borrowRateModeFrom: BorrowRateMode;
  borrowRateModeTo: BorrowRateMode;
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  reserve: Reserve;
  stableBorrowRate: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  user: User;
  userReserve: UserReserve;
  variableBorrowRate: Scalars['BigInt'];
};

export type SwapHistory = {
  __typename?: 'SwapHistory';
  fromAmount: Scalars['BigInt'];
  fromAsset: Scalars['String'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  receivedAmount: Scalars['BigInt'];
  swapType: Scalars['String'];
  toAsset: Scalars['String'];
};

export type SwapHistory_Filter = {
  fromAmount?: Maybe<Scalars['BigInt']>;
  fromAmount_gt?: Maybe<Scalars['BigInt']>;
  fromAmount_gte?: Maybe<Scalars['BigInt']>;
  fromAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  fromAmount_lt?: Maybe<Scalars['BigInt']>;
  fromAmount_lte?: Maybe<Scalars['BigInt']>;
  fromAmount_not?: Maybe<Scalars['BigInt']>;
  fromAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fromAsset?: Maybe<Scalars['String']>;
  fromAsset_contains?: Maybe<Scalars['String']>;
  fromAsset_ends_with?: Maybe<Scalars['String']>;
  fromAsset_gt?: Maybe<Scalars['String']>;
  fromAsset_gte?: Maybe<Scalars['String']>;
  fromAsset_in?: Maybe<Array<Scalars['String']>>;
  fromAsset_lt?: Maybe<Scalars['String']>;
  fromAsset_lte?: Maybe<Scalars['String']>;
  fromAsset_not?: Maybe<Scalars['String']>;
  fromAsset_not_contains?: Maybe<Scalars['String']>;
  fromAsset_not_ends_with?: Maybe<Scalars['String']>;
  fromAsset_not_in?: Maybe<Array<Scalars['String']>>;
  fromAsset_not_starts_with?: Maybe<Scalars['String']>;
  fromAsset_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  receivedAmount?: Maybe<Scalars['BigInt']>;
  receivedAmount_gt?: Maybe<Scalars['BigInt']>;
  receivedAmount_gte?: Maybe<Scalars['BigInt']>;
  receivedAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  receivedAmount_lt?: Maybe<Scalars['BigInt']>;
  receivedAmount_lte?: Maybe<Scalars['BigInt']>;
  receivedAmount_not?: Maybe<Scalars['BigInt']>;
  receivedAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  swapType?: Maybe<Scalars['String']>;
  swapType_contains?: Maybe<Scalars['String']>;
  swapType_ends_with?: Maybe<Scalars['String']>;
  swapType_gt?: Maybe<Scalars['String']>;
  swapType_gte?: Maybe<Scalars['String']>;
  swapType_in?: Maybe<Array<Scalars['String']>>;
  swapType_lt?: Maybe<Scalars['String']>;
  swapType_lte?: Maybe<Scalars['String']>;
  swapType_not?: Maybe<Scalars['String']>;
  swapType_not_contains?: Maybe<Scalars['String']>;
  swapType_not_ends_with?: Maybe<Scalars['String']>;
  swapType_not_in?: Maybe<Array<Scalars['String']>>;
  swapType_not_starts_with?: Maybe<Scalars['String']>;
  swapType_starts_with?: Maybe<Scalars['String']>;
  toAsset?: Maybe<Scalars['String']>;
  toAsset_contains?: Maybe<Scalars['String']>;
  toAsset_ends_with?: Maybe<Scalars['String']>;
  toAsset_gt?: Maybe<Scalars['String']>;
  toAsset_gte?: Maybe<Scalars['String']>;
  toAsset_in?: Maybe<Array<Scalars['String']>>;
  toAsset_lt?: Maybe<Scalars['String']>;
  toAsset_lte?: Maybe<Scalars['String']>;
  toAsset_not?: Maybe<Scalars['String']>;
  toAsset_not_contains?: Maybe<Scalars['String']>;
  toAsset_not_ends_with?: Maybe<Scalars['String']>;
  toAsset_not_in?: Maybe<Array<Scalars['String']>>;
  toAsset_not_starts_with?: Maybe<Scalars['String']>;
  toAsset_starts_with?: Maybe<Scalars['String']>;
};

export enum SwapHistory_OrderBy {
  FromAmount = 'fromAmount',
  FromAsset = 'fromAsset',
  Id = 'id',
  ReceivedAmount = 'receivedAmount',
  SwapType = 'swapType',
  ToAsset = 'toAsset',
}

export type Swap_Filter = {
  borrowRateModeFrom?: Maybe<BorrowRateMode>;
  borrowRateModeFrom_in?: Maybe<Array<BorrowRateMode>>;
  borrowRateModeFrom_not?: Maybe<BorrowRateMode>;
  borrowRateModeFrom_not_in?: Maybe<Array<BorrowRateMode>>;
  borrowRateModeTo?: Maybe<BorrowRateMode>;
  borrowRateModeTo_in?: Maybe<Array<BorrowRateMode>>;
  borrowRateModeTo_not?: Maybe<BorrowRateMode>;
  borrowRateModeTo_not_in?: Maybe<Array<BorrowRateMode>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  variableBorrowRate?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  variableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Swap_OrderBy {
  BorrowRateModeFrom = 'borrowRateModeFrom',
  BorrowRateModeTo = 'borrowRateModeTo',
  Id = 'id',
  Pool = 'pool',
  Reserve = 'reserve',
  StableBorrowRate = 'stableBorrowRate',
  Timestamp = 'timestamp',
  User = 'user',
  UserReserve = 'userReserve',
  VariableBorrowRate = 'variableBorrowRate',
}

export type UsageAsCollateral = UserTransaction & {
  __typename?: 'UsageAsCollateral';
  fromState: Scalars['Boolean'];
  /**
   * tx hash
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  reserve: Reserve;
  timestamp: Scalars['Int'];
  toState: Scalars['Boolean'];
  user: User;
  userReserve: UserReserve;
};

export type UsageAsCollateral_Filter = {
  fromState?: Maybe<Scalars['Boolean']>;
  fromState_in?: Maybe<Array<Scalars['Boolean']>>;
  fromState_not?: Maybe<Scalars['Boolean']>;
  fromState_not_in?: Maybe<Array<Scalars['Boolean']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  toState?: Maybe<Scalars['Boolean']>;
  toState_in?: Maybe<Array<Scalars['Boolean']>>;
  toState_not?: Maybe<Scalars['Boolean']>;
  toState_not_in?: Maybe<Array<Scalars['Boolean']>>;
  user?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum UsageAsCollateral_OrderBy {
  FromState = 'fromState',
  Id = 'id',
  Pool = 'pool',
  Reserve = 'reserve',
  Timestamp = 'timestamp',
  ToState = 'toState',
  User = 'user',
  UserReserve = 'userReserve',
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
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  oracle?: Maybe<Scalars['String']>;
  oracle_contains?: Maybe<Scalars['String']>;
  oracle_ends_with?: Maybe<Scalars['String']>;
  oracle_gt?: Maybe<Scalars['String']>;
  oracle_gte?: Maybe<Scalars['String']>;
  oracle_in?: Maybe<Array<Scalars['String']>>;
  oracle_lt?: Maybe<Scalars['String']>;
  oracle_lte?: Maybe<Scalars['String']>;
  oracle_not?: Maybe<Scalars['String']>;
  oracle_not_contains?: Maybe<Scalars['String']>;
  oracle_not_ends_with?: Maybe<Scalars['String']>;
  oracle_not_in?: Maybe<Array<Scalars['String']>>;
  oracle_not_starts_with?: Maybe<Scalars['String']>;
  oracle_starts_with?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
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
  borrowHistory: Array<Borrow>;
  borrowedReservesCount: Scalars['Int'];
  claimIncentives: Array<ClaimIncentiveCall>;
  depositHistory: Array<Deposit>;
  /**
   * user address
   *
   */
  id: Scalars['ID'];
  incentivesLastUpdated: Scalars['Int'];
  incentivizedActions: Array<IncentivizedAction>;
  lifetimeRewards: Scalars['BigInt'];
  liquidationCallHistory: Array<LiquidationCall>;
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  repayHistory: Array<Repay>;
  reserves: Array<UserReserve>;
  swapHistory: Array<Swap>;
  unclaimedRewards: Scalars['BigInt'];
  usageAsCollateralHistory: Array<UsageAsCollateral>;
};

export type UserBorrowHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Borrow_Filter>;
};

export type UserClaimIncentivesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClaimIncentiveCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ClaimIncentiveCall_Filter>;
};

export type UserDepositHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Deposit_Filter>;
};

export type UserIncentivizedActionsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncentivizedAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<IncentivizedAction_Filter>;
};

export type UserLiquidationCallHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type UserOriginationFeeLiquidationHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type UserRebalanceStableBorrowRateHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type UserRedeemUnderlyingHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type UserRepayHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Repay_Filter>;
};

export type UserReservesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserReserve_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UserReserve_Filter>;
};

export type UserSwapHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};

export type UserUsageAsCollateralHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type UserReserve = {
  __typename?: 'UserReserve';
  aIncentivesLastUpdateTimestamp: Scalars['Int'];
  aTokenBalanceHistory: Array<ATokenBalanceHistoryItem>;
  aTokenincentivesUserIndex: Scalars['BigInt'];
  borrowHistory: Array<Borrow>;
  currentATokenBalance: Scalars['BigInt'];
  currentStableDebt: Scalars['BigInt'];
  currentTotalDebt: Scalars['BigInt'];
  currentVariableDebt: Scalars['BigInt'];
  depositHistory: Array<Deposit>;
  /**
   * user address + reserve address
   *
   */
  id: Scalars['ID'];
  /**
   * Amount in currency units included as fee
   *
   */
  lastUpdateTimestamp: Scalars['Int'];
  liquidationCallHistory: Array<LiquidationCall>;
  liquidityRate: Scalars['BigInt'];
  oldStableBorrowRate: Scalars['BigInt'];
  originationFeeLiquidationHistory: Array<OriginationFeeLiquidation>;
  pool: Pool;
  principalStableDebt: Scalars['BigInt'];
  rebalanceStableBorrowRateHistory: Array<RebalanceStableBorrowRate>;
  redeemUnderlyingHistory: Array<RedeemUnderlying>;
  repayHistory: Array<Repay>;
  reserve: Reserve;
  sIncentivesLastUpdateTimestamp: Scalars['Int'];
  sTokenBalanceHistory: Array<STokenBalanceHistoryItem>;
  sTokenincentivesUserIndex: Scalars['BigInt'];
  scaledATokenBalance: Scalars['BigInt'];
  scaledVariableDebt: Scalars['BigInt'];
  stableBorrowLastUpdateTimestamp: Scalars['Int'];
  stableBorrowRate: Scalars['BigInt'];
  stableTokenDelegatedAllowances: Array<StableTokenDelegatedAllowance>;
  swapHistory: Array<Swap>;
  usageAsCollateralEnabledOnUser: Scalars['Boolean'];
  usageAsCollateralHistory: Array<UsageAsCollateral>;
  user: User;
  vIncentivesLastUpdateTimestamp: Scalars['Int'];
  vTokenBalanceHistory: Array<VTokenBalanceHistoryItem>;
  vTokenincentivesUserIndex: Scalars['BigInt'];
  variableBorrowIndex: Scalars['BigInt'];
  variableTokenDelegatedAllowances: Array<VariableTokenDelegatedAllowance>;
};

export type UserReserveATokenBalanceHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ATokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ATokenBalanceHistoryItem_Filter>;
};

export type UserReserveBorrowHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Borrow_Filter>;
};

export type UserReserveDepositHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Deposit_Filter>;
};

export type UserReserveLiquidationCallHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidationCall_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidationCall_Filter>;
};

export type UserReserveOriginationFeeLiquidationHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OriginationFeeLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<OriginationFeeLiquidation_Filter>;
};

export type UserReserveRebalanceStableBorrowRateHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RebalanceStableBorrowRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RebalanceStableBorrowRate_Filter>;
};

export type UserReserveRedeemUnderlyingHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RedeemUnderlying_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RedeemUnderlying_Filter>;
};

export type UserReserveRepayHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Repay_Filter>;
};

export type UserReserveSTokenBalanceHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<STokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<STokenBalanceHistoryItem_Filter>;
};

export type UserReserveStableTokenDelegatedAllowancesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<StableTokenDelegatedAllowance_Filter>;
};

export type UserReserveSwapHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};

export type UserReserveUsageAsCollateralHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UsageAsCollateral_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UsageAsCollateral_Filter>;
};

export type UserReserveVTokenBalanceHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VTokenBalanceHistoryItem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<VTokenBalanceHistoryItem_Filter>;
};

export type UserReserveVariableTokenDelegatedAllowancesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VariableTokenDelegatedAllowance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<VariableTokenDelegatedAllowance_Filter>;
};

export type UserReserve_Filter = {
  aIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  aIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  aIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  aTokenincentivesUserIndex?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_gt?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_gte?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  aTokenincentivesUserIndex_lt?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_lte?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_not?: Maybe<Scalars['BigInt']>;
  aTokenincentivesUserIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentATokenBalance?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  currentATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_not?: Maybe<Scalars['BigInt']>;
  currentATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentStableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentStableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentStableDebt_not?: Maybe<Scalars['BigInt']>;
  currentStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentTotalDebt?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_gt?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_gte?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentTotalDebt_lt?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_lte?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_not?: Maybe<Scalars['BigInt']>;
  currentTotalDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentVariableDebt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastUpdateTimestamp?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  lastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  lastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  liquidityRate?: Maybe<Scalars['BigInt']>;
  liquidityRate_gt?: Maybe<Scalars['BigInt']>;
  liquidityRate_gte?: Maybe<Scalars['BigInt']>;
  liquidityRate_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityRate_lt?: Maybe<Scalars['BigInt']>;
  liquidityRate_lte?: Maybe<Scalars['BigInt']>;
  liquidityRate_not?: Maybe<Scalars['BigInt']>;
  liquidityRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oldStableBorrowRate?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  oldStableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  oldStableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  principalStableDebt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_gte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  principalStableDebt_lt?: Maybe<Scalars['BigInt']>;
  principalStableDebt_lte?: Maybe<Scalars['BigInt']>;
  principalStableDebt_not?: Maybe<Scalars['BigInt']>;
  principalStableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserve?: Maybe<Scalars['String']>;
  reserve_contains?: Maybe<Scalars['String']>;
  reserve_ends_with?: Maybe<Scalars['String']>;
  reserve_gt?: Maybe<Scalars['String']>;
  reserve_gte?: Maybe<Scalars['String']>;
  reserve_in?: Maybe<Array<Scalars['String']>>;
  reserve_lt?: Maybe<Scalars['String']>;
  reserve_lte?: Maybe<Scalars['String']>;
  reserve_not?: Maybe<Scalars['String']>;
  reserve_not_contains?: Maybe<Scalars['String']>;
  reserve_not_ends_with?: Maybe<Scalars['String']>;
  reserve_not_in?: Maybe<Array<Scalars['String']>>;
  reserve_not_starts_with?: Maybe<Scalars['String']>;
  reserve_starts_with?: Maybe<Scalars['String']>;
  sIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  sIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  sIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  sTokenincentivesUserIndex?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_gt?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_gte?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  sTokenincentivesUserIndex_lt?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_lte?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_not?: Maybe<Scalars['BigInt']>;
  sTokenincentivesUserIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledATokenBalance?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_gte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledATokenBalance_lt?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_lte?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_not?: Maybe<Scalars['BigInt']>;
  scaledATokenBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledVariableDebt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  stableBorrowLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  stableBorrowLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  stableBorrowRate?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_gte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_in?: Maybe<Array<Scalars['BigInt']>>;
  stableBorrowRate_lt?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_lte?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not?: Maybe<Scalars['BigInt']>;
  stableBorrowRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  usageAsCollateralEnabledOnUser?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabledOnUser_in?: Maybe<Array<Scalars['Boolean']>>;
  usageAsCollateralEnabledOnUser_not?: Maybe<Scalars['Boolean']>;
  usageAsCollateralEnabledOnUser_not_in?: Maybe<Array<Scalars['Boolean']>>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
  vIncentivesLastUpdateTimestamp?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_gte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  vIncentivesLastUpdateTimestamp_lt?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_lte?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_not?: Maybe<Scalars['Int']>;
  vIncentivesLastUpdateTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  vTokenincentivesUserIndex?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_gt?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_gte?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  vTokenincentivesUserIndex_lt?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_lte?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_not?: Maybe<Scalars['BigInt']>;
  vTokenincentivesUserIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_gte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  variableBorrowIndex_lt?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_lte?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not?: Maybe<Scalars['BigInt']>;
  variableBorrowIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum UserReserve_OrderBy {
  AIncentivesLastUpdateTimestamp = 'aIncentivesLastUpdateTimestamp',
  ATokenBalanceHistory = 'aTokenBalanceHistory',
  ATokenincentivesUserIndex = 'aTokenincentivesUserIndex',
  BorrowHistory = 'borrowHistory',
  CurrentATokenBalance = 'currentATokenBalance',
  CurrentStableDebt = 'currentStableDebt',
  CurrentTotalDebt = 'currentTotalDebt',
  CurrentVariableDebt = 'currentVariableDebt',
  DepositHistory = 'depositHistory',
  Id = 'id',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  LiquidationCallHistory = 'liquidationCallHistory',
  LiquidityRate = 'liquidityRate',
  OldStableBorrowRate = 'oldStableBorrowRate',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
  Pool = 'pool',
  PrincipalStableDebt = 'principalStableDebt',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  RepayHistory = 'repayHistory',
  Reserve = 'reserve',
  SIncentivesLastUpdateTimestamp = 'sIncentivesLastUpdateTimestamp',
  STokenBalanceHistory = 'sTokenBalanceHistory',
  STokenincentivesUserIndex = 'sTokenincentivesUserIndex',
  ScaledATokenBalance = 'scaledATokenBalance',
  ScaledVariableDebt = 'scaledVariableDebt',
  StableBorrowLastUpdateTimestamp = 'stableBorrowLastUpdateTimestamp',
  StableBorrowRate = 'stableBorrowRate',
  StableTokenDelegatedAllowances = 'stableTokenDelegatedAllowances',
  SwapHistory = 'swapHistory',
  UsageAsCollateralEnabledOnUser = 'usageAsCollateralEnabledOnUser',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
  User = 'user',
  VIncentivesLastUpdateTimestamp = 'vIncentivesLastUpdateTimestamp',
  VTokenBalanceHistory = 'vTokenBalanceHistory',
  VTokenincentivesUserIndex = 'vTokenincentivesUserIndex',
  VariableBorrowIndex = 'variableBorrowIndex',
  VariableTokenDelegatedAllowances = 'variableTokenDelegatedAllowances',
}

export type UserTransaction = {
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['Int'];
  user: User;
};

export type UserTransaction_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum UserTransaction_OrderBy {
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  User = 'user',
}

export type User_Filter = {
  borrowedReservesCount?: Maybe<Scalars['Int']>;
  borrowedReservesCount_gt?: Maybe<Scalars['Int']>;
  borrowedReservesCount_gte?: Maybe<Scalars['Int']>;
  borrowedReservesCount_in?: Maybe<Array<Scalars['Int']>>;
  borrowedReservesCount_lt?: Maybe<Scalars['Int']>;
  borrowedReservesCount_lte?: Maybe<Scalars['Int']>;
  borrowedReservesCount_not?: Maybe<Scalars['Int']>;
  borrowedReservesCount_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  incentivesLastUpdated?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_gt?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_gte?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_in?: Maybe<Array<Scalars['Int']>>;
  incentivesLastUpdated_lt?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_lte?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_not?: Maybe<Scalars['Int']>;
  incentivesLastUpdated_not_in?: Maybe<Array<Scalars['Int']>>;
  lifetimeRewards?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_gt?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_gte?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_in?: Maybe<Array<Scalars['BigInt']>>;
  lifetimeRewards_lt?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_lte?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_not?: Maybe<Scalars['BigInt']>;
  lifetimeRewards_not_in?: Maybe<Array<Scalars['BigInt']>>;
  unclaimedRewards?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_gt?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_gte?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_in?: Maybe<Array<Scalars['BigInt']>>;
  unclaimedRewards_lt?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_lte?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_not?: Maybe<Scalars['BigInt']>;
  unclaimedRewards_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum User_OrderBy {
  BorrowHistory = 'borrowHistory',
  BorrowedReservesCount = 'borrowedReservesCount',
  ClaimIncentives = 'claimIncentives',
  DepositHistory = 'depositHistory',
  Id = 'id',
  IncentivesLastUpdated = 'incentivesLastUpdated',
  IncentivizedActions = 'incentivizedActions',
  LifetimeRewards = 'lifetimeRewards',
  LiquidationCallHistory = 'liquidationCallHistory',
  OriginationFeeLiquidationHistory = 'originationFeeLiquidationHistory',
  RebalanceStableBorrowRateHistory = 'rebalanceStableBorrowRateHistory',
  RedeemUnderlyingHistory = 'redeemUnderlyingHistory',
  RepayHistory = 'repayHistory',
  Reserves = 'reserves',
  SwapHistory = 'swapHistory',
  UnclaimedRewards = 'unclaimedRewards',
  UsageAsCollateralHistory = 'usageAsCollateralHistory',
}

export type VToken = {
  __typename?: 'VToken';
  /**
   * VToken address
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  tokenContractImpl: Scalars['Bytes'];
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
};

export type VTokenBalanceHistoryItem = {
  __typename?: 'VTokenBalanceHistoryItem';
  currentVariableDebt: Scalars['BigInt'];
  /**
   * userReserve + txHash
   *
   */
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  scaledVariableDebt: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  userReserve: UserReserve;
};

export type VTokenBalanceHistoryItem_Filter = {
  currentVariableDebt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_not?: Maybe<Scalars['BigInt']>;
  currentVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  index?: Maybe<Scalars['BigInt']>;
  index_gt?: Maybe<Scalars['BigInt']>;
  index_gte?: Maybe<Scalars['BigInt']>;
  index_in?: Maybe<Array<Scalars['BigInt']>>;
  index_lt?: Maybe<Scalars['BigInt']>;
  index_lte?: Maybe<Scalars['BigInt']>;
  index_not?: Maybe<Scalars['BigInt']>;
  index_not_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledVariableDebt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_gte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  scaledVariableDebt_lt?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_lte?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_not?: Maybe<Scalars['BigInt']>;
  scaledVariableDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
};

export enum VTokenBalanceHistoryItem_OrderBy {
  CurrentVariableDebt = 'currentVariableDebt',
  Id = 'id',
  Index = 'index',
  ScaledVariableDebt = 'scaledVariableDebt',
  Timestamp = 'timestamp',
  UserReserve = 'userReserve',
}

export type VToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  tokenContractImpl?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContractImpl_not?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_contains?: Maybe<Scalars['Bytes']>;
  tokenContractImpl_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum VToken_OrderBy {
  Id = 'id',
  Pool = 'pool',
  TokenContractImpl = 'tokenContractImpl',
  UnderlyingAssetAddress = 'underlyingAssetAddress',
  UnderlyingAssetDecimals = 'underlyingAssetDecimals',
}

export type VariableDebtToken = {
  __typename?: 'VariableDebtToken';
  /**
   * VariableDebtToken address
   *
   */
  id: Scalars['ID'];
  pool: Pool;
  underlyingAssetAddress: Scalars['Bytes'];
  underlyingAssetDecimals: Scalars['Int'];
};

export type VariableDebtToken_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  underlyingAssetAddress?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetAddress_not?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_contains?: Maybe<Scalars['Bytes']>;
  underlyingAssetAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  underlyingAssetDecimals?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_gte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_in?: Maybe<Array<Scalars['Int']>>;
  underlyingAssetDecimals_lt?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_lte?: Maybe<Scalars['Int']>;
  underlyingAssetDecimals_not?: Maybe<Scalars['Int']>;
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
  amountAllowed: Scalars['BigInt'];
  fromUser: User;
  /**
   * variable + fromuser address + touser address+ reserve address
   *
   */
  id: Scalars['ID'];
  toUser: User;
  userReserve: UserReserve;
};

export type VariableTokenDelegatedAllowance_Filter = {
  amountAllowed?: Maybe<Scalars['BigInt']>;
  amountAllowed_gt?: Maybe<Scalars['BigInt']>;
  amountAllowed_gte?: Maybe<Scalars['BigInt']>;
  amountAllowed_in?: Maybe<Array<Scalars['BigInt']>>;
  amountAllowed_lt?: Maybe<Scalars['BigInt']>;
  amountAllowed_lte?: Maybe<Scalars['BigInt']>;
  amountAllowed_not?: Maybe<Scalars['BigInt']>;
  amountAllowed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fromUser?: Maybe<Scalars['String']>;
  fromUser_contains?: Maybe<Scalars['String']>;
  fromUser_ends_with?: Maybe<Scalars['String']>;
  fromUser_gt?: Maybe<Scalars['String']>;
  fromUser_gte?: Maybe<Scalars['String']>;
  fromUser_in?: Maybe<Array<Scalars['String']>>;
  fromUser_lt?: Maybe<Scalars['String']>;
  fromUser_lte?: Maybe<Scalars['String']>;
  fromUser_not?: Maybe<Scalars['String']>;
  fromUser_not_contains?: Maybe<Scalars['String']>;
  fromUser_not_ends_with?: Maybe<Scalars['String']>;
  fromUser_not_in?: Maybe<Array<Scalars['String']>>;
  fromUser_not_starts_with?: Maybe<Scalars['String']>;
  fromUser_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  toUser?: Maybe<Scalars['String']>;
  toUser_contains?: Maybe<Scalars['String']>;
  toUser_ends_with?: Maybe<Scalars['String']>;
  toUser_gt?: Maybe<Scalars['String']>;
  toUser_gte?: Maybe<Scalars['String']>;
  toUser_in?: Maybe<Array<Scalars['String']>>;
  toUser_lt?: Maybe<Scalars['String']>;
  toUser_lte?: Maybe<Scalars['String']>;
  toUser_not?: Maybe<Scalars['String']>;
  toUser_not_contains?: Maybe<Scalars['String']>;
  toUser_not_ends_with?: Maybe<Scalars['String']>;
  toUser_not_in?: Maybe<Array<Scalars['String']>>;
  toUser_not_starts_with?: Maybe<Scalars['String']>;
  toUser_starts_with?: Maybe<Scalars['String']>;
  userReserve?: Maybe<Scalars['String']>;
  userReserve_contains?: Maybe<Scalars['String']>;
  userReserve_ends_with?: Maybe<Scalars['String']>;
  userReserve_gt?: Maybe<Scalars['String']>;
  userReserve_gte?: Maybe<Scalars['String']>;
  userReserve_in?: Maybe<Array<Scalars['String']>>;
  userReserve_lt?: Maybe<Scalars['String']>;
  userReserve_lte?: Maybe<Scalars['String']>;
  userReserve_not?: Maybe<Scalars['String']>;
  userReserve_not_contains?: Maybe<Scalars['String']>;
  userReserve_not_ends_with?: Maybe<Scalars['String']>;
  userReserve_not_in?: Maybe<Array<Scalars['String']>>;
  userReserve_not_starts_with?: Maybe<Scalars['String']>;
  userReserve_starts_with?: Maybe<Scalars['String']>;
};

export enum VariableTokenDelegatedAllowance_OrderBy {
  AmountAllowed = 'amountAllowed',
  FromUser = 'fromUser',
  Id = 'id',
  ToUser = 'toUser',
  UserReserve = 'userReserve',
}

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

export type WethReserve = {
  __typename?: 'WETHReserve';
  address: Scalars['Bytes'];
  decimals: Scalars['Int'];
  /**
   * weth address
   *
   */
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  updatedBlockNumber: Scalars['BigInt'];
  updatedTimestamp: Scalars['Int'];
};

export type WethReserve_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  decimals?: Maybe<Scalars['Int']>;
  decimals_gt?: Maybe<Scalars['Int']>;
  decimals_gte?: Maybe<Scalars['Int']>;
  decimals_in?: Maybe<Array<Scalars['Int']>>;
  decimals_lt?: Maybe<Scalars['Int']>;
  decimals_lte?: Maybe<Scalars['Int']>;
  decimals_not?: Maybe<Scalars['Int']>;
  decimals_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  updatedBlockNumber?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_gt?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_gte?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  updatedBlockNumber_lt?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_lte?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_not?: Maybe<Scalars['BigInt']>;
  updatedBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  updatedTimestamp?: Maybe<Scalars['Int']>;
  updatedTimestamp_gt?: Maybe<Scalars['Int']>;
  updatedTimestamp_gte?: Maybe<Scalars['Int']>;
  updatedTimestamp_in?: Maybe<Array<Scalars['Int']>>;
  updatedTimestamp_lt?: Maybe<Scalars['Int']>;
  updatedTimestamp_lte?: Maybe<Scalars['Int']>;
  updatedTimestamp_not?: Maybe<Scalars['Int']>;
  updatedTimestamp_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum WethReserve_OrderBy {
  Address = 'address',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  UpdatedBlockNumber = 'updatedBlockNumber',
  UpdatedTimestamp = 'updatedTimestamp',
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
