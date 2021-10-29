import React from 'react';

import { useStaticPoolDataContext } from '../../libs/pool-data-provider';
import { useWalletBalanceProviderContext } from '../../libs/wallet-balance-provider/WalletBalanceProvider';
import TxConfirmationView, { TxConfirmationViewProps } from '../TxConfirmationView';
import { useConnectionStatusContext } from '../../libs/connection-status-provider';

type PoolTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txChainId'>;

function PoolTxConfirmationView({ onMainTxConfirmed, ...props }: PoolTxConfirmationViewProps) {
  const { isRPCActive } = useConnectionStatusContext();
  const { refresh, chainId } = useStaticPoolDataContext();
  const { refetch } = useWalletBalanceProviderContext();

  const handleMainTxConfirmed = () => {
    if (typeof onMainTxConfirmed === 'function') {
      onMainTxConfirmed();
    }
    if (isRPCActive) {
      refresh();
    }
    refetch();
  };
  return (
    <TxConfirmationView {...props} txChainId={chainId} onMainTxConfirmed={handleMainTxConfirmed} />
  );
}

export default PoolTxConfirmationView;
