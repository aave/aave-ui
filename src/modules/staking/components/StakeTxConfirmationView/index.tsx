import React from 'react';

import TxConfirmationView, {
  TxConfirmationViewProps,
} from '../../../../components/TxConfirmationView';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { ChainId } from '@aave/contract-helpers';

type StakeTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txChainId' | 'allowedChainIds'>;

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
      txChainId={stakeConfig.chainId}
      allowedChainIds={[ChainId.mainnet, ChainId.kovan]}
      onMainTxConfirmed={handleMainTxConfirmed}
    />
  );
}

export default StakeTxConfirmationView;
