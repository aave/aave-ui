import { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';

import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { StakeUiHelperIFactory } from '../contracts/StakeUiHelperIContract';
import { StakeData, StakeGeneralDataT, StakesData, StakeUserDataT } from '../types/stake';
import { Stake } from '@aave/protocol-js';
import { ChainId } from '@aave/contract-helpers';

function formatRawStakeData(
  data: StakeGeneralDataT<BigNumber, BigNumber> & StakeUserDataT<BigNumber, BigNumber>
): StakeData {
  return {
    stakeTokenTotalSupply: data.stakeTokenTotalSupply.toString(),
    stakeCooldownSeconds: data.stakeCooldownSeconds.toNumber(),
    stakeUnstakeWindow: data.stakeUnstakeWindow.toNumber(),
    stakeTokenPriceEth: data.stakeTokenPriceEth.toString(),
    rewardTokenPriceEth: data.rewardTokenPriceEth.toString(),
    stakeApy: data.stakeApy.toString(),
    distributionPerSecond: data.distributionPerSecond.toString(),
    distributionEnd: data.distributionEnd.toString(),
    stakeTokenUserBalance: data.stakeTokenUserBalance.toString(),
    underlyingTokenUserBalance: data.underlyingTokenUserBalance.toString(),
    userCooldown: data.userCooldown.toNumber(),
    userIncentivesToClaim: data.userIncentivesToClaim.toString(),
    userPermitNonce: data.userPermitNonce.toString(),
  };
}

export function useStakeDataWithRpc(
  stakeDataProvider: string,
  chainId: ChainId,
  user?: string,
  skip: boolean = false,
  poolingInterval: number = 30
) {
  const [loading, setLoading] = useState(true);
  const [stakeData, setStakeData] = useState<StakesData>();
  const [usdPriceEth, setUsdPriceEth] = useState<string>('0');

  const loadStakeData = async (_userAddress: string | undefined, helperAddress: string) => {
    const userAddress = _userAddress ? _userAddress : ethers.constants.AddressZero;
    const helperContract = StakeUiHelperIFactory.connect(helperAddress, getProvider(chainId));
    try {
      const data = await helperContract.getUserUIData(userAddress);

      setStakeData({
        [Stake.aave]: formatRawStakeData(data['0']),
        [Stake.bpt]: formatRawStakeData(data['1']),
      });
      setUsdPriceEth(data[2].toString());
    } catch (e) {
      console.log('Stake data loading error', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    if (!skip) {
      loadStakeData(user, stakeDataProvider);
      const intervalId = setInterval(
        () => loadStakeData(user, stakeDataProvider),
        poolingInterval * 1000
      );
      return () => clearInterval(intervalId);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, skip, poolingInterval, stakeDataProvider, chainId]);

  return {
    loading,
    data: stakeData,
    usdPriceEth,
    refresh: async () => await loadStakeData(user, stakeDataProvider),
  };
}
