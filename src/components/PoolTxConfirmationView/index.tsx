import React from 'react';

import { useStaticPoolDataContext } from '../../libs/pool-data-provider';
import TxConfirmationView, { TxConfirmationViewProps } from '../TxConfirmationView';
import { useConnectionStatusContext } from '../../libs/connection-status-provider';
import { useIncentivesDataContext } from '../../libs/pool-data-provider/hooks/use-incentives-data-context';

type PoolTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txChainId'>;

function PoolTxConfirmationView({ onMainTxConfirmed, ...props }: PoolTxConfirmationViewProps) {
  const { isRPCActive } = useConnectionStatusContext();
  const { refresh, chainId, refetchWalletData } = useStaticPoolDataContext();
  const { refresh: refreshIncentives } = useIncentivesDataContext();

  const handleMainTxConfirmed = () => {
    if (typeof onMainTxConfirmed === 'function') {
      onMainTxConfirmed();
    }
    if (isRPCActive) {
      refresh && refresh();
      refreshIncentives && refreshIncentives();
    }
    refetchWalletData();
  };
  return (
    <TxConfirmationView {...props} txChainId={chainId} onMainTxConfirmed={handleMainTxConfirmed} />
  );
}

export default PoolTxConfirmationView;
