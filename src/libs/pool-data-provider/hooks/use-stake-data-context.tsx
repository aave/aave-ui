import React, { ReactNode, useContext, useState } from 'react';
import {
  normalize,
  StakingInterface,
  Stake,
  TxBuilderV2,
  Network,
  valueToBigNumber,
  TxBuilderConfig,
} from '@aave/protocol-js';

import { useLocation } from 'react-router-dom';

import Preloader from '../../../components/basic/Preloader';
import ErrorPage from '../../../components/ErrorPage';
import { useCachedStakeData } from '../../caching-server-data-provider/hooks/use-cached-stake-data';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useStaticPoolDataContext } from '../providers/static-pool-data-provider';
import { ComputedStakeData, ComputedStakesData, StakeData } from '../types/stake';
import {
  useMainnetCachedServerWsGraphCheck,
  useNetworkCachedServerWsGraphCheck,
  useQueryGraphCheck,
} from './use-graph-check';
import { useStakeDataWithRpc } from './use-stake-data-with-rpc';
import {
  ConnectionMode,
  useConnectionStatusContext,
  WS_ATTEMPTS_LIMIT,
} from '../../connection-status-provider';
import { useApolloConfigContext } from '../../apollo-config';
import { StakeConfig } from '../../../ui-config';
import { getProvider } from '../../../helpers/markets/markets-data';

export function computeStakeData(data: StakeData): ComputedStakeData {
  return {
    ...data,
    stakeTokenTotalSupply: normalize(data.stakeTokenTotalSupply, 18),
    stakeApy: normalize(data.stakeApy, 4),
    stakeTokenPriceEth: normalize(data.stakeTokenPriceEth, 18),
    rewardTokenPriceEth: normalize(data.rewardTokenPriceEth, 18),
    distributionPerSecond: normalize(data.distributionPerSecond, 18),
    distributionPerDay: normalize(
      valueToBigNumber(data.distributionPerSecond).multipliedBy(60 * 60 * 24),
      18
    ),
    stakeTokenUserBalance: normalize(data.stakeTokenUserBalance, 18),
    userIncentivesToClaim: normalize(data.userIncentivesToClaim, 18),
    underlyingTokenUserBalance: normalize(data.underlyingTokenUserBalance, 18),
    userCooldownEndTime:
      data.userCooldown !== 0 ? data.userCooldown + data.stakeCooldownSeconds : 0,
    userEarningsPerDay:
      data.stakeTokenUserBalance !== '0'
        ? normalize(
            valueToBigNumber(data.distributionPerSecond)
              .multipliedBy(60 * 60 * 24)
              .multipliedBy(data.stakeTokenUserBalance)
              .div(data.stakeTokenTotalSupply)
              .toString(),
            18
          )
        : '0',
  };
}

const StakeDataContext = React.createContext<{
  stakeConfig: StakeConfig;
  selectedStake: Stake;
  selectedStakeData: ComputedStakeData;
  data: ComputedStakesData;
  usdPriceEth: string;
  refresh: () => void;
  txBuilder: StakingInterface;
  cooldownStep: number;
  setCooldownStep: (value: number) => void;
}>({
  stakeConfig: {} as StakeConfig,
  selectedStake: Stake.aave,
  selectedStakeData: {} as ComputedStakeData,
  data: {} as ComputedStakesData,
  usdPriceEth: '0',
  refresh: () => {},
  txBuilder: {} as StakingInterface,
  cooldownStep: 0,
  setCooldownStep: () => {},
});

export function StakeDataProvider({
  children,
  stakeConfig,
}: {
  stakeConfig: StakeConfig;
  children: ReactNode;
}) {
  const { userId } = useStaticPoolDataContext();
  const location = useLocation();
  const [cooldownStep, setCooldownStep] = useState(0);
  const { preferredConnectionMode } = useConnectionStatusContext();
  const { network, networkConfig } = useProtocolDataContext();
  const { network: apolloClientNetwork } = useApolloConfigContext();
  const RPC_ONLY_MODE = networkConfig.rpcOnly;

  const selectedStake =
    location.pathname.split('/')[2]?.toLowerCase() === Stake.aave ? Stake.aave : Stake.bpt;
  const config: TxBuilderConfig = {
    staking: {
      [stakeConfig.network]: stakeConfig.tokens,
    },
  };
  const txBuilder = new TxBuilderV2(
    stakeConfig.network,
    getProvider(stakeConfig.network),
    undefined,
    config
  ).getStaking(selectedStake === Stake.aave ? Stake.aave : Stake.bpt);

  const {
    loading: cachedDataLoading,
    data: cachedData,
    usdPriceEth: usdPriceEthCached,
  } = useCachedStakeData(
    userId,
    preferredConnectionMode === ConnectionMode.rpc || network !== apolloClientNetwork
  );

  const wsNetworkError = useNetworkCachedServerWsGraphCheck();
  const wsMainnetError = useMainnetCachedServerWsGraphCheck();
  const queryError = useQueryGraphCheck();

  const isRPCMandatory =
    RPC_ONLY_MODE ||
    (wsNetworkError.wsErrorCount >= WS_ATTEMPTS_LIMIT && network === Network.mainnet) ||
    (wsMainnetError.wsErrorCount >= WS_ATTEMPTS_LIMIT && network !== Network.mainnet) ||
    network === Network.fork ||
    (!cachedData && !cachedDataLoading) ||
    queryError.queryErrorCount >= 1;
  const isRPCActive = preferredConnectionMode === ConnectionMode.rpc || isRPCMandatory;

  const {
    loading: rpcDataLoading,
    data: rpcData,
    usdPriceEth: usdPriceEthRpc,
    refresh,
  } = useStakeDataWithRpc(stakeConfig.stakeDataProvider, stakeConfig.network, userId, !isRPCActive);

  if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
    return <Preloader withText={true} />;
  }

  const rawData = isRPCActive && rpcData ? rpcData : cachedData;
  if (!rawData) {
    return <ErrorPage />;
  }

  const computedData = {
    [Stake.aave]: computeStakeData(rawData[Stake.aave]),
    [Stake.bpt]: computeStakeData(rawData[Stake.bpt]),
  };
  const usdPriceEth = normalize((isRPCActive && usdPriceEthRpc) || usdPriceEthCached || '0', 18);

  return (
    <StakeDataContext.Provider
      value={{
        stakeConfig,
        selectedStake,
        txBuilder,
        selectedStakeData: computedData[selectedStake],
        usdPriceEth,
        data: computedData,
        refresh: isRPCActive ? refresh : async () => {},
        cooldownStep,
        setCooldownStep,
      }}
    >
      {children}
    </StakeDataContext.Provider>
  );
}

export const useStakeDataContext = () => useContext(StakeDataContext);
