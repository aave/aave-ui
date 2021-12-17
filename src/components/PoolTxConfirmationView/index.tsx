import React from 'react';

import { useStaticPoolDataContext } from '../../libs/pool-data-provider';
import { useWalletBalanceProviderContext } from '../../libs/wallet-balance-provider/WalletBalanceProvider';
import TxConfirmationView, { TxConfirmationViewProps } from '../TxConfirmationView';
import { useConnectionStatusContext } from '../../libs/connection-status-provider';
import { useIncentivesDataContext } from '../../libs/pool-data-provider/hooks/use-incentives-data-context';

type PoolTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txChainId'>;

function PoolTxConfirmationView({ onMainTxConfirmed, ...props }: PoolTxConfirmationViewProps) {
  const { isRPCActive } = useConnectionStatusContext();
  const { refresh, chainId } = useStaticPoolDataContext();
  const { refresh: refreshIncentives } = useIncentivesDataContext();
  const { refetch } = useWalletBalanceProviderContext();

  const handleMainTxConfirmed = () => {
    if (typeof onMainTxConfirmed === 'function') {
      onMainTxConfirmed();
    }
    if (isRPCActive) {
      refresh();
      refreshIncentives();
    }
    refetch();
  };
  return (
    <TxConfirmationView {...props} txChainId={chainId} onMainTxConfirmed={handleMainTxConfirmed} />
  );
}

export default PoolTxConfirmationView;
