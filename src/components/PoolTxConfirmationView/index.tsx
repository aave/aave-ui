import React from 'react';

import { useAppDataContext } from '../../libs/pool-data-provider';
import TxConfirmationView, { TxConfirmationViewProps } from '../TxConfirmationView';
import { useConnectionStatusContext } from '../../libs/connection-status-provider';
import { useProtocolDataContext } from '../../libs/protocol-data-provider';

type PoolTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txChainId'>;

function PoolTxConfirmationView({ onMainTxConfirmed, ...props }: PoolTxConfirmationViewProps) {
  const { isRPCActive } = useConnectionStatusContext();
  const { chainId } = useProtocolDataContext();
  const { refreshIncentives, refetchWalletData, refreshPoolData } = useAppDataContext();

  const handleMainTxConfirmed = () => {
    if (typeof onMainTxConfirmed === 'function') {
      onMainTxConfirmed();
    }
    if (isRPCActive) {
      refreshPoolData && refreshPoolData();
      refreshIncentives && refreshIncentives();
    }
    refetchWalletData();
  };
  return (
    <TxConfirmationView {...props} txChainId={chainId} onMainTxConfirmed={handleMainTxConfirmed} />
  );
}

export default PoolTxConfirmationView;
