import { useEffect, useState } from 'react';
import { normalize, valueToBigNumber, tEthereumAddress } from '@aave/protocol-js';

import { useStateLoading, LOADING_STATE } from '../../hooks/use-state-loading';
import { GovernanceConfig } from '../../../ui-config';
import { AaveGovernanceService } from '@aave/contract-helpers';

interface PowersState {
  votingPower: string;
  propositionPower: string;
  aaveVotingDelegatee: string;
  aavePropositionDelegatee: string;
  stkAaveVotingDelegatee: string;
  stkAavePropositionDelegatee: string;
}

export function useCurrentVotingPowerRPC(
  userAddress: tEthereumAddress,
  governanceService: AaveGovernanceService,
  governanceConfig: GovernanceConfig
) {
  const { aaveTokenAddress, stkAaveTokenAddress } = governanceConfig;

  const { loading, setLoading } = useStateLoading();
  const [powers, setPowers] = useState<PowersState>({
    votingPower: '0',
    propositionPower: '0',
    aaveVotingDelegatee: '',
    aavePropositionDelegatee: '',
    stkAaveVotingDelegatee: '',
    stkAavePropositionDelegatee: '',
  });

  const checkIfDelegateeIsUser = (delegatee: tEthereumAddress) =>
    delegatee.toLocaleLowerCase() === userAddress.toLocaleLowerCase() ? '' : delegatee;
  const getCurrentVotingPower = async (user: tEthereumAddress) => {
    setLoading(LOADING_STATE.LOADING);

    try {
      const [aaveTokenPower, stkAaveTokenPower] = await governanceService.getTokensPower({
        user,
        tokens: [aaveTokenAddress, stkAaveTokenAddress],
      });

      setPowers({
        votingPower: normalize(
          valueToBigNumber(aaveTokenPower.votingPower.toString())
            .plus(stkAaveTokenPower.votingPower.toString())
            .toString(),
          18
        ),
        propositionPower: normalize(
          valueToBigNumber(aaveTokenPower.propositionPower.toString())
            .plus(stkAaveTokenPower.propositionPower.toString())
            .toString(),
          18
        ),
        aaveVotingDelegatee: checkIfDelegateeIsUser(aaveTokenPower.delegatedAddressVotingPower),
        aavePropositionDelegatee: checkIfDelegateeIsUser(
          aaveTokenPower.delegatedAddressPropositionPower
        ),
        stkAaveVotingDelegatee: checkIfDelegateeIsUser(
          stkAaveTokenPower.delegatedAddressVotingPower
        ),
        stkAavePropositionDelegatee: checkIfDelegateeIsUser(
          stkAaveTokenPower.delegatedAddressPropositionPower
        ),
      });
    } catch (e) {
      console.error(`Voting/Proposition Power RPC Error: `, e);
    }

    setLoading(LOADING_STATE.FINISHED);
  };

  useEffect(() => {
    if (userAddress) {
      getCurrentVotingPower(userAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  return { loading, ...powers };
}
