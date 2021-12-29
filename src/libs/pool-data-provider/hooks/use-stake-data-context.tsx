import React, { ReactNode, useContext, useState } from 'react';
import { ChainId, Stake, StakingService } from '@aave/contract-helpers';
import { normalize, valueToBigNumber } from '@aave/math-utils';
import { useLocation } from 'react-router-dom';

import Preloader from '../../../components/basic/Preloader';
import ErrorPage from '../../../components/ErrorPage';
import { useCachedStakeData } from '../../caching-server-data-provider/hooks/use-cached-stake-data';
import { useProtocolDataContext } from '../../protocol-data-provider';
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
import { StakeConfig } from '../../../ui-config';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { useUserWalletDataContext } from '../../web3-data-provider';

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
  STAKING_REWARD_TOKEN: string;
  data: ComputedStakesData;
  usdPriceEth: string;
  refresh: () => void;
  stakingService: StakingService;
  cooldownStep: number;
  setCooldownStep: (value: number) => void;
}>({
  stakeConfig: {} as StakeConfig,
  selectedStake: Stake.aave,
  STAKING_REWARD_TOKEN: '',
  selectedStakeData: {} as ComputedStakeData,
  data: {} as ComputedStakesData,
  usdPriceEth: '0',
  refresh: () => {},
  stakingService: {} as StakingService,
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
  const { currentAccount } = useUserWalletDataContext();
  const location = useLocation();
  const [cooldownStep, setCooldownStep] = useState(0);
  const { preferredConnectionMode } = useConnectionStatusContext();
  const { chainId, networkConfig } = useProtocolDataContext();
  const isStakeFork =
    networkConfig.isFork && networkConfig.underlyingChainId === stakeConfig.chainId;
  const RPC_ONLY_MODE =
    networkConfig.rpcOnly ||
    preferredConnectionMode === ConnectionMode.rpc ||
    isStakeFork ||
    !stakeConfig.queryStakeDataUrl ||
    !stakeConfig.wsStakeDataUrl;

  const rpcProvider = isStakeFork ? getProvider(chainId) : getProvider(stakeConfig.chainId);

  const selectedStake =
    location.pathname.split('/')[2]?.toLowerCase() === Stake.aave ? Stake.aave : Stake.bpt;
  const selectedStakeAddresses = stakeConfig.tokens[selectedStake];
  const stakingService = new StakingService(rpcProvider, {
    TOKEN_STAKING_ADDRESS: selectedStakeAddresses.TOKEN_STAKING,
    STAKING_HELPER_ADDRESS: selectedStakeAddresses.STAKING_HELPER,
  });

  const {
    loading: cachedDataLoading,
    data: cachedData,
    usdPriceEth: usdPriceEthCached,
  } = useCachedStakeData(currentAccount, RPC_ONLY_MODE);

  const wsNetworkError = useNetworkCachedServerWsGraphCheck();
  const wsMainnetError = useMainnetCachedServerWsGraphCheck();
  const queryError = useQueryGraphCheck();

  const isRPCMandatory =
    RPC_ONLY_MODE ||
    (wsNetworkError.wsErrorCount >= WS_ATTEMPTS_LIMIT && chainId === ChainId.mainnet) ||
    (wsMainnetError.wsErrorCount >= WS_ATTEMPTS_LIMIT && chainId !== ChainId.mainnet) ||
    networkConfig.isFork ||
    (!cachedData && !cachedDataLoading) ||
    queryError.queryErrorCount >= 1;
  const isRPCActive = preferredConnectionMode === ConnectionMode.rpc || isRPCMandatory;

  const {
    loading: rpcDataLoading,
    data: rpcData,
    usdPriceEth: usdPriceEthRpc,
    refresh,
  } = useStakeDataWithRpc(
    stakeConfig.stakeDataProvider,
    isStakeFork ? chainId : stakeConfig.chainId,
    currentAccount,
    !isRPCActive
  );
  console.log(cachedData);

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
        STAKING_REWARD_TOKEN: selectedStakeAddresses.STAKING_REWARD_TOKEN,
        stakingService,
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
