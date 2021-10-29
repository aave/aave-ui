import React from 'react';

import TxConfirmationView, {
  TxConfirmationViewProps,
} from '../../../../components/TxConfirmationView';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { Network } from '@aave/protocol-js';
import { ChainIdToNetwork } from '@aave/contract-helpers';

type StakeTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txNetwork' | 'allowedNetworks'>;

function StakeTxConfirmationView({ onMainTxConfirmed, ...props }: StakeTxConfirmationViewProps) {
  const { refresh, stakeConfig } = useStakeDataContext();

  const handleMainTxConfirmed = () => {
    if (typeof onMainTxConfirmed === 'function') {
      onMainTxConfirmed();
    }
    refresh(); // TODO: make it optional if caching server in use
  };
  return (
    <TxConfirmationView
      {...props}
      txNetwork={ChainIdToNetwork[stakeConfig.chainId] as Network}
      allowedNetworks={[Network.mainnet, Network.fork, Network.kovan]}
      onMainTxConfirmed={handleMainTxConfirmed}
    />
  );
}

export default StakeTxConfirmationView;
