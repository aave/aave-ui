import React from 'react';

import TxConfirmationView, {
  TxConfirmationViewProps,
} from '../../../../components/TxConfirmationView';
import { Network } from '@aave/protocol-js';
import { useGovernanceDataContext } from '../../../../libs/governance-provider';

type GovernanceTxConfirmationViewProps = Omit<
  TxConfirmationViewProps,
  'txNetwork' | 'allowedNetworks'
>;

function GovernanceTxConfirmationView({
  onMainTxConfirmed,
  ...props
}: GovernanceTxConfirmationViewProps) {
  const { governanceConfig } = useGovernanceDataContext();

  return (
    <TxConfirmationView
      {...props}
      txNetwork={governanceConfig.network}
      allowedNetworks={[Network.mainnet, Network.fork, Network.kovan]}
    />
  );
}

export default GovernanceTxConfirmationView;
