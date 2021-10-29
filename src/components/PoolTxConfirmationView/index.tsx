import React from 'react';

import { useStaticPoolDataContext } from '../../libs/pool-data-provider';
import { useWalletBalanceProviderContext } from '../../libs/wallet-balance-provider/WalletBalanceProvider';
import TxConfirmationView, { TxConfirmationViewProps } from '../TxConfirmationView';
import { useConnectionStatusContext } from '../../libs/connection-status-provider';
import { Network } from '@aave/protocol-js';
import { ChainIdToNetwork } from '@aave/contract-helpers';

type PoolTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txNetwork'>;

function PoolTxConfirmationView({ onMainTxConfirmed, ...props }: PoolTxConfirmationViewProps) {
  const { isRPCActive } = useConnectionStatusContext();
  const { refresh, chainId } = useStaticPoolDataContext();
  const { refetch } = useWalletBalanceProviderContext();

  const network = ChainIdToNetwork[chainId] as Network;
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
    <TxConfirmationView {...props} txNetwork={network} onMainTxConfirmed={handleMainTxConfirmed} />
  );
}

export default PoolTxConfirmationView;
