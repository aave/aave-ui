import { useEffect, useState } from 'react';
import { AaveGovernanceV2Interface, tEthereumAddress } from '@aave/protocol-js';
import { useStateLoading, LOADING_STATE } from '../../hooks/use-state-loading';

export function useVotingPowerLoader(
  startBlock: number | undefined,
  strategy: string | undefined,
  governanceService: AaveGovernanceV2Interface,
  userAddress?: tEthereumAddress | undefined
) {
  const { loading, setLoading } = useStateLoading();
  const [power, setPower] = useState<string>('0');

  const getVotingPower = async (
    startBlock: number,
    strategy: string,
    user: tEthereumAddress | undefined
  ) => {
    setLoading(LOADING_STATE.LOADING);
    try {
      if (user) {
        const votingPower = await governanceService.getVotingPowerAt({
          user,
          block: startBlock,
          strategy: strategy,
        });
        setPower(votingPower);
      }
    } catch (e) {
      console.error(`Voting Power Loader Error: ${e.message}`);
    }
    setLoading(LOADING_STATE.FINISHED);
  };

  useEffect(() => {
    if (startBlock && strategy) getVotingPower(startBlock, strategy, userAddress);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, startBlock, strategy]);
  return { loading, power };
}
